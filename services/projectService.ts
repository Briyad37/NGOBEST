import { apiCall, API_CONFIG } from "../config/api"
import type { Project, ApiResponse } from "../types"

export const projectService = {
  // Get all projects
  async getAllProjects(): Promise<ApiResponse<Project[]>> {
    try {
      console.log("🔄 Fetching all projects from:", API_CONFIG.ENDPOINTS.PROJECTS)
      const response = await apiCall<Project[]>(API_CONFIG.ENDPOINTS.PROJECTS)

      console.log("📥 All projects response:", response)

      if (response.success && response.data) {
        return {
          success: true,
          data: response.data,
          message: "Projects loaded from API",
        }
      } else {
        return {
          success: false,
          error: response.error || "Failed to fetch projects from API",
          data: null,
        }
      }
    } catch (error) {
      console.error("❌ Error fetching projects:", error)
      return {
        success: false,
        error: "Failed to fetch projects from API",
        data: null,
      }
    }
  },

  // Get single project by ID
  async getProjectById(id: string | number): Promise<ApiResponse<Project>> {
    try {
      const endpoint = `${API_CONFIG.ENDPOINTS.PROJECTS}/${id}`
      console.log("🔄 Fetching single project from:", endpoint)
      console.log("🔄 Full URL will be:", `${API_CONFIG.BASE_URL}${endpoint}`)

      const response = await apiCall<Project>(endpoint)

      console.log("📥 Single project response:", response)

      if (response.success && response.data) {
        return {
          success: true,
          data: response.data,
          message: "Project loaded from API",
        }
      } else {
        return {
          success: false,
          error: response.error || `Failed to fetch project with ID: ${id}`,
          data: null,
        }
      }
    } catch (error) {
      console.error("❌ Error fetching project:", error)
      return {
        success: false,
        error: `Failed to fetch project with ID: ${id}`,
        data: null,
      }
    }
  },
}

// No fallback projects - API only
export const FALLBACK_PROJECTS: Project[] = []
