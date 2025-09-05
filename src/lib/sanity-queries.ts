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
    *[_type == "service" && isActive == true] | order(order asc, title asc) {
      _id,
      _type,
      title,
      description,
      slug,
      icon,
      features,
      pricing,
      isActive,
      order,
      learnMoreLink,
      bookingLink,
      image,
      content
    }
  `)
}

export async function getService(slug: string): Promise<Service | null> {
  const service = await client.fetch(`
    *[_type == "service" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      description,
      slug,
      icon,
      features,
      pricing,
      isActive,
      order,
      learnMoreLink,
      bookingLink,
      image,
      content
    }
  `, { slug })
  
  return service || null
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  return await client.fetch(`
    *[_type == "blogPost" && isPublished == true] | order(publishedAt desc) {
      _id,
      _type,
      title,
      excerpt,
      slug,
      content,
      featuredImage {
        ...,
        alt,
        caption
      },
      author-> {
        _id,
        _type,
        _ref,
        name,
        credentials,
        image
      },
      publishedAt,
      isPublished,
      category,
      tags,
      readingTime,
      isFeatured,
      seoTitle,
      seoDescription,
      relatedPosts[]-> {
        _id,
        _type,
        _ref,
        title,
        slug
      },
      callToAction
    }
  `)
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const post = await client.fetch(`
    *[_type == "blogPost" && slug.current == $slug && isPublished == true][0] {
      _id,
      _type,
      title,
      excerpt,
      slug,
      content,
      featuredImage {
        ...,
        alt,
        caption
      },
      author-> {
        _id,
        _type,
        _ref,
        name,
        credentials,
        image
      },
      publishedAt,
      isPublished,
      category,
      tags,
      readingTime,
      isFeatured,
      seoTitle,
      seoDescription,
      relatedPosts[]-> {
        _id,
        _type,
        _ref,
        title,
        slug
      },
      callToAction
    }
  `, { slug })
  
  return post || null
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  return await client.fetch(`
    *[_type == "blogPost" && isPublished == true && isFeatured == true] | order(publishedAt desc) [0...3] {
      _id,
      _type,
      title,
      excerpt,
      slug,
      featuredImage {
        ...,
        alt,
        caption
      },
      author-> {
        _id,
        _type,
        _ref,
        name,
        credentials,
        image
      },
      publishedAt,
      category,
      tags,
      readingTime
    }
  `)
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  return await client.fetch(`
    *[_type == "blogPost" && isPublished == true && category == $category] | order(publishedAt desc) {
      _id,
      _type,
      title,
      excerpt,
      slug,
      featuredImage {
        ...,
        alt,
        caption
      },
      author-> {
        _id,
        _type,
        _ref,
        name,
        credentials,
        image
      },
      publishedAt,
      category,
      tags,
      readingTime
    }
  `, { category })
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  return await client.fetch(`
    *[_type == "blogPost" && isPublished == true && $tag in tags] | order(publishedAt desc) {
      _id,
      _type,
      title,
      excerpt,
      slug,
      featuredImage {
        ...,
        alt,
        caption
      },
      author-> {
        _id,
        _type,
        _ref,
        name,
        credentials,
        image
      },
      publishedAt,
      category,
      tags,
      readingTime
    }
  `, { tag })
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

