import type { Metadata } from 'next'
import TeamMemberPage from '../../components/TeamMemberPage'

export const metadata: Metadata = {
  title: 'Soul Care — Natalie Willis',
  description: 'Bio for Natalie Willis — Associate Christian Therapist at Soul Care Counselling.',
}

const natalieData = {
  name: "Natalie Willis",
  credentials: "RPN, BA, MDiv",
  role: "Associate Christian Therapist",
  image: "/assets/img/team/rs=w_365,h_365,cg_true,m (2).webp",
  bio: [
    "When \"life,\" happens, where can we go? Who can we turn to for help? The challenges that accompany this journey are inevitable and real, but journeying alone does not have to be. Whether you are experiencing life transitions, burn out, anxiety, depression, trauma, self-esteem issues, unhealthy thought patterns or relationship strains, you are welcomed into a validating, strengths based and non-judgmental/safe space.",
    "My name is Natalie Willis, and I am a Therapist and Registered Nurse. I hold a Masters in Clinical Counselling (MDiv.) from Tyndale University & Seminary, and serve as a Psychotherapist.",
    "I am passionate about walking alongside, empowering and equipping individuals through sound counsel and practical steps, on how to navigate and overcome life's difficulties. My specialties involve therapy from a strengths' based, trauma lens, and Cognitive-Behavioural approach (to name a few), that include, but are not limited to, Post-traumatic stress growth, anxiety and depression support, identity development and more.",
    "My hope is that in our time together, true and lasting growth will occur, and as we partner, seeds will be planted and you will feel empowered to reclaim your life back, piece at a time."
  ],
  specialties: [
    "Anxiety",
    "Depression",
    "Trauma",
    "Stress management",
    "Youth",
    "Couples",
    "Women's mental health",
    "Religious trauma",
    "Spiritual abuse",
    "Workplace stress",
    "Family"
  ],
  areasOfFocus: [
    "Life transitions & burnout",
    "Anxiety & depression support",
    "Trauma-informed care",
    "Identity development",
    "Cognitive-Behavioural strategies",
    "Strengths-based approach"
  ]
}

export default function NataliePage() {
  return <TeamMemberPage member={natalieData} />
}
