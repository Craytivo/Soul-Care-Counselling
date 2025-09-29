import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Create Sanity client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false, // Set to false for immediate content updates
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
  slug: {
    current: string
  }
  content: any[]
  featuredImage?: SanityImage & {
    alt?: string
    caption?: string
  }
  author: {
    _id: string
    _type: 'reference'
    _ref: string
    name?: string
    credentials?: string
    image?: SanityImage
  }
  publishedAt: string
  isPublished: boolean
  category: string
  tags?: string[]
  readingTime?: number
  isFeatured: boolean
  seoTitle?: string
  seoDescription?: string
  relatedPosts?: Array<{
    _id: string
    _type: 'reference'
    _ref: string
    title?: string
    slug?: { current: string }
  }>
  callToAction?: {
    text: string
    link: string
    type: 'consultation' | 'learn-more' | 'contact' | 'custom'
  }
}

export interface ServicePage {
  _id: string
  _type: 'servicePage'
  title: string
  slug: {
    current: string
  }
  metaDescription: string
  badge: string
  mainTitle: string
  heroDescription: string
  quote?: {
    text: string
    attribution: string
  }
  primaryCta: {
    text: string
    url: string
    external: boolean
  }
  secondaryCta: {
    text: string
    url: string
    external: boolean
  }
  sections: Array<{
    _type: 'textSection' | 'detailsSection' | 'listSection' | 'ctaSection'
    title: string
    content?: any[]
    items?: Array<{
      label: string
      value: string
    }> | string[]
    description?: string
    primaryButton?: {
      text: string
      url: string
      external: boolean
    }
    secondaryButton?: {
      text: string
      url: string
      external: boolean
    }
  }>
  isActive: boolean
}

export interface CoreValuesPage {
  _id: string
  _type: 'coreValuesPage'
  title: string
  metaDescription: string
  hero: {
    badge: string
    title: string
    description: string
    image: SanityImage & {
      alt?: string
    }
  }
  values: Array<{
    title: string
    description: string
    order: number
  }>
  cta: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
    external: boolean
  }
  isActive: boolean
}

export interface AboutPage {
  _id: string
  _type: 'aboutPage'
  title: string
  metaDescription: string
  hero: {
    badge: string
    title: string
    description: string
    backgroundImage?: SanityImage & {
      alt?: string
    }
    featuredImage?: SanityImage & {
      alt?: string
    }
  }
  welcome: {
    title: string
    content: any[] // Portable Text content
  }
  pillars: {
    title: string
    pillarList: Array<{
      title: string
      description: string
      order: number
    }>
  }
  director: {
    badge: string
    name: string
    credentials?: string
    description: string
    quote?: string
    image?: SanityImage & {
      alt?: string
    }
    bookingLink?: string
    bookingText?: string
    psychologyTodayImage?: SanityImage & {
      alt?: string
    }
    psychologyTodayLink?: string
  }
  cta: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
    external: boolean
  }
  isActive: boolean
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

export interface AreasPage {
  _id: string
  _type: 'areasPage'
  hero: {
    badge?: string
    title: string
    description: string
  }
  areas: Array<{
    title: string
    slug: {
      current: string
    }
    content: any[] // Portable Text
    order: number
  }>
  cta?: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
    external: boolean
  }
}

export interface HomePage {
  _id: string
  _type: 'homePage'
  title: string
  metaDescription?: string
  hero: {
    mainHeading: string
    highlightText: string
    description: string
    heroImage?: SanityImage & {
      alt?: string
    }
    features: Array<{
      text: string
      icon: 'lock' | 'mapPin' | 'globe' | 'graduationCap'
      order: number
    }>
    quote: {
      text: string
      author: string
    }
    ctaButtons: {
      primaryButton: {
        text: string
        url: string
        external: boolean
      }
      secondaryButton: {
        text: string
        url: string
        external: boolean
      }
    }
  }
  isActive: boolean
}

export interface ServicesPage {
  _id: string
  _type: 'servicesPage'
  title: string
  metaDescription?: string
  hero: {
    badge: string
    heading: string
    description: string
    priceHighlight?: {
      text: string
      price: string
      suffix: string
    }
  }
  cta: {
    title: string
    description: string
    buttonText: string
    buttonUrl: string
    external: boolean
  }
  isActive: boolean
}

