"use client"

import { useState, useEffect } from "react"
import { apiCall, API_CONFIG } from "../config/api"
import type { Video } from "../types/resources"

interface ApiVideoResponse {
  success: boolean
  data: ApiVideo[] | { videos: ApiVideo[] }
  message?: string
  error?: string
}

interface ApiVideo {
  id: number | string
  title: string
  description: string
  url: string
  thumbnail_url: string
  created_at: string
  duration: string
  views: number
  category: string
}

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    fetchVideos()
    
  }, [])

  const fetchVideos = async () => {
    // ...existing code...
    
// ...existing code...
    try {
      setLoading(true)
      setError(null)
      setUsingFallback(true)

      console.log("Attempting to fetch videos...")
      console.log("API_CONFIG.USE_API:", API_CONFIG.USE_API)
      console.log("API_CONFIG.BASE_URL:", API_CONFIG.BASE_URL)

      // If API is disabled, go straight to fallback
      if (!API_CONFIG.USE_API) {
        console.log("API disabled, using fallback data")
        setUsingFallback(true)
        setVideos(getMockVideosData())
        return
      }

      // Try to fetch from your API - using the correct endpoint
      const result = await apiCall<ApiVideoResponse>(API_CONFIG.ENDPOINTS.VIDEOS)

      if (result.success && result.data) {
        console.log("API call successful, processing data...")

        // Handle different response structures
        let videosArray: ApiVideo[] = []

        if (Array.isArray(result.data)) {
          videosArray = result.data
        } else if (result.data.videos && Array.isArray(result.data.videos)) {
          videosArray = result.data.videos
        }

        if (videosArray.length === 0) {
          console.warn("No videos found in API response, using fallback")
          throw new Error("No videos found in API response")
        }

        // Transform API data to our application format
        const transformedVideos = videosArray.map((apiVideo) => ({
          id: Number(apiVideo.id),
          title: apiVideo.title || "Untitled Video",
          description: apiVideo.description || "No description available",
          thumbnail: apiVideo.thumbnail_url.startsWith("http")
            ? apiVideo.thumbnail_url
            : `${API_CONFIG.BASE_URL}${apiVideo.thumbnail_url}`,
          videoUrl: apiVideo.url.startsWith("http")
            ? apiVideo.url
            : `${API_CONFIG.BASE_URL}${apiVideo.url}`,
          date: formatDate(apiVideo.created_at),
          duration: apiVideo.duration || "00:00",
          views: apiVideo.views || 0,
          category: apiVideo.category || "uncategorized",
        }))

        setVideos(transformedVideos)
        console.log("Videos fetched successfully from API:", transformedVideos.length, "videos")
      } else {
        throw new Error(result.error || result.message || "Failed to fetch videos from API")
      }
    } catch (err) {
      console.warn("API fetch failed, using fallback data:", err)
      setError(err instanceof Error ? err.message : "API unavailable")

      // Always use fallback data when API fails
      const fallbackVideos = getMockVideosData()
      setVideos(fallbackVideos)
      setUsingFallback(true)
      console.log("Using fallback video data:", fallbackVideos.length, "videos")
    } finally {
      setLoading(false)
    }

  }

  const trackVideoView = async (videoId: number) => {
    try {
      // Only track views if API is available and not using fallback
      if (!usingFallback && API_CONFIG.USE_API) {
        console.log("Tracking video view for ID:", videoId)
        await apiCall(`/api/media/videos/${videoId}/view`, {
          method: "POST",
        })
      }

      // Update view count locally regardless of API success
      setVideos((prev) => prev.map((video) => (video.id === videoId ? { ...video, views: video.views + 1 } : video)))
    } catch (err) {
      console.warn("Failed to track video view:", err)
      // Still update locally even if API call fails
      setVideos((prev) => prev.map((video) => (video.id === videoId ? { ...video, views: video.views + 1 } : video)))
    }
  }

  return {
    videos,
    loading,
    error,
    usingFallback,
    trackVideoView,
    refetch: fetchVideos,
  }
}

// Helper function to format date from API
function formatDate(dateString: string): string {
  try {
    if (!dateString) return "Unknown Date"
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch (e) {
    return dateString || "Unknown Date"
  }
}

// Enhanced mock data for fallback - RNADW specific content
function getMockVideosData(): Video[] {
  return [
    {
      id: 1,
      title: "RNADW Introduction - Our Mission",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "December 2023",
      duration: "5:32",
      description:
        "Introduction to Rwanda National Association of Deaf Women (RNADW) and our mission to empower deaf women across Rwanda through education, advocacy, and community support.",
      videoUrl: "/videos/rnadw-introduction.mp4",
      views: 2450,
      category: "introduction",
    },
    {
      id: 2,
      title: "Rwandan Sign Language Basics",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "November 2023",
      duration: "12:45",
      description:
        "Learn the fundamentals of Rwandan Sign Language with our expert instructors. Perfect for beginners and families of deaf individuals.",
      videoUrl: "/videos/sign-language-basics.mp4",
      views: 1890,
      category: "education",
    },
    {
      id: 3,
      title: "Success Stories - Empowered Women",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "October 2023",
      duration: "8:20",
      description:
        "Inspiring stories from our community members who have overcome challenges and achieved their goals through RNADW programs and support.",
      videoUrl: "/videos/success-stories.mp4",
      views: 1650,
      category: "stories",
    },
    {
      id: 4,
      title: "Community Impact - Making a Difference",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "September 2023",
      duration: "6:15",
      description:
        "See how RNADW is making a difference in the community through various programs, advocacy work, and partnerships across Rwanda.",
      videoUrl: "/videos/community-impact.mp4",
      views: 1420,
      category: "impact",
    },
    {
      id: 5,
      title: "Vocational Training Workshop",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "August 2023",
      duration: "15:30",
      description:
        "Professional development and skills training sessions for deaf women entrepreneurs, including business skills and financial literacy.",
      videoUrl: "/videos/training-workshop.mp4",
      views: 980,
      category: "training",
    },
    {
      id: 6,
      title: "Annual Conference 2023 Highlights",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "July 2023",
      duration: "22:10",
      description:
        "Highlights from our annual conference bringing together deaf women leaders, advocates, and supporters from across Rwanda and beyond.",
      videoUrl: "/videos/annual-conference.mp4",
      views: 2100,
      category: "events",
    },
    {
      id: 7,
      title: "Women's Rights Advocacy",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "June 2023",
      duration: "11:30",
      description:
        "Our advocacy work for deaf women's rights, inclusion in society, and equal opportunities in education and employment.",
      videoUrl: "/videos/womens-rights.mp4",
      views: 1580,
      category: "advocacy",
    },
    {
      id: 8,
      title: "Health Education Program",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "May 2023",
      duration: "9:45",
      description:
        "Educational content about health awareness, reproductive health, and HIV/AIDS prevention specifically designed for the deaf community.",
      videoUrl: "/videos/health-education.mp4",
      views: 1320,
      category: "health",
    },
    {
      id: 9,
      title: "Sign Language Interpreter Training",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "April 2023",
      duration: "18:20",
      description:
        "Training program for sign language interpreters to improve communication accessibility in healthcare, education, and legal settings.",
      videoUrl: "/videos/interpreter-training.mp4",
      views: 890,
      category: "training",
    },
    {
      id: 10,
      title: "Youth Mentorship Program",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "March 2023",
      duration: "7:55",
      description:
        "Our mentorship program connecting young deaf women with successful role models and providing guidance for their future careers.",
      videoUrl: "/videos/youth-mentorship.mp4",
      views: 1150,
      category: "youth",
    },
  ]
}