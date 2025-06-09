"use client"
import { useState, useEffect } from "react"
import HomePage from "../HomePage"
import ProjectsPage from "../pages/ProjectsPage"
import ProjectBlogPage from "../pages/ProjectBlogPage"
import AboutUsPage from "../pages/AboutUsPage"
import BlogsPage from "../pages/BlogsPage"
import GalleryPage from "../pages/GalleryPage"
import LoginPage from "../pages/LoginPage"
import DashboardPage from "../pages/DashboardPage"
import BlogDetailPage from "../pages/BlogDetailPage"
import VideosPage from "../pages/VideoPages"
import ResourcesPage from "../pages/ResourcesPage"

type PageType =
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
  | "blog-detail"

export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageType>("home")
  const [selectedProjectId, setSelectedProjectId] = useState<number>(1)
  const [selectedBlogId, setSelectedBlogId] = useState<number>(1)

  // Simple hash-based routing that works in preview
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) // Remove #

      if (hash === "projects") {
        setCurrentPage("projects")
      } else if (hash.startsWith("project-")) {
        const id = Number.parseInt(hash.split("-")[1])
        if (!isNaN(id)) {
          setSelectedProjectId(id)
          setCurrentPage("project-blog")
        }
      } else if (hash.startsWith("blog-")) {
        const id = Number.parseInt(hash.split("-")[1])
        if (!isNaN(id)) {
          setSelectedBlogId(id)
          setCurrentPage("blog-detail")
        }
      } else if (hash === "about") {
        setCurrentPage("about")
      } else if (hash === "blogs") {
        setCurrentPage("blogs")
      } else if (hash === "gallery") {
        setCurrentPage("gallery")
      } else if (hash === "videos") {
        setCurrentPage("videos")
      } else if (hash === "resources") {
        setCurrentPage("resources")
      } else if (hash === "login") {
        setCurrentPage("login")
      } else if (hash === "dashboard") {
        setCurrentPage("dashboard")
      } else {
        setCurrentPage("home")
      }
    }

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)

    // Check initial hash
    handleHashChange()

    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const navigate = (page: PageType, projectId?: number) => {
    console.log("Navigate called with:", page, projectId)

    if (page === "home") {
      window.location.hash = ""
      setCurrentPage("home")
    } else if (page === "projects") {
      window.location.hash = "projects"
      setCurrentPage("projects")
    } else if (page === "project-blog" && projectId) {
      window.location.hash = `project-${projectId}`
      setSelectedProjectId(projectId)
      setCurrentPage("project-blog")
    } else if (page === "blog-detail" && projectId) {
      window.location.hash = `blog-${projectId}`
      setSelectedBlogId(projectId)
      setCurrentPage("blog-detail")
    } else if (page === "about") {
      window.location.hash = "about"
      setCurrentPage("about")
    } else if (page === "blogs") {
      window.location.hash = "blogs"
      setCurrentPage("blogs")
    } else if (page === "gallery") {
      window.location.hash = "gallery"
      setCurrentPage("gallery")
    } else if (page === "videos") {
      window.location.hash = "videos"
      setCurrentPage("videos")
    } else if (page === "resources") {
      window.location.hash = "resources"
      setCurrentPage("resources")
    } else if (page === "login") {
      window.location.hash = "login"
      setCurrentPage("login")
    } else if (page === "dashboard") {
      window.location.hash = "dashboard"
      setCurrentPage("dashboard")
    }
  }

  const renderPage = () => {
    console.log("Rendering page for currentPage:", currentPage)

    switch (currentPage) {
      case "home":
        return <HomePage navigate={navigate} currentPage={currentPage} />
      case "projects":
        return <ProjectsPage navigate={navigate} currentPage={currentPage} />
      case "project-blog":
        return <ProjectBlogPage navigate={navigate} projectId={selectedProjectId} currentPage={currentPage} />
      case "about":
        return <AboutUsPage navigate={navigate} currentPage={currentPage} />
      case "blogs":
        return <BlogsPage navigate={navigate} currentPage={currentPage} />
      case "gallery":
        return <GalleryPage navigate={navigate} currentPage={currentPage} />
      case "videos":
        return <VideosPage navigate={navigate} currentPage={currentPage} />
      case "resources":
        return <ResourcesPage navigate={navigate} currentPage={currentPage} />
      case "login":
        return <LoginPage navigate={navigate} currentPage={currentPage} />
      case "dashboard":
        return <DashboardPage navigate={navigate} currentPage={currentPage} />
      case "blog-detail":
        return <BlogDetailPage navigate={navigate} blogId={selectedBlogId} currentPage={currentPage} />
      default:
        return <HomePage navigate={navigate} currentPage={currentPage} />
    }
  }

  return <div className="min-h-screen">{renderPage()}</div>
}
