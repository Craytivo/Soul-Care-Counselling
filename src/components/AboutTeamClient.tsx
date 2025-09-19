"use client";
import SanityTeamClient from "./SanityTeamClient";
import type { TeamMember } from "@/lib/sanity";

export default function AboutTeamClient({ teamMembers }: { teamMembers: TeamMember[] }) {
  return <SanityTeamClient teamMembers={teamMembers} />;
}
