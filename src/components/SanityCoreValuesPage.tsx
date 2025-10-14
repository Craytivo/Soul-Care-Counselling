
import { getCoreValuesPage } from '@/lib/sanity-queries';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';

export default async function SanityCoreValuesPage() {
  const page = await getCoreValuesPage();

  if (!page) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal/60">Core values page not found.</p>
      </div>
    );
  }

  const renderCtaButton = () => {
    if (page.cta.external) {
      return (
        <a
          href={page.cta.buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
        >
          {page.cta.buttonText}
        </a>
      );
    } else {
      return (
        <Link
          href={page.cta.buttonLink}
          className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
        >
          {page.cta.buttonText}
        </Link>
      );
    }
  };

  return (
    <>
      {/* Page hero with image */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center px-6 py-10 md:px-10 md:py-14">
          {/* LEFT: Text */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
              {page.hero.badge}
            </span>
            <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">{page.hero.title}</h1>
            <p className="mt-3 max-w-3xl text-cream/85">
              {page.hero.description}
            </p>
          </div>

          {/* RIGHT: Image */}
          {page.hero.image && (
            <div className="relative overflow-hidden rounded-xl ring-1 ring-cream/15 shadow-lg">
              <Image
                src={urlFor(page.hero.image).url()}
                alt={page.hero.image.alt || page.hero.title}
                width={620}
                height={310}
                className="block w-full h-full object-cover"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* Values */}
      <section className="mt-14 md:mt-16 space-y-10">
  {page.values.map((value: { title: string; description: string; order: number }, index: number) => (
          <article key={index}>
            <h2 className="font-heading text-xl md:text-2xl font-semibold">{value.title}</h2>
            <p className="mt-3 text-charcoal/85 whitespace-pre-line">
              {value.description}
            </p>
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="mt-16 md:mt-20 rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h3 className="font-heading text-xl md:text-2xl font-semibold">{page.cta.title}</h3>
            <p className="mt-2 text-charcoal/80">{page.cta.description}</p>
          </div>
          <div className="md:justify-self-end">
            {renderCtaButton()}
          </div>
        </div>
      </section>
    </>
  );
}
