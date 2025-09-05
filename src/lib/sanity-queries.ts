import { client } from './sanity'
import { TeamMember, BlogPost, Workshop, Service, SiteSettings } from './sanity'

// Team Members
export async function getTeamMembers(): Promise<TeamMember[]> {
  const query = `*[_type == "teamMember"] | order(name asc) {
    _id,
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
  }`
  
  return await client.fetch(query)
}

export async function getTeamMember(slug: string): Promise<TeamMember> {
  const query = `*[_type == "teamMember" && slug.current == $slug][0] {
    _id,
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
  }`
  
  return await client.fetch(query, { slug })
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
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
  }`
  
  return await client.fetch(query)
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
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
  }`
  
  return await client.fetch(query, { slug })
}

// Workshops
export async function getWorkshops(): Promise<Workshop[]> {
  const query = `*[_type == "workshop"] | order(date desc) {
    _id,
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
    thumbnail
  }`
  
  return await client.fetch(query)
}

// Services
export async function getServices(): Promise<Service[]> {
  const query = `*[_type == "service"] | order(_createdAt asc) {
    _id,
    title,
    description,
    icon,
    features,
    pricing
  }`
  
  return await client.fetch(query)
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  const query = `*[_type == "siteSettings"][0] {
    _id,
    siteTitle,
    siteDescription,
    contactEmail,
    contactPhone,
    address,
    logo,
    heroTitle,
    heroSubtitle,
    heroImage
  }`
  
  return await client.fetch(query)
}
