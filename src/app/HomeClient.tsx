"use client";
import Hero from "../components/Hero";
import SanityTeamClient from "../components/SanityTeamClient";
import type { TeamMember, HomePage } from "@/lib/sanity";

interface HomeClientProps {
  teamMembers: TeamMember[];
  homePageData?: HomePage | null;
}

export default function HomeClient({ teamMembers, homePageData }: HomeClientProps) {
  return (
    <>
      <Hero homePageData={homePageData} />
      <SanityTeamClient teamMembers={teamMembers} />
    </>
  );
}
