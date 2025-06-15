"use client"

import type React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react'
import { useProject } from "../hooks/useProject"

interface ProjectBlogPageProps {
  navigate: (
    page:
      | "home"
      | "projects"
      | "project-blog"
      | "about"
      | "blogs"
      | "gallery"
      | "login"
      | "dashboard"
      | "blog-detail",
    projectId?: number
  ) => void
  projectId: number
  currentPage: string
}

const ProjectBlogPage: React.FC<ProjectBlogPageProps> = ({ navigate, projectId, currentPage }) => {
  const { project, loading, error } = useProject(projectId)

  // Simple function to check if image URL is valid (not PDF)
  const hasValidImage = (project: any) => {
    const imageUrl = project?.image || project?.thumbnail
    return imageUrl && !imageUrl.includes('.pdf') && !imageUrl.includes('undefined')
  }

  const getImageUrl = (project: any) => {
    if (project?.image && !project.image.includes('.pdf')) {
      return project.image
    }
    if (project?.thumbnail && !project.thumbnail.includes('.pdf')) {
      return project.thumbnail
    }
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header navigate={navigate} currentPage={currentPage} />
        <div className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white">
        <Header navigate={navigate} currentPage={currentPage} />
        <div className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate("projects")}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            >
              Back to Projects
            </button>
          </div>
        </div>
      </div>
    )
  }

  const relatedProjects = [
    { id: 2, title: "Health and Wellness Program" },
    { id: 3, title: "Economic Empowerment Initiative" },
  ].filter((p) => p.id !== projectId)

  return (
    <div className="min-h-screen bg-white">
      <Header navigate={navigate} currentPage={currentPage} />

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("projects")}
            className="flex items-center text-green-500 hover:text-green-600 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Projects
          </button>

          <div className="mb-6">
            <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
              {project.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{project.title}</h1>

          <div className="flex items-center space-x-6 text-gray-600 mb-8">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{project.date}</span>
            </div>
            <div className="flex items-center">
              <span>By {project.author || "RNADW Team"}</span>
            </div>
            <button className="flex items-center hover:text-green-500">
              <Share2 className="w-5 h-5 mr-2" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Image - only show if valid image exists */}
      {hasValidImage(project) && (
        <section className="px-4">
          <div className="max-w-4xl mx-auto">
            <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <img
                src={getImageUrl(project) || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {project.content ? (
              <div className="text-gray-700 leading-relaxed space-y-6">
                {project.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <div className="text-gray-700 leading-relaxed space-y-6">
                <p className="text-lg leading-relaxed">{project.description}</p>
              </div>
            )}
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center mb-4">
                <Tag className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium text-gray-700">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Projects</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedProjects.map((relatedProject) => (
                <div
                  key={relatedProject.id}
                  onClick={() => navigate("project-blog", relatedProject.id)}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className="w-full h-48 bg-gray-100"></div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{relatedProject.title}</h4>
                    <span className="text-green-500 font-medium hover:text-green-600">Read More →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer navigate={navigate} />
    </div>
  )
}

export default ProjectBlogPage