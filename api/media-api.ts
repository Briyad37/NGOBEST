/**
 *  API  for media endpoints
 */

// Types for API responses
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface VideoData {
  id: number | string
  title: string
  description: string
  url: string
  thumbnail_url: string
  created_at: string
  duration: string
  views: number
  category: string
}

export interface DocumentData {
  id: number | string
  title: string
  description: string
  file_url: string
  thumbnail_url?: string
  created_at: string
  file_size: string
  file_type: string
  downloads: number
  category: string
}

// API client functions
export const MediaApi = {
  /**
   * Fetch all videos from the API
   */
  fetchVideos: async (): Promise<ApiResponse<{ videos: VideoData[] }>> => {
    const response = await fetch("/api/media/videos")

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  },

  /**
   * Fetch a single video by ID
   */
  fetchVideo: async (id: number | string): Promise<ApiResponse<{ video: VideoData }>> => {
    const response = await fetch(`/api/media/videos/${id}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  },

  /**
   * Track a video view
   */
  trackVideoView: async (id: number | string): Promise<ApiResponse<{ success: boolean }>> => {
    const response = await fetch(`/api/media/videos/${id}/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  },

  /**
   * Fetch all photos from the API
   */
  fetchPhotos: async (): Promise<ApiResponse<{ photos: any[] }>> => {
    const response = await fetch("/api/media/photos")

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  },

  /**
   * Fetch all documents from the API
   */
  fetchDocuments: async (): Promise<ApiResponse<{ documents: DocumentData[] }>> => {
    const response = await fetch("/api/media/documents")

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  },

  /**
   * Track a document download
   */
  trackDocumentDownload: async (id: number | string): Promise<ApiResponse<{ success: boolean }>> => {
    const response = await fetch(`/api/media/documents/${id}/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  },

  /**
   * Upload a new media file
   */
  uploadMedia: async (
    file: File,
    type: "video" | "photo" | "document",
    metadata: any,
  ): Promise<ApiResponse<{ media: any }>> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", type)
    formData.append("metadata", JSON.stringify(metadata))

    const response = await fetch("/api/media", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  },
}
