"use client"

import type React from "react"
import Image from "next/image"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Play } from "lucide-react"

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

const VideosPages: React.FC<VideosPageProps> = ({ navigate, currentPage }) => {
  // Sample videos data - would come from API in real implementation
  const videos = [
    {
      id: 1,
      title: "RNADW Introduction",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "June 2023",
      duration: "5:32",
    },
    {
      id: 2,
      title: "Sign Language Basics",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "May 2023",
      duration: "12:45",
    },
    {
      id: 3,
      title: "Success Stories",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "April 2023",
      duration: "8:20",
    },
    {
      id: 4,
      title: "Community Impact",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "March 2023",
      duration: "6:15",
    },
    {
      id: 5,
      title: "Training Workshop",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "February 2023",
      duration: "15:30",
    },
    {
      id: 6,
      title: "Annual Conference",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "January 2023",
      duration: "22:10",
    },
    {
      id: 7,
      title: "Women Empowerment Session",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "December 2022",
      duration: "18:45",
    },
    {
      id: 8,
      title: "Advocacy Campaign",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "November 2022",
      duration: "9:30",
    },
    {
      id: 9,
      title: "Educational Program",
      thumbnail: "/placeholder.svg?height=300&width=400",
      date: "October 2022",
      duration: "14:20",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header navigate={navigate} currentPage={currentPage} />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-green-500 font-medium">Our Videos</span>
          <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-4"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Video Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch our videos to learn more about our programs, impact, and community
          </p>
        </div>
      </section>

      {/* Videos Gallery */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h3 className="font-medium text-white">{video.title}</h3>
                  <p className="text-sm text-gray-300">{video.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  )
}

export default VideosPages
