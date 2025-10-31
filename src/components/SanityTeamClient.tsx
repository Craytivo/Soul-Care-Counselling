"use client";

import { useState, useMemo } from "react";
import { urlFor } from "@/lib/sanity";
import type { TeamMember } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SanityTeamClient({ teamMembers }: { teamMembers: TeamMember[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");


  // Normalization helper to make comparisons resilient to curly apostrophes & case differences
  const normalize = (val: string) => val
    .replace(/[’‘‛`´]/g, "'") // unify any apostrophe-like character
    .replace(/\s+/g, ' ')      // collapse extra whitespace
    .trim()
    .toLowerCase();

  const filters = useMemo(() => {
    const specialtyTabs = [
      "Anxiety",
      "Depression",
      "Trauma",
      "Stress management",
      "Youth",
      "Women's mental health",
      "Men's mental health",
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
    return [
      { key: "all", label: "All Team Members", count: teamMembers.length },
      ...specialtyTabs.map(s => {
        const normalizedTab = normalize(s);
        const count = teamMembers.filter(m => m.specialties?.some(x => normalize(x) === normalizedTab)).length;
        return { key: s, label: s, count };
      })
    ];
  }, [teamMembers]);

  const filteredMembers = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();
    return teamMembers.filter(member => {
      // Enhanced search by name (first name, last name, full name)
      const fullName = member.name.toLowerCase();
      const nameParts = member.name.toLowerCase().split(' ');
      const matchesName = !searchQuery ||
        fullName.includes(searchLower) ||
        nameParts.some(part => part.includes(searchLower)) ||
        nameParts.some(part => part.startsWith(searchLower));

      // Search by specialty
      const matchesSpecialty = !searchQuery ||
        (member.specialties && member.specialties.some(s => normalize(s).includes(searchLower)));

      const matchesSearch = matchesName || matchesSpecialty;

      if (activeFilter === "all") return matchesSearch;
      // Filter by specialty (case-insensitive, trimmed)
      const normalizedFilter = normalize(activeFilter);
      return matchesSearch && member.specialties?.some(x => normalize(x) === normalizedFilter);
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
            aria-label="Search team members by name, specialty, credential, or approach"
          />
          {/* Dropdown for filters on mobile */}
          <div className="w-full block md:hidden mt-3">
            <select
              value={activeFilter}
              onChange={e => setActiveFilter(e.target.value)}
              className="w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm font-semibold text-charcoal focus:border-clay focus:ring-2 focus:ring-clay/40"
              aria-label="Filter team by specialty"
              id="teamFilter"
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
                type="button"
                aria-label={`Filter by ${filter.label}`}
                className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-charcoal/15 transition-colors focus:outline-none focus:ring-2 focus:ring-bark/40 focus:ring-offset-2 ${
                  activeFilter === filter.key
                    ? 'bg-clay text-charcoal'
                    : 'bg-white hover:bg-sand'
                }`}
                aria-pressed={activeFilter === filter.key}
                onClick={() => setActiveFilter(filter.key)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveFilter(filter.key);
                  }
                }}
              >
                <span className="text-bark font-bold">{filter.label}</span>
                {filter.count > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-charcoal/20 text-bark font-semibold">
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

                  <p className="mt-3 text-sm text-charcoal/80 line-clamp-3">{
                    Array.isArray(member.bio)
                      ? member.bio.join(' ')
                      : (typeof member.bio === 'string' ? member.bio : '')
                  }</p>

                  {/* Specialties */}
                  {member.specialties && member.specialties.length > 0 && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(member.specialties) && member.specialties.slice(0, 3).map((specialty, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-sand/50 text-charcoal/70 rounded-full"
                          >
                            {typeof specialty === 'string' ? specialty : ''}
                          </span>
                        ))}
                        {Array.isArray(member.specialties) && member.specialties.length > 3 && (
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
