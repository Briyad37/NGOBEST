"use client"

import type React from "react"
import Image from "next/image"
import Header from "../components/Header"
import Footer from "../components/Footer"

interface GalleryPageProps {
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

const GalleryPage: React.FC<GalleryPageProps> = ({ navigate, currentPage }) => {
  // Sample photos data - would come from API in real implementation
  const photos = [
    { id: 1, title: "Community Workshop", src: "/placeholder.svg?height=300&width=400", date: "June 2023" },
    { id: 2, title: "Graduation Ceremony", src: "/placeholder.svg?height=300&width=400", date: "May 2023" },
    { id: 3, title: "Sign Language Training", src: "/placeholder.svg?height=300&width=400", date: "April 2023" },
    { id: 4, title: "Women's Day Celebration", src: "/placeholder.svg?height=300&width=400", date: "March 2023" },
    { id: 5, title: "Vocational Training", src: "/placeholder.svg?height=300&width=400", date: "February 2023" },
    { id: 6, title: "Community Outreach", src: "/placeholder.svg?height=300&width=400", date: "January 2023" },
    { id: 7, title: "Leadership Workshop", src: "/placeholder.svg?height=300&width=400", date: "December 2022" },
    { id: 8, title: "Health Awareness Campaign", src: "/placeholder.svg?height=300&width=400", date: "November 2022" },
    { id: 9, title: "Team Building Activity", src: "/placeholder.svg?height=300&width=400", date: "October 2022" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header navigate={navigate} currentPage={currentPage} />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-green-500 font-medium">Our Photos</span>
          <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-4"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Photo Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore photos showcasing our work, events, and community impact
          </p>
        </div>
      </section>

      {/* Photos Gallery */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-medium">{photo.title}</h3>
                  <p className="text-sm text-gray-300">{photo.date}</p>
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

export default GalleryPage
