
import type { Service } from '@/lib/sanity';
import { getServices } from '@/lib/sanity-queries';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';

export default async function SanityServices() {
  const servicesData = await getServices();

  if (!servicesData || !servicesData.servicesList || servicesData.servicesList.length === 0) {
    return (
      <section className="mt-12">
        <div className="text-center py-12">
          <p className="text-charcoal/60">No services found. Please check your Sanity configuration.</p>
        </div>
      </section>
    );
  }

  const formatPricing = (service: Service) => {
    if (!service.pricing || service.pricing.displayType === 'hidden') {
      return null;
    }
    switch (service.pricing.displayType) {
      case 'custom':
        return service.pricing.customText;
      case 'perSession':
        return `${service.pricing.currency || '$'}${service.pricing.amount} ${service.pricing.suffix || 'per session'}`;
      case 'package':
        return `${service.pricing.currency || '$'}${service.pricing.amount} ${service.pricing.suffix || 'for ' + (service.pricing.packageSessions ?? '') + ' sessions'}`;
      default:
        return null;
    }
  };

  // Filter active services
  const activeServices = servicesData.servicesList.filter((service: Service) => service.isActive);

  return (
    <section className="mt-12 grid gap-6 md:grid-cols-2">
      {activeServices.map((service: Service, index: number) => (
        <article key={index} className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 hover:ring-clay/30 transition-all duration-200">
          {/* Service Image */}
          {service.image && (
            <div className="mb-4">
              <Image
                src={urlFor(service.image as import('@sanity/image-url/lib/types/types').SanityImageSource).width(400).height(200).url()}
                alt={service.image.alt || service.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Service Title */}
          <h3 className="font-heading text-xl font-semibold">{service.title}</h3>

          {/* Service Description */}
          <p className="mt-3 text-charcoal/85">{service.description}</p>

          {/* Features */}
          {service.features && service.features.length > 0 && (
            <ul className="mt-4 space-y-1">
              {service.features.slice(0, 3).map((feature: string, index: number) => (
                <li key={index} className="text-sm text-charcoal/70 flex items-center">
                  <span className="w-1.5 h-1.5 bg-clay rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Pricing */}
          {formatPricing(service) && (
            <div className="mt-3 text-sm font-medium text-clay">
              {formatPricing(service)}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex gap-3">
            {service.buttons?.learnMore?.show && service.buttons.learnMore.url && (
              <>
                {service.buttons.learnMore.external ? (
                  <a
                    href={service.buttons.learnMore.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal transition-colors"
                  >
                    {service.buttons.learnMore.text || 'Learn More'}
                  </a>
                ) : (
                  <Link 
                    href={service.buttons.learnMore.url}
                    className="text-sm font-semibold underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal transition-colors"
                  >
                    {service.buttons.learnMore.text || 'Learn More'}
                  </Link>
                )}
              </>
            )}
            {service.buttons?.bookNow?.show && service.buttons.bookNow.url && (
              <a
                href={service.buttons.bookNow.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-clay hover:text-clay/80 transition-colors"
              >
                {service.buttons.bookNow.text || 'Book Now'}
              </a>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
