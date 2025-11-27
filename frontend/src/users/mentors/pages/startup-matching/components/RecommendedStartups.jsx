import React, { useState } from 'react';

const RecommendedStartups = ({ startups, onViewStartup, onAcceptMatch, onSaveToShortlist }) => {
  const [hoveredStartup, setHoveredStartup] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {startups.map((startup) => (
        <div 
          key={startup.id}
          className="bg-white rounded-2xl shadow-lg border border-[#FFF2DC] hover:shadow-xl transition-all duration-300 overflow-hidden"
          onMouseEnter={() => setHoveredStartup(startup.id)}
          onMouseLeave={() => setHoveredStartup(null)}
        >
          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#FF6A00] flex items-center justify-center text-white font-bold text-lg">
                  {startup.logo}
                </div>
                <div className="ml-3">
                  <h3 className="font-bold text-gray-800">{startup.name}</h3>
                  <div className="flex items-center">
                    <span className="text-xs px-2 py-1 bg-[#FFF2DC] text-[#FF6A00] rounded-full mr-2">
                      {startup.sector}
                    </span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {startup.stage}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onSaveToShortlist(startup.id)}
                className="text-gray-400 hover:text-[#FF6A00] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </button>
            </div>

            <div className="mb-3">
              <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                {startup.gapTag}
              </span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="bg-gradient-to-r from-[#FF6A00] to-[#FF8C42] rounded-full px-3 py-1 flex items-center">
                <span className="text-white font-bold text-sm">AI Score: {startup.mentorFitScore}%</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={() => onAcceptMatch(startup)}
                className="flex-1 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium text-sm"
              >
                Accept Match
              </button>
              <button 
                onClick={() => onViewStartup(startup)}
                className="flex-1 py-2 border border-[#FF6A00] text-[#FF6A00] rounded-lg hover:bg-[#FFF2DC] transition-colors font-medium text-sm"
              >
                View Startup
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedStartups;