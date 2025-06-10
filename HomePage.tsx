import type React from "react"
import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import AboutSection from "./components/AboutSection"
import ProgramsSection from "./components/ProgramsSection"
import TeamSection from "./components/TeamSection"
import GallerySection from "./components/GallerySection"
import PartnersSection from "./components/PartnersSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"

interface HomePageProps {
  navigate: (
    page:
      | "home"
      | "projects"
      | "project-blog"
      | "about"
      | "blogs"
      | "gallery"
      | "login"
      | "dashboard"
      | "videos"
      | "resources"
      | "blog-detail",
    projectId?: number
  ) => void
  currentPage: string
}

const HomePage: React.FC<HomePageProps> = ({ navigate, currentPage }) => {
  console.log("HomePage received navigate:", typeof navigate)

  return (
    <div className="min-h-screen bg-white">
      <Header navigate={navigate} currentPage={currentPage} />
      <HeroSection />
      <AboutSection />
      <ProgramsSection navigate={navigate} />
      <TeamSection />
      <GallerySection />
      <PartnersSection />
      <ContactSection />
      <Footer navigate={navigate} />
    </div>
  )
}

export default HomePage