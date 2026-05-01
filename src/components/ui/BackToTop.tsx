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
        'w-12 h-12 rounded-full',
        'glass shadow-elevation-2',
        'text-charcoal hover:text-clay',
        'transition-all duration-300',
        'hover:scale-110 hover:shadow-elevation-3',
        'focus:outline-none focus:ring-2 focus:ring-clay/50',
        isVisible && 'opacity-100 translate-y-0',
        !isVisible && 'opacity-0 translate-y-4 pointer-events-none'
      )}
      aria-label="Back to top"
      aria-hidden={!isVisible}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
