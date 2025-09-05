import { client } from './sanity'
import type { TeamMember, Workshop, Service, BlogPost, SiteSettings } from './sanity'

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  return await client.fetch(`
    *[_type == "teamMember"] | order(name asc) {
      _id,
      _type,
      name,
      credentials,
      role,
      image,
      bio,
      specialties,
      areasOfFocus,
      socialLinks,
      acceptsBookings,
      slug
    }
  `)
}

export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  const members = await client.fetch(`
    *[_type == "teamMember" && slug.current == $slug][0] {
      _id,
      _type,
      name,
      credentials,
      role,
      image,
      bio,
      specialties,
      areasOfFocus,
      socialLinks,
      acceptsBookings,
      slug
    }
  `, { slug })
  
  return members || null
}

// Workshops
export async function getWorkshops(): Promise<Workshop[]> {
  return await client.fetch(`
    *[_type == "workshop"] | order(date desc, _createdAt desc) {
      _id,
      _type,
      title,
      description,
      instructor,
      date,
      time,
      duration,
      price,
      registrationLink,
      videoUrl,
      isRecorded,
      thumbnail,
      content
    }
  `)
}

export async function getWorkshop(id: string): Promise<Workshop | null> {
  const workshop = await client.fetch(`
    *[_type == "workshop" && _id == $id][0] {
      _id,
      _type,
      title,
      description,
      instructor,
      date,
      time,
      duration,
      price,
      registrationLink,
      videoUrl,
      isRecorded,
      thumbnail,
      content
    }
  `, { id })
  
  return workshop || null
}

// Services
export async function getServices(): Promise<Service[]> {
  return await client.fetch(`
    *[_type == "service"] | order(_createdAt asc) {
      _id,
      _type,
      title,
      description,
      icon,
      features,
      pricing,
      content
    }
  `)
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  return await client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      _type,
      title,
      excerpt,
      content,
      author,
      authorRole,
      authorImage,
      publishedAt,
      featuredImage,
      tags,
      slug
    }
  `)
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const post = await client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      excerpt,
      content,
      author,
      authorRole,
      authorImage,
      publishedAt,
      featuredImage,
      tags,
      slug
    }
  `, { slug })
  
  return post || null
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const settings = await client.fetch(`
    *[_type == "siteSettings"][0] {
      _id,
      _type,
      siteTitle,
      siteDescription,
      contactEmail,
      contactPhone,
      address,
      logo,
      heroTitle,
      heroSubtitle,
      heroImage,
      socialLinks
    }
  `)
  
  return settings || null
}

