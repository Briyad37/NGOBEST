"use client"

import { useState, useEffect } from "react"
import { blogService } from "../services/blogService"
import type { BlogPost } from "../services/blogService"

// Hook to fetch all blogs
export const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBlogs = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await blogService.fetchBlogs()
      if (data) {
        setBlogs(data)
      } else {
        setError("Failed to fetch blogs")
      }
    } catch (err) {
      console.error("Error fetching blogs:", err)
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const refreshBlogs = async () => {
    try {
      const data = await blogService.fetchBlogs()
      if (data) {
        setBlogs(data)
      }
    } catch (err) {
      console.error("Error refreshing blogs:", err)
    }
  }

  return { blogs, loading, error, refreshBlogs }
}

// Hook to fetch a single blog by ID
export const useBlog = (id: string) => {
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBlog = async (blogId: string) => {
    setLoading(true)
    setError(null)

    try {
      const data = await blogService.fetchBlogById(blogId)
      if (data) {
        setBlog(data)
      } else {
        setError("Failed to fetch blog")
      }
    } catch (err) {
      console.error("Error fetching blog:", err)
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchBlog(id)
    }
  }, [id])

  return { blog, loading, error }
}
