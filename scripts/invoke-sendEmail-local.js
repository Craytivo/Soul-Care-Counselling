const path = require('path');
const sendEmailModule = require(path.resolve(__dirname, '../netlify/functions/sendEmail.js'));

async function run() {
  const event = {
    httpMethod: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      name: 'Local Test',
      email: 'test@example.com',
      phone: '1234567890',
      subject: 'Local test',
      message: 'This is a fallback parse test.',
      consent: 'on'
    }).toString(),
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
