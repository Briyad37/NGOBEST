"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import type { Video } from "../types/resources"

interface VideoPlayerModalProps {
  video: Video | null
  isOpen: boolean
  onClose: () => void
  onView: (videoId: number) => void
}

export default function VideoPlayerModal({ video, isOpen, onClose, onView }: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isOpen && video) {
      onView(video.id)
    }
  }, [isOpen, video, onView])

  if (!isOpen || !video) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-2xl max-w-5xl w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-900">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{video.title}</h3>
            <p className="text-sm text-gray-300">{video.description}</p>
          </div>
          <button onClick={onClose} className="ml-4 p-2 hover:bg-gray-800 rounded-lg transition-colors text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative">
          <video ref={videoRef} className="w-full h-auto max-h-[70vh]" controls autoPlay poster={video.thumbnail}>
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Info */}
        <div className="p-4 bg-gray-900">
          <div className="flex items-center justify-between text-sm text-gray-300">
            <div className="flex items-center space-x-6">
              <span>Duration: {video.duration}</span>
              <span>Date: {video.date}</span>
              <span>Views: {video.views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
