import React, { useState } from 'react';

const ProductPositioning = () => {
  const [activeView, setActiveView] = useState('positioning');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mock data for products
  const products = [
    {
      id: 1,
      name: 'StartupHub Pro',
      category: 'Business Management',
      price: '$99/month',
      features: ['Project Management', 'Team Collaboration', 'Analytics Dashboard'],
      targetAudience: 'Scale-ups',
      competitiveAdvantage: 'Integrated AI insights',
      marketPosition: { x: 75, y: 80 },
      differentiation: 'AI-powered recommendations',
    },
    {
      id: 2,
      name: 'StartupLaunch',
      category: 'Incubation',
      price: '$199/month',
      features: ['Mentor Matching', 'Funding Access', 'Resource Library'],
      targetAudience: 'Early-stage startups',
      competitiveAdvantage: 'Extensive mentor network',
      marketPosition: { x: 60, y: 70 },
      differentiation: 'Personalized mentorship',
    },
    {
      id: 3,
      name: 'InnovateSuite',
      category: 'IPR Management',
      price: '$149/month',
      features: ['Patent Filing', 'Trademark Tools', 'Prior Art Search'],
      targetAudience: 'IP-intensive businesses',
      competitiveAdvantage: 'Automated workflows',
      marketPosition: { x: 80, y: 65 },
      differentiation: 'End-to-end IPR automation',
    },
  ];

  // Mock data for competitive positioning
  const competitors = [
    { name: 'Competitor A', x: 65, y: 75, category: 'Business Management' },
    { name: 'Competitor B', x: 70, y: 60, category: 'Incubation' },
    { name: 'Competitor C', x: 85, y: 70, category: 'IPR Management' },
    { name: 'Your Products', x: 72, y: 72, category: 'Overall', isOwn: true },
  ];

  // Mock data for value proposition matrix
  const valuePropositions = [
    { dimension: 'Price', yourScore: 75, competitorAvg: 65 },
    { dimension: 'Features', yourScore: 85, competitorAvg: 70 },
    { dimension: 'Usability', yourScore: 80, competitorAvg: 75 },
    { dimension: 'Support', yourScore: 90, competitorAvg: 70 },
    { dimension: 'Innovation', yourScore: 88, competitorAvg: 65 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Product Positioning</h1>
        <p className="text-gray-600 mt-1">Strategic positioning of your products in the market landscape</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Positioning Insight</h2>
            <p className="text-gray-700 mt-1">
              Your products are well-positioned in the innovation quadrant with strong differentiation. 
              StartupHub Pro leads in AI capabilities, while InnovateSuite dominates in IPR automation features.
            </p>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveView('positioning')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeView === 'positioning'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Market Positioning
          </button>
          <button
            onClick={() => setActiveView('products')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeView === 'products'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Product Profiles
          </button>
          <button
            onClick={() => setActiveView('value')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeView === 'value'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Value Proposition
          </button>
        </div>

        {activeView === 'positioning' && (
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Market Positioning Map</h2>
            <div className="h-96 relative border border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-white">
              {/* Chart axes */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300"></div>
              <div className="absolute bottom-0 left-0 h-full w-px bg-gray-300"></div>
              
              {/* Axis labels */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
                Price Competitiveness →
              </div>
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 rotate-[-90deg] text-sm text-gray-500">
                Feature Completeness →
              </div>
              
              {/* Quadrant labels */}
              <div className="absolute top-4 left-4 text-xs text-gray-500">Low Price / Few Features</div>
              <div className="absolute top-4 right-4 text-xs text-gray-500">High Price / Few Features</div>
              <div className="absolute bottom-8 left-4 text-xs text-gray-500">Low Price / Many Features</div>
              <div className="absolute bottom-8 right-4 text-xs text-gray-500">High Price / Many Features</div>
              
              {/* Data points */}
              {competitors.map((company, index) => (
                <div
                  key={index}
                  className={`absolute rounded-full flex items-center justify-center ${
                    company.isOwn 
                      ? 'bg-[#FF6A00] text-white border-2 border-white shadow-lg' 
                      : 'bg-blue-500 text-white'
                  }`}
                  style={{
                    left: `${company.x}%`,
                    bottom: `${company.y}%`,
                    width: '40px',
                    height: '40px',
                    transform: 'translate(-50%, 50%)',
                  }}
                >
                  {company.isOwn ? 'YP' : company.name.charAt(0)}
                </div>
              ))}
              
              {/* Legend */}
              <div className="absolute top-4 right-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-[#FF6A00] mr-2"></div>
                  <span className="text-sm">Your Products</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">Competitors</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-bold text-blue-800">Positioning Strength</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Your products occupy the premium quadrant with high feature completeness and competitive pricing.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-bold text-green-800">Differentiation Opportunity</h3>
                <p className="text-sm text-green-700 mt-1">
                  Expand differentiation in AI-powered insights and automation to strengthen market position.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeView === 'products' && (
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Product Profiles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedProduct(selectedProduct?.id === product.id ? null : product)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 mt-1">
                        {product.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#FF6A00]">{product.price}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700">Target Audience</h4>
                    <p className="text-sm text-gray-600">{product.targetAudience}</p>
                  </div>
                  
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold text-gray-700">Key Features</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold text-gray-700">Competitive Advantage</h4>
                    <p className="text-sm text-gray-600">{product.competitiveAdvantage}</p>
                  </div>
                  
                  {selectedProduct?.id === product.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-700">Differentiation Strategy</h4>
                      <p className="text-sm text-gray-600 mt-1">{product.differentiation}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-sm hover:bg-[#FFE9D7] transition-colors">
                          View Analytics
                        </button>
                        <button className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-sm hover:bg-[#FFE9D7] transition-colors">
                          Edit Positioning
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'value' && (
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Value Proposition Matrix</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dimension
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Your Score
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Competitor Average
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gap
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {valuePropositions.map((prop, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {prop.dimension}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="h-2 rounded-full bg-[#FF6A00]"
                              style={{ width: `${prop.yourScore}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{prop.yourScore}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${prop.competitorAvg}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{prop.competitorAvg}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          prop.yourScore > prop.competitorAvg 
                            ? 'bg-green-100 text-green-800' 
                            : prop.yourScore < prop.competitorAvg 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {prop.yourScore > prop.competitorAvg ? '+' : ''}{prop.yourScore - prop.competitorAvg}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-bold text-green-800">Strengths</h3>
                <ul className="mt-2 space-y-1 text-sm text-green-700">
                  <li>• Support quality exceeds competitors by 20%</li>
                  <li>• Innovation capabilities lead by 23%</li>
                  <li>• Feature completeness is 15% above average</li>
                </ul>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-bold text-yellow-800">Improvement Areas</h3>
                <ul className="mt-2 space-y-1 text-sm text-yellow-700">
                  <li>• Close the 10% gap in usability scores</li>
                  <li>• Optimize pricing strategy for better competitiveness</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Positioning Recommendations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Positioning Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00] mr-3">
                1
              </div>
              <h3 className="font-bold text-gray-800">Strengthen Differentiation</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Emphasize AI-powered insights and automation in marketing materials to highlight unique value.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00] mr-3">
                2
              </div>
              <h3 className="font-bold text-gray-800">Optimize Pricing</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Introduce tiered pricing options to capture more market segments without diluting premium positioning.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00] mr-3">
                3
              </div>
              <h3 className="font-bold text-gray-800">Expand Target Audiences</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Develop specialized versions for adjacent markets like enterprise clients and educational institutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPositioning;