import { apiCall, API_CONFIG } from "../config/api"
import type { Project, ApiResponse } from "../types"

// Comprehensive fallback projects with working images from Unsplash
export const FALLBACK_PROJECTS: Project[] = [
  {
    _id: "fallback-1",
    id: 1,
    title: "Empowering Deaf Women Through Digital Skills Training",
    description:
      "A comprehensive program designed to equip deaf women with essential digital literacy skills, enabling them to participate fully in the digital economy and access online opportunities.",
    content: `This groundbreaking initiative focuses on bridging the digital divide for deaf women in Rwanda. Through hands-on training sessions, participants learn essential computer skills, internet navigation, and digital communication tools.

The program covers:
- Basic computer operations and software usage
- Internet safety and digital citizenship
- Online job searching and application processes
- Digital communication tools and platforms
- E-commerce and online business fundamentals

Our certified instructors use sign language and visual learning methods to ensure effective knowledge transfer. The program has successfully trained over 200 deaf women, with 85% reporting improved employment prospects.

Participants receive certificates upon completion and ongoing support through our alumni network. The program also includes mentorship opportunities with successful deaf professionals in the tech industry.`,
    details:
      "This 12-week intensive program combines theoretical knowledge with practical application, ensuring participants gain confidence in using digital tools for personal and professional growth.",
    summary:
      "Digital skills training program specifically designed for deaf women, focusing on practical computer skills and online opportunities.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop&crop=center",
    thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop&crop=center",
    category: "Education & Training",
    date: "2024-01-15",
    author: "RNADW Team",
    tags: ["Digital Skills", "Women Empowerment", "Education", "Technology", "Sign Language"],
  },
  {
    _id: "fallback-2",
    id: 2,
    title: "Sign Language Advocacy and Awareness Campaign",
    description:
      "A nationwide campaign to promote Rwandan Sign Language recognition and create awareness about deaf culture and rights in communities across Rwanda.",
    content: `Our Sign Language Advocacy Campaign aims to break down communication barriers and promote understanding of deaf culture throughout Rwanda. This multi-faceted initiative includes community workshops, school visits, and media outreach.

Key campaign activities include:
- Community awareness workshops in all 30 districts
- Training sessions for public service providers
- School programs introducing sign language basics
- Media campaigns featuring deaf role models
- Policy advocacy for sign language recognition

The campaign has reached over 50,000 people directly and millions through media coverage. We've successfully advocated for sign language interpreters in government offices and healthcare facilities.

Our team of deaf advocates and hearing allies work together to create inclusive environments where deaf individuals can fully participate in society. The campaign also focuses on changing attitudes and misconceptions about deafness.

We collaborate with local leaders, schools, and organizations to ensure sustainable impact and continued support for the deaf community.`,
    details:
      "A comprehensive advocacy initiative spanning 18 months, involving community engagement, policy work, and cultural awareness programs.",
    summary: "Nationwide campaign promoting sign language recognition and deaf rights awareness across Rwanda.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop&crop=center",
    thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop&crop=center",
    category: "Advocacy & Awareness",
    date: "2024-02-10",
    author: "RNADW Advocacy Team",
    tags: ["Sign Language", "Advocacy", "Awareness", "Community", "Rights", "Culture"],
  },
  {
    _id: "fallback-3",
    id: 3,
    title: "Deaf Women's Economic Empowerment Initiative",
    description:
      "Supporting deaf women entrepreneurs through business training, microfinance access, and market linkage programs to achieve financial independence.",
    content: `The Economic Empowerment Initiative is designed to unlock the entrepreneurial potential of deaf women across Rwanda. Through comprehensive business training and financial support, we're creating pathways to economic independence.

Program components include:
- Business plan development workshops
- Financial literacy training
- Microfinance and loan facilitation
- Market research and analysis support
- Mentorship with successful entrepreneurs
- Cooperative formation and management

Over 150 deaf women have participated in our business training programs, with 78% successfully launching their own enterprises. Popular business sectors include tailoring, agriculture, handicrafts, and small retail operations.

We provide ongoing support through business coaching, peer networks, and access to markets. Our partnership with local banks has resulted in specialized loan products for deaf entrepreneurs.

The initiative also includes advocacy for inclusive business practices and workplace accommodations, ensuring deaf women can participate fully in Rwanda's growing economy.

Success stories include women who have grown from small-scale vendors to employing others in their communities, creating a multiplier effect of economic empowerment.`,
    details:
      "A 24-month program combining business training, financial support, and ongoing mentorship for deaf women entrepreneurs.",
    summary:
      "Comprehensive economic empowerment program supporting deaf women in starting and growing their own businesses.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop&crop=center",
    thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&crop=center",
    category: "Economic Empowerment",
    date: "2024-03-05",
    author: "RNADW Economic Team",
    tags: ["Entrepreneurship", "Microfinance", "Business Training", "Economic Independence", "Women Empowerment"],
  },
  {
    _id: "fallback-4",
    id: 4,
    title: "Healthcare Access and Communication Support",
    description:
      "Improving healthcare access for deaf women through interpreter services, health education programs, and healthcare provider training initiatives.",
    content: `Healthcare access remains a critical challenge for deaf women in Rwanda. Our Healthcare Access Initiative addresses communication barriers and ensures quality healthcare services for the deaf community.

Key program elements:
- Sign language interpreter services in hospitals
- Health education workshops in sign language
- Healthcare provider sensitivity training
- Development of visual health materials
- Maternal health support programs
- Mental health awareness and support

We've trained over 200 healthcare providers in basic sign language and deaf awareness. Our interpreter network covers major hospitals in Kigali and regional health centers.

The program has significantly improved health outcomes, with 90% of participants reporting better communication with healthcare providers. We've also seen increased uptake of preventive health services among deaf women.

Our maternal health component provides specialized support for deaf mothers, including prenatal education in sign language and interpreter services during delivery.

Mental health support includes counseling services with sign language interpreters and peer support groups for deaf women facing various challenges.

The initiative also advocates for policy changes to ensure sustainable healthcare access for the deaf community, including mandatory interpreter services in public health facilities.`,
    details:
      "A comprehensive healthcare access program addressing communication barriers and improving health outcomes for deaf women.",
    summary:
      "Initiative improving healthcare access through interpreter services, provider training, and specialized health education programs.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center",
    category: "Healthcare",
    date: "2024-04-12",
    author: "RNADW Health Team",
    tags: ["Healthcare", "Sign Language Interpreters", "Health Education", "Maternal Health", "Mental Health"],
  },
  {
    _id: "fallback-5",
    id: 5,
    title: "Youth Leadership Development Program",
    description:
      "Nurturing the next generation of deaf women leaders through mentorship, skills development, and leadership training programs.",
    content: `Our Youth Leadership Development Program is investing in the future by empowering young deaf women to become leaders in their communities and beyond. This comprehensive program targets deaf girls and young women aged 16-25.

Program highlights include:
- Leadership skills workshops and training
- Mentorship with established deaf leaders
- Public speaking and presentation skills
- Project management and organizational skills
- Advocacy and community engagement training
- Scholarship and educational support

The program has supported 120 young deaf women over three years, with participants going on to pursue higher education, start businesses, and take leadership roles in various organizations.

Our mentorship component pairs young women with successful deaf professionals, providing guidance on career development, personal growth, and overcoming challenges.

Participants engage in community service projects, developing practical leadership experience while addressing local challenges. These projects have included environmental conservation, community health education, and peer mentoring programs.

The program also includes scholarship support for higher education, with 45 participants receiving financial assistance to pursue university studies or vocational training.

Alumni of the program have gone on to establish their own organizations, represent the deaf community in various forums, and become advocates for disability rights.

We believe that investing in young deaf women today will create a stronger, more inclusive society tomorrow.`,
    details:
      "A three-year leadership development program targeting young deaf women with comprehensive training and mentorship support.",
    summary:
      "Program developing leadership skills and empowering young deaf women to become community leaders and advocates.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop&crop=center",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=center",
    category: "Youth Development",
    date: "2024-05-20",
    author: "RNADW Youth Team",
    tags: ["Youth Leadership", "Mentorship", "Education", "Community Service", "Scholarships", "Advocacy"],
  },
  {
    _id: "fallback-6",
    id: 6,
    title: "Technology Innovation for Deaf Community",
    description:
      "Developing and implementing innovative technology solutions to improve communication, education, and daily life for deaf women and girls.",
    content: `The Technology Innovation Project harnesses the power of technology to create solutions that address specific challenges faced by the deaf community. Our team works with tech partners to develop and implement cutting-edge solutions.

Innovation areas include:
- Mobile apps for sign language learning
- Video relay services for remote communication
- Educational technology with visual learning tools
- Assistive devices for daily living
- Online platforms for community networking
- Digital accessibility improvements

Our flagship mobile app "SignConnect" has been downloaded over 10,000 times and helps hearing people learn basic Rwandan Sign Language. The app features interactive lessons, video demonstrations, and practice exercises.

We've also developed a video relay service that enables deaf individuals to make phone calls through sign language interpreters, breaking down communication barriers in professional and personal contexts.

The educational technology component includes developing visual learning materials and interactive tools that make education more accessible for deaf students at all levels.

Our partnership with local tech companies has resulted in internship opportunities for deaf youth interested in technology careers, creating pathways into the growing tech sector.

The project also focuses on improving digital accessibility across websites and online services, advocating for inclusive design principles that benefit the entire deaf community.

Through these innovations, we're not just adapting existing technology but creating new solutions that put the deaf community at the center of design and development.`,
    details:
      "A technology innovation initiative developing custom solutions and improving digital accessibility for the deaf community.",
    summary:
      "Project developing innovative technology solutions to improve communication, education, and accessibility for deaf individuals.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&crop=center",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&crop=center",
    category: "Technology & Innovation",
    date: "2024-06-08",
    author: "RNADW Tech Team",
    tags: ["Technology", "Innovation", "Mobile Apps", "Digital Accessibility", "Sign Language", "Education Technology"],
  },
]

export const projectService = {
  // Get all projects with fallback
  async getAllProjects(): Promise<ApiResponse<Project[]>> {
    try {
      console.log("🔄 Fetching all projects from:", API_CONFIG.ENDPOINTS.PROJECTS)
      console.log("🔄 API enabled:", API_CONFIG.USE_API)

      if (!API_CONFIG.USE_API) {
        console.log("💡 API disabled, returning fallback projects")
        return {
          success: true,
          data: FALLBACK_PROJECTS,
          message: "Using fallback projects (API disabled)",
        }
      }

      const response = await apiCall<Project[]>(API_CONFIG.ENDPOINTS.PROJECTS)

      console.log("📥 All projects response:", response)

      if (response.success && response.data) {
        return {
          success: true,
          data: response.data,
          message: "Projects loaded from API",
        }
      } else {
        // API call failed, use fallback
        console.log("⚠️ API call failed, using fallback projects")
        return {
          success: true,
          data: FALLBACK_PROJECTS,
          message: "Using fallback projects (API call failed)",
        }
      }
    } catch (error) {
      console.error("❌ Error fetching projects, using fallback:", error)
      return {
        success: true,
        data: FALLBACK_PROJECTS,
        message: "Using fallback projects (network error)",
      }
    }
  },

  // Get single project by ID with fallback
  async getProjectById(id: string | number): Promise<ApiResponse<Project>> {
    try {
      console.log("🔄 Fetching project by ID:", id)
      console.log("🔄 API enabled:", API_CONFIG.USE_API)

      if (!API_CONFIG.USE_API) {
        console.log("💡 API disabled, returning fallback project")
        const fallbackProject = FALLBACK_PROJECTS.find((p) => p._id === id || p.id === Number(id))
        return {
          success: true,
          data: fallbackProject || FALLBACK_PROJECTS[0],
          message: "Using fallback project (API disabled)",
        }
      }

      const endpoint = `${API_CONFIG.ENDPOINTS.PROJECTS}/${id}`
      console.log("🔄 Fetching single project from:", endpoint)
      console.log("🔄 Full URL will be:", `${API_CONFIG.BASE_URL}${endpoint}`)

      const response = await apiCall<Project>(endpoint)

      console.log("📥 Single project response:", response)

      if (response.success && response.data) {
        return {
          success: true,
          data: response.data,
          message: "Project loaded from API",
        }
      } else {
        // API call failed, use fallback
        console.log("⚠️ API call failed, using fallback project")
        const fallbackProject = FALLBACK_PROJECTS.find((p) => p._id === id || p.id === Number(id))
        return {
          success: true,
          data: fallbackProject || FALLBACK_PROJECTS[0],
          message: "Using fallback project (API call failed)",
        }
      }
    } catch (error) {
      console.error("❌ Error fetching project, using fallback:", error)
      const fallbackProject = FALLBACK_PROJECTS.find((p) => p._id === id || p.id === Number(id))
      return {
        success: true,
        data: fallbackProject || FALLBACK_PROJECTS[0],
        message: "Using fallback project (network error)",
      }
    }
  },
}
