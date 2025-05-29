"use client"

import type React from "react"
import { useProjects } from "../hooks/useProjects"

interface ProgramsSectionProps {
  navigate: (page: "home" | "projects" | "project-blog", projectId?: number) => void
}

const ProgramsSection: React.FC<ProgramsSectionProps> = ({ navigate }) => {
  const { projects, loading, error } = useProjects()

  // Show only first 4 projects on home page
  const displayProjects = projects.slice(0, 4)

  if (loading) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-500 font-medium">What We Do</span>
            <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Programs & Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500">Error loading projects: {error}</p>
          <p className="text-gray-600 mt-2">Showing cached data</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-green-500 font-medium">What We Do</span>
          <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Programs & Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We implement various programs designed to empower deaf women and girls in Rwanda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate("project-blog", project.id)}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            >
              <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                  <span className="text-gray-500 text-sm">{project.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{project.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>
                <span className="text-green-500 font-medium hover:text-green-600 transition-colors">Read More →</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("projects")}
            className="bg-green-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProgramsSection
