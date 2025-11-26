import React from 'react';
import ScoreCard from '../shared/ScoreCard';
import RiskMeter from '../shared/RiskMeter';

const TechnologyAssessment = ({ data }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Technology Assessment</h2>
      <p className="text-gray-600">Tech readiness, architecture, and risk evaluation</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ScoreCard 
        title="Tech Readiness Score" 
        score={data.techReadiness} 
        maxScore={10} 
        description="TR Level Indicator"
      />
      <ScoreCard 
        title="Code Quality" 
        score={data.codeQuality} 
        maxScore={100} 
        description="Code quality scoring"
      />
      <RiskMeter 
        title="Tech Risk Rating" 
        score={data.riskRating} 
        maxScore={100} 
        description="Technology risk assessment"
      />
    </div>
    
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-800 mb-4">Architecture Overview</h3>
      <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🏗️</div>
          <p className="text-gray-700">Architecture Diagram: {data.architecture}</p>
          <p className="text-sm text-gray-500 mt-2">Detailed architecture viewer would appear here</p>
        </div>
      </div>
    </div>
  </div>
);

export default TechnologyAssessment;