import React, { useState } from 'react';

const CacLtv = () => {
  const [timeRange, setTimeRange] = useState('12months');
  
  // Mock data for CAC and LTV metrics
  const cacLtvMetrics = [
    {
      id: 1,
      title: 'Customer Acquisition Cost',
      value: '$85',
      change: '-8.3%',
      trend: 'down',
      icon: '💸',
    },
    {
      id: 2,
      title: 'Customer Lifetime Value',
      value: '$2,450',
      change: '+5.7%',
      trend: 'up',
      icon: '💎',
    },
    {
      id: 3,
      title: 'LTV:CAC Ratio',
      value: '28.8:1',
      change: '+15.2%',
      trend: 'up',
      icon: '⚖️',
    },
    {
      id: 4,
      title: 'Payback Period',
      value: '4.2 months',
      change: '-12.5%',
      trend: 'down',
      icon: '⏱️',
    },
  ];

  // Mock data for CAC breakdown
  const cacBreakdown = [
    { channel: 'Paid Advertising', amount: 35, percentage: 41 },
    { channel: 'Content Marketing', amount: 22, percentage: 26 },
    { channel: 'Sales Team', amount: 18, percentage: 21 },
    { channel: 'Referral Program', amount: 10, percentage: 12 },
  ];

  // Mock data for LTV progression
  const ltvProgression = [
    { month: 0, value: 0 },
    { month: 3, value: 450 },
    { month: 6, value: 980 },
    { month: 9, value: 1650 },
    { month: 12, value: 2450 },
  ];

  // Mock data for cohort analysis
  const cohorts = [
    { cohort: 'Q1 2024', customers: 420, cac: 92, ltv: 2100, ratio: 22.8 },
    { cohort: 'Q2 2024', customers: 580, cac: 85, ltv: 2450, ratio: 28.8 },
    { cohort: 'Q3 2024', customers: 390, cac: 78, ltv: 2680, ratio: 34.4 },
    { cohort: 'Q4 2024', customers: 280, cac: 72, ltv: 2850, ratio: 39.6 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">CAC/LTV Analysis</h1>
        <p className="text-gray-600 mt-1">Analyze customer acquisition costs and lifetime value</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI CAC/LTV Insight</h2>
            <p className="text-gray-700 mt-1">
              LTV:CAC ratio of 28.8:1 exceeds industry benchmarks (3:1), indicating efficient customer acquisition. 
              CAC decreased by 8.3% while LTV increased by 5.7%, showing improved unit economics. 
              Payback period of 4.2 months is optimal for sustainable growth.
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

      {/* CAC/LTV Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cacLtvMetrics.map((metric) => (
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
                metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.change}
                {metric.trend === 'up' ? ' ↑' : metric.trend === 'down' ? ' ↓' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CAC Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">CAC Breakdown by Channel</h2>
          <div className="space-y-4">
            {cacBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.channel}</span>
                  <span>${item.amount} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-[#FF6A00]"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-800">Channel Efficiency</h3>
            <p className="text-sm mt-2">
              Paid advertising accounts for 41% of CAC but drives highest volume. 
              Referral program has lowest CAC at $72 per customer. Optimize channel mix for cost efficiency.
            </p>
          </div>
        </div>

        {/* LTV Progression Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">LTV Progression Over Time</h2>
          <div className="h-64 relative">
            {/* Simplified line chart */}
            <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
              {ltvProgression.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-4 h-4 rounded-full bg-[#FF6A00] mb-1"
                    style={{ 
                      marginBottom: `${(data.value / 3000) * 200}px`,
                      transform: 'translateY(-50%)'
                    }}
                  ></div>
                  <div className="text-xs text-gray-500">{data.month}mo</div>
                </div>
              ))}
            </div>
            
            {/* Connect the dots with lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <polyline
                fill="none"
                stroke="#FF6A00"
                strokeWidth="2"
                points={
                  ltvProgression.map((data, index) => {
                    const x = (index / (ltvProgression.length - 1)) * 100;
                    const y = 100 - (data.value / 3000) * 100;
                    return `${x}% ${y}%`;
                  }).join(', ')
                }
              />
            </svg>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-800">LTV Growth</h3>
            <p className="text-sm mt-2">
              LTV increases significantly in first 6 months, then stabilizes. 
              Focus on retention strategies to extend customer lifetime value beyond 12 months.
            </p>
          </div>
        </div>
      </div>

      {/* Cohort Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Cohort Analysis</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cohort
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customers
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CAC
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LTV
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LTV:CAC
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cohorts.map((cohort, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cohort.cohort}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cohort.customers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${cohort.cac}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${cohort.ltv.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="font-medium text-[#FF6A00]">{cohort.ratio}:1</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-green-600">↑</span>
                      <span className="text-sm text-green-600 ml-1">
                        +{(index > 0 ? ((cohort.ratio - cohorts[index-1].ratio) / cohorts[index-1].ratio * 100).toFixed(1) : 0)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Optimization Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00] mr-3">
                1
              </div>
              <h3 className="font-bold text-gray-800">Reduce CAC Further</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Double down on referral program which has lowest CAC at $72/customer.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00] mr-3">
                2
              </div>
              <h3 className="font-bold text-gray-800">Extend Customer Lifetime</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Implement upselling strategies to increase LTV beyond current $2,450.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00] mr-3">
                3
              </div>
              <h3 className="font-bold text-gray-800">Optimize Payback Period</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Current 4.2 month payback is healthy. Target reduction to 3.5 months.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CacLtv;