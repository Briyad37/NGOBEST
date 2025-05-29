"use client"
import { useState, useEffect } from "react"
import { blogService } from "../services/blogService"
import type { BlogPost } from "../services/blogService"

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await blogService.getAllBlogs()

        if (response.success && response.data) {
          setBlogs(response.data)
        } else {
          setError(response.error || "Failed to fetch blogs")
        }
      } catch (err) {
        console.error("Error fetching blogs:", err)
        setError("Network error")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const refreshBlogs = async () => {
    const response = await blogService.getAllBlogs()
    if (response.success && response.data) {
      setBlogs(response.data)
    }
  }

  return { blogs, loading, error, refreshBlogs }
}

export const useBlog = (id: string) => {
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await blogService.getBlogById(id)

        if (response.success && response.data) {
          setBlog(response.data)
        } else {
          setError(response.error || "Failed to fetch blog")
        }
      } catch (err) {
        console.error("Error fetching blog:", err)
        setError("Network error")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchBlog()
    }
  }, [id])

  return { blog, loading, error }
}
