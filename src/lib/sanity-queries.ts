import { client } from './sanity'
import type { TeamMember, Workshop, Service, ServicePage, CoreValuesPage, AboutPage, AreasPage, BlogPost, SiteSettings } from './sanity'

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
  return await client.fetch(`
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
}

// Workshops
export async function getWorkshops(): Promise<Workshop[]> {
  return await client.fetch(`
    *[_type == "workshop"] | order(date desc, _createdAt desc) {
      _id,
      _type,
      title,
      description,
      date,
      time,
      duration,
      location,
      instructor,
      instructorRole,
      maxParticipants,
      price,
      isRecorded,
      videoUrl,
      thumbnailUrl,
      slug
    }
  `)
}

// Services
export async function getServices(): Promise<Service[]> {
  return await client.fetch(`
    *[_type == "service" && isActive == true] | order(order asc) {
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
  return await client.fetch(`
    *[_type == "service" && slug.current == $slug && isActive == true][0] {
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

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return await client.fetch(`
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
      callToAction {
        text,
        link,
        type
      }
    }
  `, { slug })
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
  `, { tag: tag } as any)
}

// Core Values Page
export async function getCoreValuesPage(): Promise<CoreValuesPage | null> {
  const page = await client.fetch(`
    *[_type == "coreValuesPage" && isActive == true][0] {
      _id,
      _type,
      title,
      metaDescription,
      hero {
        badge,
        title,
        description,
        image {
          ...,
          alt
        }
      },
      values[] | order(order asc) {
        title,
        description,
        order
      },
      cta {
        title,
        description,
        buttonText,
        buttonLink,
        external
      },
      isActive
    }
  `)

  return page || null
}

// About Page
export async function getAboutPage(): Promise<AboutPage | null> {
  return await client.fetch(`
    *[_type == "aboutPage"][0] {
      _id,
      _type,
      hero {
        badge,
        title,
        description,
        backgroundImage {
          ...,
          alt
        },
        featuredImage {
          ...,
          alt
        }
      },
      welcome {
        title,
        content
      },
      pillars {
        title,
        pillarList[] {
          title,
          description
        }
      },
      director {
        badge,
        name,
        credentials,
        description,
        quote,
        image {
          ...,
          alt
        },
        bookingLink,
        bookingText,
        psychologyTodayImage {
          ...,
          alt
        },
        psychologyTodayLink
      },
      cta {
        title,
        description,
        buttonText,
        buttonLink,
        external
      }
    }
  `)
}

// Areas Page
export async function getAreasPage(): Promise<AreasPage | null> {
  return await client.fetch(`
    *[_type == "areasPage"][0] {
      _id,
      _type,
      hero {
        badge,
        title,
        description
      },
      areas[] | order(order asc) {
        title,
        slug,
        content,
        order
      },
      cta {
        title,
        description,
        buttonText,
        buttonLink,
        external
      }
    }
  `)
}

// Service Pages
export async function getServicePages(): Promise<ServicePage[]> {
  return await client.fetch(`
    *[_type == "servicePage" && isActive == true] | order(title asc) {
      _id,
      _type,
      title,
      slug,
      metaDescription,
      badge,
      mainTitle,
      heroDescription,
      quote,
      primaryCta,
      secondaryCta,
      sections,
      isActive
    }
  `)
}

export async function getServicePage(slug: string): Promise<ServicePage | null> {
  const page = await client.fetch(`
    *[_type == "servicePage" && slug.current == $slug && isActive == true][0] {
      _id,
      _type,
      title,
      slug,
      metaDescription,
      badge,
      mainTitle,
      heroDescription,
      quote,
      primaryCta,
      secondaryCta,
      sections,
      isActive
    }
  `, { slug })

  return page || null
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