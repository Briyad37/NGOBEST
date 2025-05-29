import type React from "react"

const PartnersSection: React.FC = () => {
  const partners = [
    { name: "USAID", logo: "/placeholder.svg?height=80&width=120" },
    { name: "UN Women", logo: "/placeholder.svg?height=80&width=120" },
    { name: "World Bank", logo: "/placeholder.svg?height=80&width=120" },
    { name: "UNDP", logo: "/placeholder.svg?height=80&width=120" },
    { name: "EU", logo: "/placeholder.svg?height=80&width=120" },
    { name: "GIZ", logo: "/placeholder.svg?height=80&width=120" },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-green-500 font-medium">Collaboration</span>
          <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Working together with organizations that share our vision</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center"
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnersSection
