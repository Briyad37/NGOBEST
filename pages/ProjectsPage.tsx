"use client"

import React, { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useProjects } from "../hooks/useProjects"
import type { Project } from "../types"

interface ProjectsPageProps {
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
    projectId?: number | string,
  ) => void
  currentPage: string
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ navigate, currentPage }) => {
  const { projects, loading, error, isUsingFallback } = useProjects()
  const [localError, setError] = useState<string | null>(null)

  // Debug the projects data structure
  React.useEffect(() => {
    if (projects.length > 0) {
      console.log("=== PROJECT DATA DEBUG ===")
      console.log("Total projects:", projects.length)
      console.log("First project full object:", projects[0])
      console.log("First project keys:", Object.keys(projects[0]))
      console.log("First project _id:", projects[0]._id)
      console.log("Using fallback data:", isUsingFallback)
      console.log("========================")
    }
  }, [projects, isUsingFallback])

  // Function to check if image URL is valid (not PDF)
  const hasValidImage = (project: Project) => {
    const imageUrl = project.thumbnail || project.image
    return imageUrl && !imageUrl.includes(".pdf") && !imageUrl.includes("undefined")
  }

  const getImageUrl = (project: Project) => {
    if (project.thumbnail && !project.thumbnail.includes(".pdf")) {
      return project.thumbnail
    }
    if (project.image && !project.image.includes(".pdf")) {
      return project.image
    }
    return null
  }

  // Get project ID - prioritize _id from MongoDB
  const getProjectId = (project: any): string | number | null => {
    console.log("Getting ID for project:", project.title)

    // For MongoDB, _id is the primary identifier
    if (project._id) {
      console.log("Found MongoDB _id:", project._id)
      return project._id // Return as string
    }

    // Fallback to other possible ID fields
    const possibleIds = [project.id, project.projectId, project.ID, project.pk, project.key]

    for (const id of possibleIds) {
      if (id !== undefined && id !== null) {
        console.log("Found fallback ID:", id)
        return id
      }
    }

    console.log("No valid ID found")
    return null
  }

  // Handle project click
  const handleProjectClick = (project: Project, index: number) => {
    console.log("=== CLICK DEBUG ===")
    console.log("Clicking project:", project.title)
    console.log("Full project object:", project)

    const projectId = getProjectId(project)

    if (!projectId) {
      console.error("No project ID found for:", project.title)
      setError("Project ID not found - cannot navigate")
      return
    }

    console.log("Navigating to project-blog with ID:", projectId)
    navigate("project-blog", projectId) // Pass the full ID (string or number)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header navigate={navigate} currentPage={currentPage} />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-green-500 font-medium">What We Do</span>
          <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-4"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our ongoing and completed projects that are making a real difference in the lives of deaf women and
            girls across Rwanda.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : error || localError ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">Error loading projects: {error || localError}</p>
              <p className="text-gray-600">Please check your API connection</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No projects found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => {
                const displayId = getProjectId(project)
                return (
                  <div
                    key={project._id || idx}
                    onClick={() => handleProjectClick(project, idx)}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                  >
                    {/* Image section */}
                    <div className="w-full h-48 overflow-hidden bg-gray-100">
                      <img
                        src={
                          getImageUrl(project) ||
                          `https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop&crop=center` ||
                          "/placeholder.svg"
                        }
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          // Use a CSS-only fallback instead of another image that might fail
                          target.style.display = "none"
                          // Show the parent div's fallback content instead
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = `
      <div class="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
        <div class="text-center">
          <svg class="w-12 h-12 text-green-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          <div class="text-green-600 text-sm font-medium">Project Image</div>
        </div>
      </div>
    `
                          }
                        }}
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
                          {project.category || "General"}
                        </span>
                        <span className="text-gray-500 text-sm">{project.date || "Recent"}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{project.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {project.description || "No description available"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-green-500 font-medium hover:text-green-600 transition-colors">
                          Read More →
                        </span>
                        <span className="text-xs text-gray-400">Learn More</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  )
}

export default ProjectsPage
