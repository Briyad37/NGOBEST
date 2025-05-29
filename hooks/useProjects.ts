"use client"
import { useState, useEffect } from "react"
import { projectService, FALLBACK_PROJECTS } from "../services/projectService"
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
        const response = await projectService.getAllProjects()

        if (response.success && response.data) {
          setProjects(response.data)
          // Show info message if using fallback data
          if (response.message) {
            console.info("Projects:", response.message)
          }
        } else {
          // Fallback to local data
          setProjects(FALLBACK_PROJECTS)
          setError(response.error || "Failed to fetch projects")
        }
      } catch (err) {
        console.warn("Network error, using fallback data:", err)
        setProjects(FALLBACK_PROJECTS)
        setError("Network error - using local data")
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

        if (response.success && response.data) {
          setProject(response.data)
        } else {
          setProject(null)
          setError(response.error || "Failed to fetch project")
        }
      } catch (err) {
        const fallbackProject = FALLBACK_PROJECTS.find((p) => p.id === id)
        setProject(fallbackProject || null)
        setError("Network error - using local data")
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  return { project, loading, error }
}
