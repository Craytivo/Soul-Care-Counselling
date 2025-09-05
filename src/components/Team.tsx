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
    profileLink: "/jessica",
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
    profileLink: "/davene",
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
    profileLink: "/princeton",
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
    profileLink: "/anita",
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
    profileLink: "/baraka",
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
    profileLink: "/josh",
    tags: ["addictions-recovery", "trauma-informed"],
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
    profileLink: "/khadian",
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
    profileLink: "/natalie",
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
    profileLink: "/nigel",
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
    profileLink: "/oluseye",
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

  const filters = [
    { key: 'all', label: 'All Team Members', count: teamMembers.length },
    { key: 'trauma-informed', label: 'Trauma-Informed Care', count: teamMembers.filter(m => m.tags.includes('trauma-informed')).length },
    { key: 'anxiety-depression', label: 'Anxiety & Depression', count: teamMembers.filter(m => m.tags.includes('anxiety-depression')).length },
    { key: 'family-couples', label: 'Family & Couples', count: teamMembers.filter(m => m.tags.includes('family-couples')).length },
    { key: 'addictions-recovery', label: 'Addictions & Recovery', count: teamMembers.filter(m => m.tags.includes('addictions-recovery')).length },
    { key: 'faith-based', label: 'Faith-Based Therapy', count: teamMembers.filter(m => m.tags.includes('faith-based')).length },
    { key: 'bilingual', label: 'Bilingual Services', count: teamMembers.filter(m => m.tags.includes('bilingual')).length }
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
            placeholder="Search by name, specialty, credential, or approach…"
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