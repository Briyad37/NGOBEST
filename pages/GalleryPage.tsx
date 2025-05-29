"use client"

import type React from "react"
import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Play, FileText, Download } from "lucide-react"

interface GalleryPageProps {
  navigate: (page: "home" | "projects" | "project-blog" | "about" | "blogs" | "gallery", projectId?: number) => void
  currentPage: string
}

const GalleryPage: React.FC<GalleryPageProps> = ({ navigate, currentPage }) => {
  const [activeTab, setActiveTab] = useState<"photos" | "videos" | "documents">("photos")

  // Sample gallery data - would come from API in real implementation
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

  const videos = [
    { id: 1, title: "RNADW Introduction", thumbnail: "/placeholder.svg?height=300&width=400", date: "June 2023" },
    { id: 2, title: "Sign Language Basics", thumbnail: "/placeholder.svg?height=300&width=400", date: "May 2023" },
    { id: 3, title: "Success Stories", thumbnail: "/placeholder.svg?height=300&width=400", date: "April 2023" },
    { id: 4, title: "Community Impact", thumbnail: "/placeholder.svg?height=300&width=400", date: "March 2023" },
    { id: 5, title: "Training Workshop", thumbnail: "/placeholder.svg?height=300&width=400", date: "February 2023" },
    { id: 6, title: "Annual Conference", thumbnail: "/placeholder.svg?height=300&width=400", date: "January 2023" },
  ]

  const documents = [
    { id: 1, title: "Annual Report 2022", type: "PDF", size: "2.4 MB", date: "January 2023" },
    { id: 2, title: "Strategic Plan 2023-2025", type: "PDF", size: "3.1 MB", date: "December 2022" },
    { id: 3, title: "Training Manual", type: "PDF", size: "1.8 MB", date: "November 2022" },
    { id: 4, title: "Research Report: Deaf Women in Rwanda", type: "PDF", size: "4.2 MB", date: "October 2022" },
    { id: 5, title: "Newsletter Q4 2022", type: "PDF", size: "1.2 MB", date: "October 2022" },
    { id: 6, title: "Brochure: Our Programs", type: "PDF", size: "0.8 MB", date: "September 2022" },
    { id: 7, title: "Sign Language Guide", type: "PDF", size: "5.6 MB", date: "August 2022" },
    { id: 8, title: "Newsletter Q3 2022", type: "PDF", size: "1.1 MB", date: "July 2022" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header navigate={navigate} currentPage={currentPage} />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-green-500 font-medium">Our Media</span>
          <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-4"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore photos, videos, and documents showcasing our work and impact
          </p>
        </div>
      </section>

      {/* Gallery Tabs */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab("photos")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "photos" ? "bg-white text-gray-900 shadow" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Photos
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "videos" ? "bg-white text-gray-900 shadow" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "documents" ? "bg-white text-gray-900 shadow" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Documents
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Photos Tab */}
          {activeTab === "photos" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div key={photo.id} className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.title}
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
          )}

          {/* Videos Tab */}
          {activeTab === "videos" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="font-medium text-white">{video.title}</h3>
                    <p className="text-sm text-gray-300">{video.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-sm font-medium text-gray-900">{doc.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-green-500 hover:text-green-600 flex items-center justify-end">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  )
}

export default GalleryPage
