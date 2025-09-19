"use client";

import { useState, useMemo } from "react";
import SanityTeam, { getFilters, filterMembers } from "./SanityTeam";
import { getTeamMembers } from "@/lib/sanity-queries";
import { urlFor } from "@/lib/sanity";
import type { TeamMember } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SanityTeamClient({ teamMembers }: { teamMembers: TeamMember[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Use the provided specialty list for tabs, preserving order and capitalization
  const specialtyTabs = [
    "Anxiety",
    "Depression",
    "Trauma",
    "Stress management",
    "Youth",
    "Women’s mental health",
    "Men’s mental health",
    "Couples",
    "Family",
    "Addiction",
    "Religious trauma",
    "Spiritual abuse",
    "Workplace stress",
    "Bilingual",
    "Art therapy",
    "Affordable therapy",
    "Parent coaching",
    "Family coaching",
    "Parent workshops"
  ];

  const filters = useMemo(() => [
    { key: "all", label: "All Team Members", count: teamMembers.length },
    ...specialtyTabs.map(s => {
      const normalized = s.trim().toLowerCase();
      const count = teamMembers.filter(m => m.specialties?.some(x => x.trim().toLowerCase() === normalized)).length;
      return {
        key: s,
        label: s,
        count
      };
    })
  ], [teamMembers]);

  const filteredMembers = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();
    return teamMembers.filter(member => {
      // Search by name or specialty
      const matchesSearch =
        !searchQuery ||
        member.name.toLowerCase().includes(searchLower) ||
        (member.specialties && member.specialties.some(s => s.toLowerCase().includes(searchLower)));

      if (activeFilter === "all") return matchesSearch;
      // Filter by specialty (case-insensitive, trimmed)
      const normalizedFilter = activeFilter.trim().toLowerCase();
      return matchesSearch && member.specialties?.some(x => x.trim().toLowerCase() === normalizedFilter);
    });
  }, [teamMembers, searchQuery, activeFilter]);

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

        {/* Toolbar: dropdown on mobile, tabs on desktop */}
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
          {/* Dropdown for filters on mobile */}
          <div className="w-full block md:hidden mt-3">
            <select
              value={activeFilter}
              onChange={e => setActiveFilter(e.target.value)}
              className="w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm font-semibold text-charcoal focus:border-clay focus:ring-2 focus:ring-clay/40"
              aria-label="Filter team by specialty"
            >
              {filters.map(filter => (
                <option key={filter.key} value={filter.key}>
                  {filter.label} {filter.count > 0 ? `(${filter.count})` : ''}
                </option>
              ))}
            </select>
          </div>
          {/* Tabs for filters on desktop */}
          <div className="hidden md:flex flex-wrap gap-2" aria-label="Filter tags">
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
          {filteredMembers.map((member, idx) => (
            <motion.li
              key={member._id}
              className="team-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
            >
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
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
