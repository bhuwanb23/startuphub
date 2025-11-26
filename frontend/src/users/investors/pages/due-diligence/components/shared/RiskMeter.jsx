import React from 'react';

const RiskMeter = ({ title, score, maxScore, description }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    <div className="flex items-end">
      <div className="text-3xl font-bold text-[#FF6A00]">{score}</div>
      <div className="text-gray-500 ml-1">/ {maxScore}</div>
    </div>
    <div className="mt-4 relative">
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div 
          className="h-4 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
          style={{ width: '100%' }}
        ></div>
      </div>
      <div 
        className="absolute top-0 w-1 h-4 bg-black"
        style={{ left: `${(score / maxScore) * 100}%` }}
      ></div>
    </div>
    <div className="flex justify-between text-xs text-gray-500 mt-1">
      <span>Low Risk</span>
      <span>High Risk</span>
    </div>
  </div>
);

export default RiskMeter;