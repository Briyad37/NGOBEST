"use client"

import type React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

interface TestVideosPageProps {
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

const TestVideosPage: React.FC<TestVideosPageProps> = ({ navigate, currentPage }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header navigate={navigate} currentPage={currentPage} />

      <div className="py-20 px-4 bg-blue-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-blue-900">THIS IS VIDEOS PAGE</h1>
          <p className="text-xl text-blue-700 mt-4">Current Page: {currentPage}</p>
          <p className="text-lg text-blue-600 mt-2">If you see this, Videos routing is working!</p>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  )
}

export default TestVideosPage
