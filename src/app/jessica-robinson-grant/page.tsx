import type { Metadata } from 'next'
import { getTeamMember } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText, PortableTextBlock } from '@portabletext/react'
import TeamMemberPage from '@/components/TeamMemberPage'

export const metadata: Metadata = {
  title: 'Jessica Robinson-Grant — Soul Care Counselling',
  description: 'Meet Jessica Robinson-Grant, Clinical Director at Soul Care Counselling.',
}

export default async function JessicaPage() {
  const member = await getTeamMember('jessica-robinson-grant')
  
  if (!member) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-charcoal">Team Member Not Found</h1>
        <p className="mt-2 text-charcoal/70">The requested team member could not be found.</p>
      </div>
    )
  }

  // Convert Sanity data to TeamMemberPage format
  const memberData = {
    name: member.name,
    credentials: member.credentials || '',
    role: member.role,
    image: member.image ? urlFor(member.image).width(800).height(800).url() : '/assets/img/team/placeholder.webp',
    bio: member.bio
      ? member.bio.split(/\n+/).map(p => p.trim()).filter(Boolean)
      : ['Professional bio coming soon.'],
    specialties: [
    "Anxiety",
    "Depression",
    "Trauma",
    "Stress management",
    "Youth",
    "Women's mental health",
    "Religious trauma",
    "Spiritual abuse",
    "Workplace stress",
    "Family"
  ],
    areasOfFocus: member.areasOfFocus || [],
    socialLinks: member.socialLinks || [],
    acceptsBookings: member.acceptsBookings
  }

  return <TeamMemberPage member={memberData} />
}
