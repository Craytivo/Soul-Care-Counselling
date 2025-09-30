"use client";
import Hero from "../components/Hero";
import SanityTeamClient from "../components/SanityTeamClient";
import type { TeamMember, HomePage } from "@/lib/sanity";

interface HomeClientProps {
  teamMembers: TeamMember[];
  homePageData: HomePage | null;
}

export default function HomeClient({ teamMembers, homePageData }: HomeClientProps) {
  return (
    <div className="-mx-4 -my-12">
      {/* Fullscreen Hero - normal flow, breaks out of main layout */}
      <Hero homePageData={homePageData} />
      
      {/* Team section follows after hero with normal layout */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <SanityTeamClient teamMembers={teamMembers} />
        </div>
      </section>
    </div>
  );
}
