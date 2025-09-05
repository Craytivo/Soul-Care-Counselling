import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Create Sanity client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true, // Set to false if you want to always fetch fresh data
  apiVersion: '2025-09-05',
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
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface TeamMember {
  _id: string
  _type: 'teamMember'
  name: string
  credentials?: string
  role: string
  image: SanityImage
  bio: string
  specialties?: string[]
  areasOfFocus?: string[]
  socialLinks?: Array<{
    label: string
    url: string
    type: 'instagram' | 'website' | 'other'
  }>
  acceptsBookings: boolean
  slug: {
    current: string
  }
}

export interface Workshop {
  _id: string
  _type: 'workshop'
  title: string
  description: string
  instructor: string
  instructorRole?: string
  date?: string
  time?: string
  duration?: string
  price?: string
  registrationLink?: string
  videoUrl?: string
  isRecorded: boolean
  thumbnail?: SanityImage
  content?: any[]
  slug: {
    current: string
  }
}

export interface Service {
  _id: string
  _type: 'service'
  title: string
  description: string
  slug: {
    current: string
  }
  icon?: string
  features?: string[]
  pricing?: string
  isActive: boolean
  order: number
  learnMoreLink?: string
  bookingLink?: string
  image?: SanityImage
  content?: any[]
}

export interface BlogPost {
  _id: string
  _type: 'blogPost'
  title: string
  excerpt: string
  content: any[]
  author: string
  authorRole?: string
  authorImage?: SanityImage
  publishedAt: string
  featuredImage?: SanityImage
  tags?: string[]
  slug: {
    current: string
  }
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  siteTitle: string
  siteDescription: string
  contactEmail: string
  contactPhone?: string
  address?: string
  logo?: SanityImage
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: SanityImage
  socialLinks?: Array<{
    platform: string
    url: string
  }>
}

