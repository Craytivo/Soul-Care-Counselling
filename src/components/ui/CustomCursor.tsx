'use client'

import { useEffect, useState } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'
import { cn } from '@/lib/cn'

type CursorVariant = 'default' | 'hover' | 'button' | 'image'

export default function CustomCursor() {
  const { x, y } = useMousePosition()
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    // Show cursor after first mouse movement
    const handleFirstMove = () => {
      setIsVisible(true)
      window.removeEventListener('mousemove', handleFirstMove)
    }
    window.addEventListener('mousemove', handleFirstMove, { once: true })

    // Track hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (target.closest('button, [role="button"], .magnetic')) {
        setVariant('button')
      } else if (target.closest('a, [role="link"]')) {
        setVariant('hover')
      } else if (target.closest('img, .img-zoom')) {
        setVariant('image')
      } else {
        setVariant('default')
      }
    }

    // Track click states
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mousedown', handleMouseDown, { passive: true })
    document.addEventListener('mouseup', handleMouseUp, { passive: true })

    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Don't render on touch devices or server
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  const sizeClasses = {
    default: 'w-2 h-2',
    hover: 'w-6 h-6',
    button: 'w-10 h-10',
    image: 'w-4 h-4',
  }

  return (
    <div
      className={cn(
        'custom-cursor fixed pointer-events-none z-[9999]',
        'flex items-center justify-center',
        'transition-all duration-150 ease-out',
        isVisible ? 'opacity-100' : 'opacity-0',
        isClicking && 'scale-75'
      )}
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Main cursor dot/ring */}
      <div
        className={cn(
          'rounded-full transition-all duration-200',
          sizeClasses[variant],
          variant === 'default' && 'bg-cream shadow-lg',
          variant === 'hover' && 'bg-transparent border-2 border-cream/80 shadow-lg',
          variant === 'button' && 'bg-clay/80 shadow-xl mix-blend-difference',
          variant === 'image' && 'bg-cream/90 shadow-md',
          isClicking && variant === 'button' && 'scale-90 bg-clay'
        )}
      />
      
      {/* Inner dot for larger states */}
      {variant !== 'default' && (
        <div
          className={cn(
            'absolute rounded-full bg-cream transition-all duration-200',
            variant === 'hover' && 'w-1 h-1',
            variant === 'button' && 'w-2 h-2',
            variant === 'image' && 'w-1 h-1'
          )}
        />
      )}
    </div>
  )
}
