'use client'

import { useEffect, useState } from 'react'
import { getServices } from '@/lib/sanity-queries'
import { Service } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export default function SanityServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        const fetchedServices = await getServices()
        setServices(fetchedServices)
      } catch (err) {
        console.error('Error fetching services:', err)
        setError('Failed to load services. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  if (loading) {
    return (
      <section className="mt-12">
        <div className="text-center py-12">
          <p className="text-charcoal/60">Loading services...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="mt-12">
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    )
  }

  if (services.length === 0) {
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
                src={service.image.asset.url}
                alt={service.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Service Icon */}
          {service.icon && (
            <div className="text-2xl mb-3">{service.icon}</div>
          )}

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

          {/* Pricing */}
          {service.pricing && (
            <div className="mt-3 text-sm font-medium text-clay">
              {service.pricing}
            </div>
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
