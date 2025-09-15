import type { Metadata } from 'next'
import TeamMemberPage from '../../components/TeamMemberPage'

export const metadata: Metadata = {
  title: 'Soul Care — Baraka Boafo',
  description: 'Bio for Baraka Boafo — Associate Christian Therapist (Qualifying) at Soul Care Christian Counselling.',
}

const barakaData = {
  name: "Baraka Boafo",
  credentials: "BA, RP (Qualifying)",
  role: "Associate Christian Therapist",
  image: "/assets/img/team/rs=w_365,h_365,cg_true,m (7).webp",
  bio: [
    "Hi, I'm Baraka Boafo, a grad student completing a Master of Arts in Counselling Psychology from Yorkville University, and I'm delighted to be partnering with Soul Care as an intern!",
    "Having witnessed the mental health challenges within the Black Christian immigrant community, it sparked my desire to be an agent of change in removing the stigma and shame around mental health and getting support. I truly look forward to helping you on your healing journey, while providing culturally competent and sensitive care.",
    "My approach integrates evidence-based practices with faith-based principles, aiming to uncover the gifts and resources you already possess to overcome your challenges. I am particularly interested in narrative therapy, cognitive behavioural therapy (CBT), and family systems, seen through a trauma-informed and strengths-based perspective.",
    "As we work through your difficulties—whether related to life transitions, relationship issues, anxiety, depression, or stress at work or school—I hope for transformation and healing, and for you to feel empowered to navigate life's inevitable storms. This is a safe space where we can explore these challenges and collaborate to find a way forward together.",
    "Let's connect; I look forward to meeting and walking alongside you!"
  ],
  specialties: [
    "Anxiety",
    "Depression",
    "Trauma",
    "Stress Management",
    "Youth",
    "Women’s Mental Health",
    "Religious Trauma",
    "Spiritual Abuse",
    "Workplace Stress",
    "Addiction",
  ],
  areasOfFocus: [
    "Life transitions",
    "Relationship issues",
    "Anxiety & depression",
    "Stress at work or school",
    "Narrative, CBT & family systems",
    "Trauma-informed, strengths-based lens",
    "Faith-integrated care"
  ]
}

export default function BarakaPage() {
  return <TeamMemberPage member={barakaData} />
}
