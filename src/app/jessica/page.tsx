import type { Metadata } from 'next'
import TeamMemberPage from '../../components/TeamMemberPage'

export const metadata: Metadata = {
  title: 'Soul Care — Jessica Robinson-Grant, MSW, RSW',
  description: 'Bio for Jessica Robinson-Grant, MSW, RSW — Clinical Director at Soul Care Christian Counselling.',
}

const jessicaData = {
  name: "Jessica Robinson-Grant",
  credentials: "MSW, RSW",
  role: "Clinical Director • Soul Care Christian Counselling",
  image: "/assets/img/team/rs=w_365,h_365,cg_true,m.webp",
  bio: [
    "Hi, my name is Jessica Robinson and I am a clinical social worker and Christian therapist, located in Toronto, Ontario. I am deeply committed to serving marginalized and racialized populations through community organizing and capacity building. Working from a community development, advocacy, and therapeutic approach, I aim to provide an Afrocentric and faith-based perspective. As a therapist, I am on a radical journey to decolonize spaces of healing for Black bodies.",
    "As a Black woman with lived experiences of trauma, creating holistic and safe spaces of healing and intentionally holding space for my community are important to me. This is both a life mission and an assignment. I have an Honour's Bachelor's degree in Sociology and a Master's degree in Social Work, both earned at York University.",
    "I humbly serve people of all ages, races, creeds, and religions. Over the last nine years, I have had the life-changing opportunity to provide support to Black bodies mainly in the areas of transition and post-traumatic growth, while focusing on emotional wholeness, wellness and a healthy faith and Christ-based spiritual life.",
    "Beyond my role as a therapist, I proudly serve as an associate pastor at Freedom Life Church. This dual role allows me to seamlessly integrate spiritual guidance with professional expertise, fostering a comprehensive approach to healing and restoration.",
    "My heart beats with the conviction that the Father desires wellness for all. With this in mind, my mission is to ensure that everyone I encounter knows that well-being is intricately woven into the will of our Heavenly Father.",
    "In my personal time, I find solace and connection with my Heavenly Father through the beauty of nature, relishing moments spent taking peaceful walks that rejuvenate and clear my mind. Above all, my deepest love is for Jesus Christ, and my ultimate desire is to spread the transformative mission and message of the gospel in any capacity I can. It is my fervent prayer to see lives impacted and transformed through the power of Christ's love and grace."
  ],
  specialties: [
    "Trauma-informed individual and group counselling",
    "Racial identity",
    "Depression and anxiety support",
    "Abuse",
    "Managing life transitions",
    "Stress management",
    "Identity development",
    "Relationship counselling",
    "Tools to leverage body and self care"
  ],
  areasOfFocus: [
    "Trauma-informed counselling",
    "Racial identity development",
    "Anxiety & depression support",
    "Relationship counselling",
    "Life transitions & stress management"
  ]
}

export default function JessicaPage() {
  return <TeamMemberPage member={jessicaData} />
}
