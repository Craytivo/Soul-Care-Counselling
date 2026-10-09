import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thesoulcarecounsellor.ca'

  // Only include canonical, public URLs. Legacy aliases are redirected by next.config.js.
  const staticPages = [
    '',
    '/about',
    '/services',
    '/services/individual',
    '/services/group-therapy',
    '/services/affordable',
    '/services/single-session',
    '/contact',
    '/resources',
    '/faq',
    '/core-values',
    '/privacy',
    '/terms',
    '/accessibility',
    '/areas',
    '/workshops',
    '/shop',
    '/intern-application',
  ]

  // Canonical team profile routes.
  const teamPages = [
    '/about/anita-owusu',
    '/about/baraka-mwangi',
    '/about/christiana-takyi',
    '/about/davene',
    '/about/jessica-robinson-grant',
    '/about/josh-dale',
    '/about/khadian-williams',
    '/about/natalia',
    '/about/natalia-willis',
    '/about/natalie-mcdonald',
    '/about/nigel-miller',
    '/about/oluseye-olumide',
    '/about/sneha-christian',
  ]

  return [...staticPages, ...teamPages].map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1 : 0.8,
  }))
}
