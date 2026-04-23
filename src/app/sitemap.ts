import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thesoulcarecounsellor.ca'

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/services',
    '/contact',
    '/resources',
    '/faq',
    '/core-values',
    '/privacy',
    '/terms',
    '/accessibility',
    '/areas',
    '/individual',
    '/group-therapy',
    '/affordable',
    '/single-session',
    '/workshops',
    '/studio',
    '/shop',
    '/intern-application',
  ]

  // Team member pages (you'll need to dynamically fetch these from Sanity)
  const teamPages = [
    '/anita-owusu',
    '/baraka-mwangi',
    '/christiana-takyi',
    '/davene-miller',
    '/jessica-robinson-grant',
    '/josh-dale',
    '/khadian-williams',
    '/natalia',
    '/natalia-willis',
    '/natalie-mcdonald',
    '/natalie-willis',
    '/nigel-miller',
    '/oluseye-olumide',
    '/princeton-owusu',
    '/sneha-christian',
  ]

  const allPages = [...staticPages, ...teamPages].map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1 : 0.8,
  }))

  return allPages
}