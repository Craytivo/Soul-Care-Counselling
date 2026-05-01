import { notFound } from 'next/navigation'
import { getTeamMember } from '@/lib/sanity-queries'
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

  return <TeamMemberPage member={member} />
}
