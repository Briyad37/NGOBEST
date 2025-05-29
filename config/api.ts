const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://ida-char-back.onrender.com"

// Flag to determine if we should use the real API or fallback data
const USE_API = process.env.NEXT_PUBLIC_USE_API !== "false"

// API endpoints
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  USE_API: USE_API,
  ENDPOINTS: {
    AUTH: "/api/auth/login",
    BLOGS: "/api/blog",
    PROJECTS: "/api/projects", // This endpoint doesn't exist yet
    TEAM: "/api/team", // This endpoint doesn't exist yet
    GALLERY: "/api/gallery", // This endpoint doesn't exist yet
    SUGGESTIONS: "/api/suggestions",
  },
}

// Generic API call function
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<{
  success: boolean
  data: T | null
  error?: string
}> {
  // If USE_API is false, don't make actual API calls
  if (!USE_API) {
    return {
      success: false,
      data: null,
      error: "API calls disabled",
    }
  }

  try {
    // Prepare the URL
    const url = endpoint.startsWith("http") ? endpoint : `${API_CONFIG.BASE_URL}${endpoint}`

    // Set default headers if not provided
    if (!options.headers) {
      options.headers = {
        "Content-Type": "application/json",
      }
    }

    // Make the API call
    const response = await fetch(url, options)

    // Check if the response is OK
    if (!response.ok) {
      // Try to parse error message from response
      let errorMessage
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || `HTTP error! status: ${response.status}`
      } catch (e) {
        errorMessage = `HTTP error! status: ${response.status}`
      }

      return {
        success: false,
        data: null,
        error: errorMessage,
      }
    }

    // Parse the response
    const data = await response.json()

    // Return success response
    return {
      success: true,
      data: data,
    }
  } catch (error) {
    console.error("API call failed:", error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
