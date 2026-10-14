# Shopify Store Setup

The `/shop` page reads published products from Shopify's Storefront API. Shopify remains responsible for product variants, inventory, payment, order confirmation, and checkout.

## Required environment variables

Add these in Netlify's environment-variable settings for the site (and in a local `.env.local` file for development):

- `SHOPIFY_STORE_DOMAIN`: the store's `*.myshopify.com` domain, with or without `https://`.
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`: a Storefront API access token with permission to read products. Keep this server-side; do not prefix it with `NEXT_PUBLIC_`.
- `SHOPIFY_API_VERSION`: optional Shopify API version. Defaults to `2026-07`.

No real credentials are stored in the repository. The page stays in its waitlist state if the store domain or token is missing.

## Publish products

1. Add products in Shopify and set their status to Active.
2. Make sure each product is available on the sales channel used by the Storefront API.
3. Add a clear title, description, price, and featured image.
4. For digital products, configure a digital-download delivery app or another secure delivery method in Shopify. Tag the product with a term such as `digital`, `ebook`, `download`, `PDF`, or set its product type accordingly. The storefront label is only a display hint; it does not configure fulfillment.
5. Physical merchandise should have the correct variants, inventory settings, shipping profiles, and fulfillment integration configured in Shopify. If using a print-on-demand provider, connect and test that integration in Shopify before accepting orders.

## Current implementation scope

- Reads up to 24 published products from Shopify on the server, cached for five minutes.
- Displays each product's image, title, description, lowest listed variant price, and a digital/physical label.
- Links customers to the Shopify product page to select variants and complete Shopify checkout.
- Falls back to the existing waitlist when credentials are missing or no products are available.
- Does not implement a local cart, checkout, customer account, order management, or digital-file hosting. Those remain with Shopify and the configured fulfillment apps.

## Launch checks

Before launch, verify product visibility, taxes, shipping rates, checkout, test orders, refunds, digital-download delivery, and mobile layouts in the actual Shopify store. Do not use real customer orders until these flows have been tested end to end.
