'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 400px
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'flex items-center justify-center',
        'h-12 w-12 rounded-full',
        'shadow-elevation-2 glass',
        'text-charcoal hover:text-clay',
        'transition-all duration-300',
        'hover:scale-110 hover:shadow-elevation-3',
        'focus:outline-none focus:ring-2 focus:ring-clay/50',
        isVisible && 'translate-y-0 opacity-100',
        !isVisible && 'pointer-events-none translate-y-4 opacity-0'
      )}
      aria-label="Back to top"
      aria-hidden={!isVisible}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
