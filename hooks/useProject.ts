"use client"

import { useState, useEffect } from "react"
import { projectService } from "../services/projectService"
import type { Project } from "../types"

export function useProject(projectId: number | string) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUsingFallback, setIsUsingFallback] = useState(false)

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

        // Fetch from API or fallback
        const response = await projectService.getProjectById(projectId)

        console.log("API Response:", response)
        console.log("Response success:", response.success)
        console.log("Response data:", response.data)
        console.log("Response message:", response.message)

        if (response.success && response.data) {
          console.log("✅ Project fetched successfully:", response.data.title)
          setProject(response.data)

          // Check if we're using fallback data
          const usingFallback = response.message?.includes("fallback") || false
          setIsUsingFallback(usingFallback)

          if (usingFallback) {
            console.log("📋 Using fallback project")
          }
        } else {
          console.error("❌ Failed to fetch project:", response.error)
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

  return {
    project,
    loading,
    error,
    isUsingFallback,
  }
}
