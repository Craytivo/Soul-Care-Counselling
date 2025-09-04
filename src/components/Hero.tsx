import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-12">
          {/* Text column */}
          <div className="md:col-span-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-sand/70 px-3 py-1 ring-1 ring-charcoal/10 uppercase tracking-[.22em] text-[11px] text-charcoal/80">
              Soul Care Counselling
            </span>

            <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold text-charcoal">
              Faith-centered therapy, culturally sensitive care
            </h1>

            <p className="mt-4 text-charcoal/80">
              Virtual counselling across Canada with a warm, practical approach rooted in evidence-based care.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a 
                href="https://thesoulcarecounsellor.janeapp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-clay px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-clay/90 focus-visible:outline-2 focus-visible:outline-cream/60"
              >
                Book a Free Consultation
              </a>
              <Link 
                href="/services"
                className="inline-flex items-center justify-center rounded-lg bg-sand px-5 py-2.5 font-semibold text-charcoal shadow-sm ring-1 ring-charcoal/10 transition hover:bg-sand/90 focus-visible:outline-2 focus-visible:outline-cream/60"
              >
                View Services
              </Link>
            </div>

            <ul className="mt-6 space-y-2 text-charcoal/80">
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-clay flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                Secure telehealth platform
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-clay flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                Virtual care across Canada
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-clay flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                Culturally responsive & evidence-based
              </li>
            </ul>
          </div>

          {/* Image column */}
          <div className="md:col-span-8">
            <figure className="relative">
              <div aria-hidden="true" className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full bg-gradient-to-br from-clay/30 to-bark/20 blur-2xl"></div>

              <div className="rounded-3xl bg-sand p-2 ring-1 ring-charcoal/10 shadow-xl">
                <div className="rounded-[18px] bg-cream ring-1 ring-charcoal/10">
                  <Image
                    src="/assets/img/hero/hero=w_984,h_492.webp"
                    width={984} 
                    height={492}
                    alt="Calm, earthy therapy scene conveying warmth and care"
                    className="block w-full h-auto object-contain rounded-[14px]"
                    style={{ aspectRatio: '984 / 492' }}
                    priority
                  />
                </div>
              </div>

              <figcaption className="mt-4">
                <blockquote className="relative pl-4 border-l-4 border-clay text-charcoal/90">
                  <p className="font-heading text-lg md:text-xl italic leading-snug">
                    &ldquo;It is the will of the Father that you are well&rdquo;
                  </p>
                </blockquote>
                <div className="mt-2 text-sm text-charcoal/70">Jessica Robinson-Grant</div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}