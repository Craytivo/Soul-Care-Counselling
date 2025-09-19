import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use — Soul Care Counselling',
  description: 'Terms of Use for Soul Care Counselling - Understand the terms and conditions for using our faith-centered counselling services and website.',
}

export default function Terms() {
  return (
    <div className="mx-auto max-w-4xl">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15 mb-12">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">Terms of Use</h1>
          <p className="mt-3 max-w-3xl text-cream/85">
            Please read these terms carefully before using our services. By accessing our website or using our counselling services, you agree to be bound by these terms.
          </p>
          <p className="mt-2 text-cream/70 text-sm">
            Last updated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Agreement to Terms</h2>
          <p className="text-charcoal/85 mb-4">
            These Terms of Use ("Terms") govern your use of the Soul Care Counselling website and services. By accessing or using our website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
          </p>
          <p className="text-charcoal/85 mb-4">
            We reserve the right to modify these Terms at any time. Your continued use of our services after any such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Description of Services</h2>
          <p className="text-charcoal/85 mb-4">
            Soul Care Counselling provides faith-centered counselling and therapy services, including but not limited to:
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 mb-4 space-y-2">
            <li>Individual counselling and therapy sessions</li>
            <li>Group therapy and workshops</li>
            <li>Online counselling services</li>
            <li>Mental health resources and educational materials</li>
            <li>Wellness workshops and seminars</li>
            <li>Referral services to other healthcare providers</li>
          </ul>
          <p className="text-charcoal/85 mb-4">
            Our services are provided by licensed and registered mental health professionals who integrate Christian faith principles with evidence-based therapeutic approaches.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Eligibility and Requirements</h2>
          <p className="text-charcoal/85 mb-4">
            To use our counselling services, you must:
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 mb-4 space-y-2">
            <li>Be at least 18 years of age (or have parental consent if under 18)</li>
            <li>Provide accurate and complete information about yourself</li>
            <li>Have the legal capacity to enter into a counselling relationship</li>
            <li>Reside in a jurisdiction where we are licensed to provide services</li>
            <li>Agree to participate in services in good faith</li>
            <li>Respect the therapeutic process and professional boundaries</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Appointment and Cancellation Policy</h2>
          <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">Scheduling</h3>
          <p className="text-charcoal/85 mb-4">
            Appointments can be scheduled through our online booking system or by contacting us directly. We will make every effort to accommodate your preferred times, subject to availability.
          </p>
          
          <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">Cancellation Policy</h3>
          <p className="text-charcoal/85 mb-4">
            We require at least 24 hours&apos; notice for appointment cancellations. Cancellations made with less than 24 hours&apos; notice may be subject to a cancellation fee equal to the full session cost. No-shows will be charged the full session fee.
          </p>
          
          <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">Rescheduling</h3>
          <p className="text-charcoal/85 mb-4">
            You may reschedule appointments with at least 24 hours&apos; notice at no additional charge, subject to availability.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Payment Terms</h2>
          <p className="text-charcoal/85 mb-4">
            Payment for counselling services is due at the time of service unless other arrangements have been made in advance. We accept various payment methods including:
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 mb-4 space-y-2">
            <li>Credit cards (Visa, MasterCard, American Express)</li>
            <li>Debit cards</li>
            <li>Electronic bank transfers</li>
            <li>Insurance direct billing (where applicable)</li>
            <li>Health spending accounts (HSA/FSA)</li>
          </ul>
          <p className="text-charcoal/85 mb-4">
            <strong>Late Payment Policy:</strong> Accounts with outstanding balances may be subject to late fees. Services may be suspended for accounts with balances over 30 days past due.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Confidentiality and Privacy</h2>
          <p className="text-charcoal/85 mb-4">
            We are committed to maintaining the confidentiality of your personal information and counselling sessions. However, there are certain circumstances where we may be required to disclose information:
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 mb-4 space-y-2">
            <li>When you provide written consent to release information</li>
            <li>When there is imminent risk of harm to yourself or others</li>
            <li>When required by law or court order</li>
            <li>When reporting suspected child or elder abuse</li>
            <li>When required for insurance or legal proceedings</li>
          </ul>
          <p className="text-charcoal/85 mb-4">
            For more detailed information about our privacy practices, please review our Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Limitations of Service</h2>
          <p className="text-charcoal/85 mb-4">
            While we strive to provide effective counselling services, we cannot guarantee specific outcomes. Counselling is a collaborative process that requires your active participation and commitment to change.
          </p>
          <p className="text-charcoal/85 mb-4">
            <strong>Emergency Situations:</strong> Our services are not intended for crisis intervention or emergency situations. If you are experiencing a mental health emergency, please contact:
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 mb-4 space-y-2">
            <li>Emergency services: 911</li>
            <li>Crisis helpline: 1-800-XXX-XXXX</li>
            <li>Your local emergency room</li>
            <li>National Suicide Prevention Lifeline: 1-800-273-8255</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Professional Standards</h2>
          <p className="text-charcoal/85 mb-4">
            All our counsellors are licensed and registered mental health professionals who adhere to:
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 mb-4 space-y-2">
            <li>Provincial regulatory body standards and codes of ethics</li>
            <li>Professional association guidelines</li>
            <li>Continuing education requirements</li>
            <li>Regular supervision and consultation</li>
            <li>Client safety and welfare protocols</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Website Use</h2>
          <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">Acceptable Use</h3>
          <p className="text-charcoal/85 mb-4">
            When using our website, you agree to:
          </p>
          <ul className="list-disc pl-6 text-charcoal/85 mb-4 space-y-2">
            <li>Use the website only for lawful purposes</li>
            <li>Not attempt to gain unauthorized access to our systems</li>
            <li>Not interfere with the proper functioning of the website</li>
            <li>Not use the website to transmit harmful or malicious content</li>
            <li>Respect the intellectual property rights of others</li>
          </ul>
          
          <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">Content Accuracy</h3>
          <p className="text-charcoal/85 mb-4">
            While we strive to provide accurate and up-to-date information on our website, we cannot guarantee the completeness or accuracy of all content. Information on our website is for general informational purposes only and should not be considered as professional advice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Intellectual Property</h2>
          <p className="text-charcoal/85 mb-4">
            All content on our website, including text, graphics, logos, images, and software, is the property of Soul Care Counselling or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Limitation of Liability</h2>
          <p className="text-charcoal/85 mb-4">
            To the maximum extent permitted by law, Soul Care Counselling shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our services or website. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Termination</h2>
          <p className="text-charcoal/85 mb-4">
            We reserve the right to terminate or suspend your access to our services at any time, with or without notice, for any reason, including violation of these Terms. Upon termination, your right to use our services will cease immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Governing Law</h2>
          <p className="text-charcoal/85 mb-4">
            These Terms shall be governed by and construed in accordance with the laws of [Your Province/Territory], Canada, without regard to conflict of law principles. Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of [Your Province/Territory].
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Severability</h2>
          <p className="text-charcoal/85 mb-4">
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">Contact Information</h2>
          <p className="text-charcoal/85 mb-4">
            If you have any questions about these Terms of Use, please contact us:
          </p>
          <div className="bg-sand p-6 rounded-lg">
            <p className="text-charcoal/85 mb-2"><strong>Soul Care Counselling</strong></p>
            <p className="text-charcoal/85 mb-2">Email: <a href="mailto:info@thesoulcarecounsellor.com" className="text-clay hover:underline">info@thesoulcarecounsellor.com</a></p>
            <p className="text-charcoal/85 mb-2">Phone: <a href="tel:+1-647-394-0525" className="text-clay hover:underline">647-394-0525</a></p>
            <p className="text-charcoal/85">Address: [Your Business Address]</p>
          </div>
        </section>
      </div>
    </div>
  )
}
