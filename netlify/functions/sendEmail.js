  // Parse form data (using busboy)
  // Netlify may send body as base64-encoded string. Ensure we pass a Buffer to busboy.
  let body = event.body;
  if (event.isBase64Encoded) {
    body = Buffer.from(event.body, 'base64');
  } else if (typeof event.body === 'string') {
    // Make sure busboy gets a Buffer
    body = Buffer.from(event.body, 'utf8');
  }

  // Use the Busboy constructor correctly and add a timeout that is cleared on finish/error
  const busboy = new Busboy({ headers: event.headers });
  let fields = {};
  let fileBuffer = null;
  let fileName = '';
  let fileMime = '';

  return new Promise((resolve) => {
    let timedOut = false
    const timeoutMs = 15000 // increase timeout to 15s for slower uploads
    const timeout = setTimeout(() => {
      timedOut = true
      console.error('Busboy timeout: Form parsing timed out.')
      resolve({
        statusCode: 408,
        body: 'Form parsing timed out.',
      })
    }, timeoutMs)

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
        try {
          fileBuffer = Buffer.concat(buffers);
        } catch (e) {
          console.error('Error concatenating file buffers', e);
        }
      });
    });
    busboy.on('finish', async () => {
      if (timedOut) return
      clearTimeout(timeout)
      try {
        // Log received fields and file info for debugging
        console.log('Fields:', fields);
        if (fileName) {
          console.log('File received:', fileName, fileMime, fileBuffer ? fileBuffer.length : 0);
        } else {
          console.log('No file uploaded.');
        }

        const to = process.env.CONTACT_EMAIL || 'j.mubayiwa@gmail.com'
        const from = process.env.SENDGRID_FROM || to

        const msg = {
          to,
          from,
          subject: 'New Form Submission',
          ...(fields.email ? { replyTo: String(fields.email) } : {}),
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
        console.error('Error sending email:', error);
        resolve({
          statusCode: 500,
          body: 'Error sending email: ' + (error && error.message ? error.message : String(error)),
        });
      }
    });
    busboy.on('error', (err) => {
      if (!timedOut) {
        clearTimeout(timeout)
        console.error('Busboy error:', err);
        resolve({
          statusCode: 400,
          body: 'Error parsing form: ' + err.message,
        });
      }
    });
    try {
      busboy.end(body);
    } catch (err) {
      if (!timedOut) {
        clearTimeout(timeout)
        console.error('Busboy end error:', err);
        resolve({
          statusCode: 400,
          body: 'Error ending form: ' + err.message,
        });
      }
    }
  });
    });
    busboy.on('error', (err) => {
      console.error('Busboy error:', err);
      resolve({
        statusCode: 400,
        body: 'Error parsing form: ' + err.message,
      });
    });
    try {
      busboy.end(body);
    } catch (err) {
      console.error('Busboy end error:', err);
      resolve({
        statusCode: 400,
        body: 'Error ending form: ' + err.message,
      });
    }
    // Fallback: If busboy doesn't emit finish/error within 5 seconds, resolve with error
    setTimeout(() => {
      console.error('Busboy timeout: Form parsing timed out.');
      resolve({
        statusCode: 408,
        body: 'Form parsing timed out.',
      });
    }, 5000);
  });
};
