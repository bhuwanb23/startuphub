import React, { useState } from 'react';

const TrendInsights = () => {
  const [timeRange, setTimeRange] = useState('12months');
  
  // Mock data for market trends
  const trends = [
    {
      id: 1,
      title: 'AI-Powered Solutions',
      category: 'Technology',
      growth: '+45%',
      momentum: 'high',
      description: 'Artificial intelligence integration in business solutions shows rapid adoption across industries.',
      relatedIndustries: ['Healthcare', 'Finance', 'Retail'],
    },
    {
      id: 2,
      title: 'Sustainability Focus',
      category: 'Environment',
      growth: '+32%',
      momentum: 'rising',
      description: 'Green technology and sustainable practices are becoming key differentiators for startups.',
      relatedIndustries: ['Energy', 'Manufacturing', 'Transportation'],
    },
    {
      id: 3,
      title: 'Remote Work Solutions',
      category: 'Workplace',
      growth: '+28%',
      momentum: 'stable',
      description: 'Tools supporting distributed teams continue to show steady demand post-pandemic.',
      relatedIndustries: ['Software', 'Hardware', 'Services'],
    },
    {
      id: 4,
      title: 'Personalization Engines',
      category: 'Consumer',
      growth: '+38%',
      momentum: 'high',
      description: 'Customized user experiences drive engagement and conversion rates significantly.',
      relatedIndustries: ['E-commerce', 'Entertainment', 'Education'],
    },
  ];

  // Mock data for trend visualization
  const trendData = [
    { month: 'Jan', ai: 20, sustainability: 15, remote: 30, personalization: 10 },
    { month: 'Feb', ai: 25, sustainability: 18, remote: 32, personalization: 15 },
    { month: 'Mar', ai: 30, sustainability: 22, remote: 35, personalization: 20 },
    { month: 'Apr', ai: 35, sustainability: 25, remote: 34, personalization: 25 },
    { month: 'May', ai: 42, sustainability: 28, remote: 33, personalization: 30 },
    { month: 'Jun', ai: 48, sustainability: 32, remote: 32, personalization: 35 },
  ];

  const getMomentumColor = (momentum) => {
    switch (momentum) {
      case 'high': return 'bg-green-500';
      case 'rising': return 'bg-yellow-500';
      case 'stable': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Trend Insights</h1>
        <p className="text-gray-600 mt-1">Identify and analyze emerging market trends and their potential impact</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Trend Prediction</h2>
            <p className="text-gray-700 mt-1">
              AI-Powered Solutions are projected to grow 65% YoY. Early investment in this area positions you ahead 
              of competitors. Sustainability trends show strong correlation with funding success (+40% higher funding rates).
            </p>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTimeRange('3months')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeRange === '3months'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            3 Months
          </button>
          <button
            onClick={() => setTimeRange('6months')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeRange === '6months'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            6 Months
          </button>
          <button
            onClick={() => setTimeRange('12months')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeRange === '12months'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            12 Months
          </button>
        </div>
      </div>

      {/* Trend Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Trend Growth Visualization</h2>
        <div className="h-80 relative">
          {/* Simplified chart representation */}
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
            {trendData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1 mx-1">
                <div className="flex items-end justify-center h-64 w-full">
                  <div 
                    className="w-3/4 bg-blue-500 mx-1 rounded-t hover:bg-blue-600 transition-colors"
                    style={{ height: `${data.ai * 1.5}px` }}
                    title={`AI: ${data.ai}%`}
                  ></div>
                  <div 
                    className="w-3/4 bg-green-500 mx-1 rounded-t hover:bg-green-600 transition-colors"
                    style={{ height: `${data.sustainability * 1.5}px` }}
                    title={`Sustainability: ${data.sustainability}%`}
                  ></div>
                  <div 
                    className="w-3/4 bg-purple-500 mx-1 rounded-t hover:bg-purple-600 transition-colors"
                    style={{ height: `${data.remote * 1.5}px` }}
                    title={`Remote Work: ${data.remote}%`}
                  ></div>
                  <div 
                    className="w-3/4 bg-orange-500 mx-1 rounded-t hover:bg-orange-600 transition-colors"
                    style={{ height: `${data.personalization * 1.5}px` }}
                    title={`Personalization: ${data.personalization}%`}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{data.month}</div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span className="text-xs">AI Solutions</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span className="text-xs">Sustainability</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
                <span className="text-xs">Remote Work</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
                <span className="text-xs">Personalization</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trends.map((trend) => (
          <div key={trend.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{trend.title}</h3>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 mt-2">
                  {trend.category}
                </span>
              </div>
              <div className="flex items-center">
                <span className={`w-3 h-3 rounded-full ${getMomentumColor(trend.momentum)} mr-2`}></span>
                <span className="text-sm font-medium text-gray-600 capitalize">{trend.momentum}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <span className="text-2xl font-bold text-[#FF6A00]">{trend.growth}</span>
              <span className="text-sm text-gray-600 ml-2">growth rate</span>
            </div>
            
            <p className="mt-3 text-gray-600 text-sm">{trend.description}</p>
            
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase">Related Industries</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {trend.relatedIndustries.map((industry, index) => (
                  <span key={index} className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trend Impact Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Trend Impact Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-bold text-gray-800">High Impact Trends</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-sm">AI Integration (+45% growth)</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-sm">Personalization (+38% growth)</span>
              </li>
            </ul>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-bold text-gray-800">Medium Impact Trends</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                <span className="text-sm">Sustainability (+32% growth)</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                <span className="text-sm">Remote Work (+28% growth)</span>
              </li>
            </ul>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-bold text-gray-800">Emerging Trends</h3>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-sm">Blockchain Adoption</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-sm">Quantum Computing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendInsights;