const sgMail = require('@sendgrid/mail');
const BusboyModule = require('busboy');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
// busboy may export the constructor as default in some bundlers/environments
const Busboy = BusboyModule && BusboyModule.default ? BusboyModule.default : BusboyModule;

// Configure SendGrid API key from environment
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Create an S3 client factory. We instantiate per-upload using env vars at runtime.
function createS3Client() {
  const region = process.env.S3_REGION || process.env.AWS_REGION || 'us-east-1';
  const opts = { region };
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    opts.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    };
  }
  return new S3Client(opts);
}

const sanitizeFilename = (name) => {
  if (!name) return '';
  return String(name).replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 200);
};

async function uploadBufferToS3({ buffer, filename, mimeType }) {
  if (!buffer || !buffer.length) throw new Error('Empty buffer');
  const bucket = process.env.S3_BUCKET;
  if (!bucket) throw new Error('S3_BUCKET not configured');

  const key = `form-uploads/${Date.now()}-${sanitizeFilename(filename || 'attachment')}`;
  const client = createS3Client();
  const put = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: mimeType || 'application/octet-stream',
    ACL: process.env.S3_PUBLIC === 'true' ? 'public-read' : undefined,
  });

  await client.send(put);

  // If S3 public, return public URL; otherwise return a presigned GET URL
  if (process.env.S3_PUBLIC === 'true') {
    const region = process.env.S3_REGION || process.env.AWS_REGION || 'us-east-1';
    // Construct public URL
    const url = `https://${bucket}.s3.${region}.amazonaws.com/${encodeURIComponent(key)}`;
    return url;
  }

  // Generate presigned GET URL
  const getCmd = new GetObjectCommand({ Bucket: bucket, Key: key });
  const expires = parseInt(process.env.S3_PRESIGNED_EXPIRES || '86400', 10); // default 24h
  const signedUrl = await getSignedUrl(client, getCmd, { expiresIn: expires });
  return signedUrl;
}

// Fallback: upload to a temporary public file host (transfer.sh) when no S3 configured.
// This requires no credentials but has retention/privacy tradeoffs — see notes below.
async function uploadBufferToTransfer({ buffer, filename, mimeType }) {
  if (!buffer || !buffer.length) throw new Error('Empty buffer');
  const name = sanitizeFilename(filename || 'attachment');
  const url = `https://transfer.sh/${encodeURIComponent(name)}`;

  // Node 18+ has global fetch available in Netlify functions runtime
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'content-type': mimeType || 'application/octet-stream',
    },
    body: buffer,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '<no-body>');
    throw new Error(`transfer.sh upload failed: ${res.status} ${res.statusText} ${body}`);
  }

  const text = await res.text();
  return text.trim();
}

module.exports.handler = async function (event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const contentType = event.headers['content-type'] || event.headers['Content-Type'];
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return { statusCode: 400, body: 'Invalid content type. Must be multipart/form-data.' };
    }

    if (!event.body) {
      return { statusCode: 400, body: 'Request body is empty.' };
    }

    // Normalize body to Buffer for Busboy if possible
    let body = event.body;
    if (event.isBase64Encoded) {
      body = Buffer.from(event.body, 'base64');
    } else if (typeof event.body === 'string') {
      body = Buffer.from(event.body, 'utf8');
    }

    // We'll attempt Busboy parsing for multipart bodies but add a safe fallback
    const fields = {};
    let fileBuffer = null;
    let fileName = '';
    let fileMime = '';

    const isMultipart = (event.headers['content-type'] || event.headers['Content-Type'] || '').includes('multipart/form-data');

    if (isMultipart && Busboy) {
      // Some bundlers export Busboy as a factory function (callable) rather than a constructor.
      // Call it without `new` to be compatible with both forms.
      try {
        const busboy = typeof Busboy === 'function' ? Busboy({ headers: event.headers }) : new Busboy({ headers: event.headers });

        // Wrap Busboy parsing in a promise
        await new Promise((resolve, reject) => {
          const timeoutMs = 15000; // 15s
          const timeout = setTimeout(() => reject(new Error('Form parsing timed out.')), timeoutMs);

          busboy.on('field', (fieldname, val) => {
            fields[fieldname] = val;
          });

          busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            fileName = filename;
            fileMime = mimetype;
            const buffers = [];
            file.on('data', (data) => buffers.push(data));
            file.on('end', () => {
              try {
                fileBuffer = Buffer.concat(buffers);
              } catch (e) {
                console.error('File buffer concat error', e);
              }
            });
          });

          busboy.on('finish', () => {
            clearTimeout(timeout);
            resolve();
          });

          busboy.on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
          });

          try {
            busboy.end(body);
          } catch (err) {
            clearTimeout(timeout);
            reject(err);
          }
        });
      } catch (err) {
        // If Busboy fails unexpectedly, fall back to a simple parse to avoid throwing
        console.error('Busboy parse failed, falling back to basic parse:', err);
      }
    } else {
      // Fallback parsing for non-multipart bodies or if Busboy isn't available/failed.
      try {
        if (typeof event.body === 'string' && event.headers['content-type'] && event.headers['content-type'].includes('application/x-www-form-urlencoded')) {
          // parse urlencoded
          const params = new URLSearchParams(event.body);
          for (const [k, v] of params) fields[k] = v;
        } else if (typeof event.body === 'string' && event.body.trim().startsWith('{')) {
          // parse JSON body
          const obj = JSON.parse(event.body);
          Object.assign(fields, obj);
        } else if (!isMultipart && Buffer.isBuffer(body)) {
          // try to decode buffer as utf8 key=value pairs
          const s = body.toString('utf8');
          if (s.includes('=')) {
            const params = new URLSearchParams(s);
            for (const [k, v] of params) fields[k] = v;
          }
        }
      } catch (err) {
        console.error('Fallback parse error:', err);
      }
    }

    // Debug logs
    console.log('Fields:', fields);
    if (fileName) {
      console.log('File received:', fileName, fileMime, fileBuffer ? fileBuffer.length : 0);
    } else {
      console.log('No file uploaded.');
    }

    // Prepare SendGrid message
    const to = process.env.CONTACT_EMAIL || 'j.mubayiwa@gmail.com';
    const from = process.env.SENDGRID_FROM || to;

    // Build a friendly HTML and plain-text email body
    const timestamp = new Date().toISOString();
    const plainTextLines = [];
    plainTextLines.push('New form submission');
    plainTextLines.push('Timestamp: ' + timestamp);
    for (const k of Object.keys(fields)) {
      plainTextLines.push(`${k}: ${fields[k]}`);
    }

  const htmlLines = [];
  // Use site brand colors from tailwind.config.ts: cream, sand, clay/gold, bark, charcoal
  htmlLines.push('<!doctype html><html><head><meta charset="utf-8"/><style>body{font-family:Arial,Helvetica,sans-serif;color:#23201B;background:#F8F5EC} .wrapper{max-width:680px;margin:0 auto;padding:20px;background:#ffffff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.06)} .header{background:#C49A6C;padding:14px 16px;border-radius:6px;color:#ffffff} .field{padding:12px 0;border-bottom:1px solid #f1ede6} .label{font-weight:700;color:#6E4B3A;margin-bottom:6px} .value{color:#23201B;margin-top:4px;white-space:pre-wrap} .footer{margin-top:18px;color:#666666;font-size:13px}</style></head><body><div style="padding:18px;background:#F8F5EC"> <div class="wrapper">');
  htmlLines.push('<div class="header"><h2 style="margin:0;font-size:18px">Soul Care — New form submission</h2></div>');
    htmlLines.push('<div style="margin-top:12px"><strong>Timestamp:</strong> ' + timestamp + '</div>');
    htmlLines.push('<div style="margin-top:12px">');
    for (const k of Object.keys(fields)) {
      const safeKey = String(k);
      const safeVal = String(fields[k]).replace(/\n/g, '<br/>');
      htmlLines.push(`<div class="field"><div class="label">${safeKey}</div><div class="value">${safeVal}</div></div>`);
    }
    htmlLines.push('</div>');
    if (fileName) {
      htmlLines.push(`<div style="margin-top:12px"><strong>Attachment:</strong> ${fileName} (${fileMime}; ${fileBuffer ? fileBuffer.length : 0} bytes)</div>`);
    }
    htmlLines.push('<div class="footer">This email was sent from your site contact form.</div>');
    htmlLines.push('</div></body></html>');

    // Build attachments cleanly: SendGrid requires each attachment to contain a filename string.
    // If the uploaded file lacks a filename, generate a safe default using the mime type when possible.
    const extFromMime = (mime) => {
      if (!mime || typeof mime !== 'string') return '.bin';
      if (mime.includes('pdf')) return '.pdf';
      if (mime.includes('plain')) return '.txt';
      if (mime.includes('jpeg')) return '.jpg';
      if (mime.includes('png')) return '.png';
      if (mime.includes('msword') || mime.includes('word')) return '.doc';
      if (mime.includes('officedocument')) return '.docx';
      if (mime.includes('zip')) return '.zip';
      return '.bin';
    };

    // Instead of sending inline attachments to SendGrid (which caused failures),
    // upload the file to S3 (if configured) and include a secure link in the email body.
    let fileLink = null;
    if (fileBuffer && fileBuffer.length) {
      if (process.env.S3_BUCKET) {
        try {
          fileLink = await uploadBufferToS3({ buffer: fileBuffer, filename: fileName || fields.filename, mimeType: fileMime });
          console.log('Uploaded attachment to storage:', fileLink);
          plainTextLines.push('Attachment link: ' + fileLink);
          htmlLines.push(`<div style="margin-top:12px"><a href=\"${fileLink}\" target=\"_blank\" rel=\"noopener noreferrer\">Download attachment: ${sanitizeFilename(fileName || fields.filename || 'attachment')}</a></div>`);
        } catch (e) {
          console.error('S3 upload failed:', e && e.message ? e.message : e);
          plainTextLines.push('[Attachment upload failed]');
          htmlLines.push(`<div style="margin-top:12px;color:#a33"><strong>Attachment upload failed</strong></div>`);
        }
      } else {
        // No S3 configured — attempt a no-credentials upload to transfer.sh as a temporary fallback.
        try {
          fileLink = await uploadBufferToTransfer({ buffer: fileBuffer, filename: fileName || fields.filename, mimeType: fileMime });
          console.log('Uploaded attachment to transfer.sh:', fileLink);
          plainTextLines.push('Attachment link: ' + fileLink);
          htmlLines.push(`<div style="margin-top:12px"><a href=\"${fileLink}\" target=\"_blank\" rel=\"noopener noreferrer\">Download attachment: ${sanitizeFilename(fileName || fields.filename || 'attachment')}</a></div>`);
        } catch (e) {
          console.error('transfer.sh upload failed:', e && e.message ? e.message : e);
          plainTextLines.push('[Attachment omitted: upload failed]');
          htmlLines.push(`<div style="margin-top:12px;color:#a33"><strong>Attachment omitted</strong></div>`);
        }
      }
    }

    // We will not send inline attachments to SendGrid; use links instead.
    const attachments = [];

    const msg = {
      to,
      from,
      subject: 'New form submission — ' + (fields.subject || 'Contact form'),
      text: plainTextLines.join('\n'),
      html: htmlLines.join(''),
      attachments,
      ...(fields.email ? { replyTo: String(fields.email) } : {}),
    };

    // Debug attachment payload (do not log attachment.content for large files in production)
    if (attachments && attachments.length) {
      const attDebug = { filename: attachments[0].filename, type: attachments[0].type, size: fileBuffer ? fileBuffer.length : undefined };
      console.log('Prepared attachment for SendGrid:', attDebug);
    }

    // Sanitize attachments to ensure SendGrid helper doesn't throw for malformed attachment objects
    if (msg.attachments && Array.isArray(msg.attachments)) {
      const sanitized = [];
      for (let i = 0; i < msg.attachments.length; i++) {
        const a = msg.attachments[i] || {};
        // Require content (base64 string) and ensure filename exists
        if (!a.content) {
          console.warn('Dropping attachment without content at index', i);
          continue;
        }
        let fname = a.filename;
        if (!fname || typeof fname !== 'string' || !fname.trim()) {
          // generate a fallback filename
          const mime = a.type || fileMime || 'application/octet-stream';
          const ext = extFromMime(mime);
          fname = `attachment-${Date.now()}-${i}${ext}`;
        }
        sanitized.push({
          content: String(a.content),
          filename: String(fname),
          type: a.type || (fileMime || 'application/octet-stream'),
          disposition: a.disposition || 'attachment',
        });
      }
      msg.attachments = sanitized;
    }

    // Log attachments metadata (do not log content)
    if (msg.attachments && msg.attachments.length) {
      console.log('Final attachments to send:', msg.attachments.map((a) => ({ filename: a.filename, type: a.type })));
    }

    // Send email via SendGrid with enhanced logging
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('SENDGRID_API_KEY is not set; skipping send.');
      return { statusCode: 200, body: 'Parsed form (send skipped because SENDGRID_API_KEY is not set).' };
    }

    try {
      // EMERGENCY: temporarily strip attachments entirely to avoid SendGrid helper exceptions
      if (msg.attachments && msg.attachments.length) {
        console.warn('Emergency mode: stripping attachments before send to avoid known SendGrid bug.');
      }
      msg.attachments = [];

      console.log('Attempting to send message via SendGrid to', to, 'from', from);
      const response = await sgMail.send(msg);
      // sgMail.send may return an array of responses for multiple recipients
      console.log('SendGrid response:', Array.isArray(response) ? response.map(r => ({statusCode: r.statusCode, headers: r.headers})) : response);
      return { statusCode: 200, body: 'Email sent successfully!' };
    } catch (sendErr) {
      // Log detailed error info from SendGrid if present
      console.error('SendGrid send error:', sendErr && sendErr.message ? sendErr.message : sendErr);
      if (sendErr && sendErr.response && sendErr.response.body) {
        try {
          console.error('SendGrid response body:', JSON.stringify(sendErr.response.body));
        } catch (e) {
          console.error('Error stringifying SendGrid response body', e);
        }
      }

      // Emergency fallback: If the error is caused by malformed attachments (missing filename),
      // retry sending the message without attachments so the form can still submit.
      const errMsg = (sendErr && sendErr.message) ? String(sendErr.message) : '';
      const indication = errMsg.includes('Expected each attachment to contain a `filename`') || (sendErr && sendErr.response && sendErr.response.body && JSON.stringify(sendErr.response.body).includes('filename'));
      if (indication) {
        try {
          console.warn('Attachment filename error detected — retrying send without attachments.');
          // Add a note to the email body explaining the attachment was omitted
          const omitNote = '\n\n[NOTE] Attachment omitted due to upload/formatting issue. Please ask the applicant to re-send the file if needed.';
          msg.text = (msg.text || '') + omitNote;
          msg.html = (msg.html || '') + `<div style="margin-top:12px;color:#a33"><strong>Note:</strong> Attachment omitted due to upload/formatting issue. Please ask applicant to re-send if needed.</div>`;
          // remove attachments and retry
          msg.attachments = [];
          const retryResp = await sgMail.send(msg);
          console.log('SendGrid retry response (no attachments):', Array.isArray(retryResp) ? retryResp.map(r => ({statusCode: r.statusCode, headers: r.headers})) : retryResp);
          return { statusCode: 200, body: 'Email sent successfully (attachment omitted).' };
        } catch (retryErr) {
          console.error('Retry without attachments failed:', retryErr && retryErr.message ? retryErr.message : retryErr);
          if (retryErr && retryErr.response && retryErr.response.body) {
            try { console.error('Retry SendGrid response body:', JSON.stringify(retryErr.response.body)); } catch (e) { /* ignore */ }
          }
          return { statusCode: 502, body: 'Error sending email (retry failed): ' + (retryErr && retryErr.message ? retryErr.message : String(retryErr)) };
        }
      }

      return { statusCode: 502, body: 'Error sending email: ' + (sendErr && sendErr.message ? sendErr.message : String(sendErr)) };
    }
  } catch (err) {
    console.error('sendEmail handler error:', err);
    return { statusCode: 500, body: 'Error sending email: ' + (err && err.message ? err.message : String(err)) };
  }
};
