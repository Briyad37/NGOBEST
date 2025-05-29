"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  BarChart3,
  Users,
  FileText,
  ImageIcon,
  Video,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  X,
  Save,
} from "lucide-react"
import { useBlogs } from "../hooks/useBlogs"
import { blogService, type CreateBlogPost } from "../services/blogService"

interface DashboardPageProps {
  navigate: (
    page: "home" | "projects" | "project-blog" | "about" | "blogs" | "gallery" | "login" | "dashboard",
    projectId?: number,
  ) => void
  currentPage: string
}

const DashboardPage: React.FC<DashboardPageProps> = ({ navigate, currentPage }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "blogs" | "gallery" | "team" | "settings">(
    "overview",
  )
  const [adminUser, setAdminUser] = useState("")
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Blog form state
  const [blogForm, setBlogForm] = useState<CreateBlogPost>({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    category: "",
    tags: [],
    image: "",
    published: true,
  })

  const { blogs, loading: blogsLoading, error: blogsError, refreshBlogs } = useBlogs()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn")
    const user = localStorage.getItem("adminUser")

    if (!isLoggedIn) {
      navigate("login")
      return
    }

    setAdminUser(user || "Admin")
    setBlogForm((prev) => ({ ...prev, author: user || "Admin" }))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn")
    localStorage.removeItem("adminUser")
    localStorage.removeItem("authToken")
    navigate("home")
  }

  const handleBlogFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (name === "tags") {
      // Handle tags as comma-separated values
      const tagsArray = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
      setBlogForm((prev) => ({ ...prev, tags: tagsArray }))
    } else if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setBlogForm((prev) => ({ ...prev, [name]: checked }))
    } else {
      setBlogForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmitBlog = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      // Validate required fields
      if (!blogForm.title || !blogForm.content || !blogForm.category) {
        setSubmitMessage({ type: "error", text: "Please fill in all required fields" })
        setIsSubmitting(false)
        return
      }

      // Generate excerpt if not provided
      const blogData = {
        ...blogForm,
        excerpt: blogForm.excerpt || blogForm.content.substring(0, 150) + "...",
      }

      const response = await blogService.createBlog(blogData)

      if (response.success) {
        setSubmitMessage({ type: "success", text: "Blog post created successfully!" })
        // Reset form
        setBlogForm({
          title: "",
          content: "",
          excerpt: "",
          author: adminUser,
          category: "",
          tags: [],
          image: "",
          published: true,
        })
        // Refresh blogs list
        refreshBlogs()
        // Close form after a delay
        setTimeout(() => {
          setShowBlogForm(false)
          setSubmitMessage(null)
        }, 2000)
      } else {
        setSubmitMessage({ type: "error", text: response.error || "Failed to create blog post" })
      }
    } catch (error) {
      setSubmitMessage({ type: "error", text: "An error occurred while creating the blog post" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeBlogForm = () => {
    setShowBlogForm(false)
    setSubmitMessage(null)
    setBlogForm({
      title: "",
      content: "",
      excerpt: "",
      author: adminUser,
      category: "",
      tags: [],
      image: "",
      published: true,
    })
  }

  // Sample data for dashboard
  const stats = [
    { title: "Total Projects", value: "12", change: "+2", icon: FileText, color: "bg-blue-500" },
    {
      title: "Blog Posts",
      value: (blogs?.length || 0).toString(),
      change: "+5",
      icon: FileText,
      color: "bg-green-500",
    },
    { title: "Gallery Items", value: "156", change: "+12", icon: ImageIcon, color: "bg-purple-500" },
    { title: "Team Members", value: "8", change: "+1", icon: Users, color: "bg-orange-500" },
  ]

  const recentProjects = [
    { id: 1, title: "Education and Skills Training", status: "Active", date: "2024-01-15" },
    { id: 2, title: "Health and Wellness Program", status: "Active", date: "2024-01-10" },
    { id: 3, title: "Economic Empowerment Initiative", status: "Completed", date: "2024-01-05" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">👥</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">RNADW Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {adminUser}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate("home")} className="text-gray-600 hover:text-green-500 transition-colors">
                <Eye className="w-5 h-5" />
                <span className="ml-1 text-sm">View Site</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="ml-1 text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-6">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === "overview"
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === "projects"
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("blogs")}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === "blogs"
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  Blogs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("gallery")}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === "gallery"
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <ImageIcon className="w-5 h-5 mr-3" />
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("team")}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === "team"
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Users className="w-5 h-5 mr-3" />
                  Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === "settings"
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600 flex items-center mt-1">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {stat.change} this month
                        </p>
                      </div>
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Projects</h3>
                  <div className="space-y-3">
                    {recentProjects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{project.title}</p>
                          <p className="text-sm text-gray-600">{project.date}</p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            project.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Blog Posts</h3>
                  <div className="space-y-3">
                    {blogs && blogs.length > 0 ? (
                      blogs.slice(0, 3).map((blog) => (
                        <div key={blog.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{blog.title}</p>
                            <p className="text-sm text-gray-600">{new Date(blog.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              blog.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {blog.published ? "Published" : "Draft"}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg text-center text-gray-500">No recent blog posts</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Projects</h2>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Project
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{project.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            Education
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              project.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Blogs Tab */}
          {activeTab === "blogs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Blog Posts</h2>
                <button
                  onClick={() => setShowBlogForm(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Post
                </button>
              </div>

              {blogsLoading ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading blogs...</p>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Author
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {blogs && blogs.length > 0 ? (
                        blogs.map((blog) => (
                          <tr key={blog.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{blog.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog.author}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                {blog.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  blog.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {blog.published ? "Published" : "Draft"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                            {blogsLoading ? "Loading blogs..." : "No blog posts found"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {blogsError && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-600">API Status: {blogsError}</p>
                </div>
              )}
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Gallery</h2>
                <div className="flex space-x-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Add Photos
                  </button>
                  <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center">
                    <Video className="w-4 h-4 mr-2" />
                    Add Videos
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center py-12">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No media files yet</h3>
                  <p className="text-gray-600 mb-4">Upload photos, videos, and documents to get started</p>
                  <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    Upload Files
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === "team" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Manage Team</h2>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Team Member
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Team management coming soon</h3>
                  <p className="text-gray-600">Add and manage team member profiles</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center py-12">
                  <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Settings panel coming soon</h3>
                  <p className="text-gray-600">Configure website settings and preferences</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Blog Form Modal */}
      {showBlogForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Add New Blog Post</h3>
              <button onClick={closeBlogForm} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitBlog} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={blogForm.title}
                  onChange={handleBlogFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter blog title"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={blogForm.category}
                  onChange={handleBlogFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  <option value="Events">Events</option>
                  <option value="Success Stories">Success Stories</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Partnerships">Partnerships</option>
                  <option value="News">News</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={blogForm.tags.join(", ")}
                  onChange={handleBlogFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., sign language, education, empowerment"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={blogForm.image}
                  onChange={handleBlogFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt (optional)</label>
                <textarea
                  name="excerpt"
                  value={blogForm.excerpt}
                  onChange={handleBlogFormChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Brief description of the blog post (will be auto-generated if left empty)"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  value={blogForm.content}
                  onChange={handleBlogFormChange}
                  required
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Write your blog content here..."
                />
              </div>

              {/* Published */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="published"
                  checked={blogForm.published}
                  onChange={handleBlogFormChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Publish immediately</label>
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <div
                  className={`p-4 rounded-lg ${
                    submitMessage.type === "success"
                      ? "bg-green-50 border border-green-200 text-green-600"
                      : "bg-red-50 border border-red-200 text-red-600"
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={closeBlogForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Create Blog Post
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
