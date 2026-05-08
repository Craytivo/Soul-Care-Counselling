'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { cn } from '@/lib/cn'

interface YouTubeVideoProps {
  videoId: string
  title: string
  className?: string
}

const ASPECT_RATIO_PADDING = '56.25%'

export default function YouTubeVideo({ videoId, title, className = '' }: YouTubeVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const getVideoId = (url: string): string => {
    const match = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/)
    return match?.[2]?.length === 11 ? match[2] : url
  }

  const videoIdFromUrl = getVideoId(videoId)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoIdFromUrl}/maxresdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${videoIdFromUrl}?autoplay=1&rel=0&modestbranding=1`

  const wrapperClasses = cn('relative w-full', className)
  const aspectClasses = 'relative w-full'

  if (isPlaying) {
    return (
      <div className={wrapperClasses}>
        <div className={aspectClasses} style={{ paddingBottom: ASPECT_RATIO_PADDING }}>
          <iframe
            className="absolute inset-0 h-full w-full rounded-lg"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    )
  }

  return (
    <div className={cn(wrapperClasses, 'group cursor-pointer')} onClick={() => setIsPlaying(true)}>
      <div className={aspectClasses} style={{ paddingBottom: ASPECT_RATIO_PADDING }}>
        <Image
          src={thumbnailUrl}
          alt={`${title} - YouTube Video`}
          width={400}
          height={225}
          className="absolute inset-0 h-full w-full rounded-lg object-cover"
        />
        <div className="absolute inset-0 rounded-lg bg-black/20 transition-colors group-hover:bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition-transform group-hover:scale-110">
            <Play className="ml-1 h-6 w-6 fill-white text-white" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-lg bg-black/70 p-3 backdrop-blur-sm">
            <p className="line-clamp-2 text-sm font-medium text-white">{title}</p>
            <p className="mt-1 text-xs text-white/80">Click to play</p>
          </div>
        </div>
      </div>
    </div>
  )
}
