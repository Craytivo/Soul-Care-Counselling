'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface MousePosition {
  x: number
  y: number
}

export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })
  const rafRef = useRef<number>()
  const pendingUpdate = useRef<MousePosition>()

  const updatePosition = useCallback(() => {
    if (pendingUpdate.current) {
      setPosition(pendingUpdate.current)
      pendingUpdate.current = undefined
    }
    rafRef.current = undefined
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pendingUpdate.current = { x: e.clientX, y: e.clientY }
      
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updatePosition)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [updatePosition])

  return position
}
