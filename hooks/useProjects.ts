"use client"
import { useState, useEffect } from "react"
import { projectService } from "../services/projectService"
import type { Project } from "../types"

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      setError(null)

      try {
        console.log("Fetching projects from API...")
        const response = await projectService.getAllProjects()

        if (response.success && response.data) {
          console.log("Projects fetched successfully:", response.data.length, "projects")
          setProjects(response.data)
        } else {
          console.error("API Error:", response.error)
          setProjects([]) // No fallback data - API only
          setError(response.error || "Failed to fetch projects")
        }
      } catch (err) {
        console.error("Network error fetching projects:", err)
        setProjects([]) // No fallback data - API only
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
    }
  }

  return { projects, loading, error, refreshProjects }
}
