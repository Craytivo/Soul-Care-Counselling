const sgMail = require('@sendgrid/mail');
const BusboyModule = require('busboy');
// busboy may export the constructor as default in some bundlers/environments
const Busboy = BusboyModule && BusboyModule.default ? BusboyModule.default : BusboyModule;

// Configure SendGrid API key from environment
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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
    htmlLines.push('<!doctype html><html><head><meta charset="utf-8"/><style>body{font-family:Arial,Helvetica,sans-serif;color:#111} .wrapper{max-width:680px;margin:0 auto;padding:20px} .header{background:#f7f7f7;padding:12px;border-radius:6px} .field{padding:8px 0;border-bottom:1px solid #eee} .label{font-weight:600;color:#333} .value{color:#111;margin-top:4px} .footer{margin-top:16px;color:#666;font-size:13px}</style></head><body><div class="wrapper">');
    htmlLines.push('<div class="header"><h2 style="margin:0;font-size:18px">New form submission</h2></div>');
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

    const msg = {
      to,
      from,
      subject: 'New form submission — ' + (fields.subject || 'Contact form'),
      text: plainTextLines.join('\n'),
      html: htmlLines.join(''),
      attachments: (fileBuffer && fileName) ? [{
        content: fileBuffer.toString('base64'),
        filename: fileName,
        type: fileMime,
        disposition: 'attachment',
      }] : [],
      ...(fields.email ? { replyTo: String(fields.email) } : {}),
    };

    // Send email via SendGrid with enhanced logging
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('SENDGRID_API_KEY is not set; skipping send.');
      return { statusCode: 200, body: 'Parsed form (send skipped because SENDGRID_API_KEY is not set).' };
    }

    try {
      console.log('Attempting to send message via SendGrid to', to, 'from', from);
      const response = await sgMail.send(msg);
      // sgMail.send may return an array of responses for multiple recipients
      console.log('SendGrid response:', Array.isArray(response) ? response.map(r => ({statusCode: r.statusCode, headers: r.headers})) : response);
      return { statusCode: 200, body: 'Email sent successfully!' };
    } catch (sendErr) {
      // Log detailed error info from SendGrid if present
      console.error('SendGrid send error:', sendErr);
      if (sendErr && sendErr.response && sendErr.response.body) {
        try {
          console.error('SendGrid response body:', JSON.stringify(sendErr.response.body));
        } catch (e) {
          console.error('Error stringifying SendGrid response body', e);
        }
      }
      return { statusCode: 502, body: 'Error sending email: ' + (sendErr && sendErr.message ? sendErr.message : String(sendErr)) };
    }
  } catch (err) {
    console.error('sendEmail handler error:', err);
    return { statusCode: 500, body: 'Error sending email: ' + (err && err.message ? err.message : String(err)) };
  }
};
