import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Wellness Workshops — Soul Care Counselling',
  description: 'Missed our free monthly workshops, or want to register for an upcoming one? Find recordings of previous virtual workshops and registration information for future ones.',
}

// Workshop data based on the original website
const workshops = [
  {
    id: 'feeling-my-way-through-winter',
    title: 'Feeling My Way Through Winter: A Practical Conversation on Navigating Seasonal Depression',
    description: 'Hosted by Soul Care associate therapist Josh Dale, together we\'ll explore ways to cope, build resilience, and find warmth even in the coldest months',
    host: 'Josh Dale',
    hostRole: 'Associate Therapist',
    type: 'upcoming',
    registrationLink: '#', // Add actual registration link when available
    youtubeLink: null
  },
  {
    id: 'managing-burnout-holistically',
    title: 'Managing Burnout Holistically',
    description: 'Hosted by Soul Care associate therapists Josh Dale and Nigel Bucknor, we\'ll explore and unpack the intersectionalities of burnout and it\'s affect on our immune system. This workshop is designed to nourish your mind, body and spirit.',
    host: 'Josh Dale & Nigel Bucknor',
    hostRole: 'Associate Therapists',
    type: 'recording',
    registrationLink: null,
    youtubeLink: 'https://youtube.com/watch?v=example1' // Add actual YouTube link
  },
  {
    id: 'healthy-attachment-healthy-bodies',
    title: 'Healthy Attachment, Healthy Bodies',
    description: 'Learn from Soul Care therapist Josh Dale as he delves into the connection between secure attachments and holistic wellness. This workshop aims to help you understand key components to enhance both your wellbeing and relationships!',
    host: 'Josh Dale',
    hostRole: 'Therapist',
    type: 'recording',
    registrationLink: null,
    youtubeLink: 'https://youtube.com/watch?v=example2' // Add actual YouTube link
  },
  {
    id: 'art-therapy-path-to-healing',
    title: 'Art Therapy: A Path to Healing',
    description: 'Discover inner peace and creativity through mindfulness and self-exploration in this free art therapy workshop hosted by our associate therapist Anita Kangabe. No fancy supplies needed—just your imagination and whatever materials you have at home!',
    host: 'Anita Kangabe',
    hostRole: 'Associate Therapist',
    type: 'recording',
    registrationLink: null,
    youtubeLink: 'https://youtube.com/watch?v=example3' // Add actual YouTube link
  },
  {
    id: 'navigating-life-transitions',
    title: 'Navigating Life Transitions: Normalizing the Experience',
    description: 'With our associate therapist Nigel Bucknor as host, we\'ll explore tools to thrive, embrace change and opportunities for personal growth. Learn strategies to navigate life\'s twists and turns with grace and understanding.',
    host: 'Nigel Bucknor',
    hostRole: 'Associate Therapist',
    type: 'recording',
    registrationLink: null,
    youtubeLink: 'https://youtube.com/watch?v=example4' // Add actual YouTube link
  },
  {
    id: 'cultivating-black-joy',
    title: 'Cultivating Black Joy: Understanding Life After Trauma',
    description: 'Led by our clinical director Jessica Robinson-Grant and associate therapist Nigel Bucknor, this empowering workshop is the first of a series to come and will explore pathways to joy and healing.',
    host: 'Jessica Robinson-Grant & Nigel Bucknor',
    hostRole: 'Clinical Director & Associate Therapist',
    type: 'recording',
    registrationLink: null,
    youtubeLink: 'https://youtube.com/watch?v=example5' // Add actual YouTube link
  }
]

export default function WorkshopsPage() {
  const upcomingWorkshops = workshops.filter(workshop => workshop.type === 'upcoming')
  const recordedWorkshops = workshops.filter(workshop => workshop.type === 'recording')

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
            Wellness Workshops
          </span>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">Free Monthly Workshops</h1>
          <p className="mt-3 max-w-3xl text-cream/85">
            Missed our free monthly workshops, or want to register for an upcoming one? You&apos;ve come to the right place.
          </p>
          <p className="mt-4 max-w-3xl text-cream/85">
            Below, you&apos;ll find recordings of all previous virtual workshops and registration information for future ones, each packed with valuable insights and practical tips from our dedicated therapists.
          </p>
        </div>
      </section>

      {/* Upcoming Workshops */}
      {upcomingWorkshops.length > 0 && (
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-semibold mb-6">Upcoming Workshops</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {upcomingWorkshops.map((workshop) => (
              <article key={workshop.id} className="rounded-2xl bg-white ring-1 ring-charcoal/10 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-clay text-charcoal text-xs font-medium rounded-full">
                      Upcoming
                    </span>
                    <span className="text-charcoal/60 text-sm">Free Workshop</span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{workshop.title}</h3>
                  <p className="text-charcoal/85 mb-4 leading-relaxed">{workshop.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center">
                        <span className="text-charcoal font-semibold text-xs">
                          {workshop.host.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{workshop.host}</p>
                        <p className="text-charcoal/60 text-xs">{workshop.hostRole}</p>
                      </div>
                    </div>
                    <a 
                      href={workshop.registrationLink}
                      className="inline-flex items-center justify-center rounded-md bg-clay px-4 py-2 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
                    >
                      Sign Up Free
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Workshop Recordings */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl font-semibold mb-6">Workshop Recordings</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recordedWorkshops.map((workshop) => (
            <article key={workshop.id} className="rounded-2xl bg-white ring-1 ring-charcoal/10 overflow-hidden hover:ring-clay/30 transition-all duration-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-sand text-charcoal text-xs font-medium rounded-full">
                    Recording
                  </span>
                  <span className="text-charcoal/60 text-sm">Free Access</span>
                </div>
                <h3 className="font-heading text-lg font-semibold mb-3">{workshop.title}</h3>
                <p className="text-charcoal/85 mb-4 text-sm leading-relaxed line-clamp-4">{workshop.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-sand flex items-center justify-center">
                      <span className="text-charcoal font-semibold text-xs">
                        {workshop.host.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-xs">{workshop.host}</p>
                      <p className="text-charcoal/60 text-xs">{workshop.hostRole}</p>
                    </div>
                  </div>
                  <a 
                    href={workshop.youtubeLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md bg-bark px-3 py-2 font-semibold text-cream hover:bg-bark/90 ring-1 ring-cream/20"
                  >
                    Watch Now
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="mt-16 rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-heading text-xl md:text-2xl font-semibold mb-3">Stay Updated</h3>
          <p className="text-charcoal/80 mb-6">
            Get notified about upcoming workshops and new recordings. Join our community for monthly insights and practical tools for your wellness journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-charcoal/20 focus:outline-none focus:ring-2 focus:ring-clay focus:border-transparent"
            />
            <button className="px-6 py-2 bg-clay text-charcoal font-semibold rounded-md hover:bg-clay/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 rounded-2xl bg-bark text-cream p-6 md:p-8 ring-1 ring-cream/15">
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h3 className="font-heading text-xl md:text-2xl font-semibold">Ready to begin your healing journey?</h3>
            <p className="mt-2 text-cream/85">Book a free consultation to explore how our faith-centered approach can support your growth.</p>
          </div>
          <div className="md:justify-self-end">
            <a 
              href="https://thesoulcarecounsellor.janeapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  )
}