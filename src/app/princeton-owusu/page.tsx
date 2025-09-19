import type { Metadata } from 'next'
import TeamMemberPage from '../../components/TeamMemberPage'

export const metadata: Metadata = {
  title: 'Soul Care — Princeton Grant',
  description: 'Bio of Princeton Grant — Associate Christian Therapist at Soul Care Counselling.',
}

const princetonData = {
  name: "Princeton Grant",
  credentials: "ECE",
  role: "Coach, Associate Christian Therapist",
  image: "/assets/img/team/rs=w_365,h_365,cg_true.webp",
  bio: [
    "Princeton Grant is an esteemed early years professional whose extensive experience spans over a decade, focusing on nurturing children and assisting families in understanding their developmental needs. Beginning his journey as an Early Childhood Educator, he honed his skills by working with children across various age groups, from infants to preteens. Through this hands-on experience, Princeton acquired valuable insights and practical knowledge, which now underpin his role as a parent coach and early years educator.",
    "Beyond his professional commitments, Princeton is deeply committed to his own family as a loving husband and father. He seamlessly integrates the lessons learned from his personal experiences with the expertise gained from his professional career, thereby adopting a holistic approach in his practice. This fusion allows him to offer comprehensive support to parents and caregivers, empowering them to navigate the complexities of child-rearing with confidence and understanding.",
    "Princeton's dedication to the well-being and development of children, coupled with his compassionate approach, makes him a trusted ally for families seeking guidance in nurturing happy, healthy, and thriving young minds."
  ],
  specialties: [
    "Parent coaching",
    "Family coaching",
    "Parent workshops",
  ],
  areasOfFocus: [
    "Early childhood development",
    "Parent coaching",
    "Family support & education",
    "Child–parent relationship building"
  ]
}

export default function PrincetonPage() {
  return <TeamMemberPage member={princetonData} />
}
