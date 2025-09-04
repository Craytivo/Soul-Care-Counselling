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
}

const teamMembers: TeamMember[] = [
  {
    name: "Jessica Robinson-Grant",
    credentials: "MSW, RSW",
    role: "Clinical Director & Practice Owner",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m.webp",
    description: "Leading Soul Care with holistic, culturally responsive practice rooted in Christian faith.",
    profileLink: "/jessica",
    tags: ["director", "therapist"]
  },
  {
    name: "Davene Harris",
    credentials: "MA",
    role: "Operations Manager",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (1).webp",
    description: "Compassionate therapy with a focus on trauma-informed care and cultural sensitivity.",
    profileLink: "/davene",
    tags: ["therapist"]
  },
  {
    name: "Princeton Grant",
    credentials: "ECE",
    role: "Coach",
    image: "/assets/img/team/rs=w_365,h_365,cg_true.webp",
    description: "Faith-based counselling with expertise in men's mental health and relationship therapy.",
    profileLink: "/princeton",
    tags: ["coach"]
  },
  {
    name: "Anita Kangabe",
    credentials: "MSW, RSW (Bilingual in English and French)",
    role: "Associate Christian Therapist",
    status: "Not Accepting Clients",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (6).webp",
    description: "Culturally responsive therapy with a focus on immigrant and refugee mental health.",
    profileLink: "/anita",
    tags: ["therapist", "bilingual"]
  },
  {
    name: "Baraka Boafo",
    credentials: "BA, RP (Qualifying)",
    role: "Therapist",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (7).webp",
    description: "Holistic approach to therapy integrating faith, culture, and evidence-based practices.",
    profileLink: "/baraka",
    tags: ["therapist", "qualifying"]
  },
  {
    name: "Josh Dale",
    credentials: "MDiv, RP, CCTS-I",
    role: "Associate Christian Therapist",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (4).webp",
    description: "Specialized in anxiety, depression, and life transitions with a faith-based approach.",
    profileLink: "/josh",
    tags: ["therapist"]
  },
  {
    name: "Khadian Gooden",
    credentials: "BA, MDiv, RP, CCC",
    role: "Associate Christian Therapist",
    status: "Not Accepting Clients",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (5).webp",
    description: "Trauma-informed therapy with expertise in racial identity and cultural healing.",
    profileLink: "/khadian",
    tags: ["therapist"]
  },
  {
    name: "Natalie Willis",
    credentials: "RPN, BA, MDiv",
    role: "Associate Christian Therapist",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (2).webp",
    description: "Compassionate care for individuals and families navigating life's challenges.",
    profileLink: "/natalie",
    tags: ["therapist"]
  },
  {
    name: "Nigel Bucknor",
    credentials: "BA, MA, CCC",
    role: "Associate Christian Therapist",
    status: "Not Accepting Clients",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (3).webp",
    description: "Faith-based therapy with a focus on men's mental health and spiritual growth.",
    profileLink: "/nigel",
    tags: ["therapist"]
  },
  {
    name: "Oluseye Ashiru",
    credentials: "BSc, MSc",
    role: "Associate Christian Therapist",
    image: "/assets/img/team/rs=w_365,h_365,cg_true,m (8).webp",
    description: "Culturally sensitive therapy with expertise in immigrant mental health and trauma.",
    profileLink: "/oluseye",
    tags: ["therapist"]
  }
]

export default function Team() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member => {
      const matchesSearch = !searchQuery || 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.credentials.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesFilter = activeFilter === 'all' || member.tags.includes(activeFilter)
      
      return matchesSearch && matchesFilter
    })
  }, [searchQuery, activeFilter])

  const filters = [
    { key: 'therapist', label: 'Therapists' },
    { key: 'coach', label: 'Coach' },
    { key: 'bilingual', label: 'Bilingual' },
    { key: 'director', label: 'Director' },
    { key: 'qualifying', label: 'RP (Qualifying)' },
    { key: 'all', label: 'All' }
  ]

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
            placeholder="Search by name, role, credential…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 rounded-md border border-charcoal/20 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-clay"
            autoComplete="off" 
          />
          <div className="flex flex-wrap gap-2" aria-label="Filter tags">
            {filters.map(filter => (
              <button 
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-charcoal/15 transition-colors ${
                  activeFilter === filter.key 
                    ? 'bg-clay text-charcoal' 
                    : 'bg-white hover:bg-sand'
                }`}
                aria-pressed={activeFilter === filter.key}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <ul role="list" className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch">
          {filteredMembers.map((member) => (
            <li key={member.name} className="team-card">
              <article className="h-full rounded-2xl bg-white ring-1 ring-charcoal/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      className="h-12 w-12 rounded-full object-cover" 
                      width={48}
                      height={48}
                      loading="lazy" 
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-charcoal">{member.name}</h3>
                      <p className="text-sm text-charcoal/70">{member.credentials}</p>
                      <p className="text-xs text-charcoal/60">{member.role}</p>
                      {member.status && (
                        <p className="text-xs text-charcoal/50">{member.status}</p>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-charcoal/80">{member.description}</p>
                  <div className="mt-4 team-cta" style={{ minHeight: '3.5rem' }}>
                    <Link 
                      href={member.profileLink} 
                      className="cta-label text-sm font-medium text-clay hover:text-bark block"
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
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}