import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop — Soul Care Counselling',
  description: 'Discover wellness products and resources to support your healing journey. Coming soon - curated items for your mental health and spiritual growth.',
}

export default function ShopPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
            Coming Soon
          </span>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">Soul Care Shop</h1>
          <p className="mt-3 max-w-3xl text-cream/85">
            We're curating a collection of wellness products and resources to support your healing journey. 
            Stay tuned for carefully selected items that align with our faith-centered approach to mental health.
          </p>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="mt-12">
        <div className="rounded-2xl bg-white p-8 md:p-12 ring-1 ring-charcoal/10 text-center">
          <div className="w-20 h-20 rounded-full bg-sand flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-charcoal/85 text-lg max-w-2xl mx-auto">
            We're working hard to bring you a curated collection of wellness products and resources that align with our faith-centered approach to mental health. Stay tuned for something special!
          </p>
        </div>
      </section>

      {/* Dropshipping Integration Ready Section */}
      <section className="mt-16 rounded-2xl bg-bark text-cream p-6 md:p-8 ring-1 ring-cream/15">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="font-heading text-xl md:text-2xl font-semibold">Quality Products, Seamless Experience</h3>
            <p className="mt-2 text-cream/85">
              Our shop will feature carefully curated products that align with our values of faith, healing, and wellness. 
              Each item is selected to support your mental health journey.
            </p>
          </div>
          <div className="md:justify-self-end">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-cream/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-cream">100%</div>
                <div className="text-cream/80 text-sm">Faith-Aligned</div>
              </div>
              <div className="bg-cream/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-cream">Free</div>
                <div className="text-cream/80 text-sm">Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h3 className="font-heading text-xl md:text-2xl font-semibold">Ready to begin your healing journey?</h3>
            <p className="mt-2 text-charcoal/80">While you wait for our shop, book a free consultation to explore how our faith-centered approach can support your growth.</p>
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
