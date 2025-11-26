import React from 'react';

const ScoreCard = ({ title, score, maxScore, description }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    <div className="flex items-end">
      <div className="text-3xl font-bold text-[#FF6A00]">{score}</div>
      <div className="text-gray-500 ml-1">/ {maxScore}</div>
    </div>
    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
      <div 
        className="h-2 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FF6A00]"
        style={{ width: `${(score / maxScore) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default ScoreCard;