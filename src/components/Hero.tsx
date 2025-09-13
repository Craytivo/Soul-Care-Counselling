import Image from 'next/image'
import Link from 'next/link'



export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center py-12 md:py-24 lg:py-32 bg-transparent">
      {/* Blob 1: Top Left */}
      <svg
        className="absolute top-[-10vw] left-[-8vw] w-[60vw] h-[60vw] z-0 pointer-events-none select-none opacity-60"
        viewBox="0 0 900 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-blob-gradient-1" x1="0" y1="0" x2="900" y2="600" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F7E9D0" />
            <stop offset="1" stopColor="#F5D07B" />
          </linearGradient>
        </defs>
        <path
          d="M681.5 84.5Q803 169 753.5 309.5Q704 450 552 522.5Q400 595 263.5 522.5Q127 450 97.5 300Q68 150 217.5 92.5Q367 35 523.5 49Q680 63 681.5 84.5Z"
          fill="url(#hero-blob-gradient-1)"
          opacity="0.45"
        />
      </svg>
      {/* Blob 2: Top Right */}
      <svg
        className="absolute top-[-8vw] right-[-10vw] w-[55vw] h-[55vw] z-0 pointer-events-none select-none opacity-50"
        viewBox="0 0 900 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-blob-gradient-2" x1="0" y1="0" x2="900" y2="600" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E3C7A6" />
            <stop offset="1" stopColor="#F5D07B" />
          </linearGradient>
        </defs>
        <path
          d="M700 120Q820 200 760 340Q700 480 540 540Q380 600 250 520Q120 440 100 300Q80 160 220 100Q360 40 540 60Q720 80 700 120Z"
          fill="url(#hero-blob-gradient-2)"
          opacity="0.55"
        />
      </svg>
      {/* Blob 3: Bottom Center */}
      <svg
        className="absolute bottom-[4vw] left-1/2 -translate-x-1/2 w-[70vw] h-[40vw] z-0 pointer-events-none select-none opacity-40"
        viewBox="0 0 900 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-blob-gradient-3" x1="0" y1="0" x2="900" y2="600" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5E9C7" />
            <stop offset="1" stopColor="#EAD7B7" />
          </linearGradient>
        </defs>
        <path
          d="M800 200Q900 350 700 500Q500 650 300 500Q100 350 200 200Q300 50 500 100Q700 150 800 200Z"
          fill="url(#hero-blob-gradient-3)"
          opacity="0.6"
        />
      </svg>
      <div className="relative z-10 w-full px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0 md:gap-x-20 lg:gap-x-32 items-center">
        {/* Left: Logo, accent, features, quote */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-8">
          <div>
            <Image
              src="/assets/logo/soulcare-logo.png"
              alt="Soul Care Counselling Logo"
              width={200}
              height={200}
              className="drop-shadow-2xl rounded-full border-4 border-gold/60 bg-white mb-6"
              priority
            />
          </div>
          <ul className="flex flex-col gap-2 items-start md:items-end text-bark/90 text-base font-normal max-w-xs mx-auto md:mx-0">
            <li className="flex items-start gap-2">
              <span className="flex items-start justify-center min-w-[2rem] pt-1">
                {/* Lock icon for security */}
                <svg className="h-6 w-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="11" width="14" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4" />
                  <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                </svg>
              </span>
              <span className="leading-tight">Secure telehealth platform</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex items-start justify-center min-w-[2rem] pt-1">
                {/* Map pin icon for virtual care */}
                <svg className="h-6 w-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.5 7-11.5A7 7 0 005 9.5C5 14.5 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" fill="currentColor" />
                </svg>
              </span>
              <span className="leading-tight">Virtual care across Canada</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex items-start justify-center min-w-[2rem] pt-1">
                {/* Globe/people icon for culturally responsive */}
                <svg className="h-6 w-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="9" cy="13" r="1.5" fill="currentColor" />
                  <circle cx="15" cy="13" r="1.5" fill="currentColor" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 16c1.5-2 7.5-2 9 0" />
                </svg>
              </span>
              <span className="leading-tight">Culturally responsive</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex items-start justify-center min-w-[2rem] pt-1">
                {/* Graduation cap icon for evidence-based */}
                <svg className="h-6 w-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9-4 9 4-9 4-9-4zm0 0v6a9 9 0 0018 0V8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6" />
                </svg>
              </span>
              <span className="leading-tight">Evidence-based</span>
            </li>
          </ul>
          <blockquote className="relative mt-6 pl-4 border-l-4 border-gold text-bark/90 max-w-xs mx-auto md:mx-0">
            <p className="font-heading text-base md:text-lg italic leading-snug">
              &ldquo;It is the will of the Father that you are well&rdquo;
            </p>
            <div className="mt-2 text-sm text-bark/70 font-medium">Jessica Robinson-Grant</div>
          </blockquote>
        </div>
        {/* Right: Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-8">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-bark leading-tight">
            Faith-centered therapy,<br className="hidden md:inline" />
            <span className="text-gold"> culturally sensitive care</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-bark/80 max-w-xl font-normal">
            Virtual counselling across Canada with a warm, practical approach rooted in evidence-based care.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a 
              href="https://thesoulcarecounsellor.janeapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-2.5 font-semibold text-bark shadow ring-2 ring-gold/30 transition hover:bg-gold/90 hover:scale-105 focus-visible:outline-2 focus-visible:outline-gold/60 text-base"
            >
              Book a Free Consultation
            </a>
            <Link 
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-white/80 px-6 py-2.5 font-semibold text-bark shadow ring-2 ring-gold/20 transition hover:bg-gold/10 hover:scale-105 focus-visible:outline-2 focus-visible:outline-gold/60 text-base"
            >
              View Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
