
'use client';
import { useState } from 'react';

export default function InternApplicationPage() {
  const [formStatus, setFormStatus] = useState('');

  const handleInternSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('Sending…');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      const body = encodeURIComponent(
        `Prospective Intern Application\n\nName: ${data.name}\nEmail: ${data.email}\nSchool/Program: ${data.school}\nPhone: ${data.phone || '-'}\nMessage: ${data.message}`
      );
      window.location.href = `mailto:info@thesoulcarecounsellor.com?subject=${encodeURIComponent('[Internship Application] ' + (data.name || ''))}&body=${body}`;
      setFormStatus('Opening your email app…');
      setTimeout(() => { setFormStatus('Thanks! If your mail app did not open, please email us directly.') }, 1500);
    } catch (err) {
      console.error(err);
      setFormStatus('Something went wrong—please email us directly.');
    }
  };

  return (
    <>
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15 mb-10">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">Internship</span>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold mb-2">Welcome Future Interns:</h1>
          <p className="mt-3 max-w-3xl text-cream/85">We’re excited that you’re interested in joining the Soul Care team as an intern! Our program is designed to mentor and equip the next generation of therapists who are passionate about serving with excellence, faith, and compassion.</p>
          <p className="mb-3 max-w-3xl text-cream/85">Please take a few minutes to complete the application below. Your responses will help us get to know you, your passions, and how we can support your growth as you step into this meaningful work.</p>
        </div>
      </section>

      <section className="mt-14 md:mt-16 grid gap-10 md:grid-cols-12 md:items-start">
        {/* LEFT: Intern Application Form */}
        <div className="md:col-span-7">
          <form onSubmit={handleInternSubmit} className="mt-4 rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 space-y-6" encType="multipart/form-data">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="intern-name" className="block text-sm font-semibold">Full name</label>
                <input
                  id="intern-name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                  placeholder="First and last name"
                />
              </div>
              <div>
                <label htmlFor="intern-email" className="block text-sm font-semibold">Email</label>
                <input
                  id="intern-email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="intern-phone" className="block text-sm font-semibold">Phone (optional)</label>
                <input
                  id="intern-phone"
                  name="phone"
                  type="tel"
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                  placeholder="(555) 555-5555"
                />
              </div>
              <div>
                <label htmlFor="intern-resume" className="block text-sm font-semibold">Resume/CV (optional)</label>
                <input
                  id="intern-resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="intern-school" className="block text-sm font-semibold">What school and program are you currently enrolled in?</label>
                <input
                  id="intern-school"
                  name="school"
                  type="text"
                  required
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                  placeholder="e.g. York University, MSW"
                />
              </div>
              <div>
                <label htmlFor="intern-interest" className="block text-sm font-semibold">Why are you interested in joining the Soul Care intern program?</label>
                <textarea
                  id="intern-interest"
                  name="interest"
                  rows={3}
                  required
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                ></textarea>
              </div>
              <div>
                <label htmlFor="intern-areas" className="block text-sm font-semibold">What areas of therapy are you most passionate about exploring?</label>
                <textarea
                  id="intern-areas"
                  name="areas"
                  rows={2}
                  required
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                ></textarea>
              </div>
              <div>
                <label htmlFor="intern-values" className="block text-sm font-semibold">How does your faith or personal values inform your approach to therapy?</label>
                <textarea
                  id="intern-values"
                  name="values"
                  rows={2}
                  required
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                ></textarea>
              </div>
              <div>
                <label htmlFor="intern-populations" className="block text-sm font-semibold">What population(s) do you feel most called to serve (youth, couples, families, etc.)?</label>
                <textarea
                  id="intern-populations"
                  name="populations"
                  rows={2}
                  required
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                ></textarea>
              </div>
              <div>
                <label htmlFor="intern-availability" className="block text-sm font-semibold">What is your availability and time commitment for the internship?</label>
                <textarea
                  id="intern-availability"
                  name="availability"
                  rows={2}
                  required
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                ></textarea>
              </div>
              <div>
                <label htmlFor="intern-goals" className="block text-sm font-semibold">What do you hope to gain from this experience, and what do you feel you can contribute to the Soul Care team?</label>
                <textarea
                  id="intern-goals"
                  name="goals"
                  rows={2}
                  required
                  className="mt-1 w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 outline-none ring-0 focus:border-clay"
                ></textarea>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <input
                id="intern-consent"
                name="consent"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-charcoal/30"
              />
              <label htmlFor="intern-consent" className="text-sm text-charcoal/85">
                I consent to be contacted about my internship inquiry. I understand this form is not for emergencies.
              </label>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-bark px-5 py-2.5 font-semibold text-cream hover:bg-bark/90 ring-1 ring-charcoal/10"
              >
                Send application
              </button>
              <p className="text-sm text-charcoal/80" role="status" aria-live="polite">
                {formStatus}
              </p>
            </div>
          </form>
          <p className="mt-4 text-xs text-charcoal/70">Note: File uploads are sent as email attachments if your mail app supports it. For best results, email your resume/CV directly to info@thesoulcarecounsellor.com after submitting the form.</p>
        </div>

        {/* RIGHT: Intern Info Side Column */}
        <aside className="md:col-span-5 mt-10 md:mt-[3.25rem] space-y-6">
          <div className="rounded-2xl bg-sand p-5 ring-1 ring-charcoal/10">
            <h3 className="font-heading font-semibold">About Our Internship</h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li>Mentorship from experienced, faith-centered therapists</li>
              <li>Opportunities for hands-on learning and growth</li>
              <li>Supportive, collaborative team environment</li>
              <li>Virtual and in-person options (where available)</li>
              <li>Flexible scheduling to fit your academic commitments</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-charcoal/10">
            <h3 className="font-heading font-semibold">Questions?</h3>
            <p className="mt-3 text-sm text-charcoal/80">Email <a href="mailto:info@thesoulcarecounsellor.com" className="underline decoration-charcoal/30 hover:decoration-charcoal">info@thesoulcarecounsellor.com</a> for more information about our internship program, requirements, or application process.</p>
          </div>
        </aside>
      </section>
    </>
  );
}
