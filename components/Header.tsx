"use client"

import type React from "react"
import { FaPhoneAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa"

interface HeaderProps {
  navigate: (
    page: "home" | "projects" | "project-blog" | "about" | "blogs" | "gallery" | "login" | "dashboard" | "blog-detail",
    projectId?: number,
  ) => void
  currentPage: string
}

const Header: React.FC<HeaderProps> = ({ navigate, currentPage }) => {
  const handleNavigation = (
    page: "home" | "projects" | "project-blog" | "about" | "blogs" | "gallery" | "login" | "dashboard" | "blog-detail",
  ) => {
    if (navigate && typeof navigate === "function") {
      navigate(page)
    } else {
      console.error("Navigate function not available, type:", typeof navigate)
    }
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="py-4 px-4 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo and org info */}
          <div className="flex items-center space-x-4">
            <img
              src="/placeholder.svg?height=32&width=32"
              alt="RNADW Logo"
              className="w-12 h-12 object-cover rounded-full"
            />
            <div>
              <div className="text-lg font-bold text-gray-900">Rwanda National Association of Deaf Women</div>
              <div className="text-xs font-medium text-green-500">RNADW "UMUCYO"</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="hidden md:flex items-center space-x-8 text-sm text-gray-700">
            <div className="flex items-center space-x-2">
              <FaPhoneAlt className="text-green-500" />
              <span className="font-medium">+250 784 591 495</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaClock className="text-green-500" />
              <span>Mon - Fri: 9am - 5pm</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-green-500" />
              <span>Kigali, Rwanda</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <nav className="flex items-center space-x-8">
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
              Videos
            </button>
            <button
              onClick={() => handleNavigation("gallery")}
              className={`font-medium transition-colors ${
                currentPage === "resources"
                  ? "text-gray-900 border-b-2 border-green-500 pb-1"
                  : "text-gray-600 hover:text-green-500"
              }`}
            >
              Resources
            </button>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage === "home") {
                  const contactSection = document.querySelector("#contact-section")
                  if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" })
                } else {
                  handleNavigation("home")
                  setTimeout(() => {
                    const contactSection = document.querySelector("#contact-section")
                    if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" })
                  }, 100)
                }
              }}
              className="text-gray-600 hover:text-green-500 transition-colors cursor-pointer font-medium"
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
