import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
import { getTeamMember } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'

import TeamMemberPage from '../../components/TeamMemberPage'

export const metadata: Metadata = {
  title: 'Christiana — Soul Care Counselling',
  description: 'Meet Christiana, a dedicated therapist at Soul Care Counselling.',
}

export default async function ChristianaPage() {
  const member = await getTeamMember('christiana-takyi')
  
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
    image: member.image ? urlFor(member.image).width(400).height(400).url() : '/assets/img/team/placeholder.webp',
    bio: member.bio ? [member.bio] : ['Professional bio coming soon.'],
    specialties: [
    "Affordable therapy",
    "Anxiety",
    "Depression",
    "Trauma",
    "Stress management",
    "Youth",
    "Women's mental health"
  ],
    areasOfFocus: member.areasOfFocus || [],
    socialLinks: member.socialLinks || [],
    acceptsBookings: member.acceptsBookings
  }

  return <TeamMemberPage member={memberData} />
}
