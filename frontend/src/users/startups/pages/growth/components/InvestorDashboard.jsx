import React, { useState } from 'react';

const InvestorDashboard = () => {
  const [timeRange, setTimeRange] = useState('12months');
  
  // Mock data for KPIs
  const kpis = [
    {
      id: 1,
      title: 'Monthly Recurring Revenue',
      value: '$124K',
      change: '+12.5%',
      trend: 'up',
      icon: '💰',
    },
    {
      id: 2,
      title: 'Annual Recurring Revenue',
      value: '$1.49M',
      change: '+15.2%',
      trend: 'up',
      icon: '📊',
    },
    {
      id: 3,
      title: 'Customer Acquisition Cost',
      value: '$85',
      change: '-8.3%',
      trend: 'down',
      icon: '👥',
    },
    {
      id: 4,
      title: 'Customer Lifetime Value',
      value: '$2,450',
      change: '+5.7%',
      trend: 'up',
      icon: '💼',
    },
  ];

  // Mock data for revenue chart
  const revenueData = [
    { month: 'Jan', revenue: 85000, target: 90000 },
    { month: 'Feb', revenue: 92000, target: 95000 },
    { month: 'Mar', revenue: 105000, target: 100000 },
    { month: 'Apr', revenue: 118000, target: 110000 },
    { month: 'May', revenue: 125000, target: 120000 },
    { month: 'Jun', revenue: 132000, target: 125000 },
  ];

  // Mock data for funding rounds
  const fundingRounds = [
    {
      id: 1,
      round: 'Seed Round',
      amount: '$1.2M',
      date: 'Jan 2024',
      investors: ['Venture Capital A', 'Angel Investor B'],
      status: 'Closed',
    },
    {
      id: 2,
      round: 'Series A',
      amount: '$5M',
      date: 'Planned Q3 2024',
      investors: ['Venture Capital C', 'Venture Capital D'],
      status: 'Planning',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Investor-Ready Dashboard</h1>
        <p className="text-gray-600 mt-1">Key metrics and financial performance for investor presentations</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Investor Insight</h2>
            <p className="text-gray-700 mt-1">
              Your ARR growth of 15.2% exceeds industry benchmarks by 22%. CAC reduction indicates improved marketing efficiency. 
              Current LTV:CAC ratio of 28.8:1 is attractive to Series A investors.
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-2xl mb-2">{kpi.icon}</div>
                <h3 className="text-gray-600 text-sm">{kpi.title}</h3>
                <div className="mt-1">
                  <span className="text-2xl font-bold text-gray-800">{kpi.value}</span>
                </div>
              </div>
              <div className={`flex items-center text-sm font-medium ${
                kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.change}
                {kpi.trend === 'up' ? ' ↑' : ' ↓'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Revenue Performance</h2>
        <div className="h-80 relative">
          {/* Simplified chart representation */}
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
            {revenueData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1 mx-1">
                <div className="flex items-end justify-center h-64 w-full">
                  <div 
                    className="w-3/4 bg-[#FF6A00] mx-1 rounded-t hover:bg-[#e05500] transition-colors"
                    style={{ height: `${(data.revenue / 150000) * 256}px` }}
                    title={`Revenue: $${data.revenue.toLocaleString()}`}
                  ></div>
                  <div 
                    className="w-3/4 bg-gray-300 mx-1 rounded-t"
                    style={{ height: `${(data.target / 150000) * 256}px` }}
                    title={`Target: $${data.target.toLocaleString()}`}
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
                <div className="w-3 h-3 bg-[#FF6A00] rounded mr-2"></div>
                <span className="text-xs">Actual Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded mr-2"></div>
                <span className="text-xs">Target Revenue</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Funding Rounds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Funding Rounds</h2>
          <div className="space-y-4">
            {fundingRounds.map((round) => (
              <div key={round.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">{round.round}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    round.status === 'Closed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {round.status}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-xl font-bold text-[#FF6A00]">{round.amount}</span>
                  <span className="text-gray-600 ml-2">{round.date}</span>
                </div>
                <div className="mt-3">
                  <h4 className="text-sm font-semibold text-gray-700">Key Investors</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {round.investors.map((investor, index) => (
                      <span key={index} className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                        {investor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Key Investor Metrics</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between">
                <span className="font-medium text-blue-800">LTV:CAC Ratio</span>
                <span className="font-bold text-blue-800">28.8:1</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">Industry benchmark: 3:1. Your ratio indicates strong customer value.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex justify-between">
                <span className="font-medium text-green-800">Churn Rate</span>
                <span className="font-bold text-green-800">2.1%</span>
              </div>
              <p className="text-sm text-green-700 mt-1">Monthly churn rate. Target: Below 2.5%. You're performing well.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex justify-between">
                <span className="font-medium text-purple-800">Net Dollar Retention</span>
                <span className="font-bold text-purple-800">118%</span>
              </div>
              <p className="text-sm text-purple-700 mt-1">Above 100% indicates strong expansion revenue from existing customers.</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex justify-between">
                <span className="font-medium text-orange-800">Quick Ratio</span>
                <span className="font-bold text-orange-800">4.2</span>
              </div>
              <p className="text-sm text-orange-700 mt-1">New MRR growth vs churn. Above 4.0 is exceptional for growth stage companies.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;