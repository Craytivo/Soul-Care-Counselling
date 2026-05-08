'use client'
import Hero from '../components/Hero'
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

      <section className="relative z-20 -mt-14 rounded-t-[2rem] border-t border-white/70 bg-cream shadow-[0_-22px_55px_rgba(35,32,27,0.16)] sm:-mt-16 sm:rounded-t-[2.5rem] lg:-mt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-clay/35 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-10 sm:px-8 md:px-10 md:pb-16 md:pt-12 lg:pb-20 xl:px-12">
          <SanityTeamClient teamMembers={teamMembers} />
        </div>
      </section>
    </div>
  )
}
