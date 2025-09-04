import Image from 'next/image'
import Link from 'next/link'

interface TeamMemberData {
  name: string
  credentials: string
  role: string
  image: string
  bio: string[]
  specialties: string[]
  areasOfFocus: string[]
  socialLinks?: {
    label: string
    url: string
    type: 'instagram' | 'website' | 'other'
  }[]
}

interface TeamMemberPageProps {
  member: TeamMemberData
}

export default function TeamMemberPage({ member }: TeamMemberPageProps) {
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
              {member.name}
            </h1>
            <p className="mt-2 text-cream/85">{member.role}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a 
                href="https://thesoulcarecounsellor.janeapp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-clay px-4 py-2 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
              >
                Book a Free Consultation
              </a>
              {member.socialLinks?.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-cream/10 px-3 py-2 font-semibold text-cream hover:bg-cream/20 ring-1 ring-cream/20"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Portrait */}
          <div className="md:col-span-5">
            <figure className="rounded-2xl bg-sand p-2 ring-1 ring-charcoal/10 shadow">
              <Image
                src={member.image}
                width={365}
                height={365}
                alt={`Portrait of ${member.name}`}
                className="block w-full h-auto rounded-xl object-cover aspect-square"
                priority
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Bio content */}
      <section className="mt-14 md:mt-16 grid gap-10 md:grid-cols-12 md:items-start">
        {/* LEFT: Main narrative */}
        <article className="md:col-span-7 space-y-5 text-charcoal/90">
          <h2 className="font-heading text-xl md:text-2xl font-semibold">About {member.name.split(' ')[0]}</h2>
          
          {member.bio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <h3 className="mt-8 font-heading text-lg md:text-xl font-semibold">Specialties</h3>
          <ul className="mt-3 list-disc pl-6 space-y-1">
            {member.specialties.map((specialty, index) => (
              <li key={index}>{specialty}</li>
            ))}
          </ul>
        </article>

        {/* RIGHT: Quick facts / booking */}
        <aside className="md:col-span-5 space-y-6">
          <div className="rounded-2xl bg-white p-5 ring-1 ring-charcoal/10">
            <h3 className="font-heading font-semibold">Areas of Focus</h3>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-charcoal/85">
              {member.areasOfFocus.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-sand p-5 ring-1 ring-charcoal/10">
            <h3 className="font-heading font-semibold">Book with {member.name.split(' ')[0]}</h3>
            <p className="mt-2 text-sm text-charcoal/85">Free 15-minute consultation to explore fit and next steps.</p>
            <a 
              href="https://thesoulcarecounsellor.janeapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center rounded-md bg-bark px-4 py-2 font-semibold text-cream hover:bg-bark/90 ring-1 ring-charcoal/10"
            >
              Book a Free Consultation
            </a>
          </div>
        </aside>
      </section>

      {/* CTA */}
      <section className="mt-16 md:mt-20 rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h3 className="font-heading text-xl md:text-2xl font-semibold">Looking for another clinician?</h3>
            <p className="mt-2 text-charcoal/80">Browse our team and book with the counsellor that fits your needs.</p>
          </div>
          <div className="md:justify-self-end">
            <Link 
              href="/#team"
              className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
            >
              Meet the Team
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
