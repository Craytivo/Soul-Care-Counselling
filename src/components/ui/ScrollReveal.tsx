'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/cn'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  variant?: 'reveal' | 'reveal-left' | 'reveal-right' | 'reveal-scale'
  delay?: 0 | 1 | 2 | 3 | 4 | 5
  as?: keyof JSX.IntrinsicElements
}

export default function ScrollReveal({
  children,
  className = '',
  variant = 'reveal',
  delay = 0,
  as: Component = 'div',
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = Component as any

  return (
    <Tag
      ref={ref}
      className={cn(
        variant,
        delay > 0 && `stagger-${delay}`,
        isVisible && 'visible',
        className
      )}
    >
      {children}
    </Tag>
  )
}
