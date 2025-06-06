import type { TeamMember, ApiResponse } from "../types"

// Fallback data since team endpoint doesn't exist in backend
export const FALLBACK_TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Marie Claire Uwimana",
    position: "Executive Director",
    image: "/placeholder.svg?height=300&width=250",
    bio: "Marie Claire has over 15 years of experience in disability rights advocacy and has been leading RNADW since its inception.",
    email: "marie.uwimana@rnadw.org.rw",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Josephine Mukamana",
    position: "Program Manager",
    image: "/placeholder.svg?height=300&width=250",
    bio: "Josephine oversees all program implementation and has a background in social work and community development.",
    email: "josephine.mukamana@rnadw.org.rw",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    name: "Grace Uwizeyimana",
    position: "Community Coordinator",
    image: "/placeholder.svg?height=300&width=250",
    bio: "Grace works directly with communities to implement programs and build relationships with local stakeholders.",
    email: "grace.uwizeyimana@rnadw.org.rw",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 4,
    name: "Immaculee Nyiramana",
    position: "Finance Manager",
    image: "/placeholder.svg?height=300&width=250",
    bio: "Immaculee manages all financial operations and ensures transparent use of resources for maximum impact.",
    email: "immaculee.nyiramana@rnadw.org.rw",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

export const teamService = {
  getAllTeamMembers: async (): Promise<ApiResponse<TeamMember[]>> => {
    // Since /api/team doesn't exist in backend, use fallback data
    console.log("Team endpoint not available in backend, using fallback data")

    return {
      success: true,
      data: FALLBACK_TEAM,
      message: "Using local team data - backend endpoint not implemented",
    }
  },

  createTeamMember: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _memberData: Omit<TeamMember, "id" | "createdAt" | "updatedAt">,
  ): Promise<ApiResponse<TeamMember | null>> => {
    return {
      success: false,
      data: null,
      error: "Team member creation not implemented in backend yet",
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateTeamMember: async (_id: number, _memberData: Partial<TeamMember>): Promise<ApiResponse<TeamMember | null>> => {
    return {
      success: false,
      data: null,
      error: "Team member update not implemented in backend yet",
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteTeamMember: async (_id: number): Promise<ApiResponse<void>> => {
    return {
      success: false,
      data: undefined,
      error: "Team member deletion not implemented in backend yet",
    }
  },
}
