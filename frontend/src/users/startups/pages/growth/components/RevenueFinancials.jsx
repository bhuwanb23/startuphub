import React, { useState } from 'react';

const RevenueFinancials = () => {
  const [timeRange, setTimeRange] = useState('12months');
  
  // Mock data for financial metrics
  const financialMetrics = [
    {
      id: 1,
      title: 'Total Revenue',
      value: '$1.49M',
      change: '+22.5%',
      trend: 'up',
      icon: '💰',
    },
    {
      id: 2,
      title: 'Gross Profit',
      value: '$980K',
      change: '+18.3%',
      trend: 'up',
      icon: '📈',
    },
    {
      id: 3,
      title: 'Operating Expenses',
      value: '$650K',
      change: '+8.2%',
      trend: 'up',
      icon: '📊',
    },
    {
      id: 4,
      title: 'Net Profit Margin',
      value: '22.1%',
      change: '+3.7%',
      trend: 'up',
      icon: '💼',
    },
  ];

  // Mock data for revenue breakdown
  const revenueBreakdown = [
    { source: 'Subscription', amount: 1120000, percentage: 75 },
    { source: 'Professional Services', amount: 280000, percentage: 19 },
    { source: 'Consulting', amount: 90000, percentage: 6 },
  ];

  // Mock data for financial chart
  const financialData = [
    { month: 'Jan', revenue: 105000, expenses: 75000, profit: 30000 },
    { month: 'Feb', revenue: 118000, expenses: 78000, profit: 40000 },
    { month: 'Mar', revenue: 132000, expenses: 82000, profit: 50000 },
    { month: 'Apr', revenue: 145000, expenses: 85000, profit: 60000 },
    { month: 'May', revenue: 158000, expenses: 88000, profit: 70000 },
    { month: 'Jun', revenue: 172000, expenses: 90000, profit: 82000 },
  ];

  // Mock data for expense categories
  const expenseCategories = [
    { category: 'Engineering', amount: 280000, percentage: 43 },
    { category: 'Marketing', amount: 180000, percentage: 28 },
    { category: 'Sales', amount: 120000, percentage: 18 },
    { category: 'Operations', amount: 70000, percentage: 11 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Revenue & Financials</h1>
        <p className="text-gray-600 mt-1">Track revenue streams, expenses, and profitability metrics</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Financial Insight</h2>
            <p className="text-gray-700 mt-1">
              Net profit margin increased to 22.1%, exceeding industry benchmarks. Subscription revenue accounts for 75% of total revenue, 
              indicating strong recurring revenue model. Engineering costs represent largest expense category at 43%.
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

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialMetrics.map((metric) => (
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

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Financial Performance</h2>
        <div className="h-80 relative">
          {/* Simplified chart representation */}
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
            {financialData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1 mx-1">
                <div className="flex items-end justify-center h-64 w-full">
                  <div 
                    className="w-3/4 bg-[#FF6A00] mx-1 rounded-t hover:bg-[#e05500] transition-colors"
                    style={{ height: `${(data.revenue / 200000) * 256}px` }}
                    title={`Revenue: $${data.revenue.toLocaleString()}`}
                  ></div>
                  <div 
                    className="w-3/4 bg-blue-500 mx-1 rounded-t hover:bg-blue-600 transition-colors"
                    style={{ height: `${(data.expenses / 200000) * 256}px` }}
                    title={`Expenses: $${data.expenses.toLocaleString()}`}
                  ></div>
                  <div 
                    className="w-3/4 bg-green-500 mx-1 rounded-t hover:bg-green-600 transition-colors"
                    style={{ height: `${(data.profit / 200000) * 256}px` }}
                    title={`Profit: $${data.profit.toLocaleString()}`}
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
                <span className="text-xs">Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span className="text-xs">Expenses</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span className="text-xs">Profit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown and Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Revenue Breakdown</h2>
          <div className="space-y-4">
            {revenueBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.source}</span>
                  <span>${(item.amount / 1000).toFixed(0)}K ({item.percentage}%)</span>
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
            <h3 className="font-bold text-green-800">Revenue Insight</h3>
            <p className="text-sm mt-2">
              Subscription revenue dominates at 75%, providing predictable recurring income. 
              Professional services offer higher margins but are less scalable.
            </p>
          </div>
        </div>

        {/* Expense Categories */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Expense Categories</h2>
          <div className="space-y-4">
            {expenseCategories.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.category}</span>
                  <span>${(item.amount / 1000).toFixed(0)}K ({item.percentage}%)</span>
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
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-800">Expense Analysis</h3>
            <p className="text-sm mt-2">
              Engineering costs represent the largest expense at 43%. Consider optimizing resource allocation 
              to improve profitability while maintaining product quality.
            </p>
          </div>
        </div>
      </div>

      {/* Financial Ratios */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Key Financial Ratios</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#FF6A00]">3.2</div>
            <div className="text-sm text-gray-600">Gross Margin</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#FF6A00]">1.8</div>
            <div className="text-sm text-gray-600">Operating Ratio</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#FF6A00]">22.1%</div>
            <div className="text-sm text-gray-600">Net Profit Margin</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#FF6A00]">4.8</div>
            <div className="text-sm text-gray-600">Revenue Growth</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueFinancials;