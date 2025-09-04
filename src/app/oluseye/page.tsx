import type { Metadata } from 'next'
import TeamMemberPage from '../../components/TeamMemberPage'

export const metadata: Metadata = {
  title: 'Soul Care — Oluseye Ashiru',
  description: 'Bio for Oluseye Ashiru — Associate Christian Therapist at Soul Care Counselling.',
}

const oluseyeData = {
  name: "Oluseye Ashiru",
  credentials: "BSc, MSc",
  role: "Associate Christian Therapist",
  image: "/assets/img/team/rs=w_365,h_365,cg_true,m (8).webp",
  bio: [
    "For over a decade, I have had the privilege of guiding individuals and families through life's most challenging and rewarding moments. My work is rooted in a deep commitment to faith-based principles and a genuine passion for seeing others thrive. With over 10 years of experience as a Christian family life practitioner and therapist, I bring both professional expertise and heartfelt compassion to every session.",
    "As a Christian family life practitioner and therapist, I specialize in guiding parents, couples, and individuals toward healthier relationships, stronger families, and a more profound sense of purpose. My journey began with a desire to help families not just survive, but truly flourish. Throughout my career, I have worked with countless parents, couples, and individuals, providing them with the tools they need to build strong, healthy relationships grounded in love, faith, and understanding. I specialize in addressing the unique challenges faced by Christian families, from parenting and marriage to personal identity and spiritual growth. My approach is holistic, integrating evidence-based therapeutic practices with the timeless wisdom of our faith.",
    "With advanced certifications in Christian & Family Life Coaching and a Master's degree in Christian Counselling in view, I combine professional expertise with a compassionate, faith-centered approach.",
    "But beyond the qualifications and the years of experience, what truly drives me is a deep empathy for the struggles you face and a firm belief in your potential to overcome them. I understand the unique pressures faced by Christian families today, from parenting struggles to marital conflicts and personal identity issues.",
    "My goal is to create a safe and nurturing space where you can explore these challenges and find practical, faith-aligned solutions.",
    "What drives me is the belief that every family, every individual, has the potential to live boldly and purposefully. I am here to help you uncover that potential, offering guidance that is not only clinically sound but also deeply empathetic and spiritually enriching.",
    "On a personal note, I've been blessed with almost 19 years of marriage to my wonderful husband, and together, we are raising three adorable children. In my leisure time, I love nothing more than curling up under a cozy blanket with a cup of tea and a great book, with the comforting sound of friendly family squabbles in the background. Quality time with my family is something I cherish deeply, and it's these moments that inspire and renew me in my work.",
    "If you're ready to embark on a journey of healing, growth, and transformation, I invite you to reach out to me. Together, we can create a life that is not only fulfilling but also deeply rooted in faith, love, and purpose."
  ],
  specialties: [
    "Parenting & couples",
    "Christian family life",
    "Marriage & identity",
    "Spiritual growth & purpose",
    "Holistic, faith-integrated approach",
    "Evidence-based practices"
  ],
  areasOfFocus: [
    "Parenting & couples",
    "Christian family life",
    "Marriage & identity",
    "Spiritual growth & purpose",
    "Holistic, faith-integrated approach",
    "Evidence-based practices"
  ]
}

export default function OluseyePage() {
  return <TeamMemberPage member={oluseyeData} />
}
