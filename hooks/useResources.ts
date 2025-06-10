"use client"

import { useState, useEffect } from "react"
import type { DocumentGroup } from "../types/resources"
import { apiCall, API_CONFIG } from "../config/api"

interface ApiResourceResponse {
  success: boolean
  data: ApiResource[] | { resources: ApiResource[] }
  message?: string
  error?: string
}

interface ApiResource {
  id: number | string
  title: string
  description: string
  file_url: string
  thumbnail_url?: string
  category: string
  type: string
  size: string
  created_at: string
  downloads: number
}

export function useResources() {
  const [documentGroups, setDocumentGroups] = useState<DocumentGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    try {
      setLoading(true)
      setError(null)
      setUsingFallback(false)

      console.log("Attempting to fetch resources...")
      console.log("API_CONFIG.USE_API:", API_CONFIG.USE_API)
      console.log("API_CONFIG.BASE_URL:", API_CONFIG.BASE_URL)

      // If API is disabled, go straight to fallback
      if (!API_CONFIG.USE_API) {
        console.log("API disabled, using fallback data")
        setUsingFallback(true)
        setDocumentGroups(getMockResourcesData())
        return
      }

      // Try to fetch from your API using the correct endpoint
      const result = await apiCall<ApiResourceResponse>("/api/resources")

      if (result.success && result.data) {
        console.log("API call successful, processing data...")

        // Handle different response structures
        let resourcesArray: ApiResource[] = []

        if (Array.isArray(result.data)) {
          resourcesArray = result.data
        } else if (result.data.resources && Array.isArray(result.data.resources)) {
          resourcesArray = result.data.resources
        }

        if (resourcesArray.length === 0) {
          console.warn("No resources found in API response, using fallback")
          throw new Error("No resources found in API response")
        }

        // Transform and group documents
        const transformedGroups = transformApiResourcesToGroups(resourcesArray)
        setDocumentGroups(transformedGroups)
        console.log("Resources fetched successfully from API:", transformedGroups.length, "groups")
      } else {
        throw new Error(result.error || result.message || "Failed to fetch resources from API")
      }
    } catch (err) {
      console.warn("API fetch failed, using fallback data:", err)
      setError(err instanceof Error ? err.message : "API unavailable")

      // Always use fallback data when API fails
      const fallbackResources = getMockResourcesData()
      setDocumentGroups(fallbackResources)
      setUsingFallback(true)
      console.log("Using fallback resource data:", fallbackResources.length, "groups")
    } finally {
      setLoading(false)
    }
  }

  const downloadDocument = async (documentId: number, fileUrl: string, title: string) => {
    try {
      // Only track downloads if API is available and not using fallback
      if (!usingFallback && API_CONFIG.USE_API) {
        console.log("Tracking document download for ID:", documentId)
        await apiCall(`/api/resources/${documentId}/download`, {
          method: "POST",
        })
      }

      // Create download link
      const link = document.createElement("a")
      link.href = fileUrl
      link.download = title
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Update download count locally
      setDocumentGroups((prev) =>
        prev.map((group) => ({
          ...group,
          documents: group.documents.map((doc) =>
            doc.id === documentId ? { ...doc, downloads: doc.downloads + 1 } : doc,
          ),
        })),
      )
    } catch (err) {
      console.warn("Download tracking failed:", err)
      // Still proceed with download even if tracking fails
      try {
        const link = document.createElement("a")
        link.href = fileUrl
        link.download = title
        link.target = "_blank"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (downloadErr) {
        console.error("Download failed:", downloadErr)
      }
    }
  }

  return {
    documentGroups,
    loading,
    error,
    usingFallback,
    downloadDocument,
    refetch: fetchResources,
  }
}

// Transform API resources to grouped structure
function transformApiResourcesToGroups(resources: ApiResource[]): DocumentGroup[] {
  // Group resources by category
  const groupedByCategory = resources.reduce((acc, resource) => {
    const category = resource.category || "uncategorized"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(resource)
    return acc
  }, {} as Record<string, ApiResource[]>)

  // Transform to DocumentGroup format
  return Object.entries(groupedByCategory).map(([category, categoryResources], index) => {
    const groupInfo = getCategoryInfo(category)
    
    return {
      id: index + 1,
      title: groupInfo.title,
      description: groupInfo.description,
      color: groupInfo.color,
      icon: groupInfo.icon,
      category: category,
      documents: categoryResources.map((resource) => ({
        id: Number(resource.id),
        title: resource.title || "Untitled Document",
        type: resource.type || "PDF",
        size: resource.size || "Unknown",
        date: formatDate(resource.created_at),
        description: resource.description || "No description available",
        thumbnail: resource.thumbnail_url || "/placeholder.svg?height=200&width=300",
        downloads: resource.downloads || 0,
        fileUrl: resource.file_url || "",
        previewUrl: resource.file_url || "",
        category: category,
      })),
    }
  })
}

// Get category-specific styling and info
function getCategoryInfo(category: string) {
  const categoryMap: Record<string, { title: string; description: string; color: string; icon: string }> = {
    posters: {
      title: "Sign Language Posters",
      description: "Educational posters for learning Rwandan Sign Language",
      color: "blue",
      icon: "📚",
    },
    english: {
      title: "English Brochures",
      description: "Educational brochures and guides in English",
      color: "green",
      icon: "📖",
    },
    kinyarwanda: {
      title: "Kinyarwanda Brochures",
      description: "Educational materials and guides in Kinyarwanda",
      color: "purple",
      icon: "📋",
    },
    training: {
      title: "Training Materials",
      description: "Training guides and educational resources",
      color: "orange",
      icon: "🎓",
    },
    health: {
      title: "Health Resources",
      description: "Health education and awareness materials",
      color: "red",
      icon: "🏥",
    },
    uncategorized: {
      title: "Other Resources",
      description: "Miscellaneous documents and resources",
      color: "gray",
      icon: "📄",
    },
  }

  return categoryMap[category] || categoryMap.uncategorized
}

// Helper function to format date from API
function formatDate(dateString: string): string {
  try {
    if (!dateString) return "Unknown Date"
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch (e) {
    return dateString || "Unknown Date"
  }
}

// Mock data for development
function getMockResourcesData(): DocumentGroup[] {
  return [
    {
      id: 1,
      title: "Sign Language Posters",
      description: "Educational posters for learning Rwandan Sign Language",
      color: "blue",
      icon: "📚",
      category: "posters",
      documents: [
        {
          id: 1,
          title: "RNADW Sign Language Alphabets",
          type: "PDF",
          size: "2.1 MB",
          date: "March 2023",
          description: "Complete alphabet guide for Rwandan Sign Language with visual demonstrations",
          thumbnail: "/placeholder.svg?height=200&width=300",
          downloads: 1250,
          fileUrl: "/documents/sign-language-alphabets.pdf",
          previewUrl: "/documents/preview/sign-language-alphabets.pdf",
          category: "posters",
        },
        {
          id: 2,
          title: "RNADW Rwanda Sign Language Numbers",
          type: "PDF",
          size: "1.8 MB",
          date: "March 2023",
          description: "Comprehensive number system guide for Rwandan Sign Language",
          thumbnail: "/placeholder.svg?height=200&width=300",
          downloads: 980,
          fileUrl: "/documents/sign-language-numbers.pdf",
          previewUrl: "/documents/preview/sign-language-numbers.pdf",
          category: "posters",
        },
      ],
    },
    {
      id: 2,
      title: "RNADW Brochures English Version",
      description: "Educational brochures and guides in English",
      color: "green",
      icon: "📖",
      category: "english",
      documents: [
        {
          id: 3,
          title: "Healthy Decisions About Sexual Consent",
          type: "PDF",
          size: "1.5 MB",
          date: "February 2023",
          description: "Educational brochure on sexual health and consent for deaf adolescents",
          thumbnail: "/placeholder.svg?height=200&width=300",
          downloads: 750,
          fileUrl: "/documents/sexual-consent-guide.pdf",
          previewUrl: "/documents/preview/sexual-consent-guide.pdf",
          category: "english",
        },
        {
          id: 4,
          title: "HIV/AIDS Prevention and Protection Guide",
          type: "PDF",
          size: "1.7 MB",
          date: "February 2023",
          description: "Comprehensive HIV/AIDS prevention and protection guide for deaf adolescents",
          thumbnail: "/placeholder.svg?height=200&width=300",
          downloads: 680,
          fileUrl: "/documents/hiv-aids-prevention.pdf",
          previewUrl: "/documents/preview/hiv-aids-prevention.pdf",
          category: "english",
        },
      ],
    },
    {
      id: 3,
      title: "RNADW Brochure Kinyarwanda",
      description: "Educational materials and guides in Kinyarwanda",
      color: "purple",
      icon: "📋",
      category: "kinyarwanda",
      documents: [
        {
          id: 6,
          title: "Gukurikiza Abakobwa Batishoboye",
          type: "PDF",
          size: "1.6 MB",
          date: "February 2023",
          description: "Brochure in Kinyarwanda about empowering deaf girls and women",
          thumbnail: "/placeholder.svg?height=200&width=300",
          downloads: 420,
          fileUrl: "/documents/empowering-deaf-girls-kiny.pdf",
          previewUrl: "/documents/preview/empowering-deaf-girls-kiny.pdf",
          category: "kinyarwanda",
        },
      ],
    },
  ]
}