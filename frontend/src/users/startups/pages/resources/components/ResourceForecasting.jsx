import React, { useState } from 'react';

const ResourceForecasting = () => {
  const [forecastData] = useState({
    teamGrowth: [
      { month: 'Jan 2024', count: 8, forecast: 8 },
      { month: 'Feb 2024', count: 8, forecast: 9 },
      { month: 'Mar 2024', count: 8, forecast: 10 },
      { month: 'Apr 2024', count: 8, forecast: 12 },
      { month: 'May 2024', count: 8, forecast: 14 },
      { month: 'Jun 2024', count: 8, forecast: 16 },
      { month: 'Jul 2024', count: 8, forecast: 18 },
      { month: 'Aug 2024', count: 8, forecast: 21 },
      { month: 'Sep 2024', count: 8, forecast: 24 },
      { month: 'Oct 2024', count: 8, forecast: 27 },
      { month: 'Nov 2024', count: 8, forecast: 30 },
      { month: 'Dec 2024', count: 8, forecast: 34 },
    ],
    budgetAllocation: [
      { category: 'Engineering', current: 45, forecast: 50 },
      { category: 'Marketing', current: 20, forecast: 25 },
      { category: 'Sales', current: 15, forecast: 20 },
      { category: 'Operations', current: 10, forecast: 8 },
      { category: 'Leadership', current: 10, forecast: 7 },
    ],
    infrastructure: [
      { resource: 'Cloud Compute', current: 2000, forecast: 4500 },
      { resource: 'Storage (TB)', current: 50, forecast: 120 },
      { resource: 'Bandwidth (TB)', current: 100, forecast: 250 },
      { resource: 'API Calls (Millions)', current: 5, forecast: 15 },
    ],
  });

  const [timeRange, setTimeRange] = useState('12months');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Resource Forecasting</h1>
        <p className="text-gray-600 mt-1">AI-powered predictions for team, budget, and infrastructure needs</p>
      </div>

      {/* AI Recommendation Summary */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Forecast Insights</h2>
            <p className="text-gray-700 mt-1">
              Based on your growth trajectory and product roadmap, we predict you'll need to scale your team 
              by 325% and infrastructure by 400% over the next 12 months to meet projected demand.
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

      {/* Team Growth Forecast */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Team Growth Forecast</h2>
        <div className="h-64 flex items-end justify-between pt-8 border-t border-gray-200">
          {forecastData.teamGrowth.map((data, index) => (
            <div key={index} className="flex flex-col items-center flex-1 px-1">
              <div className="flex items-end justify-center h-40 w-full relative">
                {/* Current (if available) */}
                {data.count > 0 && (
                  <div 
                    className="w-3/4 bg-blue-500 mx-px rounded-t absolute"
                    style={{ 
                      height: `${(data.count / 40) * 100}%`,
                      left: '25%',
                      zIndex: 10
                    }}
                    title={`Current: ${data.count}`}
                  ></div>
                )}
                {/* Forecast */}
                <div 
                  className="w-3/4 bg-gradient-to-t from-[#FF8C42] to-[#FF6A00] mx-px rounded-t absolute"
                  style={{ 
                    height: `${(data.forecast / 40) * 100}%`,
                    left: '25%'
                  }}
                  title={`Forecast: ${data.forecast}`}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">{data.month}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8 space-x-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Current</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] rounded mr-2"></div>
            <span className="text-sm text-gray-600">Forecast</span>
          </div>
        </div>
      </div>

      {/* Budget Allocation Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Budget Allocation Forecast</h2>
          <div className="space-y-4">
            {forecastData.budgetAllocation.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-800">{item.category}</span>
                  <span className="text-gray-600">
                    {item.current}% → {item.forecast}%
                  </span>
                </div>
                <div className="mt-1 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    {/* Current allocation */}
                    <div 
                      className="h-2 bg-blue-500 rounded-l-full absolute"
                      style={{ 
                        width: `${item.current}%`,
                        maxWidth: '50%'
                      }}
                    ></div>
                    {/* Forecast allocation */}
                    <div 
                      className="h-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] rounded-full"
                      style={{ width: `${item.forecast}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure Forecast */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Infrastructure Forecast</h2>
          <div className="space-y-4">
            {forecastData.infrastructure.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-800">{item.resource}</span>
                  <span className="text-gray-600">
                    {item.current} → {item.forecast}
                  </span>
                </div>
                <div className="mt-1 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] rounded-full"
                      style={{ width: `${Math.min((item.forecast / (item.forecast * 1.5)) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Growth: {Math.round(((item.forecast - item.current) / item.current) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Planning Recommendations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Planning Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                👥
              </div>
              <h3 className="font-medium text-gray-800">Hiring Plan</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Begin recruiting for 3 engineering roles and 1 sales role in Q2 to meet growth targets.
            </p>
            <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
              View Hiring Plan
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                💰
              </div>
              <h3 className="font-medium text-gray-800">Budget Planning</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Allocate 25% more budget to engineering and consider raising Series A to support growth.
            </p>
            <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
              View Budget Plan
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                ☁️
              </div>
              <h3 className="font-medium text-gray-800">Infrastructure Scaling</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Upgrade cloud infrastructure and implement auto-scaling to handle projected load.
            </p>
            <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
              View Scaling Plan
            </button>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Risk Assessment</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-800">Team Scaling Risk</h3>
              <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Medium</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Rapid team growth may impact culture and productivity. Recommend implementing 
              structured onboarding and mentorship programs.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-800">Budget Overrun Risk</h3>
              <span className="text-sm px-2 py-1 bg-red-100 text-red-800 rounded-full">High</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Infrastructure costs are projected to exceed budget by 35%. Consider optimizing 
              resource usage and negotiating better rates with providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceForecasting;