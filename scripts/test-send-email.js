#!/usr/bin/env node
/**
 * Local test script to POST a multipart/form-data request to the Netlify function
 * Usage:
 *   node scripts/test-send-email.js --url=http://localhost:8888/.netlify/functions/sendEmail --name="Test User" --email=test@example.com --file=./fixtures/test.pdf
 * If no file is provided the script will send only form fields.
 */

const fs = require('fs');
const path = require('path');

function parseArgs() {
  const args = {};
  for (let i = 2; i < process.argv.length; i++) {
    const a = process.argv[i];
    if (!a) continue;
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) args[m[1]] = m[2];
  }
  return args;
}

async function main() {
  const args = parseArgs();
  const url = args.url || 'http://localhost:8888/.netlify/functions/sendEmail';
  const name = args.name || 'Local Tester';
  const email = args.email || 'local@example.com';
  const phone = args.phone || '0000000000';
  const subject = args.subject || 'Local test';
  const message = args.message || 'This is a test message from local test script.';
  const file = args.file ? path.resolve(args.file) : null;

  console.log(`Posting to ${url}`);

  // Use global fetch + FormData (Node 18+)
  const { FormData } = global;
  if (typeof fetch !== 'function' || typeof FormData === 'undefined') {
    console.error('This script requires Node 18+ with global fetch and FormData support.');
    process.exit(1);
  }

  const fd = new FormData();
  fd.append('name', name);
  fd.append('email', email);
  fd.append('phone', phone);
  fd.append('subject', subject);
  fd.append('message', message);
  fd.append('consent', 'on');

  if (file) {
    if (!fs.existsSync(file)) {
      console.error('File not found:', file);
      process.exit(1);
    }
    const stream = fs.createReadStream(file);
    fd.append('file', stream, path.basename(file));
  }

  try {
    const res = await fetch(url, { method: 'POST', body: fd });
    const text = await res.text();
    console.log('Response status:', res.status);
    console.log('Response body:', text);
  } catch (err) {
    console.error('Error posting to function:', err);
    process.exit(1);
  }
}

main();
