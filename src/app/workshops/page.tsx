import type { Metadata } from 'next'
import YouTubeVideo from '@/components/YouTubeVideo'

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
    registrationLink: 'https://jessicarobinsongrant.podia.com/dfbe0ba7-b32a-4c29-a2d0-fff186bfd7e6',
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
    youtubeLink: 'https://www.youtube.com/watch?v=xmG6x2EYpy4&t=2s' // Add actual YouTube link
  },
  {
    id: 'healthy-attachment-healthy-bodies',
    title: 'Healthy Attachment, Healthy Bodies',
    description: 'Learn from Soul Care therapist Josh Dale as he delves into the connection between secure attachments and holistic wellness. This workshop aims to help you understand key components to enhance both your wellbeing and relationships!',
    host: 'Josh Dale',
    hostRole: 'Therapist',
    type: 'recording',
    registrationLink: null,
    youtubeLink: 'https://www.youtube.com/watch?v=fhFE6v-B4fk' // Add actual YouTube link
  },
  {
    id: 'art-therapy-path-to-healing',
    title: 'Art Therapy: A Path to Healing',
    description: 'Discover inner peace and creativity through mindfulness and self-exploration in this free art therapy workshop hosted by our associate therapist Anita Kangabe. No fancy supplies needed—just your imagination and whatever materials you have at home!',
    host: 'Anita Kangabe',
    hostRole: 'Associate Therapist',
    type: 'recording',
    registrationLink: null,
    youtubeLink: 'youtube.com/watch?v=p1j6lp8uz9c&embeds_referring_euri=https%3A%2F%2Fthesoulcarecounsellor.com%2F&source_ve_path=Mjg2NjY' // Add actual YouTube link
  },
  {
    id: 'navigating-life-transitions',
    title: 'Navigating Life Transitions: Normalizing the Experience',
    description: 'With our associate therapist Nigel Bucknor as host, we\'ll explore tools to thrive, embrace change and opportunities for personal growth. Learn strategies to navigate life\'s twists and turns with grace and understanding.',
    host: 'Nigel Bucknor',
    hostRole: 'Associate Therapist',
    type: 'recording',
    registrationLink: null,
    youtubeLink: 'https://www.youtube.com/watch?v=rV-vJvyyFDY' // Add actual YouTube link
  },
  {
    id: 'cultivating-black-joy',
    title: 'Cultivating Black Joy: Understanding Life After Trauma',
    description: 'Led by our clinical director Jessica Robinson-Grant and associate therapist Nigel Bucknor, this empowering workshop is the first of a series to come and will explore pathways to joy and healing.',
    host: 'Jessica Robinson-Grant & Nigel Bucknor',
    hostRole: 'Clinical Director & Associate Therapist',
    type: 'recording',
    registrationLink: null,
    youtubeLink: 'https://www.youtube.com/watch?v=W3rU7hq37oM' // Add actual YouTube link
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
                      href={workshop.registrationLink || '#'}
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
          {recordedWorkshops.map((workshop) => (
            <article key={workshop.id} className="rounded-2xl bg-white ring-1 ring-charcoal/10 overflow-hidden hover:ring-clay/30 transition-all duration-200">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Video Preview */}
                <div className="p-6">
                  {workshop.youtubeLink && (
                    <YouTubeVideo 
                      videoId={workshop.youtubeLink}
                      title={workshop.title}
                      className="w-full"
                    />
                  )}
                </div>
                
                {/* Workshop Details */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-sand text-charcoal text-xs font-medium rounded-full">
                        Recording
                      </span>
                      <span className="text-charcoal/60 text-sm">Free Access</span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold mb-3">{workshop.title}</h3>
                    <p className="text-charcoal/85 mb-4 text-sm leading-relaxed">{workshop.description}</p>
                  </div>
                  
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
                </div>
              </div>
            </article>
          ))}
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