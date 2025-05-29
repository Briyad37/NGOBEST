import { apiCall, API_CONFIG } from "../config/api"

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt?: string
  author: string
  category: string
  tags: string[]
  image?: string
  published: boolean
  createdAt: string
  updatedAt: string
}

// This interface should match the API's expected request body
export interface CreateBlogPost {
  title: string
  content: string
  excerpt?: string
  author: string
  category: string
  tags: string[]
  image?: string
  published?: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data: T | null
  error?: string
}

// Fallback blog data for when API is unavailable
const FALLBACK_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "International Day of Sign Languages: Celebrating Deaf Culture",
    content: `Every year on September 23, we celebrate the International Day of Sign Languages. This day is an opportunity to support and protect the linguistic identity and cultural diversity of all deaf people and other sign language users.

Sign languages are fully fledged natural languages, structurally distinct from the spoken languages. There is also an international sign that is used by deaf people in international meetings and informally when travelling and socializing.

At RNADW, we believe that sign language is not just a means of communication, but a vital part of deaf culture and identity. We work tirelessly to promote the use and recognition of Rwandan Sign Language (RSL) in all aspects of society.

As we celebrate this important day, we renew our commitment to ensuring that deaf women and girls in Rwanda have full access to sign language education and services.`,
    excerpt: "Every year on September 23, we celebrate the International Day of Sign Languages...",
    author: "Marie Claire Uwimana",
    category: "Events",
    tags: ["Sign Language", "Deaf Culture", "International Day"],
    image: "/placeholder.svg?height=400&width=800",
    published: true,
    createdAt: "2023-09-23T00:00:00Z",
    updatedAt: "2023-09-23T00:00:00Z",
  },
  {
    id: "2",
    title: "Success Story: How Vocational Training Changed Claudine's Life",
    content: `Claudine, a 25-year-old deaf woman from Eastern Province, shares her journey of transformation after participating in RNADW's vocational training program in tailoring.

Before joining RNADW's program, Claudine struggled to find employment. Despite her determination and skills, communication barriers and lack of formal training made it difficult for her to secure stable income.

Through our comprehensive vocational training program, Claudine learned not only tailoring skills but also business management, financial literacy, and marketing strategies.

Today, Claudine runs her own successful tailoring business, employing three other women from her community. She has become a role model and mentor for other deaf women in her area.`,
    excerpt:
      "Claudine shares her journey of transformation after participating in RNADW's vocational training program...",
    author: "Josephine Mukamana",
    category: "Success Stories",
    tags: ["Vocational Training", "Economic Empowerment", "Success Story"],
    image: "/placeholder.svg?height=400&width=800",
    published: true,
    createdAt: "2023-08-15T00:00:00Z",
    updatedAt: "2023-08-15T00:00:00Z",
  },
]

export const blogService = {
  // Get all blog posts
  getAllBlogs: async (): Promise<ApiResponse<BlogPost[]>> => {
    try {
      const response = await apiCall(API_CONFIG.ENDPOINTS.BLOGS)

      if (!response.success) {
        // Return fallback data if API fails
        console.warn("API failed, using fallback blog data")
        return {
          success: true,
          data: FALLBACK_BLOGS,
          error: "Using fallback data - API unavailable",
        }
      }

      return response
    } catch (error) {
      console.error("Error fetching blogs:", error)
      return {
        success: true,
        data: FALLBACK_BLOGS,
        error: "Using fallback data - API unavailable",
      }
    }
  },

  // Get single blog post by ID
  getBlogById: async (id: string): Promise<ApiResponse<BlogPost>> => {
    try {
      const response = await apiCall(`${API_CONFIG.ENDPOINTS.BLOGS}/${id}`)

      if (!response.success) {
        // Try to find in fallback data
        const blog = FALLBACK_BLOGS.find((b) => b.id === id)
        if (blog) {
          return {
            success: true,
            data: blog,
            error: "Using fallback data - API unavailable",
          }
        }
      }

      return response
    } catch (error) {
      console.error("Error fetching blog by ID:", error)
      const blog = FALLBACK_BLOGS.find((b) => b.id === id)
      if (blog) {
        return {
          success: true,
          data: blog,
          error: "Using fallback data - API unavailable",
        }
      }
      return {
        success: false,
        data: null,
        error: "Blog not found",
      }
    }
  },

  // Create new blog post (admin only)
  createBlog: async (blogData: CreateBlogPost): Promise<ApiResponse<BlogPost>> => {
    try {
      // Ensure we're sending the exact format the API expects
      const payload = {
        title: blogData.title,
        content: blogData.content,
        excerpt: blogData.excerpt || blogData.content.substring(0, 150) + "...",
        author: blogData.author,
        category: blogData.category,
        tags: blogData.tags,
        image: blogData.image || "/placeholder.svg?height=400&width=800",
        published: blogData.published !== undefined ? blogData.published : true,
      }

      // Get auth token from localStorage
      const token = localStorage.getItem("authToken")

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      }

      // Add authorization header if token exists
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }

      const response = await apiCall(API_CONFIG.ENDPOINTS.BLOGS, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      })

      if (!response.success) {
        console.error("API Error creating blog:", response.error)
        return response
      }

      return response
    } catch (error) {
      console.error("Error creating blog:", error)
      return {
        success: false,
        data: null,
        error: "Failed to create blog post. Please try again later.",
      }
    }
  },

  // Update blog post (admin only)
  updateBlog: async (id: string, blogData: Partial<CreateBlogPost>): Promise<ApiResponse<BlogPost>> => {
    try {
      // Get auth token from localStorage
      const token = localStorage.getItem("authToken")

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      }

      // Add authorization header if token exists
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }

      return apiCall(`${API_CONFIG.ENDPOINTS.BLOGS}/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(blogData),
      })
    } catch (error) {
      console.error("Error updating blog:", error)
      return {
        success: false,
        data: null,
        error: "Failed to update blog post. Please try again later.",
      }
    }
  },

  // Delete blog post (admin only)
  deleteBlog: async (id: string): Promise<ApiResponse<void>> => {
    try {
      // Get auth token from localStorage
      const token = localStorage.getItem("authToken")

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      }

      // Add authorization header if token exists
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }

      return apiCall(`${API_CONFIG.ENDPOINTS.BLOGS}/${id}`, {
        method: "DELETE",
        headers,
      })
    } catch (error) {
      console.error("Error deleting blog:", error)
      return {
        success: false,
        data: null,
        error: "Failed to delete blog post. Please try again later.",
      }
    }
  },
}
