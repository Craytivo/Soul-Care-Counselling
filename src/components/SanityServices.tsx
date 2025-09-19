
import { getServices } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export default async function SanityServices() {
  const services = await getServices()
  if (!services || services.length === 0) {
    return (
      <section className="mt-12">
        <div className="text-center py-12">
          <p className="text-charcoal/60">No services found. Please check your Sanity configuration.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mt-12 grid gap-6 md:grid-cols-2">
      {services.map((service) => (
        <article key={service._id} className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 hover:ring-clay/30 transition-all duration-200">
          {/* Service Image */}
          {service.image && (
            <div className="mb-4">
              <Image
                src={urlFor(service.image).width(400).height(200).url()}
                alt={service.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Service Icon removed as requested */}

          {/* Service Title */}
          <h3 className="font-heading text-xl font-semibold">{service.title}</h3>

          {/* Service Description */}
          <p className="mt-3 text-charcoal/85">{service.description}</p>

          {/* Features */}
          {service.features && service.features.length > 0 && (
            <ul className="mt-4 space-y-1">
              {service.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-sm text-charcoal/70 flex items-center">
                  <span className="w-1.5 h-1.5 bg-clay rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Pricing: Hide for group therapy, force $20 for single session, $80 for affordable therapy */}
          {service.title.toLowerCase().includes('single session') ? (
            <div className="mt-3 text-sm font-medium text-clay">
              $20.00 per session
            </div>
          ) : service.title.toLowerCase().includes('affordable') ? (
            <div className="mt-3 text-sm font-medium text-clay">
              $80.00 for 7 sessions
            </div>
          ) : (
            service.pricing && service.title.toLowerCase() !== 'group therapy' && (
              <div className="mt-3 text-sm font-medium text-clay">
                {service.pricing}
              </div>
            )
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex gap-3">
            {service.learnMoreLink && (
              <Link 
                href={service.learnMoreLink} 
                className="text-sm font-semibold underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal transition-colors"
              >
                Learn More
              </Link>
            )}
            {service.bookingLink && (
              <a
                href={service.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-clay hover:text-clay/80 transition-colors"
              >
                Book Now
              </a>
            )}
          </div>
        </article>
      ))}
    </section>
  )
}
