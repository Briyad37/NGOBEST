"use client"

import { useState, useEffect } from "react"
import { projectService } from "../services/projectService"
import type { Project } from "../types"

export function useProject(projectId: number | string) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) {
        setError("No project ID provided")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        console.log("=== FETCHING PROJECT DEBUG ===")
        console.log("Project ID:", projectId)
        console.log("Project ID type:", typeof projectId)

        // Fetch from real API
        const response = await projectService.getProjectById(projectId)

        console.log("API Response:", response)
        console.log("Response success:", response.success)
        console.log("Response data:", response.data)
        console.log("Response error:", response.error)

        if (response.success && response.data) {
          console.log("✅ Project fetched successfully:", response.data.title)
          setProject(response.data)
        } else {
          console.error("❌ API Error:", response.error)
          setError(response.error || "Project not found")
        }
      } catch (err) {
        console.error("❌ Network error fetching project:", err)
        setError("Failed to fetch project - network error")
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [projectId])

  return { project, loading, error }
}
