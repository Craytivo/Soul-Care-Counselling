import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true, // Set to false if you want fresh data
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN, // For write operations
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Type definitions
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface TeamMember {
  _id: string
  name: string
  credentials: string
  role: string
  image: SanityImage
  bio: any[] // Portable Text
  specialties: string[]
  areasOfFocus: string[]
  socialLinks: Array<{
    label: string
    url: string
    type: 'instagram' | 'website' | 'other'
  }>
  acceptsBookings: boolean
  slug: {
    current: string
  }
}

export interface BlogPost {
  _id: string
  title: string
  excerpt: string
  content: any[] // Portable Text
  author: string
  authorRole: string
  authorImage?: SanityImage
  publishedAt: string
  featuredImage?: SanityImage
  tags: string[]
  slug: {
    current: string
  }
}

export interface Workshop {
  _id: string
  title: string
  description: any[] // Portable Text
  instructor: string
  date: string
  time: string
  duration: string
  price: number
  registrationLink: string
  videoUrl?: string
  isRecorded: boolean
  thumbnail?: SanityImage
}

export interface Service {
  _id: string
  title: string
  description: any[] // Portable Text
  icon?: SanityImage
  features: string[]
  pricing: string
}

export interface SiteSettings {
  _id: string
  siteTitle: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  logo?: SanityImage
  heroTitle: string
  heroSubtitle: string
  heroImage?: SanityImage
}
