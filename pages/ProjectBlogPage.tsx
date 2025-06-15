"use client"

import type React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useProject } from "../hooks/useProject"

interface ProjectBlogPageProps {
  navigate: (
    page: "home" | "projects" | "project-blog" | "about" | "blogs" | "gallery" | "login" | "dashboard" | "blog-detail",
    projectId?: number | string,
  ) => void
  projectId: number | string // FIXED: Accept both number and string
  currentPage: string
}

const ProjectBlogPage: React.FC<ProjectBlogPageProps> = ({ navigate, projectId, currentPage }) => {
  const { project, loading, error } = useProject(projectId)

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header navigate={navigate} currentPage={currentPage} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading project...</p>
          </div>
        </div>
        <Footer navigate={navigate} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header navigate={navigate} currentPage={currentPage} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate("projects")}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Back to Projects
            </button>
          </div>
        </div>
        <Footer navigate={navigate} />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <Header navigate={navigate} currentPage={currentPage} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Project Data</h2>
            <p className="text-gray-600 mb-6">The project data could not be loaded.</p>
            <button
              onClick={() => navigate("projects")}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Back to Projects
            </button>
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
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("projects")}
            className="flex items-center text-green-500 hover:text-green-600 mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>

          <div className="mb-6">
            <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
              {project.category || "Project"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{project.title}</h1>

          <div className="flex items-center text-gray-600 mb-8">
            <span className="mr-6">📅 {project.date || "Recent"}</span>
            {project.author && <span>👤 {project.author}</span>}
          </div>

          <p className="text-xl text-gray-600 leading-relaxed">{project.description}</p>
        </div>
      </section>

      {/* Project Image */}
      {(project.image || project.thumbnail) && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={project.image || project.thumbnail || ""}
                alt={project.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Project Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {project.content ? (
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">{project.content}</div>
            ) : project.details ? (
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">{project.details}</div>
            ) : project.summary ? (
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">{project.summary}</div>
            ) : (
              <div className="text-gray-500 italic">No detailed content available for this project.</div>
            )}
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate("projects")}
                className="flex items-center text-green-500 hover:text-green-600 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                All Projects
              </button>

              <div className="text-sm text-gray-500">Project ID: {projectId}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  )
}

export default ProjectBlogPage
