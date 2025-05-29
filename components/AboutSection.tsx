import type React from "react"

const AboutSection: React.FC = () => {
  return (
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
                  education and their welfare, and in which they are perfectly integrated, provided equal opportunities
                  so as to actively participate in the national development process.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Mission statement</h3>
                <p className="text-gray-300 leading-relaxed">
                  RNADW exists to defend the rights of Deaf women and promoting their health and socio-economic welfare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
