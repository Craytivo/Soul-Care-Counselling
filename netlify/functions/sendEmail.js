import sgMail from '@sendgrid/mail';
import Busboy from 'busboy';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const contentType = event.headers['content-type'] || event.headers['Content-Type'];
  if (!contentType || !contentType.includes('multipart/form-data')) {
    return {
      statusCode: 400,
      body: 'Invalid content type. Must be multipart/form-data.',
    };
  }
  if (!event.body) {
    return {
      statusCode: 400,
      body: 'Request body is empty.',
    };
  }

  // Parse form data (using busboy)
  // Netlify may send body as base64-encoded string
  let body = event.body;
  if (event.isBase64Encoded) {
    body = Buffer.from(event.body, 'base64');
  }
  const busboy = Busboy({ headers: event.headers });
  let fields = {};
  let fileBuffer = null;
  let fileName = '';
  let fileMime = '';

  return new Promise((resolve) => {
    busboy.on('field', (fieldname, val) => {
      fields[fieldname] = val;
    });
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      fileName = filename;
      fileMime = mimetype;
      const buffers = [];
      file.on('data', (data) => {
        buffers.push(data);
      });
      file.on('end', () => {
        fileBuffer = Buffer.concat(buffers);
      });
    });
    busboy.on('finish', async () => {
      try {
        const msg = {
          to: process.env.CONTACT_EMAIL,
          from: process.env.CONTACT_EMAIL,
          subject: 'New Form Submission',
          text: JSON.stringify(fields, null, 2),
          attachments: (fileBuffer && fileName) ? [{
            content: fileBuffer.toString('base64'),
            filename: fileName,
            type: fileMime,
            disposition: 'attachment',
          }] : [],
        };
        await sgMail.send(msg);
        resolve({
          statusCode: 200,
          body: 'Email sent successfully!',
        });
      } catch (error) {
        resolve({
          statusCode: 500,
          body: 'Error sending email: ' + error.message,
        });
      }
    });
    busboy.on('error', (err) => {
      resolve({
        statusCode: 400,
        body: 'Error parsing form: ' + err.message,
      });
    });
    try {
      busboy.end(body);
    } catch (err) {
      resolve({
        statusCode: 400,
        body: 'Error ending form: ' + err.message,
      });
    }
    // Fallback: If busboy doesn't emit finish/error within 5 seconds, resolve with error
    setTimeout(() => {
      resolve({
        statusCode: 408,
        body: 'Form parsing timed out.',
      });
    }, 5000);
  });
};
