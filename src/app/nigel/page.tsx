import type { Metadata } from 'next'
import TeamMemberPage from '../../components/TeamMemberPage'

export const metadata: Metadata = {
  title: 'Soul Care — Nigel Bucknor',
  description: 'Bio for Nigel Bucknor — Associate Christian Therapist at Soul Care Counselling.',
}

const nigelData = {
  name: "Nigel Bucknor",
  credentials: "BA, MA, CCC",
  role: "Associate Christian Therapist",
  image: "/assets/img/team/rs=w_365,h_365,cg_true,m (3).webp",
  bio: [
    "Whether we believe it or not, our lived experiences have created a core belief about ourselves and influences a core language we use to describe ourselves, which prevents us from being our authentic self or the desire to change. Here's a truth, you have permission. You have the permission to change, to grow, to develop, to advocate for what you need, create new habits and, to unlearn and learn again. The beauty in the journey is you don't have to do it alone and I'm here to journey with you.",
    "My name is Nigel Bucknor and I am a registered therapist. I have a BA in Community Development & Policy Studies from Ontario Tech University, MA in Counselling Psychology from Yorkville University, and a Canadian Certified Counsellor. I have spent over 10 years working with children and teens with exceptionalities, and in high-risk communities. I work primarily with teens, adults, and couples.",
    "I am passionate about learning and thinking critically about past and current social justice matters such as race, toxic masculinity, and patriarchy and how we intersect with those factors. From a therapeutic lens, I believe that you know your story best and utilize modalities such as CBT, Solution focused and Narrative therapy to support you and bring meaning to your lived experiences. I support individuals with navigating through life transitions, anxiety, depression, emotional regulation, spirituality, trauma and more. It is my desire to hold space for you in the therapeutic relationship and that you feel heard, validated, affirmed and at times challenged all in a joint effort to get you where you want to be holistically.",
    "About me personally, I am a husband and father. I enjoy reading, watching movies and documentaries; huge soccer fan (Manchester United). I'm a huge introvert who loves silence and people (weirdo combo, I know). I desire and find joy in journeying with individuals and supporting their growth."
  ],
  specialties: [
    "Teens, adults & couples",
    "Life transitions",
    "Anxiety & depression",
    "Emotional regulation",
    "Trauma-informed care",
    "Spirituality & meaning",
    "CBT, Solution-Focused, Narrative therapy",
    "Identity, masculinity & social justice"
  ],
  areasOfFocus: [
    "Teens, adults & couples",
    "Life transitions",
    "Anxiety & depression",
    "Emotional regulation",
    "Trauma-informed care",
    "Spirituality & meaning",
    "CBT, Solution-Focused, Narrative therapy",
    "Identity, masculinity & social justice"
  ]
}

export default function NigelPage() {
  return <TeamMemberPage member={nigelData} />
}
