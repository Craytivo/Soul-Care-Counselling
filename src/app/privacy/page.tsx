import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Soul Care Counselling',
  description: 'Privacy Policy for Soul Care Counselling - Learn how we protect your personal information and maintain confidentiality in our faith-centered therapy services.',
}

export default function Privacy() {
  return (
    <div className="mx-auto max-w-4xl">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15 mb-12">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-3 max-w-3xl text-cream/85">
            Your privacy and confidentiality are fundamental to our practice. Learn how we protect your personal information.
          </p>
          <p className="mt-2 text-cream/70 text-sm">
            Last updated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Introduction</h2>
          <p className="text-charcoal/85 mb-4">
            Soul Care Counselling (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy and maintaining the confidentiality of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our counselling services.
          </p>
          <p className="text-charcoal/85 mb-4">
            As a faith-centered counselling practice, we understand the sensitive nature of mental health information and are bound by professional ethical standards and applicable privacy laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA) and provincial health information protection laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Information We Collect</h2>
          
          <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">Personal Information</h3>
          <p className="text-charcoal/85 mb-4">
            We may collect the following types of personal information:
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 mb-4 space-y-2">
            <li>Contact information (name, email address, phone number, mailing address)</li>
            <li>Demographic information (age, gender, preferred pronouns)</li>
            <li>Health information relevant to counselling services</li>
            <li>Emergency contact information</li>
            <li>Insurance information (if applicable)</li>
            <li>Payment and billing information</li>
            <li>Communication preferences</li>
          </ul>

          <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">Website Information</h3>
          <p className="text-charcoal/85 mb-4">
            When you visit our website, we may automatically collect:
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 mb-4 space-y-2">
            <li>IP address and location data</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referring website information</li>
            <li>Device information and operating system</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">How We Use Your Information</h2>
          <p className="text-charcoal/85 mb-4">
            We use your personal information for the following purposes:
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 mb-4 space-y-2">
            <li>Providing counselling and therapy services</li>
            <li>Scheduling appointments and managing your care</li>
            <li>Processing payments and insurance claims</li>
            <li>Communicating with you about your treatment</li>
            <li>Maintaining clinical records as required by law</li>
            <li>Improving our services and website functionality</li>
            <li>Complying with legal and regulatory requirements</li>
            <li>Sending newsletters or updates (with your consent)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Information Sharing and Disclosure</h2>
          <p className="text-charcoal/85 mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 mb-4 space-y-2">
            <li><strong>With your consent:</strong> When you explicitly authorize us to share information</li>
            <li><strong>Legal requirements:</strong> When required by law or court order</li>
            <li><strong>Safety concerns:</strong> When necessary to protect you or others from harm</li>
            <li><strong>Service providers:</strong> With trusted third parties who assist in our operations (under strict confidentiality agreements)</li>
            <li><strong>Insurance purposes:</strong> When submitting claims on your behalf</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Data Security</h2>
          <p className="text-charcoal/85 mb-4">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 mb-4 space-y-2">
            <li>Encrypted data transmission and storage</li>
            <li>Secure, password-protected systems</li>
            <li>Regular security assessments and updates</li>
            <li>Limited access to personal information on a need-to-know basis</li>
            <li>Staff training on privacy and confidentiality</li>
            <li>Secure disposal of physical and electronic records</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Your Rights</h2>
          <p className="text-charcoal/85 mb-4">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 mb-4 space-y-2">
            <li><strong>Access:</strong> Request access to your personal information</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Withdrawal of consent:</strong> Withdraw consent for certain uses of your information</li>
            <li><strong>Portability:</strong> Request a copy of your information in a portable format</li>
            <li><strong>Complaints:</strong> File a complaint with the appropriate privacy commissioner</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Cookies and Tracking</h2>
          <p className="text-charcoal/85 mb-4">
            Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences. We use cookies for:
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 mb-4 space-y-2">
            <li>Remembering your preferences</li>
            <li>Analyzing website traffic and usage</li>
            <li>Improving website functionality</li>
            <li>Providing personalized content</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Retention of Information</h2>
          <p className="text-charcoal/85 mb-4">
            We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Clinical records are typically retained for a minimum of 7 years after the last service date, as required by professional standards and applicable laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Children&apos;s Privacy</h2>
          <p className="text-charcoal/85 mb-4">
            Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Changes to This Privacy Policy</h2>
          <p className="text-charcoal/85 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Contact Us</h2>
          <p className="text-charcoal/85 mb-4">
            If you have any questions about this Privacy Policy or our privacy practices, please contact us:
          </p>
          <div className="bg-sand p-6 rounded-lg">
            <p className="text-charcoal/85 mb-2"><strong>Soul Care Counselling</strong></p>
            <p className="text-charcoal/85 mb-2">Privacy Officer</p>
            <p className="text-charcoal/85 mb-2">Email: <a href="mailto:iamshespeakstruth@gmail.com" className="text-clay hover:underline">iamshespeakstruth@gmail.com</a></p>
            <p className="text-charcoal/85 mb-2">Phone: <a href="tel:+1-647-544-7736" className="text-clay hover:underline">647-544-7736</a></p>
            <p className="text-charcoal/85">Address: [Your Business Address]</p>
          </div>
        </section>
      </div>
    </div>
  )
}
