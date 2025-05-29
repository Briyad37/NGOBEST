"use client"
import { useState, useEffect } from "react"
import { teamService, FALLBACK_TEAM } from "../services/teamService"
import type { TeamMember } from "../types"

export const useTeam = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await teamService.getAllTeamMembers()

        if (response.success && response.data) {
          setTeamMembers(response.data)
          // Show info message if using fallback data
          if (response.message) {
            console.info("Team:", response.message)
          }
        } else {
          setTeamMembers(FALLBACK_TEAM)
          setError(response.error || "Failed to fetch team")
        }
      } catch (err) {
        setTeamMembers(FALLBACK_TEAM)
        setError("Network error - using local data")
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [])

  return { teamMembers, loading, error }
}
