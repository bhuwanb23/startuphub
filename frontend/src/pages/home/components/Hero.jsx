import React from 'react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] bg-clip-text text-transparent">
                Unify Innovation
              </span>{' '}
              Across Stakeholders
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl">
              Connect startups, investors, researchers, and mentors in one powerful platform. 
              Leverage AI-driven insights to accelerate your innovation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-lg hover:shadow-xl">
                Join the Ecosystem
              </button>
              <button className="border-2 border-[#FF8C42] text-[#FF6A00] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#FF8C42]/10 transition-all">
                Explore Features
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-[#FF8C42]/20 to-[#FF6A00]/20 rounded-2xl p-8 backdrop-blur-sm border border-[#FF8C42]/30">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="w-12 h-12 rounded-lg bg-[#FF8C42]/20 flex items-center justify-center mb-3">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">Startups</h3>
                  <p className="text-gray-600 text-sm mt-1">Raise funds & find mentors</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md mt-8">
                  <div className="w-12 h-12 rounded-lg bg-[#FF6A00]/20 flex items-center justify-center mb-3">
                    <span className="text-2xl">💼</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">Investors</h3>
                  <p className="text-gray-600 text-sm mt-1">Discover promising startups</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="w-12 h-12 rounded-lg bg-[#F4A300]/20 flex items-center justify-center mb-3">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">Researchers</h3>
                  <p className="text-gray-600 text-sm mt-1">Commercialize innovations</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md mt-8">
                  <div className="w-12 h-12 rounded-lg bg-[#FF8C42]/20 flex items-center justify-center mb-3">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">Mentors</h3>
                  <p className="text-gray-600 text-sm mt-1">Guide future innovators</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#FF8C42]/20 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-[#FF6A00]/20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;