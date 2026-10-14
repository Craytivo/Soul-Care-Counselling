type ShopifyImage = {
  url: string
  altText: string | null
}

export type ShopifyProduct = {
  id: string
  title: string
  handle: string
  description: string
  productType: string
  tags: string[]
  onlineStoreUrl: string | null
  featuredImage: ShopifyImage | null
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
}

type ShopifyProductsResponse = {
  data?: {
    products?: {
      nodes?: ShopifyProduct[]
    }
  }
  errors?: Array<{ message?: string }>
}

const PRODUCTS_QUERY = `
  query ShopProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        description
        productType
        tags
        onlineStoreUrl
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

function getShopifyConfig() {
  const rawDomain = process.env.SHOPIFY_STORE_DOMAIN?.trim()
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim()
  const domain = rawDomain?.replace(/^https?:\\/\\//, '').replace(/\\/$/, '')

  if (!domain || !token) return null

  return {
    domain,
    token,
    apiVersion: process.env.SHOPIFY_API_VERSION?.trim() || '2026-07',
  }
}

/**
 * Fetches published products from Shopify's Storefront API.
 * Credentials remain server-side and are never sent to the browser.
 */
export async function getShopifyProducts(): Promise<{
  configured: boolean
  products: ShopifyProduct[]
}> {
  const config = getShopifyConfig()

  if (!config) return { configured: false, products: [] }

  try {
    const response = await fetch(
      `https://${config.domain}/api/${config.apiVersion}/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': config.token,
        },
        body: JSON.stringify({
          query: PRODUCTS_QUERY,
          variables: { first: 24 },
        }),
        next: { revalidate: 300 },
      }
    )

    if (!response.ok) {
      console.error('Shopify Storefront API request failed:', response.status)
      return { configured: true, products: [] }
    }

    const result = (await response.json()) as ShopifyProductsResponse

    if (result.errors?.length) {
      console.error(
        'Shopify Storefront API returned GraphQL errors:',
        result.errors.map((error) => error.message || 'Unknown GraphQL error')
      )
      return { configured: true, products: [] }
    }

    return {
      configured: true,
      products: result.data?.products?.nodes ?? [],
    }
  } catch (error) {
    console.error('Unable to load Shopify products:', error)
    return { configured: true, products: [] }
  }
}

export function getShopifyProductUrl(product: ShopifyProduct): string | null {
  if (product.onlineStoreUrl) return product.onlineStoreUrl

  const config = getShopifyConfig()
  if (!config) return null

  return `https://${config.domain}/products/${encodeURIComponent(product.handle)}`
}

export function formatShopifyPrice(
  amount: string,
  currencyCode: string,
  locale = 'en-CA'
): string {
  const value = Number(amount)

  if (!Number.isFinite(value)) return amount

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    }).format(value)
  } catch {
    return `${currencyCode} ${amount}`
  }
}

export function isDigitalProduct(product: ShopifyProduct): boolean {
  const searchable = [product.productType, ...product.tags].join(' ').toLowerCase()
  return /ebook|e-book|digital|download|pdf|printable/.test(searchable)
}
