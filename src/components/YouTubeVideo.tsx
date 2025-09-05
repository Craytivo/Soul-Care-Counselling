'use client'

import { useState } from 'react'

interface YouTubeVideoProps {
  videoId: string
  title: string
  className?: string
}

export default function YouTubeVideo({ videoId, title, className = '' }: YouTubeVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Extract video ID from various YouTube URL formats
  const getVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : url
  }

  const videoIdFromUrl = getVideoId(videoId)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoIdFromUrl}/maxresdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${videoIdFromUrl}?autoplay=1&rel=0&modestbranding=1`

  if (isPlaying) {
    return (
      <div className={`relative w-full ${className}`}>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full cursor-pointer group ${className}`} onClick={() => setIsPlaying(true)}>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <img
          src={thumbnailUrl}
          alt={`${title} - YouTube Video`}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200 rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
            <svg
              className="w-6 h-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
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
