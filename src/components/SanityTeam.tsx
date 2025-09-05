'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getTeamMembers } from '../lib/sanity-queries'
import { TeamMember } from '../lib/sanity'

export default function SanityTeam() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const members = await getTeamMembers()
        setTeamMembers(members)
      } catch (err) {
        setError('Failed to load team members')
        console.error('Error fetching team members:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-sand rounded-xl mb-4"></div>
            <div className="h-4 bg-sand rounded mb-2"></div>
            <div className="h-3 bg-sand rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-charcoal/60">Unable to load team members. Please try again later.</p>
      </div>
    )
  }

  if (teamMembers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-charcoal/60">No team members found. Please add some in the Sanity Studio.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {teamMembers.map((member) => (
        <div key={member._id} className="group">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-sand ring-1 ring-charcoal/10 group-hover:ring-clay/30 transition-all duration-200">
            {member.image && (
              <Image
                src={member.image.asset.url}
                alt={member.image.alt || `${member.name} - ${member.role}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            )}
          </div>
          <div className="mt-4">
            <h3 className="font-heading text-lg font-semibold text-charcoal">
              {member.name}
            </h3>
            <p className="text-sm text-charcoal/80">
              {member.credentials && `${member.credentials} — `}
              {member.role}
            </p>
            {member.specialties && member.specialties.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {member.specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="inline-block rounded-full bg-clay/10 px-2 py-1 text-xs text-clay"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-3">
              <Link
                href={`/${member.slug.current}`}
                className="inline-flex items-center text-sm font-medium text-clay hover:text-clay/80 transition-colors"
              >
                Learn more
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
