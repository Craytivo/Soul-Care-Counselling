'use client'

import { useEffect, useState } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'
import { cn } from '@/lib/cn'

export default function CustomCursor() {
  const { x, y } = useMousePosition()
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    const handleFirstMove = () => {
      setIsVisible(true)
      window.removeEventListener('mousemove', handleFirstMove)
    }
    window.addEventListener('mousemove', handleFirstMove, { once: true })

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"], [role="link"], input, textarea, select')
      setIsHovering(!!isInteractive)
    }

    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <div
      className={cn(
        'custom-cursor fixed pointer-events-none z-[9999]',
        'flex items-center justify-center',
        'transition-all duration-150 ease-out',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Simple dot cursor - subtle but custom */}
      <div
        className={cn(
          'rounded-full bg-charcoal/80 shadow-sm transition-all duration-150',
          isHovering ? 'w-3 h-3 opacity-60' : 'w-2 h-2 opacity-40'
        )}
      />
    </div>
  )
}
