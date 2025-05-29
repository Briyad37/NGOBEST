import type React from "react"
import { useTeam } from "../hooks/useTeam"

const TeamSection: React.FC = () => {
  const { teamMembers, loading, error } = useTeam()

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-500 font-medium">Meet Our Team</span>
            <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Teams</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-green-500 font-medium">Meet Our Team</span>
          <div className="w-16 h-1 bg-green-500 mx-auto mt-2 mb-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Teams</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dedicated professionals working tirelessly to empower deaf women and girls
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-green-500 font-medium mb-3">{member.position}</p>
                {member.bio && <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
