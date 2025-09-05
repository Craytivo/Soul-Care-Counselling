import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Soul Care — Core Values',
  description: 'Our core values: Mindfullness, Body care, Spiritual Care, Self-Love and Acceptance, and Community.',
}

export default function CoreValuesPage() {
  return (
    <>
      {/* Page hero with image */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>

        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center px-6 py-10 md:px-10 md:py-14">
          {/* LEFT: Text */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
              Core Values
            </span>
            <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">The pillars that shape our care</h1>
            <p className="mt-3 max-w-3xl text-cream/85">
              These fundamental values serve as integral pillars that shape our approach when partnering with clients on their transformative journey through the healing process.
            </p>
          </div>

          {/* RIGHT: Image */}
          <div className="relative overflow-hidden rounded-xl ring-1 ring-cream/15 shadow-lg">
            <Image
              src="/assets/img/content/rs=w_1240,h_620,cg_true,m.webp"
              alt="Soul Care — Core Values"
              width={620}
              height={310}
              className="block w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mt-14 md:mt-16 space-y-10">
        {/* Mindfulness */}
        <article>
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Mindfulness</h2>
          <p className="mt-3 text-charcoal/85">
            Very seldom do we have time to be aware, be still, or to reflect. The hustle and bustle of the 21st Century can be a barrier to an introspective and intuitive posture. As a community of racialized bodies that has experienced cumulative and compounded traumas, taking time for stillness and solitude can be holistically restorative. It can also create space for us to process emotions and be present. As a collective of Black therapists who have experienced various types of trauma, mindfulness has been a significant part of our healing journeys. It is also an important aspect that we invite clients to be a part of on their healing journey as well. You can engage in mindfulness by practicing gratitude daily, journaling, taking walks, connecting with nature, or simply sitting in silence.
          </p>
        </article>

        {/* Body care */}
        <article>
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Body care</h2>
          <p className="mt-3 text-charcoal/85">
            Black and racialized bodies store trauma in various ways. According to Dr. Bessel Van Der Kolk, a world-renowned psychiatrist and trauma researcher, if not dealt with and resolved, when we have traumatic experiences, the impact can have long-lasting effects on our body and brain. Essentially, as he proclaims in the title of his book, &ldquo;The Body Keeps the Score&rdquo;. We believe it is important for us to take care of our bodies and cherish these beautiful vessels that hold life. How does the body store trauma? Neck pains, tension headaches, nausea, chest pains, or other types of body pains.
          </p>
        </article>

        {/* Spiritual Care */}
        <article>
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Spiritual Care</h2>
          <p className="mt-3 text-charcoal/85">
            Spirituality has always been an important part of our community. Traditionally and within a contemporary context, it has been the undergirding of who we are, and what we do. As Black bodies we have experienced varying levels of displacement, but we have always brought our spirituality with us wherever we go. I believe that the most powerful aspect of our spirituality is the infusion of our diaspora, as it exudes fragrances of our cultures and traditions. As a collective of Black christian therapists we hold dear to this element of spirituality and to the Christian tradition. It is deeply intertwined in the work that we do as a therapist. As a result, our work with clients focuses on emotional wholeness and emotionally healthy spirituality from a faith-based perspective. If you don&apos;t consider yourself a religious or spiritual person, this is still a welcomed space for you. Focusing on emotional wholeness and health also means that we prioritize working with people from all walks of life. Regardless of how you identify, we want to work with you!
          </p>
        </article>

        {/* Self -Love and Acceptance */}
        <article>
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Self -Love and Acceptance</h2>
          <p className="mt-3 text-charcoal/85">
            As a maid responsible for taking care of and raising young children, Aibileen Clark, a protagonist in the book and movie The Help, had a phrase she regularly taught to the little girl in her care: &ldquo;you is kind, you is smart, you is important&rdquo;. As black people who often face varying forms of injustice, it&apos;s crucial we understand that we are seen, we are loved, and we are valued. Our beautiful melanin skin was carefully constructed, the hairs on our head individually numbered, and the kink in each strand was intentional. Society constantly tells us that we deserve to be oppressed because of our skin colour; but that is a lie. Once we learn that societal constructs and standards of beauty and acceptance are false, we will stand in truth and acceptance of who we are, and who we were created to be. Our lives matter, and the world will only accept that once we fully accept ourselves.
          </p>
        </article>

        {/* Community */}
        <article>
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Community</h2>
          <p className="mt-3 text-charcoal/85">
            We are firm believers in spaces of belonging for Black bodies, these spaces are essential for the health and wealth of our souls. We define community as spaces where you feel loved, appreciated and supported. Spaces where you feel safe. Spaces where you experience true joy and pure tranquillity. Spaces that make you smile, spaces that are warm, healthy spaces cultivated to process emotions. This can be found among trusted friends, family, spouses/partners, or among other like-minded individuals.
          </p>
        </article>
      </section>

      {/* CTA */}
      <section className="mt-16 md:mt-20 rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h3 className="font-heading text-xl md:text-2xl font-semibold">Explore our services</h3>
            <p className="mt-2 text-charcoal/80">See how these values come to life in care that meets you where you are.</p>
          </div>
          <div className="md:justify-self-end">
            <Link 
              href="/services"
              className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}