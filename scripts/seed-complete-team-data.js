const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

// Sanity client configuration
const client = createClient({
  projectId: 'skoo9csT',
  dataset: 'production',
  useCdn: false,
  token: 'skoo9csTIJ0SihaMJhJeIDsLudpXn9AV0FKk9DFJzKzbjulMd3SPQrZ4XABPfLsrCd39PJ8uUYhNQF6aAGRpHkiluSnk8iKIM4gvX1ywX0ZGrcNdJWmUL5jy0hJTV9yH0kZzlp9Mj0IcIR4FbKbIjjFs24Bwstd1pzsBkAckCQeaPGxd9wg',
  apiVersion: '2025-09-05'
})

// Complete team member data extracted from individual pages
const teamMembers = [
  {
    _type: 'teamMember',
    name: 'Jessica Robinson-Grant',
    credentials: 'MSW, RSW',
    role: 'Clinical Director • Soul Care Christian Counselling',
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
    ],
    socialLinks: [],
    acceptsBookings: true,
    slug: { current: 'jessica-robinson-grant' }
  },
  {
    _type: 'teamMember',
    name: 'Anita Kangabe',
    credentials: 'MSW, RSW',
    role: 'Associate Christian Therapist · Bilingual (EN/FR)',
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
    ],
    socialLinks: [],
    acceptsBookings: true,
    slug: { current: 'anita-kangabe' }
  },
  {
    _type: 'teamMember',
    name: 'Baraka Boafo',
    credentials: 'BA, RP (Qualifying)',
    role: 'Associate Christian Therapist',
    bio: [
      "Hi, I'm Baraka Boafo, a grad student completing a Master of Arts in Counselling Psychology from Yorkville University, and I'm delighted to be partnering with Soul Care as an intern!",
      "Having witnessed the mental health challenges within the Black Christian immigrant community, it sparked my desire to be an agent of change in removing the stigma and shame around mental health and getting support. I truly look forward to helping you on your healing journey, while providing culturally competent and sensitive care.",
      "My approach integrates evidence-based practices with faith-based principles, aiming to uncover the gifts and resources you already possess to overcome your challenges. I am particularly interested in narrative therapy, cognitive behavioural therapy (CBT), and family systems, seen through a trauma-informed and strengths-based perspective.",
      "As we work through your difficulties—whether related to life transitions, relationship issues, anxiety, depression, or stress at work or school—I hope for transformation and healing, and for you to feel empowered to navigate life's inevitable storms. This is a safe space where we can explore these challenges and collaborate to find a way forward together.",
      "Let's connect; I look forward to meeting and walking alongside you!"
    ],
    specialties: [
      "Life transitions",
      "Relationship issues",
      "Anxiety & depression",
      "Stress at work or school",
      "Narrative, CBT & family systems",
      "Trauma-informed, strengths-based lens",
      "Faith-integrated care"
    ],
    areasOfFocus: [
      "Life transitions",
      "Relationship issues",
      "Anxiety & depression",
      "Stress at work or school",
      "Narrative, CBT & family systems",
      "Trauma-informed, strengths-based lens",
      "Faith-integrated care"
    ],
    socialLinks: [],
    acceptsBookings: true,
    slug: { current: 'baraka-boafo' }
  },
  {
    _type: 'teamMember',
    name: 'Davene C.R. Harris',
    credentials: 'MA',
    role: 'Operations Manager',
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
        type: "instagram"
      }
    ],
    acceptsBookings: false,
    slug: { current: 'davene-harris' }
  },
  {
    _type: 'teamMember',
    name: 'Josh Dale',
    credentials: 'MDiv, RP, CCTS-I',
    role: 'Associate Christian Therapist',
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
      "Addictions & recovery",
      "Anxiety & emotional regulation",
      "Identity & self-esteem",
      "Faith & spirituality",
      "Trauma & attachment; adoptee trauma",
      "Burnout & life transitions",
      "DBT, CBT, Narrative, Solution-Focused, Parts work"
    ],
    areasOfFocus: [
      "Addictions & recovery",
      "Anxiety & emotional regulation",
      "Identity & self-esteem",
      "Faith & spirituality",
      "Trauma & attachment; adoptee trauma",
      "Burnout & life transitions",
      "DBT, CBT, Narrative, Solution-Focused, Parts work"
    ],
    socialLinks: [],
    acceptsBookings: true,
    slug: { current: 'josh-dale' }
  },
  {
    _type: 'teamMember',
    name: 'Khadian Gooden',
    credentials: 'BA, MDiv, RP, CCC',
    role: 'Associate Christian Therapist',
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
    ],
    socialLinks: [],
    acceptsBookings: false, // Not accepting clients as per original data
    slug: { current: 'khadian-gooden' }
  },
  {
    _type: 'teamMember',
    name: 'Natalie Willis',
    credentials: 'RPN, BA, MDiv',
    role: 'Associate Christian Therapist',
    bio: [
      "When \"life,\" happens, where can we go? Who can we turn to for help? The challenges that accompany this journey are inevitable and real, but journeying alone does not have to be. Whether you are experiencing life transitions, burn out, anxiety, depression, trauma, self-esteem issues, unhealthy thought patterns or relationship strains, you are welcomed into a validating, strengths based and non-judgmental/safe space.",
      "My name is Natalie Willis, and I am a Therapist and Registered Nurse. I hold a Masters in Clinical Counselling (MDiv.) from Tyndale University & Seminary, and serve as a Psychotherapist.",
      "I am passionate about walking alongside, empowering and equipping individuals through sound counsel and practical steps, on how to navigate and overcome life's difficulties. My specialties involve therapy from a strengths' based, trauma lens, and Cognitive-Behavioural approach (to name a few), that include, but are not limited to, Post-traumatic stress growth, anxiety and depression support, identity development and more.",
      "My hope is that in our time together, true and lasting growth will occur, and as we partner, seeds will be planted and you will feel empowered to reclaim your life back, piece at a time."
    ],
    specialties: [
      "Life transitions & burnout",
      "Anxiety & depression support",
      "Trauma-informed care",
      "Identity development",
      "Cognitive-Behavioural strategies",
      "Strengths-based approach"
    ],
    areasOfFocus: [
      "Life transitions & burnout",
      "Anxiety & depression support",
      "Trauma-informed care",
      "Identity development",
      "Cognitive-Behavioural strategies",
      "Strengths-based approach"
    ],
    socialLinks: [],
    acceptsBookings: true,
    slug: { current: 'natalie-willis' }
  },
  {
    _type: 'teamMember',
    name: 'Nigel Bucknor',
    credentials: 'BA, MA, CCC',
    role: 'Associate Christian Therapist',
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
    ],
    socialLinks: [],
    acceptsBookings: true,
    slug: { current: 'nigel-bucknor' }
  },
  {
    _type: 'teamMember',
    name: 'Oluseye Ashiru',
    credentials: 'BSc, MSc',
    role: 'Associate Christian Therapist',
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
    ],
    socialLinks: [],
    acceptsBookings: true,
    slug: { current: 'oluseye-ashiru' }
  },
  {
    _type: 'teamMember',
    name: 'Princeton Grant',
    credentials: 'ECE',
    role: 'Coach, Associate Christian Therapist',
    bio: [
      "Princeton Grant is an esteemed early years professional whose extensive experience spans over a decade, focusing on nurturing children and assisting families in understanding their developmental needs. Beginning his journey as an Early Childhood Educator, he honed his skills by working with children across various age groups, from infants to preteens. Through this hands-on experience, Princeton acquired valuable insights and practical knowledge, which now underpin his role as a parent coach and early years educator.",
      "Beyond his professional commitments, Princeton is deeply committed to his own family as a loving husband and father. He seamlessly integrates the lessons learned from his personal experiences with the expertise gained from his professional career, thereby adopting a holistic approach in his practice. This fusion allows him to offer comprehensive support to parents and caregivers, empowering them to navigate the complexities of child-rearing with confidence and understanding.",
      "Princeton's dedication to the well-being and development of children, coupled with his compassionate approach, makes him a trusted ally for families seeking guidance in nurturing happy, healthy, and thriving young minds."
    ],
    specialties: [
      "Early childhood development",
      "Parent coaching",
      "Family support & education",
      "Child–parent relationship building"
    ],
    areasOfFocus: [
      "Early childhood development",
      "Parent coaching",
      "Family support & education",
      "Child–parent relationship building"
    ],
    socialLinks: [],
    acceptsBookings: true,
    slug: { current: 'princeton-grant' }
  }
]

async function seedTeamMembers() {
  console.log('🌱 Starting comprehensive team member seeding...')
  
  try {
    // First, let's check if team members already exist
    const existingMembers = await client.fetch('*[_type == "teamMember"]')
    console.log(`Found ${existingMembers.length} existing team members`)
    
    for (const member of teamMembers) {
      try {
        // Check if member already exists
        const existingMember = await client.fetch(
          `*[_type == "teamMember" && slug.current == "${member.slug.current}"][0]`
        )
        
        if (existingMember) {
          console.log(`📝 Updating ${member.name}...`)
          await client
            .patch(existingMember._id)
            .set({
              name: member.name,
              credentials: member.credentials,
              role: member.role,
              bio: member.bio,
              specialties: member.specialties,
              areasOfFocus: member.areasOfFocus,
              socialLinks: member.socialLinks,
              acceptsBookings: member.acceptsBookings,
              slug: member.slug
            })
            .commit()
          console.log(`✅ Updated ${member.name}`)
        } else {
          console.log(`➕ Creating ${member.name}...`)
          await client.create(member)
          console.log(`✅ Created ${member.name}`)
        }
      } catch (error) {
        console.error(`❌ Error processing ${member.name}:`, error.message)
      }
    }
    
    console.log('🎉 Team member seeding completed!')
    
    // Verify the results
    const finalCount = await client.fetch('count(*[_type == "teamMember"])')
    console.log(`📊 Total team members in Sanity: ${finalCount}`)
    
  } catch (error) {
    console.error('❌ Error during seeding:', error)
  }
}

// Run the seeding
seedTeamMembers()
