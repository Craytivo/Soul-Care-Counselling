import Image from 'next/image'
import Link from 'next/link'



export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col py-12 md:py-24 lg:py-32 bg-transparent">
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

      {/* Hero section: two columns, image right, content left, all fits in viewport */}
  <div className="relative z-10 w-full px-4 sm:px-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 min-h-[520px] max-h-[700px] pt-8 md:pt-0" style={{height: 'calc(100vh - 120px)'}}>
        {/* Left: Content (1/3 width) */}
        <div className="flex flex-col justify-center items-start text-left gap-8 w-full md:w-1/3 max-w-lg">
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-bark leading-tight tracking-tight">
            Faith-centered therapy,<br className="hidden md:inline" />
            <span className="text-gold"> culturally sensitive care</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-bark/80 max-w-md font-normal leading-relaxed tracking-normal">
            Experience compassionate, expert-led counselling designed for your story. Our diverse team offers virtual support across Canada, blending evidence-based methods with genuine care for lasting change.
          </p>
          <ul className="flex flex-col gap-3 text-bark/90 text-base md:text-lg font-medium max-w-md">
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center min-w-[2rem]">
                {/* Lock icon for security */}
                <svg className="h-6 w-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="11" width="14" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4" />
                  <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                </svg>
              </span>
              <span className="leading-tight">Private & secure telehealth</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center min-w-[2rem]">
                {/* Map pin icon for virtual care */}
                <svg className="h-6 w-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.5 7-11.5A7 7 0 005 9.5C5 14.5 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" fill="currentColor" />
                </svg>
              </span>
              <span className="leading-tight">Virtual care, Canada-wide</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center min-w-[2rem]">
                {/* Globe/people icon for culturally responsive */}
                <svg className="h-6 w-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="9" cy="13" r="1.5" fill="currentColor" />
                  <circle cx="15" cy="13" r="1.5" fill="currentColor" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 16c1.5-2 7.5-2 9 0" />
                </svg>
              </span>
              <span className="leading-tight">Culturally responsive team</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex items-center justify-center min-w-[2rem]">
                {/* Graduation cap icon for evidence-based */}
                <svg className="h-6 w-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9-4 9 4-9 4-9-4zm0 0v6a9 9 0 0018 0V8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6" />
                </svg>
              </span>
              <span className="leading-tight">Evidence-based, practical care</span>
            </li>
          </ul>
        </div>
        {/* Right: Hero image (2/3 width) with quote and CTA below, image hidden on mobile */}
        <div className="flex flex-col items-center w-full md:w-2/3">
          <div className="hidden md:block w-full">
            <Image
              src="/assets/img/hero/Soul Care Team Background.png"
              alt="Soul Care Team hero visual"
              width={900}
              height={450}
              className="rounded-3xl shadow-2xl border-2 border-gold/40 object-cover w-full max-w-3xl"
              priority
            />
          </div>
          <blockquote className="relative mt-8 pl-4 border-l-4 border-gold text-bark/90 max-w-xl text-center">
            <p className="font-heading text-lg md:text-xl italic leading-snug tracking-tight">
              &ldquo;It is the will of the Father that you are well&rdquo;
            </p>
            <div className="mt-2 text-base text-bark/70 font-medium">Jessica Robinson-Grant</div>
          </blockquote>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a 
              href="https://thesoulcarecounsellor.janeapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 font-semibold text-bark shadow-lg ring-2 ring-gold/40 transition-all duration-200 hover:bg-gold/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/60 text-lg"
              style={{ minWidth: '200px', minHeight: '48px' }}
            >
              Book a Free Consultation
            </a>
            <Link 
              href="/services"
              className="inline-flex items-center justify-center rounded-full bg-white/90 px-8 py-3 font-semibold text-bark shadow-lg ring-2 ring-gold/30 transition-all duration-200 hover:bg-gold/10 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/60 text-lg"
              style={{ minWidth: '200px', minHeight: '48px' }}
            >
              View Services
            </Link>
          </div>
          {/* Add extra space below CTA buttons on mobile to prevent overlap with team section */}
          <div className="block md:hidden w-full h-8 mt-2"></div>
        </div>
      </div>
    </section>
  )
}
