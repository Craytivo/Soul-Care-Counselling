"use client";
import Hero from "../components/Hero";
import SanityTeamClient from "../components/SanityTeamClient";
import type { TeamMember } from "@/lib/sanity";

export default function HomeClient({ teamMembers }: { teamMembers: TeamMember[] }) {
  return (
    <>
      <Hero />
      <SanityTeamClient teamMembers={teamMembers} />
    </>
  );
}
