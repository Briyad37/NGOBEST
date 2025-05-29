import { apiCall, API_CONFIG } from "../config/api"

export interface Suggestion {
  name: string
  email: string
  message: string
  category?: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T | null
  error?: string
}

export const suggestionService = {
  // Submit a new suggestion
  submitSuggestion: async (suggestion: Suggestion): Promise<ApiResponse<any>> => {
    return apiCall(API_CONFIG.ENDPOINTS.SUGGESTIONS, {
      method: "POST",
      body: JSON.stringify(suggestion),
    })
  },
}
