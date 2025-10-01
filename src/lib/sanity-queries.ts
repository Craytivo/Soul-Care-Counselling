import { client } from './sanity'
import type { TeamMember, Workshop, Service, ServicePage, CoreValuesPage, AboutPage, AreasPage, BlogPost, SiteSettings, HomePage, Services, InternApplicationPage, FAQPage, ContactPage, Resource } from './sanity'

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

// Services - Unified query
export async function getServices(): Promise<Services | null> {
  const query = `
    *[_type == "services" && isActive == true] | order(_updatedAt desc) [0] {
      _id,
      _type,
      _updatedAt,
      title,
      metaDescription,
      hero {
        badge,
        heading,
        description,
        priceHighlight {
          text,
          price,
          suffix
        }
      },
      servicesList[] {
        title,
        slug,
        description,
        image {
          ...,
          alt
        },
        features,
        pricing {
          displayType,
          customText,
          amount,
          currency,
          suffix,
          packageSessions
        },
        buttons {
          learnMore {
            show,
            text,
            url,
            external
          },
          bookNow {
            show,
            text,
            url
          }
        },
        isActive
      },
      cta {
        title,
        description,
        buttonText,
        buttonUrl,
        external
      },
      isActive
    }
  `
  
  const result = await client.fetch(query)
  console.log('Sanity query result:', result ? 'Found data' : 'No data')
  if (result) {
    console.log('Last updated:', result._updatedAt)
    console.log('Services list length:', result.servicesList?.length || 0)
  }
  return result
}

export async function getService(slug: string): Promise<Service | null> {
  const servicesData = await client.fetch(`
    *[_type == "services" && isActive == true][0] {
      servicesList[slug.current == $slug && isActive == true][0] {
        title,
        slug,
        description,
        image {
          ...,
          alt
        },
        features,
        pricing {
          displayType,
          customText,
          amount,
          currency,
          suffix,
          packageSessions
        },
        buttons {
          learnMore {
            show,
            text,
            url,
            external
          },
          bookNow {
            show,
            text,
            url
          }
        },
        isActive
      }
    }
  `, { slug })

  return servicesData?.servicesList || null
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
      publishedAt,
      category,
      tags,
      readingTime,
      isFeatured
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
      publishedAt,
      category,
      tags,
      readingTime,
      isFeatured
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

// Homepage
export async function getHomePage(): Promise<HomePage | null> {
  return await client.fetch(`
    *[_type == "homePage" && isActive == true][0] {
      _id,
      _type,
      title,
      metaDescription,
      hero {
        mainHeading,
        highlightText,
        description,
        backgroundImage {
          ...,
          alt
        },
        features[] | order(order asc) {
          text,
          icon,
          order
        },
        quote {
          text,
          author
        },
        ctaButtons {
          primaryButton {
            text,
            url,
            external
          },
          secondaryButton {
            text,
            url,
            external
          }
        }
      },
      isActive
    }
  `)
}

// Services Page (now integrated with Services)
export async function getServicesPage(): Promise<Services | null> {
  return await getServices()
}

// Intern Application Page
export async function getInternApplicationPage(): Promise<InternApplicationPage | null> {
  return await client.fetch(`
    *[_type == "internApplicationPage"][0] {
      _id,
      _type,
      title,
      metaDescription,
      hero {
        badge,
        heading,
        description
      },
      formFields {
        fileUploadNote,
        formQuestions[] {
          _key,
          fieldType,
          label,
          placeholder,
          required,
          options[] {
            value,
            label
          }
        }
      },
      sidebar {
        aboutSection {
          title,
          benefits
        },
        questionsSection {
          title,
          description,
          contactEmail
        }
      }
    }
  `)
}

// FAQ Page
export async function getFAQPage(): Promise<FAQPage | null> {
  return await client.fetch(`
    *[_type == "faqPage" && isActive == true][0] {
      _id,
      _type,
      title,
      metaDescription,
      hero {
        badge,
        heading,
        description
      },
      faqs[] | order(order asc) {
        question,
        answer,
        order
      },
      isActive
    }
  `)
}

// Contact Page
export async function getContactPage(): Promise<ContactPage | null> {
  return await client.fetch(`
    *[_type == "contactPage"][0] {
      _id,
      _type,
      title,
      hero {
        badge,
        heading,
        description,
        emailButtonText,
        consultationButtonText
      },
      contactForm {
        heading,
        fields {
          fullNameLabel,
          fullNamePlaceholder,
          emailLabel,
          emailPlaceholder,
          phoneLabel,
          phonePlaceholder,
          subjectLabel,
          subjectPlaceholder,
          messageLabel,
          messagePlaceholder
        },
        consentText,
        submitButtonText,
        crisisNotice
      },
      contactInfo {
        quickContact {
          heading,
          emailLabel,
          emailAddress,
          phoneLabel,
          phoneNumber,
          bookingLabel,
          bookingText,
          bookingUrl
        },
        hours {
          heading,
          schedule[] {
            days,
            hours
          },
          note
        }
      },
      finalCta {
        heading,
        description,
        buttonText,
        buttonUrl
      },
      seo {
        metaTitle,
        metaDescription
      }
    }
  `)
}

// Resources
export async function getResources(): Promise<Resource[]> {
  return await client.fetch(`
    *[_type == "resource" && isPublished == true] | order(publishedAt desc) {
      _id,
      _type,
      title,
      description,
      slug,
      previewImage {
        ...,
        alt
      },
      pdfFile {
        asset-> {
          _id,
          url,
          originalFilename,
          size
        }
      },
      category,
      tags,
      isPublished,
      isFeatured,
      publishedAt,
      fileSize
    }
  `)
}

export async function getResource(slug: string): Promise<Resource | null> {
  return await client.fetch(`
    *[_type == "resource" && slug.current == $slug && isPublished == true][0] {
      _id,
      _type,
      title,
      description,
      slug,
      previewImage {
        ...,
        alt
      },
      pdfFile {
        asset-> {
          _id,
          url,
          originalFilename,
          size
        }
      },
      category,
      tags,
      isPublished,
      isFeatured,
      publishedAt,
      fileSize
    }
  `, { slug })
}

export async function getFeaturedResources(): Promise<Resource[]> {
  return await client.fetch(`
    *[_type == "resource" && isPublished == true && isFeatured == true] | order(publishedAt desc) [0...3] {
      _id,
      _type,
      title,
      description,
      slug,
      previewImage {
        ...,
        alt
      },
      pdfFile {
        asset-> {
          _id,
          url,
          originalFilename,
          size
        }
      },
      category,
      tags,
      publishedAt,
      fileSize
    }
  `)
}

export async function getResourcesByCategory(category: string): Promise<Resource[]> {
  return await client.fetch(`
    *[_type == "resource" && isPublished == true && category == $category] | order(publishedAt desc) {
      _id,
      _type,
      title,
      description,
      slug,
      previewImage {
        ...,
        alt
      },
      pdfFile {
        asset-> {
          _id,
          url,
          originalFilename,
          size
        }
      },
      category,
      tags,
      publishedAt,
      fileSize
    }
  `, { category })
}