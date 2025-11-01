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

    // Normalize body to Buffer for Busboy
    let body = event.body;
    if (event.isBase64Encoded) {
      body = Buffer.from(event.body, 'base64');
    } else if (typeof event.body === 'string') {
      body = Buffer.from(event.body, 'utf8');
    }

  // Some bundlers export Busboy as a factory function (callable) rather than a constructor.
  // Call it without `new` to be compatible with both forms.
  const busboy = typeof Busboy === 'function' ? Busboy({ headers: event.headers }) : new Busboy({ headers: event.headers });
    const fields = {};
    let fileBuffer = null;
    let fileName = '';
    let fileMime = '';

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
            // ignore concat errors
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

    const msg = {
      to,
      from,
      subject: 'New Form Submission',
      text: JSON.stringify(fields, null, 2),
      attachments: (fileBuffer && fileName) ? [{
        content: fileBuffer.toString('base64'),
        filename: fileName,
        type: fileMime,
        disposition: 'attachment',
      }] : [],
      ...(fields.email ? { replyTo: String(fields.email) } : {}),
    };

    // Send email via SendGrid
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('SENDGRID_API_KEY is not set; skipping send.');
      return { statusCode: 200, body: 'Parsed form (send skipped in dev).' };
    }

    await sgMail.send(msg);

    return { statusCode: 200, body: 'Email sent successfully!' };
  } catch (err) {
    console.error('sendEmail handler error:', err);
    return { statusCode: 500, body: 'Error sending email: ' + (err && err.message ? err.message : String(err)) };
  }
};
