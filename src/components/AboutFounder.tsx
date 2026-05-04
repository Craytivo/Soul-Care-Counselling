import Link from 'next/link'
import Image from 'next/image'

export default function AboutFounder() {
  return (
    <section className="section-spacing section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-sand/50">
            <Image
              src="/images/jessica-robinson-grant.jpg"
              alt="Jessica Robinson-Grant, Founder"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col space-y-6">
            <div>
              <span className="label-text block mb-4">About the Founder</span>
              <h2 className="heading-lg text-charcoal">
                <Link 
                  href="/about/jessica-robinson-grant"
                  className="hover:underline decoration-2 underline-offset-4 decoration-clay/50 transition-all"
                >
                  Jessica Robinson-Grant
                </Link>
              </h2>
              <p className="body-text-large mt-4">
                Founder & Clinical Director
              </p>
            </div>

            <div className="body-text space-y-4">
              <p>
                Jessica founded Soul Care Christian Counselling with a vision to provide faith-centered, culturally sensitive therapy that honors both psychological expertise and spiritual values.
              </p>
              <p>
                With over a decade of clinical experience, she brings a unique blend of professional training and compassionate care to every session. Her approach integrates evidence-based therapeutic techniques with a deep understanding of how faith and mental health intersect.
              </p>
              <p>
                She believes that everyone deserves access to quality mental health support that respects their whole self—mind, body, and spirit.
              </p>
            </div>

            <Link
              href="/about/jessica-robinson-grant"
              className="inline-flex items-center text-charcoal font-semibold hover:text-clay transition-colors duration-200 group"
            >
              Read Jessica&apos;s full story
              <svg
                className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
