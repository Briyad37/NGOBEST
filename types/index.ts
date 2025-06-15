// API Response wrapper
export interface ApiResponse<T> {
  success: boolean
  data: T | null
  error?: string
  message?: string
}

// Project interface - updated to match your API response
export interface Project {
  _id: string // MongoDB ObjectId
  id?: number // Optional fallback ID
  title: string
  description?: string
  content?: string // Long form content
  details?: string // API returns this field
  summary?: string // API returns this field
  image?: string
  thumbnail?: string
  category?: string
  date?: string
  author?: string
  tags?: string[]
  createdAt?: string
  updatedAt?: string
  // Add any other fields your API returns
  status?: string
  featured?: boolean
}

// Blog interface (if you have blogs)
export interface Blog {
  id: number
  title: string
  content: string
  excerpt?: string
  author?: string
  date?: string
  category?: string
  tags?: string[]
  image?: string
}

// User interface (if you have authentication)
export interface User {
  id: number
  name: string
  email: string
  role?: string
}

// Team member interface (if you have team section)
export interface TeamMember {
  id: number
  name: string
  position: string
  bio?: string
  image?: string
  social?: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}

// Gallery item interface (if you have gallery)
export interface GalleryItem {
  id: number
  title: string
  description?: string
  image: string
  category?: string
  date?: string
}
