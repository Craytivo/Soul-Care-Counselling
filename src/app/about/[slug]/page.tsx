import { notFound } from 'next/navigation'
import { getTeamMember, getTeamMembers } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import { extractBioParagraphs } from '@/lib/portable-text'
import TeamMemberPage from '@/components/team/TeamMemberPage'

interface TeamMemberPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static pages for all team members at build time
export async function generateStaticParams() {
  const members = await getTeamMembers()
  return members.map((member) => ({
    slug: member.slug.current,
  }))
}

export default async function TeamMemberRoute({ params }: TeamMemberPageProps) {
  const { slug } = await params
  const member = await getTeamMember(slug)

  if (!member) {
    notFound()
  }

  // Convert Sanity types to component types
  const memberData = {
    ...member,
    image: member.image ? urlFor(member.image).url() : '',
    bio: extractBioParagraphs(member.bio),
    specialties: member.specialties || [],
    areasOfFocus: member.areasOfFocus || [],
    socialLinks: member.socialLinks || [],
  }

  return <TeamMemberPage member={memberData} />
}
