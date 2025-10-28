import type { Metadata } from 'next'
export const revalidate = 0
import { getTeamMember } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import TeamMemberPage from '../../components/TeamMemberPage'

export const metadata: Metadata = {
  title: 'Soul Care — Natalie Willis',
  description: 'Bio for Natalie Willis — Associate Christian Therapist at Soul Care Counselling.',
}

export default async function NataliePage() {
  const member = await getTeamMember('natalie-mcdonald')
  if (!member) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-charcoal">Team Member Not Found</h1>
        <p className="mt-2 text-charcoal/70">The requested team member could not be found.</p>
      </div>
    )
  }
  // Convert Portable Text bio to string[] for TeamMemberPage
  let bio: string[] = ['Professional bio coming soon.'];
  if (Array.isArray(member.bio) && member.bio.length > 0) {
    bio = member.bio
      .filter((block): block is { children: { text?: string }[] } =>
        block && typeof block === 'object' && 'children' in block && Array.isArray((block as { children?: unknown }).children)
      )
      .map((block) =>
        block.children.map((child: { text?: string }) => child.text || '').join(' ').trim()
      )
      .filter((text: string) => text.length > 0);
    if (bio.length === 0) bio = ['Professional bio coming soon.'];
  }
  const memberData = {
    name: member.name,
    credentials: member.credentials || '',
    role: member.role,
    image: member.image ? urlFor(member.image).width(400).height(400).url() : '/assets/img/team/placeholder.webp',
    bio,
    specialties: member.specialties || [],
    areasOfFocus: member.areasOfFocus || [],
    socialLinks: member.socialLinks || [],
    acceptsBookings: member.acceptsBookings
  }
  return <TeamMemberPage member={memberData} />
}
