"use client";


import { useState, useMemo, useEffect } from "react";
import PortableText from "./PortableText";
import Image from "next/image";
import Link from "next/link";
import { getTeamMembers } from "../lib/sanity-queries";

interface TeamMember {
  _id: string;
  name: string;
  credentials?: string;
  role: string;
  image?: {
    asset?: {
      _ref: string;
    };
  };
  bio?: string;
  status?: string;
  specialties?: string[];
  slug?: { current: string };
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  // Removed unused loading state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("All Team Members");

  useEffect(() => {
    async function fetchData() {
      const data = await getTeamMembers();
      setTeamMembers(data);
    }
    fetchData();
  }, []);

  const filteredMembers = useMemo(() => {
    return teamMembers.filter((member: TeamMember) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        member.name.toLowerCase().includes(searchLower) ||
        (member.credentials || "").toLowerCase().includes(searchLower) ||
        member.role.toLowerCase().includes(searchLower) ||
        (member.bio || "").toLowerCase().includes(searchLower) ||
        (member.specialties || []).some((specialty: string) =>
          specialty.toLowerCase().includes(searchLower)
        );
      const matchesFilter =
        activeFilter === "All Team Members" ||
        (member.specialties || []).some(
          (s: string) => s.trim().toLowerCase() === activeFilter.trim().toLowerCase()
        );
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, teamMembers]);

  // Collect all specialties from team members (case-insensitive, trimmed, but display original)
  const specialtyMap = new Map<string, string>(); // normalized -> original
  teamMembers.forEach((member: TeamMember) => {
    (member.specialties || []).forEach((spec: string) => {
      const normalized = spec.trim().toLowerCase();
      if (!specialtyMap.has(normalized)) {
        specialtyMap.set(normalized, spec.trim());
      }
    });
  });
  const filters = [
    {
      key: "All Team Members",
      label: "All Team Members",
      count: teamMembers.length,
    },
    ...Array.from(specialtyMap.entries()).map(([normalized, original]) => ({
      key: original,
      label: original,
      count: teamMembers.filter((m) => (m.specialties || []).some((s) => s.trim().toLowerCase() === normalized)).length,
    })),
  ];

  return (
    <section className="py-8">
      <header>
        <h2 className="text-3xl font-bold text-bark mb-2">Meet Our Team</h2>
        <p className="text-lg text-charcoal/80 mb-6">
          Our diverse team of Christian therapists and staff are dedicated to holistic, culturally responsive care.
        </p>
      </header>

      {/* Toolbar: dropdown on mobile, tabs on desktop */}
      <div className="mt-6 flex flex-wrap items-center gap-3 sticky top-0 z-10 bg-white/90 backdrop-blur-md py-3 shadow-sm rounded-xl">
        <label htmlFor="teamSearch" className="sr-only">
          Search team
        </label>
        <input
          id="teamSearch"
          type="search"
          placeholder="Search by name, specialty, credential, or approach…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-80 rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-clay"
          autoComplete="off"
          aria-label="Search team members by name, specialty, credential, or approach"
        />
        {/* Dropdown for filters on mobile */}
        <div className="w-full block md:hidden mt-3">
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm font-semibold text-bark focus:border-clay focus:ring-2 focus:ring-clay/40"
            aria-label="Filter team by specialty"
            id="teamFilter"
          >
            {filters.map((filter) => (
              <option key={String(filter.key)} value={String(filter.key)}>
                {String(filter.label)} {filter.count > 0 ? `(${filter.count})` : ""}
              </option>
            ))}
          </select>
        </div>
        {/* Tabs for filters on desktop */}
        <div className="hidden md:flex flex-wrap gap-2" aria-label="Filter tags">
          {filters.map((filter) => (
            <button
              key={String(filter.key)}
              type="button"
              aria-label={`Filter by ${String(filter.label)}`}
              onClick={() => setActiveFilter(String(filter.key))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveFilter(String(filter.key));
                }
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold shadow-sm border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-bark/40 focus:ring-offset-2
                ${activeFilter === filter.key
                  ? "bg-gradient-to-r from-clay to-bark text-white border-bark scale-105 ring-2 ring-bark/30"
                  : "bg-white text-charcoal border-charcoal/10 hover:bg-sand/60 hover:scale-105"}
              `}
              aria-pressed={activeFilter === filter.key}
              style={{ minWidth: 120 }}
            >
              <span className="font-bold tracking-wide text-bark">{String(filter.label)}</span>
              {filter.count > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-bark/20 text-bark font-semibold text-[11px]">
                  {filter.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <ul role="list" className="mt-8 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch">
        {filteredMembers.map((member: TeamMember) => (
          <li key={member._id} className="team-card">
            <article className="h-full rounded-3xl bg-white/95 ring-2 ring-clay/10 shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] flex flex-col justify-between">
              <div className="p-6 pb-2">
                <div className="flex items-center gap-4 mb-3">
                  <Image
                    src={member.image && member.image.asset ? `/api/sanity-image?imageId=${member.image.asset._ref}` : "/assets/img/team/placeholder.webp"}
                    alt={member.name}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-clay/30 shadow-md"
                    width={64}
                    height={64}
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-bark text-lg leading-tight drop-shadow-sm">{member.name}</h3>
                    <p className="text-sm text-clay/80 font-semibold">{member.credentials}</p>
                    <p className="text-xs text-charcoal/70 font-medium">{member.role}</p>
                    {member.status && (
                      <p className="text-xs text-bark/60 font-semibold mt-1">{member.status}</p>
                    )}
                  </div>
                </div>
                <div className="mt-2 text-[15px] text-charcoal/90 font-medium leading-relaxed">
                  <PortableText value={Array.isArray(member.bio) ? member.bio : (member.bio ? [{children: [{text: member.bio}], _type: 'block'}] : [])} />
                </div>
              </div>
              <div className="mt-4 team-cta px-6 pb-6" style={{ minHeight: "3.5rem" }}>
                <Link
                  href={`/${member.slug?.current || ""}`}
                  className="cta-label text-base font-bold text-white bg-clay hover:bg-bark px-5 py-2 rounded-full shadow-md transition-colors duration-150 block text-center"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                  }}
                >
                  View Profile
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}