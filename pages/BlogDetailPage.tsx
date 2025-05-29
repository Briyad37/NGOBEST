"use client"

import type React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { ArrowLeft, Calendar, User, Share2, Tag } from "lucide-react"
import { useBlog } from "../hooks/useBlogs"

interface BlogDetailPageProps {
  navigate: (
    page: "home" | "projects" | "project-blog" | "about" | "blogs" | "gallery" | "blog-detail",
    projectId?: number,
  ) => void
  blogId: number
  currentPage: string
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ navigate, blogId, currentPage }) => {
  const { blog, loading, error } = useBlog(blogId.toString())

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

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white">
        <Header navigate={navigate} currentPage={currentPage} />
        <div className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate("blogs")}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header navigate={navigate} currentPage={currentPage} />

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("blogs")}
            className="flex items-center text-green-500 hover:text-green-600 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blogs
          </button>

          <div className="mb-6">
            <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
              {blog.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{blog.title}</h1>

          <div className="flex items-center space-x-6 text-gray-600 mb-8">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span>By {blog.author}</span>
            </div>
            <button className="flex items-center hover:text-green-500">
              <Share2 className="w-5 h-5 mr-2" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4">
        <div className="max-w-4xl mx-auto">
          <img
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed space-y-6">
              {blog.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center mb-4">
                <Tag className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium text-gray-700">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  )
}

export default BlogDetailPage
