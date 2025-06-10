const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://ida-char-back.onrender.com"

// Parse USE_API as boolean
const USE_API = process.env.NEXT_PUBLIC_USE_API === "true"

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  USE_API: USE_API,
  ENDPOINTS: {
    AUTH: "/api/auth/login",
    BLOGS: "/api/blog",
    PROJECTS: "/api/projects",
    TEAM: "/api/team",
    GALLERY: "/api/gallery",
    SUGGESTIONS: "/api/suggestions",
    VIDEOS: "/api/media/videos",
    PHOTOS: "/api/media/photos",
    DOCUMENTS: "/api/media/documents",
    MEDIA: "/api/media",
  },
}

// Generic API call function with better error handling
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<{
  success: boolean
  data: T | null
  error?: string
}> {
  // If USE_API is false, return early with disabled message
  if (!USE_API) {
    console.log("API calls disabled via NEXT_PUBLIC_USE_API=false")
    return {
      success: false,
      data: null,
      error: "API calls disabled - using fallback data",
    }
  }

  try {
    // Prepare the URL
    const url = endpoint.startsWith("http") ? endpoint : `${API_CONFIG.BASE_URL}${endpoint}`

    console.log(`Making API call to: ${url}`)

    // Set default headers if not provided
    const headers = {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    }

    // Make the API call with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    // Check if the response is OK
    if (!response.ok) {
      // Try to parse error message from response
      let errorMessage
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`
      } catch (e) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`
      }

      console.error(`API Error: ${errorMessage}`)
      return {
        success: false,
        data: null,
        error: errorMessage,
      }
    }

    // Parse the response
    const data = await response.json()
    console.log("API call successful:", data)

    // Return success response
    return {
      success: true,
      data: data,
    }
  } catch (error) {
    console.error("API call failed:", error)

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

// Helper function to check API health
export async function checkApiHealth(): Promise<{
  isHealthy: boolean
  message: string
}> {
  try {
    const result = await apiCall("/health")
    return {
      isHealthy: result.success,
      message: result.success ? "API is healthy" : result.error || "API health check failed",
    }
  } catch {
    return {
      isHealthy: false,
      message: "Cannot reach API server",
    }
  }
}

// Helper to test if specific endpoints exist
export async function testEndpoint(endpoint: string): Promise<{
  exists: boolean
  message: string
}> {
  try {
    const result = await apiCall(endpoint)
    return {
      exists: result.success,
      message: result.success ? "Endpoint is working" : result.error || "Endpoint not found",
    }
  } catch {
    return {
      exists: false,
      message: "Cannot reach endpoint",
    }
  }
}
