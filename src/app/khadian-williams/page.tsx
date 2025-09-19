import type { Metadata } from 'next'
import TeamMemberPage from '../../components/TeamMemberPage'

export const metadata: Metadata = {
  title: 'Soul Care — Khadian Gooden',
  description: 'Bio for Khadian Gooden — Associate Christian Therapist at Soul Care Counselling.',
}

const khadianData = {
  name: "Khadian Gooden",
  credentials: "BA, MDiv, RP, CCC",
  role: "Associate Christian Therapist",
  image: "/assets/img/team/rs=w_365,h_365,cg_true,m (4).webp",
  bio: [
    "Life is filled with events and experiences, often unexpected that impact us more so than we imagined. These factors and others like it, may prompt one to seek counselling. Whatever your reasons are, know that you do not have to embark on this journey alone.",
    "Hi my name is K. Racquel Gooden. I am a graduate with a Masters of Divinity in Clinical Counselling from Tyndale University. Also, a Bachelor's degree in Psychology from York University. I have spent the past few years working primarily with individual clients and occasionally with families and youth.",
    "My scope of practice includes (but not limited to) working with anxiety, depression, emotional regulation, spirituality, life transitions, trauma and more. I endeavour to employ an integrative approach to psychotherapy, primarily using CBT, Narrative, and Solution Focused modalities with clients. I also aim to provide a welcoming, tolerant, safe and non- judgmental space where you can feel heard, validated and encouraged to work on your goals. I believe that this field is a God-given call and I am passionate about seeing individuals experience holistic healing.",
    "Prior to my pursuit of becoming a psychotherapist, I spent 10 years working as a Legal Administrator in the Criminal Law sector where I worked in a multicultural environment with individuals from different walks of life. I have also served as a Minister and Youth Pastor in my former church.",
    "As part of my self-care routine, I enjoy reading, writing/journaling, watching documentaries, long nature walks, as well as spending quality time with my loved ones. I look forward to connecting with you and supporting you on your journey."
  ],
  specialties: [
    "Anxiety & depression",
    "Emotional regulation",
    "Spirituality & life transitions",
    "Trauma-informed care",
    "CBT, Narrative, Solution-Focused therapy",
    "Individual, family & youth counselling"
  ],
  areasOfFocus: [
    "Anxiety & depression",
    "Emotional regulation",
    "Spirituality & life transitions",
    "Trauma-informed care",
    "CBT, Narrative, Solution-Focused therapy",
    "Individual, family & youth counselling"
  ]
}

export default function KhadianPage() {
  return <TeamMemberPage member={khadianData} />
}
