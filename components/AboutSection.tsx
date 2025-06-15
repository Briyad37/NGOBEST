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
              <div className="relative z-10 bg-black rounded-lg overflow-hidden shadow-2xl">
            <div className="relative">
              {/* YouTube video embed */}
              <iframe
                className="w-full aspect-video"
                src="https://www.youtube.com/embed/SFhndjv-PfY"
                title="About Rwanda National Association of Deaf Women"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              {/* Watch on YouTube button */}
              <div className="absolute bottom-4 right-4">
                <a
                  href="https://www.youtube.com/watch?v=SFhndjv-PfY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium flex items-center space-x-1 transition-colors"
                >
                  <span>Watch on YouTube</span>
                </a>
              </div>
            </div>
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
