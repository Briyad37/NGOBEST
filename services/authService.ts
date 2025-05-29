import { apiCall, API_CONFIG } from "../config/api"

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export interface ApiResponse<T> {
  success: boolean
  data: T | null
  error?: string
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await apiCall<LoginResponse>(API_CONFIG.ENDPOINTS.AUTH, {
        method: "POST",
        body: JSON.stringify(credentials),
      })

      if (response.success && response.data) {
        // Store auth token and user info
        localStorage.setItem("authToken", response.data.token)
        localStorage.setItem("isAdminLoggedIn", "true")
        localStorage.setItem("adminUser", response.data.user.name || "Admin")
      }

      return response
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : "Login failed",
      }
    }
  },

  logout: (): void => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("isAdminLoggedIn")
    localStorage.removeItem("adminUser")
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem("isAdminLoggedIn") === "true"
  },

  // For demo purposes - simulates login without API
  simulateLogin: (email: string, password: string): boolean => {
    // Simple demo credentials
    if (email === "admin@rnadw.org" && password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true")
      localStorage.setItem("adminUser", "Admin User")
      localStorage.setItem("authToken", "demo-token-12345")
      return true
    }
    return false
  },
}
