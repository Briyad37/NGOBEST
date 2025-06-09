"use client"

import type React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { FileText, Download, Search, Filter } from "lucide-react"
import { useState } from "react"

interface ResourcesPageProps {
  navigate: (
    page:
      | "home"
      | "projects"
      | "project-blog"
      | "about"
      | "blogs"
      | "gallery"
      | "videos"
      | "resources"
      | "login"
      | "dashboard"
      | "blog-detail",
    projectId?: number,
  ) => void
  currentPage: string
}

const ResourcesPage: React.FC<ResourcesPageProps> = ({ navigate, currentPage }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Sample documents data - would come from API in real implementation
  const documents = [
    {
      id: 1,
      title: "Annual Report 2022",
      type: "PDF",
      size: "2.4 MB",
      date: "January 2023",
      category: "reports",
      description: "Comprehensive overview of our activities and achievements in 2022",
    },
    {
      id: 2,
      title: "Strategic Plan 2023-2025",
      type: "PDF",
      size: "3.1 MB",
      date: "December 2022",
      category: "planning",
      description: "Our roadmap for the next three years of growth and impact",
    },
    {
      id: 3,
      title: "Training Manual",
      type: "PDF",
      size: "1.8 MB",
      date: "November 2022",
      category: "training",
      description: "Complete guide for our training programs and methodologies",
    },
    {
      id: 4,
      title: "Research Report: Deaf Women in Rwanda",
      type: "PDF",
      size: "4.2 MB",
      date: "October 2022",
      category: "research",
      description: "In-depth study on the challenges and opportunities for deaf women",
    },
    {
      id: 5,
      title: "Newsletter Q4 2022",
      type: "PDF",
      size: "1.2 MB",
      date: "October 2022",
      category: "newsletters",
      description: "Quarterly update on our programs and community impact",
    },
    {
      id: 6,
      title: "Brochure: Our Programs",
      type: "PDF",
      size: "0.8 MB",
      date: "September 2022",
      category: "brochures",
      description: "Overview of all our current programs and services",
    },
    {
      id: 7,
      title: "Sign Language Guide",
      type: "PDF",
      size: "5.6 MB",
      date: "August 2022",
      category: "training",
      description: "Comprehensive guide to Rwandan Sign Language basics",
    },
    {
      id: 8,
      title: "Newsletter Q3 2022",
      type: "PDF",
      size: "1.1 MB",
      date: "July 2022",
      category: "newsletters",
      description: "Quarterly update featuring success stories and upcoming events",
    },
    {
      id: 9,
      title: "Financial Report 2022",
      type: "PDF",
      size: "1.9 MB",
      date: "June 2022",
      category: "reports",
      description: "Detailed financial overview and transparency report",
    },
    {
      id: 10,
      title: "Community Guidelines",
      type: "PDF",
      size: "0.6 MB",
      date: "May 2022",
      category: "guidelines",
      description: "Guidelines for community participation and engagement",
    },
  ]

  const categories = [
    { value: "all", label: "All Documents" },
    { value: "reports", label: "Reports" },
    { value: "planning", label: "Planning" },
    { value: "training", label: "Training Materials" },
    { value: "research", label: "Research" },
    { value: "newsletters", label: "Newsletters" },
    { value: "brochures", label: "Brochures" },
    { value: "guidelines", label: "Guidelines" },
  ]

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-white">
      <Header navigate={navigate} currentPage={currentPage} />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-green-500 font-medium">Our Resources</span>
          <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-4"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Resources & Documents</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our reports, training materials, research, and other important documents
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-start">
                            <FileText className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                              <div className="text-sm text-gray-500 mt-1">{doc.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-green-500 hover:text-green-600 flex items-center justify-end transition-colors">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Showing {filteredDocuments.length} of {documents.length} documents
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  )
}

export default ResourcesPage
