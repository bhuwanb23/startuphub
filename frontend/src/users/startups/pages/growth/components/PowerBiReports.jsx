import React, { useState } from 'react';

const PowerBiReports = () => {
  const [activeReport, setActiveReport] = useState('executive-summary');
  const [timeRange, setTimeRange] = useState('12months');
  
  // Mock data for Power BI reports
  const reports = [
    {
      id: 'executive-summary',
      title: 'Executive Summary Dashboard',
      description: 'High-level overview of key business metrics and KPIs',
      lastUpdated: '2024-06-15',
      views: 12400,
      favorites: 890,
    },
    {
      id: 'financial-performance',
      title: 'Financial Performance Report',
      description: 'Detailed analysis of revenue, expenses, and profitability',
      lastUpdated: '2024-06-14',
      views: 9800,
      favorites: 720,
    },
    {
      id: 'user-analytics',
      title: 'User Analytics Dashboard',
      description: 'Comprehensive user behavior and engagement metrics',
      lastUpdated: '2024-06-16',
      views: 15600,
      favorites: 1200,
    },
    {
      id: 'marketing-attribution',
      title: 'Marketing Attribution Report',
      description: 'Channel performance and ROI analysis',
      lastUpdated: '2024-06-12',
      views: 8700,
      favorites: 650,
    },
    {
      id: 'product-metrics',
      title: 'Product Usage Metrics',
      description: 'Feature adoption and product engagement analytics',
      lastUpdated: '2024-06-15',
      views: 11200,
      favorites: 980,
    },
    {
      id: 'customer-success',
      title: 'Customer Success Dashboard',
      description: 'Retention, churn, and customer health metrics',
      lastUpdated: '2024-06-13',
      views: 9300,
      favorites: 760,
    },
  ];

  // Mock data for report categories
  const categories = [
    { id: 'all', name: 'All Reports' },
    { id: 'finance', name: 'Financial' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'product', name: 'Product' },
    { id: 'operations', name: 'Operations' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Power BI Reports</h1>
        <p className="text-gray-600 mt-1">Access interactive business intelligence reports</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Report Insight</h2>
            <p className="text-gray-700 mt-1">
              Executive Summary Dashboard is your most viewed report (12,400 views). 
              User Analytics Dashboard shows strongest engagement with 15,600 views. 
              Consider creating similar interactive dashboards for underperforming areas.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === category.id
                    ? 'bg-[#FF6A00] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
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
      </div>

      {/* Report Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div 
            key={report.id} 
            className={`bg-white rounded-xl border p-6 hover:shadow-md transition-all cursor-pointer ${
              activeReport === report.id 
                ? 'border-[#FF6A00] shadow-lg' 
                : 'border-gray-200'
            }`}
            onClick={() => setActiveReport(report.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{report.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{report.description}</p>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00]">
                📊
              </div>
            </div>
            
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span>📅 Updated: {report.lastUpdated}</span>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <span>👁️ {report.views.toLocaleString()} views</span>
                <span className="mx-2">•</span>
                <span>⭐ {report.favorites.toLocaleString()} favorites</span>
              </div>
              <button className="text-[#FF6A00] hover:text-[#e05500]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </button>
            </div>
            
            <div className="mt-4">
              <button className="w-full py-2 bg-[#FFF5EB] text-[#FF6A00] rounded-lg hover:bg-[#FFE9D7] transition-colors text-sm font-medium">
                View Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Active Report Preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            {reports.find(r => r.id === activeReport)?.title || 'Report Preview'}
          </h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
              Open in Power BI
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Share
            </button>
          </div>
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-bold text-gray-800">Power BI Report Preview</h3>
            <p className="text-gray-600 mt-2">Interactive dashboard would appear here in the live application</p>
            <p className="text-sm text-gray-500 mt-1">Last updated: {reports.find(r => r.id === activeReport)?.lastUpdated || 'N/A'}</p>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-800">
              {reports.find(r => r.id === activeReport)?.views.toLocaleString() || '0'}
            </div>
            <div className="text-sm text-blue-700">Total Views</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-800">
              {reports.find(r => r.id === activeReport)?.favorites.toLocaleString() || '0'}
            </div>
            <div className="text-sm text-green-700">Favorites</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-800">
              {Math.round((reports.find(r => r.id === activeReport)?.favorites || 0) / 
                         (reports.find(r => r.id === activeReport)?.views || 1) * 100)}%
            </div>
            <div className="text-sm text-purple-700">Favorite Rate</div>
          </div>
        </div>
      </div>

      {/* Report Analytics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Report Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">24</div>
            <div className="text-sm text-gray-600">Total Reports</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">89K+</div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">6.2K+</div>
            <div className="text-sm text-gray-600">Total Favorites</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">28%</div>
            <div className="text-sm text-gray-600">Avg. Engagement</div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium text-gray-700 mb-3">Most Popular Reports</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>User Analytics Dashboard</span>
                <span>32%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-blue-500" style={{ width: '32%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Executive Summary Dashboard</span>
                <span>28%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-green-500" style={{ width: '28%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Financial Performance Report</span>
                <span>18%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-purple-500" style={{ width: '18%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerBiReports;