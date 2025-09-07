import type { Metadata } from 'next'
import { getTeamMember } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sneha Christian — Soul Care Counselling',
  description: 'Meet Sneha Christian, a dedicated therapist at Soul Care Counselling.',
}

export default async function SnehaPage() {
  const member = await getTeamMember('sneha-christian')
  
  if (!member) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-charcoal">Team Member Not Found</h1>
        <p className="mt-2 text-charcoal/70">The requested team member could not be found.</p>
      </div>
    )
  }

  // Convert Sanity data to TeamMemberPage format
  const memberData = {
    name: member.name,
    credentials: member.credentials || '',
    role: member.role,
    image: member.image ? urlFor(member.image).width(400).height(400).url() : '/assets/img/team/placeholder.webp',
    bio: member.bio ? [member.bio] : ['Professional bio coming soon.'],
    specialties: member.specialties || [],
    areasOfFocus: member.areasOfFocus || [],
    socialLinks: member.socialLinks || [],
    acceptsBookings: member.acceptsBookings
  }

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>

        <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center px-6 py-10 md:px-10 md:py-14">
          {/* LEFT: Text */}
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
              Clinician Bio
            </span>
            <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">
              {memberData.name}
            </h1>
            <p className="mt-2 text-cream/85">{memberData.role}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {memberData.credentials && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/10 px-3 py-1.5 text-sm ring-1 ring-cream/30">
                  {memberData.credentials}
                </span>
              )}
              {memberData.acceptsBookings && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-clay/20 px-3 py-1.5 text-sm ring-1 ring-clay/30">
                  Accepting New Clients
                </span>
              )}
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative">
              <Image
                src={memberData.image}
                alt={memberData.name}
                width={300}
                height={300}
                className="h-64 w-64 rounded-2xl object-cover ring-1 ring-cream/20"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bio content */}
      <section className="mt-14 md:mt-16 grid gap-10 md:grid-cols-12 md:items-start">
        {/* LEFT: Main narrative */}
        <article className="md:col-span-7 space-y-5 text-charcoal/90">
          <h2 className="font-heading text-xl md:text-2xl font-semibold">About {memberData.name.split(' ')[0]}</h2>
          
          {memberData.bio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          {memberData.specialties.length > 0 && (
            <>
              <h3 className="mt-8 font-heading text-lg md:text-xl font-semibold">Specialties</h3>
              <ul className="mt-3 list-disc pl-6 space-y-1">
                {memberData.specialties.map((specialty, index) => (
                  <li key={index}>{specialty}</li>
                ))}
              </ul>
            </>
          )}
        </article>

        {/* RIGHT: Quick facts / booking */}
        <aside className="md:col-span-5 space-y-6">
          {memberData.areasOfFocus.length > 0 && (
            <div className="rounded-2xl bg-white p-5 ring-1 ring-charcoal/10">
              <h3 className="font-heading font-semibold">Areas of Focus</h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-charcoal/85">
                {memberData.areasOfFocus.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>
          )}

          {memberData.acceptsBookings && (
            <div className="rounded-2xl bg-clay/5 p-5 ring-1 ring-clay/20">
              <h3 className="font-heading font-semibold text-clay">Ready to get started?</h3>
              <p className="mt-2 text-sm text-charcoal/80">
                Book a consultation to discuss your needs and see if we're a good fit.
              </p>
              <div className="mt-4 space-y-2">
                <Link
                  href="https://thesoulcarecounsellor.janeapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full rounded-md bg-clay px-4 py-2.5 text-sm font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
                >
                  Book a Consultation
                </Link>
              </div>
            </div>
          )}

          {memberData.socialLinks.length > 0 && (
            <div className="rounded-2xl bg-white p-5 ring-1 ring-charcoal/10">
              <h3 className="font-heading font-semibold">Connect</h3>
              <div className="mt-3 space-y-2">
                {memberData.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-clay hover:text-bark"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>
    </>
  )
}
