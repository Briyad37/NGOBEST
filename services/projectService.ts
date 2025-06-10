import type { Project, ApiResponse } from "../types"
import { API_CONFIG } from "../config/api";

// Fallback data for development (since projects endpoint doesn't exist in backend yet)
export const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Education and Skills Training for Deaf Women and Girls",
    description:
      "Providing comprehensive education and vocational training programs to empower deaf women and girls with essential skills for economic independence.",
    content: `The Education and Skills Training program represents one of RNADW's flagship initiatives, designed to address the educational gaps and provide practical skills training for deaf women and girls across Rwanda.

This comprehensive program focuses on providing both formal education support and vocational training opportunities. We recognize that education is a fundamental right and a powerful tool for empowerment, especially for marginalized communities like deaf women and girls.

Our program includes literacy programs with basic reading and writing skills in both Kinyarwanda and English, comprehensive Rwandan Sign Language instruction, practical training in tailoring, crafts, agriculture, and small business management, computer skills and digital communication training, and financial literacy, health education, and leadership development.

Since the program's inception, we have successfully trained over 200 deaf women and girls. Our graduates have gone on to start their own businesses, secure employment, and become advocates in their communities. The impact extends beyond individual success, creating ripple effects throughout families and communities across Rwanda.`,
    image: "/charity.jpg",
    category: "Education",
    date: "2024",
    author: "RNADW Team",
    tags: ["Education", "Skills Training", "Women Empowerment"],
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    title: "Health and Wellness Program",
    description:
      "Promoting health awareness and providing accessible healthcare services specifically designed for the deaf community.",
    content: `Our Health and Wellness Program addresses the unique healthcare challenges faced by deaf women and girls in Rwanda. We work to bridge the communication gap between healthcare providers and the deaf community, ensuring equal access to quality healthcare services.

The program focuses on comprehensive health education through workshops on reproductive health, nutrition, and disease prevention. We provide sign language training for healthcare workers, teaching medical staff basic sign language to improve communication with deaf patients.

Our mobile health clinics bring healthcare services directly to deaf communities in remote areas, ensuring that geographical barriers don't prevent access to essential medical care. We also provide mental health support through counseling and support groups specifically designed for deaf women.

The program has reached over 300 deaf women and girls across all provinces of Rwanda, training 150 healthcare workers in basic sign language, and establishing partnerships with major hospitals to improve accessibility for deaf patients.`,
    image: "/charity.jpg",
    category: "Health",
    date: "2024",
    author: "RNADW Team",
    tags: ["Health", "Wellness", "Community"],
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    title: "Economic Empowerment Initiative",
    description:
      "Supporting entrepreneurship and business development among deaf women through microfinance and business training.",
    content: `The Economic Empowerment Initiative focuses on creating sustainable income opportunities for deaf women and girls.

Our program provides microfinance services, offering small loans and savings programs to help deaf women start and grow their businesses. We also offer business training, teaching entrepreneurship skills and business management to ensure the success of their ventures.

We connect deaf entrepreneurs with markets, facilitating the sale of their products and services. Additionally, we support the formation of deaf women's cooperatives, enabling them to pool resources and share knowledge.

Since its inception, the program has supported over 150 deaf women in starting their own businesses, with a 75% success rate. These businesses have generated income for the women and their families, improving their overall quality of life.`,
    image: "/charity.jpg",
    category: "Economic",
    date: "2023",
    author: "RNADW Team",
    tags: ["Economic", "Entrepreneurship", "Microfinance"],
    status: "active",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: 4,
    title: "Community Advocacy and Rights",
    description:
      "Advocating for the rights of deaf women and girls at community and national levels to ensure equal opportunities.",
    content: `Our advocacy program works to ensure that the rights of deaf women and girls are recognized and protected.

We engage in policy advocacy, working with the government to create inclusive policies that address the needs of the deaf community. We also conduct community awareness campaigns, educating communities about deaf rights and promoting inclusion.

Our program provides legal support to deaf women who have experienced discrimination or violence. Additionally, we offer capacity building training, empowering deaf women to become advocates for their own rights.

The program has successfully advocated for the inclusion of sign language in schools and public services, and has provided legal assistance to over 50 deaf women. We have also trained over 100 deaf women to become advocates in their communities.`,
image: "/charity.jpg",
    category: "Advocacy",
    date: "2023",
    author: "RNADW Team",
    tags: ["Advocacy", "Rights", "Policy"],
    status: "active",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: 5,
    title: "Sign Language Promotion",
    description:
      "Promoting the use and recognition of Rwandan Sign Language in schools, workplaces, and public services.",
    content: `This program works to promote and preserve Rwandan Sign Language as a vital communication tool.

We offer sign language classes to both hearing and deaf individuals, promoting communication and understanding between the two communities. We also provide interpreter training, certifying sign language interpreters to facilitate communication in various settings.

Our program develops educational materials in Rwandan Sign Language, including textbooks and online resources. Additionally, we conduct public awareness campaigns to promote the recognition and use of sign language in society.

The program has trained over 200 sign language interpreters, developed a comprehensive sign language curriculum for schools, and conducted numerous public awareness campaigns. We have also partnered with government agencies to promote the use of sign language in public services.`,
image: "/charity.jpg",    category: "Language",
    date: "2024",
    author: "RNADW Team",
    tags: ["Sign Language", "Education", "Communication"],
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 6,
    title: "Leadership Development Program",
    description:
      "Building leadership capacity among deaf women to take on leadership roles in their communities and organizations.",
    content: `Our Leadership Development Program empowers deaf women to become leaders in their communities.

We provide leadership training through workshops on leadership skills and techniques. We also offer mentorship, pairing emerging leaders with experienced mentors who can provide guidance and support.

Our program helps deaf women build confidence in public communication through public speaking training. Additionally, we facilitate network building, creating networks of deaf women leaders who can support each other.

The program has trained over 100 deaf women in leadership skills, paired 50 emerging leaders with mentors, and established a network of deaf women leaders across Rwanda. Our graduates have gone on to take on leadership roles in their communities and organizations.`,
image: "/charity.jpg",
    category: "Leadership",
    date: "2023",
    author: "RNADW Team",
    tags: ["Leadership", "Capacity Building", "Mentorship"],
    status: "active",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
]

// Project service - handles all project-related API calls
export const projectService = {
  // Get all projects - using fallback data since endpoint doesn't exist
  getAllProjects: async (): Promise<ApiResponse<Project[]>> => {
    // Since /api/projects doesn't exist in your backend, we'll use fallback data
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROJECTS}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return {
        success: true,
        data: data, // Make sure this matches your Project[] type
      };
    } catch (error) {
      console.error("Error fetching projects from API:", error);
      return {
        success: false,
        data: FALLBACK_PROJECTS, // Optionally fallback
        error: "Failed to fetch projects from API",
      };
    }
  },

  // Get single project by ID - using fallback data
  getProjectById: async (id: number): Promise<ApiResponse<Project>> => {
    const project = FALLBACK_PROJECTS.find((p) => p.id === id)

    if (project) {
      return {
        success: true,
        data: project,
        message: "Using local project data - backend endpoint not implemented",
      }
    } else {
      return {
        success: false,
        data: null,
        error: "Project not found",
      }
    }
  },

  // Create new project (for admin) - would need backend implementation
  createProject: async (
    projectData: Omit<Project, "id" | "createdAt" | "updatedAt">,
  ): Promise<ApiResponse<Project>> => {
    return {
      success: false,
      data: null,
      error: "Project creation not implemented in backend yet",
    }
  },

  // Update project (for admin) - would need backend implementation
  updateProject: async (id: number, projectData: Partial<Project>): Promise<ApiResponse<Project>> => {
    return {
      success: false,
      data: null,
      error: "Project update not implemented in backend yet",
    }
  },

  // Delete project (for admin) - would need backend implementation
  deleteProject: async (id: number): Promise<ApiResponse<void>> => {
    return {
      success: false,
      data: null,
      error: "Project deletion not implemented in backend yet",
    }
  },
}
