import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SanityTeam from '@/components/SanityTeam'

export const metadata: Metadata = {
  title: 'Soul Care — About Us',
  description: 'About Soul Care Counselling — faith-centered, culturally responsive therapy. Our mission, pillars, and team.',
}

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/img/content/rs=w_1240,h_620,cg_true,m.webp"
            alt="Soul Care Counselling - Faith-centered therapy"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-bark/90 via-bark/70 to-bark/50"></div>
        
        {/* Decorative gradient blur */}
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center px-6 py-10 md:px-10 md:py-14">
          {/* LEFT: Text */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
              About Us
            </span>
            <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">
              Faith-centered therapy, culturally responsive care
            </h1>
            <p className="mt-3 max-w-3xl text-cream/85">
              We integrate Christian faith with evidence-based practice to support the whole person—mind, body, and spirit—within a culturally safe, welcoming space.
            </p>
          </div>

          {/* RIGHT: Cropped Image */}
          <div className="relative flex justify-center overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/assets/img/content/rs=w_984,h_657.webp"
              alt="Counselling session"
              width={600}
              height={400}
              className="w-full max-w-[600px] h-auto object-cover object-top"
              style={{ objectPosition: '0 -20%' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* WELCOME + PILLARS (side by side layout) */}
      <section className="mt-14 md:mt-16">
        <div className="grid gap-12 md:grid-cols-2 items-start">
          
          {/* LEFT: Welcome */}
          <div>
            <header className="max-w-3xl">
              <h2 className="font-heading text-2xl md:text-3xl font-bold">Welcome</h2>
            </header>
            <div className="mt-4 space-y-4 text-charcoal/85">
              <p>
                Welcome to Soul Care Christian Counselling, a space dedicated to nurturing the mental and spiritual well-being of the Black community. With a profound understanding of the intricate relationship between faith and mental health in our community, our practice is rooted in compassion, empathy, and culturally sensitive care. As a team of devoted mental health professionals we are committed to providing holistic support that honours the diverse intersections of faith and mental wellness.
              </p>
              <p>
                Our mission is clear: to integrate faith-based perspectives with evidence-based practices, offering tailored counselling and consulting services that resonate with the unique experiences of the Black community.
              </p>
            </div>
          </div>

          {/* RIGHT: Pillars */}
          <div>
            <h3 className="font-heading text-xl md:text-2xl font-semibold">Foundational pillars</h3>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2">
              <li className="rounded-xl bg-sand p-5 ring-1 ring-charcoal/10">
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-bark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v18M6 9l6-6 6 6"/>
                  </svg>
                  <div>
                    <h4 className="font-semibold">Spiritual care</h4>
                    <p className="mt-1 text-sm text-charcoal/80">Faith is welcomed in the room and integrated at your pace.</p>
                  </div>
                </div>
              </li>
              <li className="rounded-xl bg-sand p-5 ring-1 ring-charcoal/10">
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-bark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v18M6 9l6-6 6 6"/>
                  </svg>
                  <div>
                    <h4 className="font-semibold">Body care</h4>
                    <p className="mt-1 text-sm text-charcoal/80">Attending to how stress and trauma live in the body.</p>
                  </div>
                </div>
              </li>
              <li className="rounded-xl bg-sand p-5 ring-1 ring-charcoal/10">
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-bark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v18M6 9l6-6 6 6"/>
                  </svg>
                  <div>
                    <h4 className="font-semibold">Mindfulness</h4>
                    <p className="mt-1 text-sm text-charcoal/80">Grounding practices that build presence and resilience.</p>
                  </div>
                </div>
              </li>
              <li className="rounded-xl bg-sand p-5 ring-1 ring-charcoal/10">
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-bark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v18M6 9l6-6 6 6"/>
                  </svg>
                  <div>
                    <h4 className="font-semibold">Self-love</h4>
                    <p className="mt-1 text-sm text-charcoal/80">Compassionate, practical steps toward wholeness.</p>
                  </div>
                </div>
              </li>
              <li className="rounded-xl bg-sand p-5 ring-1 ring-charcoal/10">
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-bark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v18M6 9l6-6 6 6"/>
                  </svg>
                  <div>
                    <h4 className="font-semibold">Community</h4>
                    <p className="mt-1 text-sm text-charcoal/80">Healing happens in relationship—we honour that.</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Director */}
      <section id="jessica-robinson-grant" className="mt-16 md:mt-20">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <figure className="rounded-2xl bg-sand p-2 ring-1 ring-charcoal/10 shadow">
              <Image
                src="/assets/img/team/rs=w_365,h_365,cg_true,m.webp"
                width={365}
                height={365}
                alt="Jessica Robinson-Grant portrait"
                className="block w-full h-auto rounded-xl object-cover aspect-square"
              />
            </figure>
          </div>
          <div className="md:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-sand/70 px-3 py-1 ring-1 ring-charcoal/10 uppercase tracking-[.22em] text-[11px] text-charcoal/80">
              Clinical Director
            </span>
            <h3 className="mt-3 font-heading text-2xl md:text-3xl font-bold">Jessica Robinson-Grant, MSW, RSW</h3>
            <p className="mt-3 text-charcoal/85">
              Jessica leads Soul Care with a commitment to holistic, culturally responsive practice rooted in Christian faith and community advocacy.
            </p>
            <blockquote className="mt-4 border-l-4 border-clay pl-4 text-charcoal/90">
              <p className="font-heading italic">&ldquo;It is the will of the Father that you are well.&rdquo;</p>
            </blockquote>
            <div className="mt-5 flex flex-wrap gap-3">
              <a 
                href="https://thesoulcarecounsellor.janeapp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-clay px-4 py-2 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
              >
                Book a Free Consultation
              </a>
              <a 
                href="https://www.psychologytoday.com/" 
                target="_blank" 
                rel="noopener noreferrer nofollow" 
                className="inline-block" 
                aria-label="Verified by Psychology Today"
              >
                <Image
                  src="/assets/img/icons/psychology-today.png"
                  alt="Verified by Psychology Today"
                  width={320}
                  height={110}
                  className="h-8 md:h-10 w-auto hover:opacity-90"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the team - Now powered by Sanity CMS */}
      <SanityTeam />

      {/* Final CTA */}
      <section className="mt-16 md:mt-20 rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h3 className="font-heading text-xl md:text-2xl font-semibold">Let&apos;s take the next step together</h3>
            <p className="mt-2 text-charcoal/80">Free 15-minute consultation to see if we&apos;re a fit.</p>
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