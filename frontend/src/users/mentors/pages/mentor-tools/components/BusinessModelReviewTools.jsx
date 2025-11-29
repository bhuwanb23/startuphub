import React, { useState } from 'react';

const BusinessModelReviewTools = () => {
  const [selectedTile, setSelectedTile] = useState('pricing');

  const businessModelElements = [
    {
      id: 'pricing',
      name: 'Pricing Models',
      description: 'Revenue structure and pricing strategies',
      icon: '💰'
    },
    {
      id: 'economics',
      name: 'Unit Economics',
      description: 'Costs and revenues per customer unit',
      icon: '📊'
    },
    {
      id: 'costs',
      name: 'Cost Structure',
      description: 'Fixed and variable cost breakdown',
      icon: '💸'
    },
    {
      id: 'channels',
      name: 'Distribution Channels',
      description: 'Customer acquisition and delivery methods',
      icon: '🚚'
    }
  ];

  const renderTileContent = () => {
    switch (selectedTile) {
      case 'pricing':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-800 mb-2">Freemium Model</h4>
              <p className="text-sm text-green-700 mb-3">Basic features free, premium features paid</p>
              <div className="text-xs">
                <div className="flex justify-between mb-1">
                  <span>Adoption Rate</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-green-600 h-1.5 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-800 mb-2">Subscription</h4>
              <p className="text-sm text-blue-700 mb-3">Recurring revenue model</p>
              <div className="text-xs">
                <div className="flex justify-between mb-1">
                  <span>MRR Growth</span>
                  <span className="font-medium">42%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{width: '42%'}}></div>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-bold text-purple-800 mb-2">One-time Purchase</h4>
              <p className="text-sm text-purple-700 mb-3">Single payment for lifetime access</p>
              <div className="text-xs">
                <div className="flex justify-between mb-1">
                  <span>Conversion Rate</span>
                  <span className="font-medium">18%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-purple-600 h-1.5 rounded-full" style={{width: '18%'}}></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'economics':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h4 className="font-bold text-gray-800 mb-4">Customer Acquisition Cost (CAC)</h4>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-[#FF6A00]">$1,250</p>
                  <p className="text-sm text-gray-600">Previous: $1,420</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    ↓ 12%
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h4 className="font-bold text-gray-800 mb-4">Lifetime Value (LTV)</h4>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-[#FF6A00]">$4,800</p>
                  <p className="text-sm text-gray-600">Previous: $4,200</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    ↑ 14%
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h4 className="font-bold text-gray-800 mb-4">LTV:CAC Ratio</h4>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-[#FF6A00]">3.84</p>
                  <p className="text-sm text-gray-600">Healthy ratio {`>`} 3.0</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Good
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h4 className="font-bold text-gray-800 mb-4">Payback Period</h4>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-[#FF6A00]">5.2 mo</p>
                  <p className="text-sm text-gray-600">Previous: 6.8 mo</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    ↓ 24%
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'costs':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Development Team</h4>
                <p className="text-sm text-gray-600">Salaries, benefits, tools</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">$85,000</p>
                <p className="text-sm text-gray-600">52% of total</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Marketing & Sales</h4>
                <p className="text-sm text-gray-600">Advertising, campaigns, commissions</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">$42,000</p>
                <p className="text-sm text-gray-600">26% of total</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Infrastructure</h4>
                <p className="text-sm text-gray-600">Servers, hosting, software</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">$18,000</p>
                <p className="text-sm text-gray-600">11% of total</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Operations</h4>
                <p className="text-sm text-gray-600">Office, admin, legal</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">$15,000</p>
                <p className="text-sm text-gray-600">9% of total</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">Miscellaneous</h4>
                <p className="text-sm text-gray-600">Travel, events, contingencies</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">$3,200</p>
                <p className="text-sm text-gray-600">2% of total</p>
              </div>
            </div>
          </div>
        );
      case 'channels':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">D</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Direct Sales</h4>
                  <p className="text-sm text-gray-600">Enterprise clients</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Conversion Rate</span>
                  <span className="font-medium">24%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cost per Lead</span>
                  <span className="font-medium">$180</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ROI</span>
                  <span className="font-medium text-green-600">4.2x</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-green-600 font-bold">O</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Online Marketing</h4>
                  <p className="text-sm text-gray-600">SEO, content, ads</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Conversion Rate</span>
                  <span className="font-medium">8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cost per Lead</span>
                  <span className="font-medium">$45</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ROI</span>
                  <span className="font-medium text-green-600">2.8x</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <span className="text-purple-600 font-bold">P</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Partnerships</h4>
                  <p className="text-sm text-gray-600">Channel partners</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Conversion Rate</span>
                  <span className="font-medium">32%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cost per Lead</span>
                  <span className="font-medium">$95</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ROI</span>
                  <span className="font-medium text-green-600">5.1x</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <span className="text-yellow-600 font-bold">R</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Referrals</h4>
                  <p className="text-sm text-gray-600">Customer referrals</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Conversion Rate</span>
                  <span className="font-medium">41%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cost per Lead</span>
                  <span className="font-medium">$25</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>ROI</span>
                  <span className="font-medium text-green-600">6.8x</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Business Model Review Tools</h2>
        <p className="text-gray-600">Analyze and optimize startup business models</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {businessModelElements.map((element) => (
          <button
            key={element.id}
            onClick={() => setSelectedTile(element.id)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              selectedTile === element.id
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{element.icon}</span>
            {element.name}
          </button>
        ))}
      </div>

      <div className="border border-gray-200 rounded-xl p-6 min-h-[300px]">
        {renderTileContent()}
      </div>

      <div className="mt-6 bg-[#FFF9F0] rounded-xl p-4 border border-[#FFDAB9]">
        <div className="flex">
          <div className="mr-3 text-[#FF6A00]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-1">AI Business Model Insights</h4>
            <p className="text-sm text-gray-700">
              Your business model shows strong unit economics with an LTV:CAC ratio of 3.84. 
              Consider optimizing your pricing model to increase revenue per customer by 15-20%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessModelReviewTools;