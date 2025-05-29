"use client"

import type React from "react"
import { Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react"

interface FooterProps {
  navigate: (
    page: "home" | "projects" | "project-blog" | "about" | "blogs" | "gallery" | "blog-detail",
    projectId?: number,
  ) => void
}

const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">👥</span>
              </div>
              <div>
                <div className="text-xl font-bold">RNADW</div>
                <div className="text-sm text-green-400">"UMUCYO"</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Empowering deaf women and girls in Rwanda through advocacy, education, and community building since 2005.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-8 h-8 text-gray-400 hover:text-green-500 cursor-pointer transition-colors" />
              <Twitter className="w-8 h-8 text-gray-400 hover:text-green-500 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate("about")}
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("projects")}
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Our Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("blogs")}
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Blog & Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("gallery")}
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Gallery
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-500" />
                <span className="text-gray-400">+250 784 591 495</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-500" />
                <span className="text-gray-400">info@rnadw.org.rw</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-500 mt-1" />
                <span className="text-gray-400">KG 125 St, 304, Ikaze Plaza, Kigali, Rwanda</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Rwanda National Association of Deaf Women (RNADW). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
