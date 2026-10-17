import React, { useState } from 'react';

const CommercialPotentialScore = () => {
  const [potentialData, setPotentialData] = useState({
    title: 'AI-Powered Drug Discovery Platform',
    overallScore: 85,
    demandPrediction: 78,
    adoptionFeasibility: 92,
    revenuePotential: 88,
    marketTiming: 82,
    competitiveAdvantage: 90
  });

  const [revenueModels, setRevenueModels] = useState([
    { model: 'SaaS Subscription', score: 92, description: 'Recurring revenue with scalable pricing tiers' },
    { model: 'Licensing Fees', score: 85, description: 'One-time or ongoing licensing payments' },
    { model: 'Royalty-based', score: 78, description: 'Percentage of sales from licensee products' },
    { model: 'Joint Ventures', score: 88, description: 'Partnership-based revenue sharing' }
  ]);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    return 'text-yellow-600';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Commercial Potential Score</h1>
        <p className="text-gray-600">AI-powered assessment of commercial viability and revenue potential</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Overall Score */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Overall Commercial Potential</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#F4A300"
                  strokeWidth="3"
                  strokeDasharray={`${potentialData.overallScore}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{potentialData.overallScore}%</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">Commercial Viability Score</div>
        </div>

        {/* Key Metrics */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Key Commercial Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-800">Demand Prediction</span>
                <span className={`font-bold ${getScoreColor(potentialData.demandPrediction)}`}>
                  {potentialData.demandPrediction}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#F4A300] h-2 rounded-full" 
                  style={{ width: `${potentialData.demandPrediction}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-2">Market demand for the technology</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-800">Adoption Feasibility</span>
                <span className={`font-bold ${getScoreColor(potentialData.adoptionFeasibility)}`}>
                  {potentialData.adoptionFeasibility}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#F4A300] h-2 rounded-full" 
                  style={{ width: `${potentialData.adoptionFeasibility}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-2">Ease of market adoption</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-800">Revenue Potential</span>
                <span className={`font-bold ${getScoreColor(potentialData.revenuePotential)}`}>
                  {potentialData.revenuePotential}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#F4A300] h-2 rounded-full" 
                  style={{ width: `${potentialData.revenuePotential}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-2">Projected revenue generation</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-800">Market Timing</span>
                <span className={`font-bold ${getScoreColor(potentialData.marketTiming)}`}>
                  {potentialData.marketTiming}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#F4A300] h-2 rounded-full" 
                  style={{ width: `${potentialData.marketTiming}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-2">Optimal market entry timing</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Model Suggestions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Revenue Model Suggestions</h2>
          <div className="space-y-4">
            {revenueModels.map((model, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-800">{model.model}</h3>
                  <span className={`font-bold ${getScoreColor(model.score)}`}>
                    {model.score}%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{model.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#F4A300] h-2 rounded-full" 
                    style={{ width: `${model.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Advantage */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Competitive Advantage Analysis</h2>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-800">Overall Competitive Advantage</span>
              <span className={`font-bold ${getScoreColor(potentialData.competitiveAdvantage)}`}>
                {potentialData.competitiveAdvantage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-[#F4A300] h-3 rounded-full" 
                style={{ width: `${potentialData.competitiveAdvantage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Key Advantages</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  40% faster drug discovery process
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Lower computational requirements
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Higher accuracy predictions
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Potential Challenges</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  Regulatory approval process
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  Integration with existing systems
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Action Panel */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Commercialization Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-gray-800 mb-1">Q2 2024</div>
            <div className="text-sm text-gray-600">Prototype Development</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-gray-800 mb-1">Q4 2024</div>
            <div className="text-sm text-gray-600">Pilot Testing</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-gray-800 mb-1">Q2 2025</div>
            <div className="text-sm text-gray-600">Market Launch</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-gray-800 mb-1">Q4 2025</div>
            <div className="text-sm text-gray-600">Scale Operations</div>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="bg-[#F4A300] hover:bg-[#F26B1D] text-white px-4 py-2 rounded-lg transition-colors">
            Generate Commercialization Plan
          </button>
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
            Export Financial Projections
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommercialPotentialScore;