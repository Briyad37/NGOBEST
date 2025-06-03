"use client"

import type React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Image from "next/image"

interface AboutUsPageProps {
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
      | "blog-detail",
    projectId?: number
  ) => void
  currentPage: string
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ navigate, currentPage }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header navigate={navigate} currentPage={currentPage} />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-green-500 font-medium">Who We Are</span>
          <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-4"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn more about Rwanda National Association of Deaf Women (RNADW) and our mission to empower deaf women and
            girls.
          </p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {/* Green decorative shapes */}
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-green-500 rounded-full opacity-80"></div>
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-green-500 rounded-full opacity-60"></div>

              {/* Video container */}
              <div className="relative z-10 bg-black rounded-lg overflow-hidden shadow-2xl">
                <div className="relative">
                  {/* Video player */}
                  <video className="w-full h-full object-cover" controls preload="metadata">
                    <source src="/path/to/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <span className="text-green-500 font-semibold text-lg">About us ——</span>
              </div>

              <h2 className="text-5xl font-bold text-white">RNADW</h2>

              <p className="text-gray-300 leading-relaxed text-lg">
                Rwanda National Association of Deaf Women (RNADW) is an Organization of People with Disabilities (OPD)
                which is fully registered with Rwanda Governance Board (RGB). Founded in 2005 by a group of Deaf women
                human rights activist to advocate for the rights of women and girls, after realizing the gaps in service
                provision, insufficient advocacy efforts to fight for her rights and social integrations in the entire
                Rwandan community as whole.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Vision statement</h3>
                  <p className="text-gray-300 leading-relaxed">
                    A society which respects the basic rights of Deaf Women and girls, which considers as priority their
                    education and their welfare, and in which they are perfectly integrated, provided equal
                    opportunities so as to actively participate in the national development process.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Mission statement</h3>
                  <p className="text-gray-300 leading-relaxed">
                    RNADW exists to defend the rights of Deaf women and promoting their health and socio-economic
                    welfare.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-500 font-medium">Our Journey</span>
            <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our History</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The story of how RNADW was founded and our journey of growth and impact
            </p>
          </div>

          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">The Beginning (2005)</h3>
                <p className="text-gray-600 leading-relaxed">
                  RNADW was founded in 2005 by a group of deaf women human rights activists who recognized the need for
                  an organization specifically focused on the unique challenges faced by deaf women and girls in Rwanda.
                  In the aftermath of the 1994 genocide, deaf women were particularly marginalized and faced multiple
                  layers of discrimination.
                </p>
              </div>
              <div>
                <Image
                  src="/placeholder.svg"
                  alt="RNADW Founding"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <Image
                  src="/placeholder.svg"
                  alt="RNADW Growth"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Growth and Development (2010-2015)</h3>
                <p className="text-gray-600 leading-relaxed">
                  During this period, RNADW expanded its programs and reach, establishing partnerships with local and
                  international organizations. We developed our first strategic plan and began implementing structured
                  programs in education, health, and economic empowerment for deaf women and girls across Rwanda.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Present Day Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  Today, RNADW is recognized as a leading organization advocating for the rights and inclusion of deaf
                  women and girls in Rwanda. We have directly impacted the lives of over 500 deaf women through our
                  various programs and continue to work towards a more inclusive society where deaf women and girls can
                  fully participate and thrive.
                </p>
              </div>
              <div>
                <Image
                  src="/placeholder.svg"
                  alt="RNADW Today"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-500 font-medium">Our Principles</span>
            <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide our work and define our organization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-green-500 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Inclusion</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in creating a society where deaf women and girls are fully included and valued as equal
                members.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-green-500 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Empowerment</h3>
              <p className="text-gray-600 leading-relaxed">
                We work to equip deaf women and girls with the skills, knowledge, and confidence to determine their own
                futures.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-green-500 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Integrity</h3>
              <p className="text-gray-600 leading-relaxed">
                We are committed to transparency, accountability, and ethical practices in all our operations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-green-500 text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in the power of partnerships and working together with diverse stakeholders to achieve our
                mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  )
}

export default AboutUsPage
