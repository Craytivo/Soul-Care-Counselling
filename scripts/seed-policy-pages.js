// Script to seed Privacy Policy and Terms of Use pages in Sanity
import 'dotenv/config';
import { createClient } from '@sanity/client';
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-05',
});

const privacyContent = [
  { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Privacy Policy' }] },
  { _type: 'block', children: [{ _type: 'span', text: 'Soul Care Counselling is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.' }] },
  { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Information We Collect' }] },
  { _type: 'block', children: [{ _type: 'span', text: 'We may collect your name, contact details, session notes, and usage data when you interact with our website or services.' }] },
  { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'How We Use Your Information' }] },
  { _type: 'block', children: [{ _type: 'span', text: 'Your information is used to provide counselling services, manage appointments, process payments, and improve our offerings. We do not sell or share your data except as required by law or with your consent.' }] },
  { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Data Security' }] },
  { _type: 'block', children: [{ _type: 'span', text: 'We implement technical and organizational measures to protect your data from unauthorized access, alteration, or disclosure.' }] },
  { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Your Rights' }] },
  { _type: 'block', children: [{ _type: 'span', text: 'You may request access to, correction of, or deletion of your personal information. Contact us for any privacy-related concerns.' }] },
  { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Changes to This Policy' }] },
  { _type: 'block', children: [{ _type: 'span', text: 'We may update this policy periodically. Please review it regularly for changes.' }] },
];

const termsContent = [
  { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Terms of Use' }] },
  { _type: 'block', children: [{ _type: 'span', text: 'By accessing Soul Care Counselling’s website or services, you agree to these Terms of Use.' }] },
  { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Use of Services' }] },
  { _type: 'block', children: [{ _type: 'span', text: 'You must be at least 18 years old or have parental consent. You agree to provide accurate information and use our services lawfully.' }] },
  { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Intellectual Property' }] },
  { _type: 'block', children: [{ _type: 'span', text: 'All content on this site is owned by Soul Care Counselling and may not be reproduced without permission.' }] },
  { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Limitation of Liability' }] },
  { _type: 'block', children: [{ _type: 'span', text: 'We strive to provide accurate information and quality services, but do not guarantee specific outcomes. Soul Care Counselling is not liable for any damages resulting from your use of our site or services.' }] },
  { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Termination' }] },
  { _type: 'block', children: [{ _type: 'span', text: 'We reserve the right to suspend or terminate access for violations of these terms.' }] },
  { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Governing Law' }] },
  { _type: 'block', children: [{ _type: 'span', text: 'These terms are governed by the laws of Ontario, Canada.' }] },
  { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Contact' }] },
  { _type: 'block', children: [{ _type: 'span', text: 'For questions about these terms, please contact us.' }] },
];

async function seedPolicyPages() {
  await client.createOrReplace({
    _id: 'privacyPolicyPage',
    _type: 'privacyPolicyPage',
    title: 'Privacy Policy',
    content: privacyContent,
  });
  await client.createOrReplace({
    _id: 'termsOfUsePage',
    _type: 'termsOfUsePage',
    title: 'Terms of Use',
    content: termsContent,
  });
  console.log('Seeded Privacy Policy and Terms of Use pages.');
}

seedPolicyPages().catch(console.error);
