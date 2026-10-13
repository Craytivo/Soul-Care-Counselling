'use client'
import Hero from '../components/Hero'
import HeroContent from '../components/home/HeroContent'
import SanityTeamClient from '../components/SanityTeamClient'
import type { TeamMember, HomePage } from '@/lib/sanity'

interface HomeClientProps {
  teamMembers: TeamMember[]
  homePageData: HomePage | null
}

export default function HomeClient({ teamMembers, homePageData }: HomeClientProps) {
  return (
    <div className="-mx-4 -my-12 bg-cream">
      {/* Fullscreen Hero - normal flow, breaks out of main layout */}
      <Hero homePageData={homePageData} />

      {/* Hero Content Section - text content below hero image */}
      <HeroContent homePageData={homePageData} />

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-10 sm:px-8 md:px-10 md:pb-16 md:pt-12 lg:pb-20 xl:px-12">
          <SanityTeamClient teamMembers={teamMembers} />
        </div>
      </section>
    </div>
  )
}
