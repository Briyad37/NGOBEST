import type React from "react"

const CallToActionSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Join Us in Making a Difference</h2>
        <p className="text-xl text-gray-300 mb-10 leading-relaxed">
          Your support helps us continue our mission of empowering deaf women and girls in Rwanda. Together, we can
          build a more inclusive society.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="bg-green-500 text-white px-10 py-4 rounded-full font-medium hover:bg-green-600 transition-colors shadow-xl text-lg">
            Donate Now
          </button>
          <button className="border-2 border-green-500 text-green-500 px-10 py-4 rounded-full font-medium hover:bg-green-500 hover:text-white transition-colors text-lg">
            Become a Volunteer
          </button>
        </div>
      </div>
    </section>
  )
}

export default CallToActionSection
