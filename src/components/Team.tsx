'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface TeamMember {
  name: string
  credentials: string
  role: string
  image: string
  description: string
  profileLink: string
  tags: string[]
  status?: string
  specialties: string[]
  acceptsBookings?: boolean
}

const teamMembers: TeamMember[] = [
  {
    name: "Jessica Robinson-Grant",
    credentials: "MSW, RSW",
    role: "Clinical Director & Practice Owner",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m.webp",
    description: "Leading Soul Care with holistic, culturally responsive practice rooted in Christian faith.",
      profileLink: "/jessica-robinson-grant",
    tags: ["trauma-informed", "director"],
    specialties: ["Trauma-informed individual and group counselling", "Racial identity", "Depression and anxiety support", "Abuse", "Managing life transitions", "Stress management", "Identity development", "Relationship counselling", "Tools to leverage body and self care"],
    acceptsBookings: true
  },
  {
    name: "Davene Harris",
    credentials: "MA",
    role: "Operations Manager",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (1).webp",
    description: "Oversees practice operations and administrative excellence with faith-integrated leadership.",
      profileLink: "/davene-miller",
    tags: ["operations"],
    specialties: ["Practice operations & administration", "Team coordination & support", "Client services management", "Process improvement & efficiency", "Faith-integrated organizational leadership"],
    acceptsBookings: false
  },
  {
    name: "Princeton Grant",
    credentials: "ECE",
    role: "Coach",
    image: "/assets/img/team/rs=w_365,h_365,cg_true.webp",
    description: "Early childhood development specialist with parent coaching expertise.",
      profileLink: "/princeton-owusu",
    tags: ["family-couples", "coach"],
    specialties: ["Early childhood development", "Parent coaching", "Family support & education", "Child–parent relationship building"],
    acceptsBookings: true
  },
  {
    name: "Anita Kangabe",
    credentials: "MSW, RSW",
    role: "Associate Christian Therapist · Bilingual (EN/FR)",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (6).webp",
    description: "Bilingual therapist specializing in anxiety, depression, and career counselling.",
      profileLink: "/anita-owusu",
    tags: ["anxiety-depression", "bilingual"],
    specialties: ["Anxiety & Depression", "Stress Management", "Academic & Career Counselling", "Bilingual Services (EN/FR)"],
    acceptsBookings: true
  },
  {
    name: "Baraka Boafo",
    credentials: "BA, RP (Qualifying)",
    role: "Associate Christian Therapist",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (7).webp",
    description: "Faith-integrated therapy with trauma-informed, strengths-based approach.",
      profileLink: "/baraka-mwangi",
    tags: ["trauma-informed", "faith-based"],
    specialties: ["Life transitions", "Relationship issues", "Anxiety & depression", "Stress at work or school", "Narrative, CBT & family systems", "Trauma-informed, strengths-based lens", "Faith-integrated care"],
    acceptsBookings: true
  },
  {
    name: "Josh Dale",
    credentials: "MDiv, RP, CCTS-I",
    role: "Associate Christian Therapist",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (5).webp",
    description: "Specialized in addictions recovery, trauma, and faith-based therapy.",
    profileLink: "/josh-dale",
  tags: ["addictions-recovery", "trauma-informed", "mens-mental-health", "womens-mental-health"],
    specialties: ["Addictions & recovery", "Anxiety & emotional regulation", "Identity & self-esteem", "Faith & spirituality", "Trauma & attachment; adoptee trauma", "Burnout & life transitions", "DBT, CBT, Narrative, Solution-Focused, Parts work"],
    acceptsBookings: true
  },
  {
    name: "Khadian Gooden",
    credentials: "BA, MDiv, RP, CCC",
    role: "Associate Christian Therapist",
    status: "Not Accepting Clients",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (4).webp",
    description: "Trauma-informed therapy with expertise in anxiety, depression, and spirituality.",
      profileLink: "/khadian-williams",
    tags: ["anxiety-depression", "trauma-informed"],
    specialties: ["Anxiety & depression", "Emotional regulation", "Spirituality & life transitions", "Trauma-informed care", "CBT, Narrative, Solution-Focused therapy", "Individual, family & youth counselling"],
    acceptsBookings: false
  },
  {
    name: "Natalie Willis",
    credentials: "RPN, BA, MDiv",
    role: "Associate Christian Therapist",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (2).webp",
    description: "Registered Nurse and therapist specializing in trauma-informed, strengths-based care.",
      profileLink: "/natalie-mcdonald",
    tags: ["trauma-informed", "anxiety-depression"],
    specialties: ["Life transitions & burnout", "Anxiety & depression support", "Trauma-informed care", "Identity development", "Cognitive-Behavioural strategies", "Strengths-based approach"],
    acceptsBookings: true
  },
  {
    name: "Nigel Bucknor",
    credentials: "BA, MA, CCC",
    role: "Associate Christian Therapist",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (3).webp",
    description: "Specialized in teens, adults, couples, and social justice-informed therapy.",
      profileLink: "/nigel-miller",
    tags: ["family-couples", "trauma-informed"],
    specialties: ["Teens, adults & couples", "Life transitions", "Anxiety & depression", "Emotional regulation", "Trauma-informed care", "Spirituality & meaning", "CBT, Solution-Focused, Narrative therapy", "Identity, masculinity & social justice"],
    acceptsBookings: true
  },
  {
    name: "Oluseye Ashiru",
    credentials: "BSc, MSc",
    role: "Associate Christian Therapist",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (8).webp",
    description: "Christian family life practitioner specializing in parenting, couples, and marriage therapy.",
      profileLink: "/oluseye-olumide",
    tags: ["family-couples", "faith-based"],
    specialties: ["Parenting & couples", "Christian family life", "Marriage & identity", "Spiritual growth & purpose", "Holistic, faith-integrated approach", "Evidence-based practices"],
    acceptsBookings: true
  }
]

export default function Team() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member => {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = !searchQuery || 
        member.name.toLowerCase().includes(searchLower) ||
        member.credentials.toLowerCase().includes(searchLower) ||
        member.role.toLowerCase().includes(searchLower) ||
        member.description.toLowerCase().includes(searchLower) ||
        member.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchLower)
        )
      
      const matchesFilter = activeFilter === 'all' || member.tags.includes(activeFilter)
      
      return matchesSearch && matchesFilter
    })
  }, [searchQuery, activeFilter])

  // Collect all specialties from team members
  // Normalize specialty names for robust matching
  function normalizeSpecialty(str: string) {
    return str.trim().toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ');
  }
  const specialtyCounts: Record<string, number> = {}
  teamMembers.forEach(member => {
    member.specialties.forEach(spec => {
      const normalized = normalizeSpecialty(spec)
      specialtyCounts[normalized] = (specialtyCounts[normalized] || 0) + 1

    'use client'

    import { useState, useMemo, useEffect } from 'react'
    import Image from 'next/image'
    import Link from 'next/link'
    import { getTeamMembers } from '../lib/sanity-queries'

    export default function Team() {
      const [teamMembers, setTeamMembers] = useState([])
      const [loading, setLoading] = useState(true)
      const [searchQuery, setSearchQuery] = useState('')
      const [activeFilter, setActiveFilter] = useState('All Team Members')

      useEffect(() => {
        async function fetchData() {
          setLoading(true)
          const data = await getTeamMembers()
          setTeamMembers(data)
          setLoading(false)
        }
        fetchData()
      }, [])

      const filteredMembers = useMemo(() => {
        return teamMembers.filter((member) => {
          const searchLower = searchQuery.toLowerCase()
          const matchesSearch = !searchQuery ||
            member.name.toLowerCase().includes(searchLower) ||
            (member.credentials || '').toLowerCase().includes(searchLower) ||
            member.role.toLowerCase().includes(searchLower) ||
            (member.bio || '').toLowerCase().includes(searchLower) ||
            (member.specialties || []).some((specialty) =>
              specialty.toLowerCase().includes(searchLower)
            )
          const matchesFilter = activeFilter === 'All Team Members' || (member.specialties || []).includes(activeFilter)
          return matchesSearch && matchesFilter
        })
      }, [searchQuery, activeFilter, teamMembers])

      // Collect all specialties from team members
      function normalizeSpecialty(str) {
        return str.trim().toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ')
      }
      const specialtySet = new Set()
      teamMembers.forEach((member) => {
        (member.specialties || []).forEach((spec) => {
          specialtySet.add(spec.trim())
        })
      })
      const specialtyList = Array.from(specialtySet).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
      const filters = [
        {
          key: 'All Team Members',
          label: 'All Team Members',
          count: teamMembers.length
        },
        ...specialtyList.map((spec) => {
          const count = teamMembers.filter((member) => (member.specialties || []).map((s) => s.trim()).includes(spec)).length
          return {
            key: spec,
            label: spec.replace(/\b\w/g, (c) => c.toUpperCase()),
            count
          }
        })
      ]

      if (loading) {
        return <div className="py-20 text-center text-lg">Loading team members…</div>
      }

      return (
        <section id="team" className="mt-16 md:mt-24 relative overflow-hidden">
          {/* Premium background gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sand/60 via-white to-clay/30 pointer-events-none" />
          <div className="mx-auto max-w-7xl">
            <header className="max-w-2xl mx-auto text-center mb-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-bark/80 px-4 py-2 ring-2 ring-clay/30 uppercase tracking-[.22em] text-[13px] text-white shadow-lg font-semibold">
                Our Team
              </span>
              <h2 className="mt-5 font-heading text-4xl md:text-5xl font-extrabold text-bark drop-shadow-lg">
                Warm, Culturally Responsive Clinicians
              </h2>
              <p className="mt-5 text-lg text-charcoal/90 font-medium">
                Faith-informed and evidence-based care.<br />
                <span className="text-clay/80">Meet the people who will support your healing.</span>
              </p>
            </header>

            {/* Toolbar: dropdown on mobile, tabs on desktop */}
            <div className="mt-6 flex flex-wrap items-center gap-3 sticky top-0 z-10 bg-white/90 backdrop-blur-md py-3 shadow-sm rounded-xl">
              <label htmlFor="teamSearch" className="sr-only">Search team</label>
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
                  onChange={e => setActiveFilter(e.target.value)}
                  className="w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm font-semibold text-bark focus:border-clay focus:ring-2 focus:ring-clay/40"
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
                {filters.map(filter => (
                  <button
                    key={filter.key}
                    type="button"
                    aria-label={`Filter by ${filter.label}`}
                    onClick={() => setActiveFilter(filter.key)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveFilter(filter.key);
                      }
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold shadow-sm border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-bark/40 focus:ring-offset-2
                      ${activeFilter === filter.key
                        ? 'bg-gradient-to-r from-clay to-bark text-white border-bark scale-105 ring-2 ring-bark/30'
                        : 'bg-white text-charcoal border-charcoal/10 hover:bg-sand/60 hover:scale-105'}
                    `}
                    aria-pressed={activeFilter === filter.key}
                    style={{ minWidth: 120 }}
                  >
                    <span className="font-bold tracking-wide text-bark">{filter.label}</span>
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
              {filteredMembers.map((member) => (
                <li key={member._id} className="team-card">
                  <article className="h-full rounded-3xl bg-white/95 ring-2 ring-clay/10 shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] flex flex-col justify-between">
                    <div className="p-6 pb-2">
                      <div className="flex items-center gap-4 mb-3">
                        <Image 
                          src={member.image && member.image.asset ? `/api/sanity-image?imageId=${member.image.asset._ref}` : '/assets/img/team/placeholder.webp'}
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
                      <p className="mt-2 text-[15px] text-charcoal/90 font-medium leading-relaxed">{member.bio}</p>
                    </div>
                    <div className="mt-4 team-cta px-6 pb-6" style={{ minHeight: '3.5rem' }}>
                      <Link 
                        href={`/${member.slug?.current || ''}`} 
                        className="cta-label text-base font-bold text-white bg-clay hover:bg-bark px-5 py-2 rounded-full shadow-md transition-colors duration-150 block text-center"
                        style={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          overflow: 'hidden'
                        }}
                      >
                        View Profile
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )
    }
            Faith-informed and evidence-based care.<br />
            <span className="text-clay/80">Meet the people who will support your healing.</span>
          </p>
        </header>

        {/* Toolbar: dropdown on mobile, tabs on desktop */}
        <div className="mt-6 flex flex-wrap items-center gap-3 sticky top-0 z-10 bg-white/90 backdrop-blur-md py-3 shadow-sm rounded-xl">
          <label htmlFor="teamSearch" className="sr-only">Search team</label>
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
              onChange={e => setActiveFilter(e.target.value)}
              className="w-full rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm font-semibold text-bark focus:border-clay focus:ring-2 focus:ring-clay/40"
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
            {filters.map(filter => (
              <button
                key={filter.key}
                type="button"
                aria-label={`Filter by ${filter.label}`}
                onClick={() => setActiveFilter(filter.key)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveFilter(filter.key);
                  }
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold shadow-sm border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-bark/40 focus:ring-offset-2
                  ${activeFilter === filter.key
                    ? 'bg-gradient-to-r from-clay to-bark text-white border-bark scale-105 ring-2 ring-bark/30'
                    : 'bg-white text-charcoal border-charcoal/10 hover:bg-sand/60 hover:scale-105'}
                `}
                aria-pressed={activeFilter === filter.key}
                style={{ minWidth: 120 }}
              >
                <span className="font-bold tracking-wide text-bark">{filter.label}</span>
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
          {filteredMembers.map((member) => (
            <li key={member.name} className="team-card">
              <article className="h-full rounded-3xl bg-white/95 ring-2 ring-clay/10 shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] flex flex-col justify-between">
                <div className="p-6 pb-2">
                  <div className="flex items-center gap-4 mb-3">
                    <Image 
                      src={member.image} 
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
                  <p className="mt-2 text-[15px] text-charcoal/90 font-medium leading-relaxed">{member.description}</p>
                </div>
                <div className="mt-4 team-cta px-6 pb-6" style={{ minHeight: '3.5rem' }}>
                  <Link 
                    href={member.profileLink} 
                    className="cta-label text-base font-bold text-white bg-clay hover:bg-bark px-5 py-2 rounded-full shadow-md transition-colors duration-150 block text-center"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      overflow: 'hidden'
                    }}
                  >
                    View Profile
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}