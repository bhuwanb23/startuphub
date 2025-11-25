import React, { useState } from 'react';

const TractionData = () => {
  const [timeRange, setTimeRange] = useState('12months');
  
  // Mock data for traction metrics
  const tractionMetrics = [
    {
      id: 1,
      title: 'Product-Market Fit',
      value: '78%',
      change: '+12%',
      trend: 'up',
      icon: '🎯',
    },
    {
      id: 2,
      title: 'Viral Coefficient',
      value: '1.4',
      change: '+0.3',
      trend: 'up',
      icon: '🔄',
    },
    {
      id: 3,
      title: 'Activation Rate',
      value: '65%',
      change: '+8%',
      trend: 'up',
      icon: '⚡',
    },
    {
      id: 4,
      title: 'Weekly Active Users',
      value: '8,920',
      change: '+15%',
      trend: 'up',
      icon: '📅',
    },
  ];

  // Mock data for traction indicators
  const tractionIndicators = [
    { indicator: 'Website Traffic', value: '45K/mo', change: '+22%', trend: 'up' },
    { indicator: 'Conversion Rate', value: '4.2%', change: '+1.1%', trend: 'up' },
    { indicator: 'Email Subscribers', value: '12.5K', change: '+18%', trend: 'up' },
    { indicator: 'Social Followers', value: '8.7K', change: '+25%', trend: 'up' },
    { indicator: 'Press Mentions', value: '42', change: '+35%', trend: 'up' },
    { indicator: 'Partnerships', value: '18', change: '+50%', trend: 'up' },
  ];

  // Mock data for milestone achievements
  const milestones = [
    {
      id: 1,
      title: 'First 10,000 Users',
      date: 'March 2024',
      status: 'achieved',
      description: 'Reached our first major user milestone ahead of schedule',
    },
    {
      id: 2,
      title: 'Series A Funding',
      date: 'Q3 2024',
      status: 'planned',
      description: 'Target funding round to accelerate growth',
    },
    {
      id: 3,
      title: 'International Expansion',
      date: 'Q4 2024',
      status: 'planned',
      description: 'Launch in European markets',
    },
    {
      id: 4,
      title: '100 Enterprise Customers',
      date: 'Q1 2025',
      status: 'target',
      description: 'Secure 100 paying enterprise clients',
    },
  ];

  // Mock data for engagement funnel
  const funnelData = [
    { stage: 'Visitors', count: 100000, percentage: 100 },
    { stage: 'Signups', count: 15000, percentage: 15 },
    { stage: 'Active Users', count: 8920, percentage: 8.9 },
    { stage: 'Paying Customers', count: 2480, percentage: 2.5 },
    { stage: 'Premium Users', count: 890, percentage: 0.9 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Traction Data</h1>
        <p className="text-gray-600 mt-1">Measure product traction and key growth indicators</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Traction Insight</h2>
            <p className="text-gray-700 mt-1">
              Product-market fit score of 78% indicates strong alignment with customer needs. Viral coefficient of 1.4 suggests 
              organic growth potential. Conversion rate improvement of 1.1% points to effective funnel optimization.
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

      {/* Traction Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tractionMetrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-2xl mb-2">{metric.icon}</div>
                <h3 className="text-gray-600 text-sm">{metric.title}</h3>
                <div className="mt-1">
                  <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                </div>
              </div>
              <div className={`flex items-center text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
                {metric.trend === 'up' ? ' ↑' : ' ↓'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Traction Indicators */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Key Traction Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tractionIndicators.map((indicator, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-800">{indicator.indicator}</h3>
                <div className={`text-sm font-medium ${
                  indicator.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {indicator.change}
                </div>
              </div>
              <div className="mt-2 text-2xl font-bold text-[#FF6A00]">{indicator.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Funnel */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">User Engagement Funnel</h2>
        <div className="flex items-end justify-between h-64 px-4">
          {funnelData.map((stage, index) => (
            <div key={index} className="flex flex-col items-center flex-1 mx-2">
              <div 
                className="w-full bg-gradient-to-t from-[#FF6A00] to-[#FF8C42] rounded-t transition-all hover:opacity-90"
                style={{ height: `${stage.percentage * 2.5}px` }}
              ></div>
              <div className="text-center mt-2">
                <div className="text-sm font-medium text-gray-800">{stage.stage}</div>
                <div className="text-xs text-gray-600">{stage.count.toLocaleString()}</div>
                <div className="text-xs text-[#FF6A00] font-medium">{stage.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-bold text-blue-800">Funnel Analysis</h3>
          <p className="text-sm mt-2">
            Conversion from visitors to paying customers is 2.5%. Focus on improving activation rate (8.9%) 
            through better onboarding to increase overall funnel efficiency.
          </p>
        </div>
      </div>

      {/* Milestone Achievements */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Milestone Achievements</h2>
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-start p-4 border border-gray-200 rounded-lg">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-4 ${
                milestone.status === 'achieved' 
                  ? 'bg-green-500 text-white' 
                  : milestone.status === 'planned' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-300 text-gray-700'
              }`}>
                {milestone.status === 'achieved' ? '✓' : milestone.status === 'planned' ? '📅' : '🎯'}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">{milestone.title}</h3>
                  <span className="text-sm text-gray-600">{milestone.date}</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{milestone.description}</p>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    milestone.status === 'achieved' 
                      ? 'bg-green-100 text-green-800' 
                      : milestone.status === 'planned' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TractionData;