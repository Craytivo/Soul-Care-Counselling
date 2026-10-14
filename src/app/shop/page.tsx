import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import WaitlistForm from '@/components/forms/WaitlistForm'
import {
  formatShopifyPrice,
  getShopifyProductUrl,
  getShopifyProducts,
  isDigitalProduct,
} from '@/lib/shopify'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Shop - Soul Care Counselling',
  description:
    'Explore digital resources and thoughtfully selected products to support your healing journey.',
}

export default async function ShopPage() {
  const { configured, products } = await getShopifyProducts()
  const hasProducts = products.length > 0

  return (
    <>
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div
          className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gradient-to-br from-clay/50 to-cream/10 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-gradient-to-tr from-clay/35 to-transparent blur-2xl"
          aria-hidden="true"
        />
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 text-[11px] uppercase tracking-[.22em] ring-1 ring-cream/30">
            {hasProducts ? 'The Soul Care Collection' : 'Shop Coming Soon'}
          </span>
          <h1 className="mt-3 font-heading text-3xl font-bold md:text-4xl">Soul Care Shop</h1>
          <p className="mt-3 max-w-3xl leading-relaxed text-cream/85">
            {hasProducts
              ? 'Explore digital resources and thoughtfully selected products to support your healing journey.'
              : 'We are preparing a collection of digital resources and thoughtfully selected products to support your healing journey. Join the waitlist to hear when the shop launches.'}
          </p>
          {!hasProducts && <WaitlistForm />}
        </div>
      </section>

      {hasProducts ? (
        <section className="mt-10" aria-labelledby="shop-products-heading">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-clay">
                Made for your journey
              </p>
              <h2 id="shop-products-heading" className="mt-1 font-heading text-2xl font-semibold">
                Explore the collection
              </h2>
            </div>
            <p className="text-sm text-charcoal/65">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const productUrl = getShopifyProductUrl(product)
              const digital = isDigitalProduct(product)

              return (
                <article
                  key={product.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-charcoal/10 transition-shadow duration-200 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                    {product.featuredImage?.url ? (
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-8 text-center">
                        <span className="font-heading text-xl font-semibold text-bark/70">
                          Soul Care
                        </span>
                      </div>
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.14em] text-bark shadow-sm">
                      {digital ? 'Digital resource' : 'Physical product'}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-heading text-xl font-semibold text-bark">{product.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-charcoal/70">
                      {product.description || 'A thoughtful addition to your Soul Care journey.'}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <span className="font-semibold text-bark">
                        {product.priceRange.minVariantPrice.amount !==
                          product.priceRange.maxVariantPrice.amount && 'From '}
                        {formatShopifyPrice(
                          product.priceRange.minVariantPrice.amount,
                          product.priceRange.minVariantPrice.currencyCode
                        )}
                      </span>
                      {productUrl ? (
                        <a
                          href={productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center justify-center rounded-md bg-clay px-4 py-2 text-sm font-semibold text-charcoal ring-1 ring-charcoal/10 transition-colors hover:bg-clay/90"
                        >
                          View product
                        </a>
                      ) : (
                        <span className="text-sm text-charcoal/55">Details coming soon</span>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ) : (
        <section className="mt-12 rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 md:p-8">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h2 className="font-heading text-xl font-semibold md:text-2xl">
                {configured ? 'Our collection is being prepared' : 'Need support right now?'}
              </h2>
              <p className="mt-2 text-charcoal/80">
                {configured
                  ? 'We could not find any published products to display yet. The shop will show products once they are published to your Shopify sales channel.'
                  : 'While the shop is in progress, you can still access support through counselling and our free resource library.'}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
              <a
                href="https://thesoulcarecounsellor.janeapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal ring-1 ring-charcoal/10 hover:bg-clay/90"
              >
                Book Consultation
              </a>
              <Link
                href="/resources"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-sand px-5 py-2.5 font-semibold text-charcoal ring-1 ring-charcoal/10 hover:bg-sand/90"
              >
                View Resources
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
