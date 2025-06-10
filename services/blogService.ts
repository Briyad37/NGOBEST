// src/services/blogService.ts

import { apiCall, API_CONFIG } from "../config/api"

export interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt?: string
  // add other fields if needed
}

async function fetchBlogs(): Promise<BlogPost[] | null> {
  const response = await apiCall<BlogPost[]>(API_CONFIG.ENDPOINTS.BLOGS)
  if (response.success && response.data) {
    return response.data
  }
  console.error("Failed to fetch blogs:", response.error)
  return null
}

async function fetchBlogById(id: string): Promise<BlogPost | null> {
  const response = await apiCall<BlogPost>(`${API_CONFIG.ENDPOINTS.BLOGS}/${id}`)
  if (response.success && response.data) {
    return response.data
  }
  console.error(`Failed to fetch blog with id ${id}:`, response.error)
  return null
}

async function createBlog(post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost | null> {
  const response = await apiCall<BlogPost>(API_CONFIG.ENDPOINTS.BLOGS, {
    method: "POST",
    body: JSON.stringify(post),
  })
  if (response.success && response.data) {
    return response.data
  }
  console.error("Failed to create blog:", response.error)
  return null
}

async function updateBlog(id: string, post: Partial<Omit<BlogPost, "id" | "createdAt">>): Promise<BlogPost | null> {
  const response = await apiCall<BlogPost>(`${API_CONFIG.ENDPOINTS.BLOGS}/${id}`, {
    method: "PUT",
    body: JSON.stringify(post),
  })
  if (response.success && response.data) {
    return response.data
  }
  console.error(`Failed to update blog with id ${id}:`, response.error)
  return null
}

async function deleteBlog(id: string): Promise<boolean> {
  const response = await apiCall<null>(`${API_CONFIG.ENDPOINTS.BLOGS}/${id}`, {
    method: "DELETE",
  })
  if (response.success) {
    return true
  }
  console.error(`Failed to delete blog with id ${id}:`, response.error)
  return false
}

// Export all as one object
export const blogService = {
  fetchBlogs,
  fetchBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
}
