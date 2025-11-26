import React, { useState } from 'react';

const MarketPredictions = () => {
  const [timeframe, setTimeframe] = useState('6m');
  const [region, setRegion] = useState('Global');

  const predictions = {
    growthForecast: 12.4,
    momentumIndex: 78,
    riskOpportunityScore: 85
  };

  const getTimeframeColor = (tf) => {
    return timeframe === tf 
      ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md' 
      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50';
  };

  const getRegionColor = (reg) => {
    return region === reg 
      ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md' 
      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">📈 AI-Based Market Predictions</h2>
        <p className="text-gray-600">Forecast models powered by machine learning algorithms</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#FFF5EB] to-[#FFE9D7] rounded-lg p-5 border border-[#FF8C42]">
          <div className="text-sm text-gray-600">Market Growth Forecast</div>
          <div className="text-3xl font-bold text-[#FF6A00] mt-1">{predictions.growthForecast}%</div>
          <div className="text-sm text-gray-600 mt-1">6–12 months</div>
        </div>
        
        <div className="bg-gradient-to-br from-[#FFF5EB] to-[#FFE9D7] rounded-lg p-5 border border-[#FF8C42]">
          <div className="text-sm text-gray-600">Investment Momentum Index</div>
          <div className="text-3xl font-bold text-[#FF6A00] mt-1">{predictions.momentumIndex}</div>
          <div className="text-sm text-gray-600 mt-1">Out of 100</div>
        </div>
        
        <div className="bg-gradient-to-br from-[#FFF5EB] to-[#FFE9D7] rounded-lg p-5 border border-[#FF8C42]">
          <div className="text-sm text-gray-600">Risk–Opportunity Score</div>
          <div className="text-3xl font-bold text-[#FF6A00] mt-1">{predictions.riskOpportunityScore}</div>
          <div className="text-sm text-gray-600 mt-1">Balanced Profile</div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {['1m', '3m', '6m', '12m'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${getTimeframeColor(tf)}`}
            >
              {tf}
            </button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {['Global', 'India', 'USA', 'Europe', 'Asia'].map((reg) => (
            <button
              key={reg}
              onClick={() => setRegion(reg)}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${getRegionColor(reg)}`}
            >
              {reg}
            </button>
          ))}
        </div>
        
        {/* Simple line graph representation */}
        <div className="h-40 bg-gray-50 rounded-lg p-4 flex items-end justify-between">
          <div className="text-sm text-gray-600 mb-2">Forecast Trend Visualization</div>
          <div className="flex items-end h-24">
            {[10, 25, 40, 55, 70, 85, 75, 90, 80, 95].map((value, index) => (
              <div key={index} className="flex flex-col items-center mx-1">
                <div 
                  className="w-2 bg-[#FF6A00] rounded-t"
                  style={{ height: `${value/2}px` }}
                ></div>
                <div className="w-1 h-1 bg-[#FF6A00] rounded-full mt-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPredictions;