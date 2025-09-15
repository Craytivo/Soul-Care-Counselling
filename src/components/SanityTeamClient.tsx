"use client";

import { useState, useMemo } from "react";
import SanityTeam, { getFilters, filterMembers } from "./SanityTeam";
import { getTeamMembers } from "@/lib/sanity-queries";
import { urlFor } from "@/lib/sanity";
import type { TeamMember } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

export default function SanityTeamClient({ teamMembers }: { teamMembers: TeamMember[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = useMemo(() => getFilters(teamMembers), [teamMembers]);
  const filteredMembers = useMemo(
    () => filterMembers(teamMembers, searchQuery, activeFilter),
    [teamMembers, searchQuery, activeFilter]
  );

  return (
    <section id="team" className="mt-16 md:mt-24">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-sand/70 px-3 py-1 ring-1 ring-charcoal/10 uppercase tracking-[.22em] text-[11px] text-charcoal/80">
            Our Team
          </span>
          <h2 className="mt-3 font-heading text-2xl md:text-3xl font-bold text-charcoal">
            Warm, culturally responsive clinicians
          </h2>
          <p className="mt-3 text-charcoal/80">
            Faith-informed and evidence-based care. Meet the people who will support your healing.
          </p>
        </header>

        {/* Toolbar */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <label htmlFor="teamSearch" className="sr-only">Search team</label>
          <input
            id="teamSearch"
            type="search"
            placeholder="Search by name, specialty, credential, or approach…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-clay"
            autoComplete="off"
          />
          <div className="flex flex-wrap gap-2" aria-label="Filter tags">
            {filters.map((filter) => (
              <button
                key={filter.key}
                className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-charcoal/15 transition-colors ${
                  activeFilter === filter.key
                    ? 'bg-clay text-charcoal'
                    : 'bg-white hover:bg-sand'
                }`}
                aria-pressed={activeFilter === filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
                {filter.count > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-charcoal/10 text-charcoal/70">
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <ul role="list" className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch">
          {filteredMembers.map((member) => (
            <li key={member._id} className="team-card">
              <article className="h-full rounded-2xl bg-white ring-1 ring-charcoal/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={urlFor(member.image).width(48).height(48).url()}
                      alt={member.name}
                      className="h-12 w-12 rounded-full object-cover"
                      width={48}
                      height={48}
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-charcoal">{member.name}</h3>
                      {member.credentials && (
                        <p className="text-sm text-charcoal/70">{member.credentials}</p>
                      )}
                      <p className="text-xs text-charcoal/60">{member.role}</p>
                      {!member.acceptsBookings && (
                        <p className="text-xs text-charcoal/50">Not Accepting Clients</p>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-charcoal/80 line-clamp-3">{member.bio}</p>

                  {/* Specialties */}
                  {member.specialties && member.specialties.length > 0 && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.slice(0, 3).map((specialty, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-sand/50 text-charcoal/70 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                        {member.specialties.length > 3 && (
                          <span className="inline-block px-2 py-1 text-xs bg-sand/50 text-charcoal/70 rounded-full">
                            +{member.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 team-cta" style={{ minHeight: '3.5rem' }}>
                    <Link
                      href={`/${member.slug.current}`}
                      className="cta-label text-sm font-medium text-clay hover:text-bark block"
                      style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                      }}
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
