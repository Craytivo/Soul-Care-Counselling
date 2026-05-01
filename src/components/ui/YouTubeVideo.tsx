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
            className="absolute inset-0 w-full h-full rounded-lg"
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
    <div className={cn(wrapperClasses, 'cursor-pointer group')} onClick={() => setIsPlaying(true)}>
      <div className={aspectClasses} style={{ paddingBottom: ASPECT_RATIO_PADDING }}>
        <Image
          src={thumbnailUrl}
          alt={`${title} - YouTube Video`}
          width={400}
          height={225}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
            <p className="text-white text-sm font-medium line-clamp-2">{title}</p>
            <p className="text-white/80 text-xs mt-1">Click to play</p>
          </div>
        </div>
      </div>
    </div>
  )
}
