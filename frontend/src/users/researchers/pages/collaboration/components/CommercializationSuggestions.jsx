import React, { useState } from 'react';

const CommercializationSuggestions = () => {
  const [selectedIdea, setSelectedIdea] = useState(null);

  const aiSuggestions = [
    {
      id: 1,
      title: 'AI-Powered Medical Diagnostics',
      description: 'Machine learning platform for early disease detection from medical imaging',
      verticals: ['Healthcare', 'Medical Devices', 'Telemedicine'],
      marketPotential: 92,
      demandDrivers: [
        'Aging population increasing demand for diagnostic services',
        'Shortage of radiologists in developing countries',
        'Rising healthcare costs driving need for efficiency'
      ],
      useCases: [
        'Hospital radiology departments',
        'Remote diagnostic centers',
        'Mobile health screening units'
      ],
      competitiveAdvantage: '95% accuracy vs 85% for existing solutions'
    },
    {
      id: 2,
      title: 'Sustainable Packaging Solution',
      description: 'Biodegradable packaging material made from agricultural waste',
      verticals: ['Food & Beverage', 'E-commerce', 'Consumer Goods'],
      marketPotential: 88,
      demandDrivers: [
        'Increasing environmental regulations on plastic use',
        'Consumer preference for sustainable products',
        'Corporate sustainability commitments'
      ],
      useCases: [
        'Food delivery services',
        'E-commerce packaging',
        'Retail product packaging'
      ],
      competitiveAdvantage: '100% compostable within 90 days'
    },
    {
      id: 3,
      title: 'Smart Agriculture Platform',
      description: 'IoT-based precision farming solution with predictive analytics',
      verticals: ['Agriculture', 'AgriTech', 'Smart Farming'],
      marketPotential: 90,
      demandDrivers: [
        'Need to increase food production with limited resources',
        'Climate change affecting traditional farming methods',
        'Government initiatives for digital agriculture'
      ],
      useCases: [
        'Large-scale commercial farms',
        'Greenhouse operations',
        'Urban farming initiatives'
      ],
      competitiveAdvantage: '30% reduction in water usage, 20% increase in yield'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">💡 AI-Based Commercialization Suggestions</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - AI Suggestions List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">AI-Generated Commercialization Opportunities</h2>
            
            <div className="space-y-4">
              {aiSuggestions.map((suggestion) => (
                <div 
                  key={suggestion.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-150 ${
                    selectedIdea?.id === suggestion.id 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setSelectedIdea(suggestion)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">{suggestion.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Market Potential: {suggestion.marketPotential}%
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">{suggestion.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {suggestion.verticals.map((vertical, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {vertical}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - Detailed View */}
        <div className="space-y-6">
          {selectedIdea ? (
            <>
              <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{selectedIdea.title}</h2>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Market Potential Score</h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Score</span>
                    <span className="font-medium">{selectedIdea.marketPotential}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ width: `${selectedIdea.marketPotential}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Key Demand Drivers</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedIdea.demandDrivers.map((driver, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>{driver}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Recommended Use Cases</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedIdea.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Competitive Advantage</h3>
                  <p className="text-sm text-gray-600">{selectedIdea.competitiveAdvantage}</p>
                </div>
                
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                  Convert to Startup Idea
                </button>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select an Idea</h2>
              <p className="text-gray-600">Choose an AI-generated commercialization opportunity from the list to view detailed analysis and recommendations.</p>
            </div>
          )}
          
          {/* Market Insights Panel */}
          <div className="bg-gradient-to-b from-orange-50 to-saffron-50 rounded-lg p-6 border border-orange-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Market Insights</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Global Investment Trends</h3>
                <p className="text-sm text-gray-600">Healthcare AI solutions saw 45% YoY growth in Q3 2025</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Regulatory Updates</h3>
                <p className="text-sm text-gray-600">New FDA guidelines for AI diagnostics expected Q1 2026</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Technology Adoption</h3>
                <p className="text-sm text-gray-600">78% of agri-tech companies plan to adopt precision farming by 2027</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercializationSuggestions;