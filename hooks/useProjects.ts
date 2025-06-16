"use client"
import { useState, useEffect } from "react"
import { projectService } from "../services/projectService"
import type { Project } from "../types"

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUsingFallback, setIsUsingFallback] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      setError(null)

      try {
        console.log("Fetching projects from API...")
        const response = await projectService.getAllProjects()

        console.log("Projects response:", response)

        if (response.success && response.data) {
          console.log("Projects fetched successfully:", response.data.length, "projects")
          setProjects(response.data)

          // Check if we're using fallback data
          const usingFallback = response.message?.includes("fallback") || false
          setIsUsingFallback(usingFallback)

          if (usingFallback) {
            console.log("📋 Using fallback projects")
          }
        } else {
          console.error("Failed to fetch projects:", response.error)
          setProjects([])
          setError(response.error || "Failed to fetch projects")
        }
      } catch (err) {
        console.error("Network error fetching projects:", err)
        setProjects([])
        setError("Network error - please check your connection")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const refreshProjects = async () => {
    const response = await projectService.getAllProjects()
    if (response.success && response.data) {
      setProjects(response.data)
      const usingFallback = response.message?.includes("fallback") || false
      setIsUsingFallback(usingFallback)
    }
  }

  return {
    projects,
    loading,
    error,
    refreshProjects,
    isUsingFallback,
  }
}
