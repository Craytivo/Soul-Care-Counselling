
import Image from 'next/image';
import Link from 'next/link';
import { getTeamMembers } from '@/lib/sanity-queries';
import { urlFor } from '@/lib/sanity';
import type { TeamMember } from '@/lib/sanity';

interface Filter {
  key: string;
  label: string;
  count: number;
}

export function filterMembers(
  teamMembers: TeamMember[],
  searchQuery: string,
  activeFilter: string
): TeamMember[] {
  const searchLower = searchQuery.toLowerCase();
  return teamMembers.filter((member) => {
    const matchesSearch =
      !searchQuery ||
      member.name.toLowerCase().includes(searchLower) ||
      (member.credentials && member.credentials.toLowerCase().includes(searchLower)) ||
      member.role.toLowerCase().includes(searchLower) ||
      (member.bio && member.bio.toLowerCase().includes(searchLower)) ||
      (member.specialties && member.specialties.some((specialty) => specialty.toLowerCase().includes(searchLower))) ||
      (member.areasOfFocus && member.areasOfFocus.some((area) => area.toLowerCase().includes(searchLower)));

    if (activeFilter === 'all') {
      return matchesSearch;
    }

    if (!member.specialties || member.specialties.length === 0) {
      return false;
    }

    const specialtyText = member.specialties.join(' ').toLowerCase();

    switch (activeFilter) {
      case 'trauma-informed':
        return matchesSearch && (specialtyText.includes('trauma') || specialtyText.includes('trauma-informed'));
      case 'anxiety-depression':
        return matchesSearch && (specialtyText.includes('anxiety') || specialtyText.includes('depression'));
      case 'family-couples':
        return (
          matchesSearch &&
          (specialtyText.includes('family') ||
            specialtyText.includes('couples') ||
            specialtyText.includes('parenting') ||
            specialtyText.includes('marriage'))
        );
      case 'addictions-recovery':
        return matchesSearch && (specialtyText.includes('addiction') || specialtyText.includes('recovery'));
      case 'faith-based':
        return (
          matchesSearch &&
          (specialtyText.includes('faith') ||
            specialtyText.includes('spiritual') ||
            specialtyText.includes('christian'))
        );
      case 'bilingual':
        return (
          matchesSearch &&
          (specialtyText.includes('bilingual') ||
            specialtyText.includes('french') ||
            specialtyText.includes('english'))
        );
      default:
        return matchesSearch;
    }
  });
}

export function getFilters(teamMembers: TeamMember[]): Filter[] {
  const getCount = (filterKey: string) => {
    if (filterKey === 'all') return teamMembers.length;
    return teamMembers.filter((member) => {
      if (!member.specialties || member.specialties.length === 0) return false;
      const specialtyText = member.specialties.join(' ').toLowerCase();
      switch (filterKey) {
        case 'trauma-informed':
          return specialtyText.includes('trauma') || specialtyText.includes('trauma-informed');
        case 'anxiety-depression':
          return specialtyText.includes('anxiety') || specialtyText.includes('depression');
        case 'family-couples':
          return (
            specialtyText.includes('family') ||
            specialtyText.includes('couples') ||
            specialtyText.includes('parenting') ||
            specialtyText.includes('marriage')
          );
        case 'addictions-recovery':
          return specialtyText.includes('addiction') || specialtyText.includes('recovery');
        case 'faith-based':
          return (
            specialtyText.includes('faith') ||
            specialtyText.includes('spiritual') ||
            specialtyText.includes('christian')
          );
        case 'bilingual':
          return (
            specialtyText.includes('bilingual') ||
            specialtyText.includes('french') ||
            specialtyText.includes('english')
          );
        default:
          return false;
      }
    }).length;
  };
  return [
    { key: 'all', label: 'All Team Members', count: getCount('all') },
    { key: 'trauma-informed', label: 'Trauma-Informed Care', count: getCount('trauma-informed') },
    { key: 'anxiety-depression', label: 'Anxiety & Depression', count: getCount('anxiety-depression') },
    { key: 'family-couples', label: 'Family & Couples', count: getCount('family-couples') },
    { key: 'addictions-recovery', label: 'Addictions & Recovery', count: getCount('addictions-recovery') },
    { key: 'faith-based', label: 'Faith-Based Therapy', count: getCount('faith-based') },
    { key: 'bilingual', label: 'Bilingual Services', count: getCount('bilingual') },
  ];
}

export default async function SanityTeam({
  searchQuery = '',
  activeFilter = 'all',
}: {
  searchQuery?: string;
  activeFilter?: string;
} = {}) {
  const teamMembers = await getTeamMembers();
  const filters = getFilters(teamMembers);
  const filteredMembers = filterMembers(teamMembers, searchQuery, activeFilter);

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <section id="team" className="mt-16 md:mt-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center py-12">
            <p className="text-charcoal/60">No team members found. Please check your Sanity configuration.</p>
          </div>
        </div>
      </section>
    );
  }

  // Note: If you want to keep search/filter interactive, move this logic to a client wrapper.
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

        {/* Toolbar (static, non-interactive in server component) */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <label htmlFor="teamSearch" className="sr-only">Search team</label>
          <input
            id="teamSearch"
            type="search"
            placeholder="Search by name, specialty, credential, or approach…"
            value={searchQuery}
            readOnly
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
                disabled
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

