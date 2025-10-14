import type { Metadata } from 'next'

export const revalidate = 0
import TeamMemberPage from '../../components/TeamMemberPage'

export const metadata: Metadata = {
  title: 'Soul Care — Josh Dale',
  description: 'Bio for Josh Dale — Associate Christian Therapist at Soul Care Counselling.',
}

const joshData = {
  name: "Josh Dale",
  credentials: "MDiv, RP, CCTS-I",
  role: "Associate Christian Therapist",
  image: "/assets/img/team/rs=w_365,h_365,cg_true,m (5).webp",
  bio: [
    "Reaching out for help regarding our mental health isn't easy. Often times we wrestle with stigmas, stereotypes, low self-esteem, and/or beliefs that therapy is a sign of weakness. I've made it my goal to create a safe, open, informative and transformative space for people to work towards mental, physical, and emotional wellness, and grow more into the person they want and were created to be.",
    "Often times we feel stuck or burnt by situations and experiences in life, and it becomes difficult to reach out. My desire is that you would allow me the opportunity to come alongside of you and help you move from overwhelmed to overcoming. I am here so you don't have to do this alone.",
    "My name is Josh Dale, and I am a registered psychotherapist.",
    "I have a background in addictions counselling (Diploma), pastoral ministry (BRE), and an MDiv. with a major in Clinical Counselling. I have been in the helping profession for over 10+ years, focusing on helping people of all ages work through/overcome addictions, manage their anxiety, process concerns regarding their faith, and help with issues of self-identity and self-esteem.",
    "I have expanded my training and skills, by pursuing specialization in trauma, to help people with attachment issues, adoptee trauma, depression, burnout, trauma (including racial & religious), emotional regulation, and difficult life transitions. My approach is a flexible one so that I may work with my clients in a way that they feel understood. I have a therapy style that is a mixture of explorative, directive, creative, open, humorous, relaxing, and sometimes challenging.",
    "I use attachment based approaches, DBT, CBT, Narrative therapy, solution focused therapy, parts work, all from a trauma informed lens. My goal is, that through this kind of approach, you (perhaps for the first time) feel heard, affirmed, and hopeful as you start your therapy journey.",
    "On a personal note, I am a transracial adoptee who is definitely an extrovert, but I also love my personal time. For fun, I enjoy going out to comedy clubs, watching movies with friends, playing sports, writing poetry/spoken words, and eating junk food (in moderation lol). One thing I look forward to is connecting with you as you begin your journey! I hope to hear from you soon."
  ],
  specialties: [
    "Anxiety",
    "Depression",
    "Trauma",
    "Stress management",
    "Couples",
    "Men's mental health",
    "Women's mental health",
    "Religious trauma",
    "Spiritual abuse",
    "Workplace stress",
    "Addiction",
    "Family"
  ],
  areasOfFocus: [
    "Addictions & recovery",
    "Anxiety & emotional regulation",
    "Identity & self-esteem",
    "Faith & spirituality",
    "Trauma & attachment; adoptee trauma",
    "Burnout & life transitions",
    "DBT, CBT, Narrative, Solution-Focused, Parts work"
  ]
}

export default function JoshPage() {
  return <TeamMemberPage member={joshData} />
}
