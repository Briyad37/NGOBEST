"use client"

import type React from "react"
import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import DocumentPreviewModal from "../components/DocumentPreviewModal"
import { FileText, Download, Search, Eye, Calendar, HardDrive, Filter, Loader2 } from "lucide-react"
import { useResources } from "../hooks/useResources"
import type { Document } from "../types/resources"

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
  const { documentGroups, loading, error, downloadDocument } = useResources()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "posters", label: "Sign Language Posters" },
    { value: "english", label: "English Brochures" },
    { value: "kinyarwanda", label: "Kinyarwanda Brochures" },
  ]

  // Filter logic
  const filteredGroups = documentGroups
    .map((group) => ({
      ...group,
      documents: group.documents.filter((doc) => {
        const matchesSearch =
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.title.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = selectedCategory === "all" || group.category === selectedCategory

        return matchesSearch && matchesCategory
      }),
    }))
    .filter((group) => group.documents.length > 0)

  const handlePreview = (document: Document) => {
    setPreviewDocument(document)
    setIsPreviewOpen(true)
  }

  const handleDownload = (documentId: number, fileUrl: string, title: string) => {
    downloadDocument(documentId, fileUrl, title)
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-900",
          accent: "text-blue-600",
        }
      case "green":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-900",
          accent: "text-green-600",
        }
      case "purple":
        return {
          bg: "bg-purple-50",
          border: "border-purple-200",
          text: "text-purple-900",
          accent: "text-purple-600",
        }
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-900",
          accent: "text-gray-600",
        }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header navigate={navigate} currentPage={currentPage} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Resources</h3>
            <p className="text-gray-600">Please wait while we fetch the latest documents...</p>
          </div>
        </div>
        <Footer navigate={navigate} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header navigate={navigate} currentPage={currentPage} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Resources</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer navigate={navigate} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header navigate={navigate} currentPage={currentPage} />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            Our Resources
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Resources & <span className="text-green-600">Documents</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Access our comprehensive collection of educational materials, training resources, and important documents
          </p>
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>{documentGroups.reduce((total, group) => total + group.documents.length, 0)} Documents</span>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>{documentGroups.length} Categories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documents and categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "grid" ? "bg-white text-gray-900 shadow" : "text-gray-600"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "list" ? "bg-white text-gray-900 shadow" : "text-gray-600"
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredGroups.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all categories</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredGroups.map((group) => {
                const colors = getColorClasses(group.color)
                return (
                  <div key={group.id} className="group">
                    {/* Group Header */}
                    <div className="text-center mb-12">
                      <div className="inline-flex items-center space-x-3 mb-4">
                        <span className="text-4xl">{group.icon}</span>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900">{group.title}</h2>
                          <p className="text-gray-600 mt-1">{group.description}</p>
                        </div>
                      </div>
                      <div className="w-24 h-1 bg-green-500 mx-auto"></div>
                    </div>

                    {/* Documents Grid/List */}
                    {viewMode === "grid" ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {group.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group/card"
                          >
                            {/* Document Thumbnail */}
                            <div className="relative h-48 bg-gray-100 overflow-hidden">
                              <img
                                src={doc.thumbnail || "/placeholder.svg"}
                                alt={doc.title}
                                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium text-gray-700">
                                {doc.type}
                              </div>
                            </div>

                            {/* Document Info */}
                            <div className="p-6">
                              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{doc.title}</h3>
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doc.description}</p>

                              {/* Document Meta */}
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{doc.date}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <HardDrive className="w-3 h-3" />
                                    <span>{doc.size}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Download className="w-3 h-3" />
                                  <span>{doc.downloads}</span>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleDownload(doc.id, doc.fileUrl, doc.title)}
                                  className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </button>
                                <button
                                  onClick={() => handlePreview(doc)}
                                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {group.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-start space-x-4 flex-1">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-8 h-8 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-lg font-bold text-gray-900 mb-1">{doc.title}</h3>
                                  <p className="text-gray-600 text-sm mb-3">{doc.description}</p>
                                  <div className="flex items-center space-x-6 text-xs text-gray-500">
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-3 h-3" />
                                      <span>{doc.date}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <HardDrive className="w-3 h-3" />
                                      <span>{doc.size}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Download className="w-3 h-3" />
                                      <span>{doc.downloads} downloads</span>
                                    </div>
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">{doc.type}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 ml-4">
                                <button
                                  onClick={() => handlePreview(doc)}
                                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDownload(doc.id, doc.fileUrl, doc.title)}
                                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-6 px-6 py-3 bg-gray-50 rounded-full text-sm text-gray-600">
              <span>
                Showing {filteredGroups.reduce((total, group) => total + group.documents.length, 0)} documents
              </span>
              <span>•</span>
              <span>{filteredGroups.length} categories</span>
              <span>•</span>
              <span>
                {documentGroups
                  .flatMap((g) => g.documents)
                  .reduce((total, doc) => total + doc.downloads, 0)
                  .toLocaleString()}{" "}
                total downloads
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        document={previewDocument}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onDownload={handleDownload}
      />

      <Footer navigate={navigate} />
    </div>
  )
}

export default ResourcesPage
