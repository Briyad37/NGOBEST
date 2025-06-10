export interface Project {
  id: number
  title: string
  description: string
  content?: string
  thumbnail: string
  category: string
  date: string
  author?: string
  tags?: string[]
  status: "active" | "completed" | "upcoming"
  createdAt: string
  updatedAt: string
}

export interface TeamMember {
  id: number
  name: string
  position: string
  image: string
  bio?: string
  email?: string
  createdAt: string
  updatedAt: string
}

export interface GalleryItem {
  id: number
  title: string
  type: "image" | "video"
  url: string
  thumbnail?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Partner {
  id: number
  name: string
  logo: string
  website?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  image: string
  author: string
  category: string
  tags: string[]
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface ContactMessage {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}
