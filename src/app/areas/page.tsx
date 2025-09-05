import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Soul Care — Areas of Focus',
  description: 'Trauma, Life Transition, Identity, Relationships, Anxiety, Depression, and Stress Management.',
}

export default function AreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-bark text-cream ring-1 ring-cream/15">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br from-clay/40 to-cream/10 blur-2xl" aria-hidden="true"></div>
        <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 ring-1 ring-cream/30 uppercase tracking-[.22em] text-[11px]">
            Areas of Focus
          </span>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold">Support for your season</h1>
          <p className="mt-3 max-w-3xl text-cream/85">
            Explore the areas we commonly work with, delivered through faith-integrated, evidence-based care.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mt-14 md:mt-16 space-y-12">
        {/* Trauma */}
        <article id="trauma" className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10">
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Trauma</h2>
          <div className="mt-3 space-y-4 text-charcoal/85">
            <p>Trauma is a word that is often thrown around in conversation today, but today&apos;s generation is in tuned with what trauma is and how it can affect day to day living. However, one of the most difficult aspects of trauma is working through it, especially when life seems a little overwhelming.</p>

            <p>As we journey through healing from trauma, there are a few areas that we can explore:</p>

            <ul className="list-disc pl-6">
              <li>Developmental trauma</li>
              <li>Emotional and psychological traumas</li>
              <li>Intergenerational trauma</li>
              <li>Complex trauma</li>
            </ul>

            <p>Trauma tends to show up in our everyday lives as we navigate through different types of relationships. Sometimes we may find ourselves in a cycle of unhealthy relationships, whether romantic or platonic. Trauma shows up in the way we view ourselves and the world around us. It shows up in how we balance our priorities, how much we prioritize ourselves and our ability to cope with everyday stress. As we work together, we will work towards post-traumatic growth and change, realizing that there is life after trauma.</p>

            <p>Together we will work on your strengths and we will meet you where you&apos;re at.</p>
          </div>
        </article>

        {/* Life Transition */}
        <article id="life-transition" className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10">
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Life Transition</h2>
          <div className="mt-3 space-y-4 text-charcoal/85">
            <p>Feeling stuck? Not sure of next steps? Feel like everyone around you is &ldquo;winning&rdquo; and you&apos;re going in circles? Or do you feel like you need a change? This is called a transition. Life comes with many ups and downs, and it is quite the journey. Along the way, we can experience many difficult transitions, particularly when you don&apos;t have a strong support system or a clear view of where you want to go.</p>

            <p>If you need support navigating through:</p>

            <ul className="list-disc pl-6">
              <li>Day to day life as a youth or young adult</li>
              <li>Career or academic changes</li>
              <li>Relationships</li>
              <li>New church environments</li>
              <li>Engagement and marriage</li>
              <li>A new life change</li>
            </ul>

            <p>We would love to journey with you. Together we will work on a roadmap and vision for your life; we will set some goals and at your own pace, with a clear view in mind this transition just may become a little easier.</p>
          </div>
        </article>

        {/* Identity */}
        <article id="identity" className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10">
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Identity</h2>
          <div className="mt-3 space-y-4 text-charcoal/85">
            <p>When we have a healthy view of ourselves, having a healthy view of others and the world around us will become a little easier. Our identity is not only about what we see on the outside; it is more about what is taking place on the inside. When we are comfortable and at peace with the different expressions of who we are, whether it&apos;s our spiritual beliefs, gender, race or even our profession, we begin to show up differently in the world. Our confidence shifts, we are no longer afraid to prioritize our needs and we accept ourselves with all our flaws and imperfections. As we work together to rebuild identity and good self-esteem, we will get to the core of who you are, and who you were created to be.</p>
          </div>
        </article>

        {/* Relationships */}
        <article id="relationships" className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10">
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Relationships</h2>
          <div className="mt-3 space-y-4 text-charcoal/85">
            <p>Relationships, whether romantic, platonic or family, can be quite complex and complicated. Our relationships are a good reflection of who we are, and where we are at in our lives. Are your relationships unhealthy and toxic? Do you find yourself in these relationships more often than you would like? Let&apos;s work through this together. In order to create a foundation for healthy relationships, the way we view ourselves will need to shift. This can be achieved through building healthy boundaries, healthy communication, and a positive sense of self.</p>
          </div>
        </article>

        {/* Anxiety */}
        <article id="anxiety" className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10">
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Anxiety</h2>
          <div className="mt-3 space-y-4 text-charcoal/85">
            <p>We have all experienced various levels of fear, or something that keeps us up at night. However, sometimes these levels of fear, or the things that keep us up at night can become more than we can handle. We find that our body is a little more tense than usual, our chest is tight, our palms are sweaty, or we just can&apos;t focus on our present day to day activities. Anxiety is not uncommon, and neither is the ability to cope. With the right tools and support we can work through controlling anxious thoughts that may affect day to day life.</p>
          </div>
        </article>

        {/* Depression */}
        <article id="depression" className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10">
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Depression</h2>
          <div className="mt-3 space-y-4 text-charcoal/85">
            <p>A lack of joy, hopelessness, or the ability to get out of bed to perform day to day activities are some common signs of depression. Unfortunately, individuals who experience depression often think this is it- enjoying the things they once loved or feeling hopeful again is not an option. On our journey together we will navigate through some of the root causes of your experience, and we will address those root causes. Consequently, we will aim to rebuild hope, finding meaning in life and navigate through what brings you joy. You deserve the ability to have hope, dream again and wake up with purpose each and everyday.</p>
          </div>
        </article>

        {/* Stress Management */}
        <article id="stress-management" className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10">
          <h2 className="font-heading text-xl md:text-2xl font-semibold">Stress Management</h2>
          <div className="mt-3 space-y-4 text-charcoal/85">
            <p>We all have a degree of stress that we can manage. There is positive stress which helps motivate you, challenges you to be better and drives you towards achieving your life goals. Of course, there is also negative stress. The type of stress that creates an inability to cope. The type of stress that results in you feeling overworked and burned out. Managing this negative stress can be difficult, but it&apos;s not impossible. With the proper support and right tools, we will aim to determine the root of your current stressors, creating balance and putting systems in place to navigate your current season of life.</p>
          </div>
        </article>

        {/* CTA */}
        <section className="rounded-2xl bg-sand p-6 md:p-8 ring-1 ring-charcoal/10">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h3 className="font-heading text-xl md:text-2xl font-semibold">Ready to begin?</h3>
              <p className="mt-2 text-charcoal/80">Book a free 15-minute consultation to explore fit and next steps.</p>
            </div>
            <div className="md:justify-self-end">
              <a 
                href="https://thesoulcarecounsellor.janeapp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-clay px-5 py-2.5 font-semibold text-charcoal hover:bg-clay/90 ring-1 ring-charcoal/10"
              >
                Book a Free Consultation
              </a>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}