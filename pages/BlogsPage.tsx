"use client"

import type React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Calendar, User, ArrowRight } from "lucide-react"
import { useBlogs } from "../hooks/useBlogs"

interface BlogsPageProps {
  navigate: (page: "home" | "projects" | "project-blog" | "about" | "blogs" | "gallery", projectId?: number) => void
  currentPage: string
}

const BlogsPage: React.FC<BlogsPageProps> = ({ navigate, currentPage }) => {
  const { blogs, loading, error } = useBlogs()

  return (
    <div className="min-h-screen bg-white">
      <Header navigate={navigate} currentPage={currentPage} />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-green-500 font-medium">Stay Informed</span>
          <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-4"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Blog & Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            News, updates, success stories, and insights from our work with deaf women and girls in Rwanda
          </p>
        </div>
      </section>

      {/* Blog Grid */}
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
              <p className="text-orange-500 mb-4">API Status: {error}</p>
              <p className="text-gray-600">Showing available data</p>
            </div>
          ) : null}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => navigate("blog-detail", Number(blog.id))}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
                      {blog.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {blog.excerpt || blog.content.substring(0, 150) + "..."}
                  </p>

                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <div className="flex items-center mr-4">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{blog.author}</span>
                    </div>
                  </div>

                  <button className="flex items-center text-green-500 font-medium hover:text-green-600 transition-colors">
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300">
                &lt;
              </button>
              <button className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                1
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300">
                2
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300">
                3
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  )
}

export default BlogsPage
