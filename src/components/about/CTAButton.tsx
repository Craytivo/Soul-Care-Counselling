'use client'

import Link from 'next/link'
import { useState } from 'react'

interface CTAButtonProps {
  text: string
  href: string
  variant?: 'primary' | 'secondary'
  external?: boolean
  onClick?: () => void
  className?: string
}

export default function CTAButton({
  text,
  href,
  variant = 'primary',
  external = false,
  onClick,
  className = '',
}: CTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const baseStyles =
    'relative overflow-hidden rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2'

  const primaryStyles =
    'px-8 py-4 bg-clay text-cream shadow-elevation-2 ring-1 ring-clay/40 hover:bg-bark hover:shadow-elevation-3 focus:ring-clay/50 focus:ring-offset-cream'

  const secondaryStyles =
    'px-8 py-4 bg-white/70 text-charcoal/75 ring-1 ring-charcoal/10 border border-charcoal/15 hover:bg-white/90 hover:ring-charcoal/15 hover:border-charcoal/25 focus:ring-clay/50 focus:ring-offset-cream backdrop-blur-sm'

  const variantStyles = variant === 'primary' ? primaryStyles : secondaryStyles

  const Element = external ? 'a' : Link
  const elementProps = external ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href }

  return (
    <Element
      {...elementProps}
      className={`${baseStyles} ${variantStyles} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Shimmer effect on hover */}
      {variant === 'primary' && (
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}
        />
      )}

      <span className="relative z-10">{text}</span>

      {/* Arrow icon with animation */}
      <svg
        className={`relative z-10 h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Element>
  )
}
