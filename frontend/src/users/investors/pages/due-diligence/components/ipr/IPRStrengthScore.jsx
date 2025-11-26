import React from 'react';
import ScoreCard from '../shared/ScoreCard';

const IPRStrengthScore = ({ data }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">IPR Strength Score</h2>
      <p className="text-gray-600">Patent analysis, novelty scores, and claims strength</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Patent Heatmap</h3>
        <div className="bg-gradient-to-br from-[#FFF5EB] to-[#FF8C42]/20 rounded-lg p-6 h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-gray-700">Interactive Patent Heatmap</p>
            <p className="text-sm text-gray-500 mt-1">{data.patentCount} patents registered</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <ScoreCard 
          title="Novelty Score" 
          score={data.noveltyScore} 
          maxScore={10} 
          description="Patent novelty assessment"
        />
        <ScoreCard 
          title="Claims Strength" 
          score={data.claimsStrength} 
          maxScore={10} 
          description="Strength of patent claims"
        />
      </div>
    </div>
    
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-800 mb-4">IP Expiry Timeline</h3>
      <div className="h-32 flex items-end space-x-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-gradient-to-t from-[#FF8C42] to-[#FF6A00] rounded-t-lg"
              style={{ height: `${Math.random() * 80 + 20}%` }}
            ></div>
            <div className="text-xs text-gray-500 mt-2">Y{i + 1}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-sm text-gray-600">
        Average IP protection term: {data.expiryYears} years
      </div>
    </div>
  </div>
);

export default IPRStrengthScore;