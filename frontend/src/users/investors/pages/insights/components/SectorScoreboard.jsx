import React from 'react';

const SectorScoreboard = () => {
  const sectors = [
    { id: 1, name: 'Deep Tech', score: 92, bars: [70, 80, 85, 90, 92] },
    { id: 2, name: 'Climate Tech', score: 88, bars: [65, 75, 82, 86, 88] },
    { id: 3, name: 'FinTech', score: 76, bars: [60, 68, 72, 74, 76] },
    { id: 4, name: 'HealthTech', score: 91, bars: [72, 80, 85, 88, 91] },
    { id: 5, name: 'Mobility', score: 68, bars: [55, 62, 66, 67, 68] },
    { id: 6, name: 'EdTech', score: 73, bars: [58, 65, 69, 71, 73] }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">🥇 Sector Opportunity Scoreboard</h2>
        <p className="text-gray-600">AI-weighted opportunity scores across technology sectors</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectors.map((sector) => (
          <div key={sector.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all">
            <h3 className="font-bold text-gray-800">{sector.name}</h3>
            
            <div className="mt-4 text-center">
              <div className="text-4xl font-bold text-[#FF6A00]">{sector.score}</div>
              <div className="text-sm text-gray-600">Opportunity Score</div>
            </div>
            
            <div className="mt-4">
              <div className="text-sm text-gray-600 mb-2">Growth Trajectory</div>
              <div className="flex justify-between h-12 items-end">
                {sector.bars.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-4 bg-[#FF8C42] rounded-t"
                      style={{ height: `${value/2}px` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Explore Sector →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorScoreboard;