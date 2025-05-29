import type React from "react"

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-[70vh] bg-gray-900 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-105"
        style={{
          backgroundImage: `url('https://sjc.microlink.io/oqHc8upmc9yIwibDfv2IK6roZQmnl68lBPP56wSCV2df7CcUKBIb_CmHIoUEscmbGiygvdd_oBSCF8p1mA_Asg.jpeg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
      </div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Welcome to RNADW</h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto">
              Rwanda National Association of Deaf Women - Empowering deaf women and girls through advocacy, education,
              and community building since 2005.
            </p>
            <button className="bg-green-500 text-white px-8 py-4 rounded-md font-medium hover:bg-green-600 transition-colors shadow-lg text-lg">
              DONATE NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
