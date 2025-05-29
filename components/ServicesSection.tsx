import type React from "react"
import { Users, BookOpen, Heart, Megaphone } from "lucide-react"

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Building",
      description: "Creating strong networks and support systems for deaf women across Rwanda",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Education & Training",
      description: "Providing educational opportunities and skill development programs",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health & Wellness",
      description: "Promoting health awareness and accessible healthcare services",
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: "Advocacy",
      description: "Fighting for the rights and inclusion of deaf women in society",
    },
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-green-500 font-semibold text-lg">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive support and advocacy services to empower deaf women and girls in Rwanda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
