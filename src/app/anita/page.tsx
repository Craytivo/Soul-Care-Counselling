import type { Metadata } from 'next'
import TeamMemberPage from '../../components/TeamMemberPage'

export const metadata: Metadata = {
  title: 'Soul Care — Anita Kangabe',
  description: 'Bio for Anita Kangabe — Registered Social Worker and Therapist at Soul Care Christian Counselling.',
}

const anitaData = {
  name: "Anita Kangabe",
  credentials: "MSW, RSW",
  role: "Associate Christian Therapist · Bilingual (EN/FR)",
  image: "/assets/img/team/rs=w_365,h_365,cg_true,m (6).webp",
  bio: [
    "Hi, my name is Anita and I'm a registered Social Worker and Therapist based out of Montreal, Canada.",
    "Fluent in both English and French, I offer consultation, assessment and treatment services to individuals who are coping with a wide spectrum of emotional and interpersonal challenges, all within a welcoming and confidential setting.",
    "In 2016, I graduated with an Honours bachelor's degree in political science and minor in social work. Coupled with a Master's in Social Work from the University of Ottawa, I've acquired a strong foundation in understanding societal dynamics and the complexities of lived experiences.",
    "As a Therapist, my career was born from a deep-seated desire to assist others in discovering their unique talents and paths to success in a world where guidance and support are essential in navigating life's challenges. I specialize in areas including but not limited to anxiety, depression, stress management as well as academic and career counseling.",
    "Over the years, I have worked with a diverse range of clients, always prioritizing understanding and empathy.",
    "As a Soul Care Therapist, my personal soul-care routine consists of daily journaling, regular meditation, time spent with family and friends and painting as a creative outlet. I'm glad you've found your way here, and hope to be a part of your journey."
  ],
  specialties: [
    "Anxiety & Depression",
    "Stress Management",
    "Academic & Career Counselling",
    "Bilingual Services (EN/FR)"
  ],
  areasOfFocus: [
    "Anxiety & Depression",
    "Stress Management",
    "Academic & Career Counselling",
    "Bilingual Services (EN/FR)"
  ]
}

export default function AnitaPage() {
  return <TeamMemberPage member={anitaData} />
}
