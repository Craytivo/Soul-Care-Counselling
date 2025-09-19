import type { Metadata } from 'next'
import TeamMemberPage from '../../components/TeamMemberPage'

export const metadata: Metadata = {
  title: 'Soul Care — Davene C.R. Harris',
  description: 'Bio for Davene C.R. Harris — Operations Manager.',
}

const daveneData = {
  name: "Davene C.R. Harris",
  credentials: "MA",
  role: "Operations Manager",
  image: "/assets/img/team/rs=w_365,h_365,cg_true,m (1).webp",
  bio: [
    "Davene C.R. Harris, is a multi-faceted individual who was born in Jamaica, and now resides in Canada. She has been making a tremendous impact in Christian Ministry, Education, Social Service and Administration in the Caribbean, North America and Europe for the past 15 years. Davene is a trained teacher, certified counsellor, certified relationship coach, entrepreneur, author, speaker and conversation host.",
    "Her life is guided by the quote \"Do not go where the path leads, go instead where there is no path, and leave a trail\".",
    "As Operations Manager at Soul Care Counselling, Davene oversees the administrative and operational aspects of the practice, ensuring smooth day-to-day operations and supporting the clinical team. Her background in administration and social services brings valuable organizational expertise to the practice.",
    "Davene owns and operates Beloved Therapeutic Coaching with a current niche of serving women with childhood trauma due to the physical or emotional absence of their father. She dubs herself as the Father Wounds Expert, and thus helps her clients overcome and heal their father wounds to become emotionally healthy persons, partners and parents. With a guiding motto of \"Let's go from wounded to whole\", her focus is for women to get the help they need for the healing they deserve.",
    "Davene is also the host of candid conversations with christian women on her Instagram platform @HeyBelovedHey. She provides an opportunity for women to share their personal, mental, emotional and spiritual experiences for which many of them have never shared in a public setting.",
    "Above all she is a Christian for over 30 years, whose main desire is that through various avenues she will continue to impact and influence individuals to the fullness that comes from a life surrendered to Christ. Davene endeavours to be the change she wants to see in the world, as she empowers individuals to be the best versions of themselves, one person at a time."
  ],
  specialties: [
    "Practice operations & administration",
    "Team coordination & support",
    "Client services management",
    "Process improvement & efficiency",
    "Faith-integrated organizational leadership"
  ],
  areasOfFocus: [
    "Operations Management",
    "Administrative Excellence",
    "Team Support & Coordination",
    "Process Optimization",
    "Faith-based Leadership"
  ],
  socialLinks: [
    {
      label: "@HeyBelovedHey",
      url: "https://instagram.com/HeyBelovedHey",
      type: "instagram" as const
    }
  ],
  acceptsBookings: false
}

export default function DavenePage() {
  return <TeamMemberPage member={daveneData} />
}
