"use client"

import type React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useProjects } from "../hooks/useProjects"

interface ProjectsPageProps {
  navigate: (page: "home" | "projects" | "project-blog", projectId?: number) => void
  currentPage: string
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ navigate, currentPage }) => {
  const { projects, loading, error } = useProjects()

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
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">Error loading projects: {error}</p>
              <p className="text-gray-600">Showing cached data</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate("project-blog", project.id)}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
                        {project.category}
                      </span>
                      <span className="text-gray-500 text-sm">{project.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>
                    <span className="text-green-500 font-medium hover:text-green-600 transition-colors">
                      Read More →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  )
}

export default ProjectsPage
