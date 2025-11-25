import React from 'react';
import { FEATURES } from '../constants';

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Powerful Features for <span className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] bg-clip-text text-transparent">All Stakeholders</span>
          </h2>
          <p className="text-xl text-gray-600">
            Our platform provides specialized tools for startups, investors, researchers, and mentors to collaborate effectively.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <div 
              key={feature.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FF8C42]/30"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#FF8C42]/20 to-[#FF6A00]/20 flex items-center justify-center mb-6 text-2xl">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;