const sgMail = require('@sendgrid/mail');

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

  // Parse form data (using busboy)
  const Busboy = require('busboy');
  const busboy = new Busboy({ headers: event.headers });
  let fields = {};
  let fileBuffer = null;
  let fileName = '';
  let fileMime = '';

  return new Promise((resolve, reject) => {
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
          attachments: fileBuffer ? [{
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
    busboy.end(event.body);
  });
};
