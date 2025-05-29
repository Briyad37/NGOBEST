"use client"

import type React from "react"

interface HeaderProps {
  navigate: (
    page: "home" | "projects" | "project-blog" | "about" | "blogs" | "gallery" | "login" | "dashboard" | "blog-detail",
    projectId?: number,
  ) => void
  currentPage: string
}

const Header: React.FC<HeaderProps> = ({ navigate, currentPage }) => {
  console.log("Header received navigate:", typeof navigate)

  const handleNavigation = (
    page: "home" | "projects" | "project-blog" | "about" | "blogs" | "gallery" | "login" | "dashboard" | "blog-detail",
  ) => {
    console.log("handleNavigation called with:", page)
    if (navigate && typeof navigate === "function") {
      navigate(page)
    } else {
      console.error("Navigate function not available, type:", typeof navigate)
    }
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="RNADW Logo"
                className="w-8 h-8 object-cover rounded-full"
              />
              <div>
                <div className="text-lg font-bold text-gray-900">RNADW</div>
                <div className="text-xs font-medium text-green-500">"UMUCYO"</div>
              </div>
            </div>
          </div>

          <nav className="flex items-center space-x-10">
            <button
              onClick={() => handleNavigation("home")}
              className={`font-medium transition-colors ${
                currentPage === "home"
                  ? "text-gray-900 border-b-2 border-green-500 pb-1"
                  : "text-gray-600 hover:text-green-500"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("about")}
              className={`font-medium transition-colors ${
                currentPage === "about"
                  ? "text-gray-900 border-b-2 border-green-500 pb-1"
                  : "text-gray-600 hover:text-green-500"
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigation("projects")}
              className={`font-medium transition-colors ${
                currentPage === "projects"
                  ? "text-gray-900 border-b-2 border-green-500 pb-1"
                  : "text-gray-600 hover:text-green-500"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => handleNavigation("blogs")}
              className={`font-medium transition-colors ${
                currentPage === "blogs"
                  ? "text-gray-900 border-b-2 border-green-500 pb-1"
                  : "text-gray-600 hover:text-green-500"
              }`}
            >
              Blogs
            </button>
            <button
              onClick={() => handleNavigation("gallery")}
              className={`font-medium transition-colors ${
                currentPage === "gallery"
                  ? "text-gray-900 border-b-2 border-green-500 pb-1"
                  : "text-gray-600 hover:text-green-500"
              }`}
            >
              Gallery
            </button>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage === "home") {
                  // Scroll to contact section if on home page
                  const contactSection = document.querySelector("#contact-section")
                  if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" })
                } else {
                  // Navigate to home page and then scroll to contact
                  handleNavigation("home")
                  setTimeout(() => {
                    const contactSection = document.querySelector("#contact-section")
                    if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" })
                  }, 100)
                }
              }}
              className="text-gray-600 hover:text-green-500 transition-colors cursor-pointer"
            >
              Contact Us
            </a>
          </nav>

          <button
            onClick={() => handleNavigation("login")}
            className="bg-green-500 text-white px-6 py-2 rounded-md font-medium hover:bg-green-600 transition-colors"
          >
            LOGIN
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
