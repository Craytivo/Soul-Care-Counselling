const path = require('path');
const sendEmailModule = require(path.resolve(__dirname, '../netlify/functions/sendEmail.js'));

async function run() {
  const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
  let body = '';
  function addField(name, value) {
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="${name}"` + '\r\n\r\n';
    body += `${value}\r\n`;
  }

  addField('name', 'Local Multipart Test');
  addField('email', 'multipart-test@example.com');
  addField('phone', '1234567890');
  addField('subject', 'Multipart test');
  addField('message', 'This is a multipart test.');
  addField('consent', 'on');

  // Add a small file part
  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="file"; filename="test.txt"` + '\r\n';
  body += `Content-Type: text/plain\r\n\r\n`;
  body += `Hello from multipart test!\r\n`;

  // End boundary
  body += `--${boundary}--\r\n`;

  const event = {
    httpMethod: 'POST',
    headers: { 'content-type': 'multipart/form-data; boundary=' + boundary },
    body: body,
    isBase64Encoded: false
  };

  try {
    const res = await sendEmailModule.handler(event, {});
    console.log('Handler response:', res);
  } catch (err) {
    console.error('Handler threw error:', err);
    process.exit(1);
  }
}

run();
