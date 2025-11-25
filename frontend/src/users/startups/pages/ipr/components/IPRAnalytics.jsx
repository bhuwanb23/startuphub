import React, { useState } from 'react';

const IPRAnalytics = () => {
  const [timeRange, setTimeRange] = useState('12months');
  
  // Mock data for analytics
  const patentData = {
    filed: 12,
    granted: 8,
    pending: 4,
    rejected: 2,
  };
  
  const trademarkData = {
    filed: 8,
    registered: 6,
    pending: 2,
    opposed: 1,
  };
  
  const copyrightData = {
    filed: 15,
    registered: 15,
    pending: 0,
    expired: 3,
  };
  
  const monthlyFilings = [
    { month: 'Jan', patents: 2, trademarks: 1, copyrights: 3 },
    { month: 'Feb', patents: 1, trademarks: 2, copyrights: 2 },
    { month: 'Mar', patents: 3, trademarks: 1, copyrights: 4 },
    { month: 'Apr', patents: 2, trademarks: 3, copyrights: 1 },
    { month: 'May', patents: 1, trademarks: 2, copyrights: 3 },
    { month: 'Jun', patents: 4, trademarks: 1, copyrights: 2 },
    { month: 'Jul', patents: 2, trademarks: 2, copyrights: 4 },
    { month: 'Aug', patents: 3, trademarks: 1, copyrights: 3 },
    { month: 'Sep', patents: 1, trademarks: 3, copyrights: 2 },
    { month: 'Oct', patents: 2, trademarks: 2, copyrights: 4 },
    { month: 'Nov', patents: 3, trademarks: 1, copyrights: 3 },
    { month: 'Dec', patents: 2, trademarks: 2, copyrights: 2 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">IPR Analytics</h1>
        <p className="text-gray-600 mt-1">Insights and metrics for your intellectual property portfolio</p>
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
          <button
            onClick={() => setTimeRange('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeRange === 'all'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-800">{patentData.filed}</h3>
              <p className="text-sm text-gray-600">Patents Filed</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>{patentData.granted} Granted</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span>{patentData.pending} Pending</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              <span>{patentData.rejected} Rejected</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-800">{trademarkData.filed}</h3>
              <p className="text-sm text-gray-600">Trademarks Filed</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>{trademarkData.registered} Registered</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span>{trademarkData.pending} Pending</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              <span>{trademarkData.opposed} Opposed</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-800">{copyrightData.filed}</h3>
              <p className="text-sm text-gray-600">Copyrights Filed</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>{copyrightData.registered} Registered</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
              <span>{copyrightData.expired} Expired</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filing Trends Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Filing Trends</h2>
        <div className="h-64 flex items-end justify-between pt-8 border-t border-gray-200">
          {monthlyFilings.map((data, index) => (
            <div key={index} className="flex flex-col items-center flex-1 px-1">
              <div className="flex items-end justify-center h-40 w-full">
                <div 
                  className="w-3/4 bg-blue-500 mx-px rounded-t"
                  style={{ height: `${(data.patents / 5) * 100}%` }}
                  title={`Patents: ${data.patents}`}
                ></div>
                <div 
                  className="w-3/4 bg-purple-500 mx-px rounded-t"
                  style={{ height: `${(data.trademarks / 5) * 100}%` }}
                  title={`Trademarks: ${data.trademarks}`}
                ></div>
                <div 
                  className="w-3/4 bg-green-500 mx-px rounded-t"
                  style={{ height: `${(data.copyrights / 5) * 100}%` }}
                  title={`Copyrights: ${data.copyrights}`}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">{data.month}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Patents</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Trademarks</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Copyrights</span>
          </div>
        </div>
      </div>

      {/* Success Rates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Patent Success Rate</h2>
          <div className="flex items-center justify-center h-48">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                {/* Success rate arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  strokeDasharray={`${(patentData.granted / patentData.filed) * 283} 283`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">
                  {Math.round((patentData.granted / patentData.filed) * 100)}%
                </span>
                <span className="text-sm text-gray-600">Success Rate</span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {patentData.granted} out of {patentData.filed} patents granted
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Trademark Success Rate</h2>
          <div className="flex items-center justify-center h-48">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                {/* Success rate arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="8"
                  strokeDasharray={`${(trademarkData.registered / trademarkData.filed) * 283} 283`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">
                  {Math.round((trademarkData.registered / trademarkData.filed) * 100)}%
                </span>
                <span className="text-sm text-gray-600">Success Rate</span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {trademarkData.registered} out of {trademarkData.filed} trademarks registered
            </p>
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Geographic Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">United States</span>
              <span className="text-[#FF6A00] font-bold">65%</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-[#FF6A00] rounded-full" style={{ width: '65%' }}></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">18 filings</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">European Union</span>
              <span className="text-[#FF6A00] font-bold">20%</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-[#FF6A00] rounded-full" style={{ width: '20%' }}></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">6 filings</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Other Regions</span>
              <span className="text-[#FF6A00] font-bold">15%</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-[#FF6A00] rounded-full" style={{ width: '15%' }}></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">4 filings</div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">AI Insights</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Portfolio Strength Analysis</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Your patent portfolio shows strong technical diversity with 75% of filings in emerging technologies.
                </p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Market Opportunity</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Consider expanding trademark protection in APAC markets where your brand recognition is growing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPRAnalytics;