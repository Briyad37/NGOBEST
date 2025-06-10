// src/config/api.ts

// Environment-based API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || " https://ida-char-back.onrender.com/api "
const USE_API = process.env.NEXT_PUBLIC_USE_API === "true"

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  USE_API,
  ENDPOINTS: {
    AUTH: "/auth/login",
    BLOGS: "/blog",
    PROJECTS: "/projects",
    TEAM: "/team",
    GALLERY: "/gallery",
    SUGGESTIONS: "/suggestions",
    VIDEOS: "/media/videos",
    PHOTOS: "/media/photos",
    DOCUMENTS: "/media/documents",
    MEDIA: "/media",
  },
}

// Response type
export interface ApiResponse<T> {
  success: boolean
  data: T | null
  error?: string
}

// Generic API call
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  if (!API_CONFIG.USE_API) {
    console.log("API calls disabled via NEXT_PUBLIC_USE_API=false")
    return {
      success: false,
      data: null,
      error: "API calls disabled - using fallback data",
    }
  }

  try {
    const url = endpoint.startsWith("http") ? endpoint : `${API_CONFIG.BASE_URL}${endpoint}`
    console.log(`Making API call to: ${url}`)

    const headers = {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      let errorMessage
      try {
        const errorData = await response.json()
        errorMessage =
          errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`
      }

      return {
        success: false,
        data: null,
        error: errorMessage,
      }
    }

    const data = await response.json()
    return {
      success: true,
      data: data,
    }
  } catch (error) {
    let errorMessage = "Unknown error occurred"
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        errorMessage = "Request timeout - API took too long to respond"
      } else {
        errorMessage = error.message
      }
    }

    return {
      success: false,
      data: null,
      error: errorMessage,
    }
  }
}
