import type { Metadata } from 'next'

export const revalidate = 0
import TeamMemberPage from '../../components/TeamMemberPage'

export const metadata: Metadata = {
  title: 'Soul Care — Khadian Gooden',
  description: 'Bio for Khadian Gooden — Associate Christian Therapist at Soul Care Counselling.',
}

import { getTeamMember } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'

export default async function KhadianPage() {
  const member = await getTeamMember('khadian-williams')
  if (!member) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-charcoal">Team Member Not Found</h1>
        <p className="mt-2 text-charcoal/70">The requested team member could not be found.</p>
      </div>
    )
  }
  const memberData = {
    name: member.name,
    credentials: member.credentials || '',
    role: member.role,
    image: member.image ? urlFor(member.image).width(400).height(400).url() : '/assets/img/team/placeholder.webp',
    bio: member.bio ? [member.bio] : ['Professional bio coming soon.'],
    specialties: member.specialties || [],
    areasOfFocus: member.areasOfFocus || [],
    socialLinks: member.socialLinks || [],
    acceptsBookings: member.acceptsBookings
  }
  return <TeamMemberPage member={memberData} />
}
