import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

interface TeamMemberData {
  name: string
  credentials: string
  role: string
  image: string
  bio: PortableTextBlock[]
  specialties: string[]
  areasOfFocus: string[]
  socialLinks?: {
    label: string
    url: string
    type: 'instagram' | 'website' | 'other'
  }[]
  acceptsBookings?: boolean
}

interface TeamMemberPageProps {
  member: TeamMemberData
}

export default function TeamMemberPage({ member }: TeamMemberPageProps) {
  return (
    <>
      {/* Page hero with member image background */}
      <section
        className="relative flex min-h-[340px] items-center overflow-hidden rounded-2xl text-cream ring-1 ring-cream/15 md:min-h-[420px]"
        style={{ background: `url('${member.image}') top/cover no-repeat` }}
      >
        {/* Even darker overlay for maximum readability */}
        <div className="absolute inset-0 bg-black/90" aria-hidden="true"></div>

        <div className="relative z-10 grid items-center gap-8 px-6 py-10 md:grid-cols-12 md:px-10 md:py-14">
          {/* LEFT: Text */}
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 text-[11px] uppercase tracking-[.22em] ring-1 ring-cream/30">
              Clinician Bio
            </span>
            <h1 className="mt-3 font-heading text-3xl font-bold md:text-4xl">{member.name}</h1>
            <p className="mt-2 text-cream/85">{member.role}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {member.acceptsBookings !== false && (
                <a
                  href="https://thesoulcarecounsellor.janeapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-clay px-4 py-2 font-semibold text-charcoal ring-1 ring-charcoal/10 hover:bg-clay/90"
                >
                  Book a Free Consultation
                </a>
              )}
              {member.socialLinks?.map((link) => (
                <a
                  key={`${link.type}-${link.url}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-cream/10 px-3 py-2 font-semibold text-cream ring-1 ring-cream/20 hover:bg-cream/20"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Portrait */}
          <div className="md:col-span-5">
            <figure className="rounded-2xl bg-sand p-2 shadow ring-1 ring-charcoal/10">
              <Image
                src={member.image}
                width={365}
                height={365}
                alt={`Portrait of ${member.name}`}
                className="block aspect-square h-auto w-full rounded-xl object-cover"
                priority
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Bio content */}
      <section className="mt-14 grid gap-10 md:mt-16 md:grid-cols-12 md:items-start">
        {/* LEFT: Main narrative */}
        <article className="space-y-5 text-charcoal/90 md:col-span-7">
          <h2 className="font-heading text-xl font-semibold md:text-2xl">
            About {member.name.split(' ')[0]}
          </h2>
          <PortableText value={member.bio} />
        </article>

        {/* RIGHT: Quick facts / booking */}
        <aside className="space-y-6 md:col-span-5">
          <div className="space-y-6 rounded-2xl bg-white p-5 ring-1 ring-charcoal/10">
            <div>
              <h3 className="font-heading font-semibold">Areas of Focus</h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-charcoal/85">
                {member.areasOfFocus.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold">Specialties</h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-charcoal/85">
                {member.specialties.map((specialty) => (
                  <li key={specialty}>{specialty}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>
    </>
  )
}
