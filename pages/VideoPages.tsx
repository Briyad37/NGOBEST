"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Header from "../components/Header"
import Footer from "../components/Footer"
import VideoPlayerModal from "../components/VideoPlayerModal"
import { Play, Loader2, Eye, Calendar, Clock, Wifi, WifiOff } from "lucide-react"
import type { Video } from "../types/resources"
import { useVideos } from "../hooks/useVideos"
import { API_CONFIG } from "../config/api"

interface VideosPageProps {
  navigate: (
    page:
      | "home"
      | "projects"
      | "project-blog"
      | "about"
      | "blogs"
      | "gallery"
      | "videos"
      | "resources"
      | "login"
      | "dashboard"
      | "blog-detail",
    projectId?: number,
  ) => void
  currentPage: string
}

const VideosPage: React.FC<VideosPageProps> = ({ navigate, currentPage }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const { videos, loading, error, usingFallback, trackVideoView, refetch } = useVideos()

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video)
    setIsPlayerOpen(true)
    trackVideoView(video.id)
  }

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Group videos by category
  const videosByCategory = filteredVideos.reduce(
    (acc, video) => {
      if (!acc[video.category]) {
        acc[video.category] = []
      }
      acc[video.category].push(video)
      return acc
    },
    {} as Record<string, Video[]>,
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header navigate={navigate} currentPage={currentPage} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Videos</h3>
            <p className="text-gray-600">Please wait while we fetch the latest videos...</p>
            <div className="mt-4 text-sm text-gray-500">
              {API_CONFIG.USE_API ? "Connecting to API..." : "Loading sample content..."}
            </div>
          </div>
        </div>
        <Footer navigate={navigate} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header navigate={navigate} currentPage={currentPage} />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            Our Videos
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Video <span className="text-green-600">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Watch our videos to learn more about RNADW programs, community impact, and inspiring stories from deaf women
            across Rwanda
          </p>
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>{videos.length} Videos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>{videos.reduce((total, video) => total + video.views, 0).toLocaleString()} Total Views</span>
              </div>
              <div className="flex items-center space-x-2">
                {usingFallback ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
                <span>{usingFallback ? "Sample Content" : "Live Content"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Status Banner */}
      {usingFallback && (
        <section className="py-4 px-4 bg-blue-50 border-b border-blue-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-blue-800">
              
              
              
            </div>
          </div>
        </section>
      )}

      {/* Search Section */}
      <section className="py-8 px-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Search videos by title, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Videos Gallery */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No videos found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(videosByCategory).map(([category, categoryVideos]) => (
                <div key={category} className="space-y-6">
                  {/* Category Header */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 capitalize mb-2">
                      {category.replace(/([A-Z])/g, " $1").trim()}
                    </h2>
                    <div className="w-16 h-1 bg-green-500 mx-auto"></div>
                  </div>

                  {/* Videos Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryVideos.map((video) => (
                      <div
                        key={video.id}
                        className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => handleVideoClick(video)}
                      >
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Play className="w-8 h-8 text-white ml-1" />
                            </div>
                          </div>
                          <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                          <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{video.views.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                          <h3 className="font-bold text-white text-lg mb-2">{video.title}</h3>
                          <p className="text-gray-200 text-sm mb-3 line-clamp-2">{video.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-300">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{video.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{video.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results Summary */}
          {filteredVideos.length > 0 && (
            <div className="mt-16 text-center">
              <div className="inline-flex items-center space-x-6 px-6 py-3 bg-gray-50 rounded-full text-sm text-gray-600">
                <span>Showing {filteredVideos.length} videos</span>
                <span>•</span>
                <span>{Object.keys(videosByCategory).length} categories</span>
                <span>•</span>
                <span>
                  {filteredVideos.reduce((total, video) => total + video.views, 0).toLocaleString()} total views
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Video Player Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        onView={(videoId) => trackVideoView(videoId)}
      />

      <Footer navigate={navigate} />
    </div>
  )
}

export default VideosPage
