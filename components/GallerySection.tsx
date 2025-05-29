import type React from "react"
import { Play } from "lucide-react"

const GallerySection: React.FC = () => {
  const galleryItems = [
    {
      type: "image",
      src: "/placeholder.svg?height=300&width=400",
      title: "Community Meeting",
    },
    {
      type: "video",
      src: "/placeholder.svg?height=300&width=400",
      title: "Training Session",
    },
    {
      type: "image",
      src: "/placeholder.svg?height=300&width=400",
      title: "Workshop Activity",
    },
    {
      type: "image",
      src: "/placeholder.svg?height=300&width=400",
      title: "Graduation Ceremony",
    },
    {
      type: "video",
      src: "/placeholder.svg?height=300&width=400",
      title: "Success Stories",
    },
    {
      type: "image",
      src: "/placeholder.svg?height=300&width=400",
      title: "Community Outreach",
    },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-green-500 font-medium">Our Work</span>
          <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Pictures and videos showcasing our impact and activities</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg">
              <img
                src={item.src || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {item.type === "video" && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white font-medium">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection
