import { notFound } from 'next/navigation'
import { getTeamMember } from '@/lib/sanity-queries'
import { urlForImage } from '@/lib/sanity'
import { extractBioParagraphs } from '@/lib/portable-text'
import TeamMemberPage from '@/components/team/TeamMemberPage'

interface TeamMemberPageProps {
  params: Promise<{
    slug: string
  }>
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
    image: member.image ? urlForImage(member.image, { fit: 'crop' }).url() : '',
    heroImage: member.image
      ? urlForImage(member.image, { width: 1200, height: 600, fit: 'crop' }).url()
      : '',
    portraitImage: member.image
      ? urlForImage(member.image, { width: 365, height: 365, fit: 'crop' }).url()
      : '',
    bio: extractBioParagraphs(member.bio),
    specialties: member.specialties || [],
    areasOfFocus: member.areasOfFocus || [],
    socialLinks: member.socialLinks || [],
  }

  return <TeamMemberPage member={memberData} />
}
