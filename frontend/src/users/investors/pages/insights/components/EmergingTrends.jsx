import React from 'react';

const EmergingTrends = () => {
  const trends = [
    {
      id: 1,
      title: 'AI in Healthcare',
      summary: 'Machine learning applications in diagnostics and personalized treatment',
      strength: 87,
      sparkline: [30, 45, 55, 65, 75, 87]
    },
    {
      id: 2,
      title: 'EV Battery Tech Surge',
      summary: 'Solid-state batteries and fast-charging innovations driving market growth',
      strength: 92,
      sparkline: [25, 40, 55, 70, 85, 92]
    },
    {
      id: 3,
      title: 'Quantum Computing Commercialization',
      summary: 'Enterprise adoption of quantum algorithms for optimization problems',
      strength: 78,
      sparkline: [20, 35, 50, 65, 72, 78]
    },
    {
      id: 4,
      title: 'Regenerative Food Tech',
      summary: 'Lab-grown meat and precision fermentation gaining mainstream traction',
      strength: 84,
      sparkline: [15, 30, 45, 65, 78, 84]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">🔶 Emerging Sector Trends</h2>
        <p className="text-gray-600">AI-identified growth patterns across global markets</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trends.map((trend) => (
          <div 
            key={trend.id} 
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all hover:border-[#FF8C42] hover:shadow-[0_0_8px_rgba(255,140,66,0.2)]"
          >
            <h3 className="font-bold text-gray-800">{trend.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{trend.summary}</p>
            
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Trend Strength</span>
                <span className="font-bold text-[#FF6A00]">{trend.strength}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                  style={{ width: `${trend.strength}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-3 flex justify-between items-center">
              <div className="flex items-center">
                {/* Simple sparkline representation */}
                <div className="flex items-end h-6">
                  {trend.sparkline.map((value, index) => (
                    <div 
                      key={index} 
                      className="w-1 mx-0.5 bg-[#FF6A00] rounded-t"
                      style={{ height: `${value/2}px` }}
                    ></div>
                  ))}
                </div>
              </div>
              <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                View Full Report →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergingTrends;