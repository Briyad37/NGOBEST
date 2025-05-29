"use client"
import { useState, useEffect } from "react"
import { projectService, FALLBACK_PROJECTS } from "../services/projectService"
import type { Project } from "../types"

export const useProject = (id: number) => {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await projectService.getProjectById(id)

        if (response.success) {
          setProject(response.data)
        } else {
          setProject(null)
          setError(response.error || "Failed to fetch project")
        }
      } catch (err) {
        const fallbackProject = FALLBACK_PROJECTS.find((p) => p.id === id)
        setProject(fallbackProject || null)
        setError("Network error")
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  return { project, loading, error }
}
