import type React from "react"

const StatsSection: React.FC = () => {
  const stats = [
    { number: "500+", label: "Women Empowered" },
    { number: "50+", label: "Projects Completed" },
    { number: "19+", label: "Years of Service" },
    { number: "30+", label: "Partner Organizations" },
  ]

  return (
    <section className="py-20 px-4 bg-green-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Impact</h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Making a difference in the lives of deaf women and girls across Rwanda
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-4">{stat.number}</div>
              <div className="text-xl text-green-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
