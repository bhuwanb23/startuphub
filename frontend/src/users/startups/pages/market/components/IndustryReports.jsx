import React, { useState } from 'react';

const IndustryReports = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for industry reports
  const reports = [
    {
      id: 1,
      title: 'Global Startup Ecosystem Report 2025',
      category: 'Startup Ecosystem',
      date: '2025-03-15',
      pages: 124,
      downloads: 12400,
      views: 28500,
      summary: 'Comprehensive analysis of global startup ecosystems, funding trends, and regional growth patterns.',
      keyInsights: [
        'Global startup funding increased 18% YoY',
        'Asia-Pacific shows highest growth rate at 32%',
        'AI/ML startups attracted 40% of total investment'
      ],
      tags: ['Global', 'Funding', 'Growth', 'AI'],
    },
    {
      id: 2,
      title: 'Technology Innovation Trends 2025',
      category: 'Technology',
      date: '2025-02-28',
      pages: 87,
      downloads: 9800,
      views: 21500,
      summary: 'Deep dive into emerging technology trends, adoption rates, and innovation forecasts for 2025.',
      keyInsights: [
        'Quantum computing investments up 65%',
        'Edge computing adoption accelerated by 45%',
        'Sustainability tech receives record funding'
      ],
      tags: ['Innovation', 'AI', 'Quantum', 'Edge Computing'],
    },
    {
      id: 3,
      title: 'Venture Capital Investment Analysis',
      category: 'Finance',
      date: '2025-03-10',
      pages: 65,
      downloads: 7600,
      views: 18900,
      summary: 'Detailed analysis of VC investment patterns, sector preferences, and funding stage distributions.',
      keyInsights: [
        'Series A funding down 12% from previous quarter',
        'Pre-seed investments increased 28%',
        'HealthTech sector attracts 22% of total VC funding'
      ],
      tags: ['VC', 'Investment', 'Funding', 'HealthTech'],
    },
    {
      id: 4,
      title: 'Sustainability and Green Tech Market',
      category: 'Sustainability',
      date: '2025-03-05',
      pages: 92,
      downloads: 8900,
      views: 22400,
      summary: 'Market analysis of sustainability technologies, regulatory impacts, and investment opportunities.',
      keyInsights: [
        'Green tech investments reached $185B globally',
        'Carbon capture technologies show 85% YoY growth',
        'ESG compliance drives enterprise adoption'
      ],
      tags: ['Green Tech', 'Sustainability', 'ESG', 'Climate'],
    },
    {
      id: 5,
      title: 'Digital Transformation in Traditional Industries',
      category: 'Digital Transformation',
      date: '2025-02-20',
      pages: 78,
      downloads: 6500,
      views: 15600,
      summary: 'Analysis of digital transformation adoption across manufacturing, agriculture, and construction sectors.',
      keyInsights: [
        'Manufacturing digitization investments up 35%',
        'Agriculture tech adoption increased 42%',
        'Construction sector lags in digital maturity'
      ],
      tags: ['Digital', 'Manufacturing', 'Agriculture', 'Construction'],
    },
    {
      id: 6,
      title: 'Consumer Behavior and Market Trends',
      category: 'Consumer Insights',
      date: '2025-03-01',
      pages: 105,
      downloads: 11200,
      views: 26700,
      summary: 'Comprehensive study of evolving consumer behaviors, purchasing patterns, and market preferences.',
      keyInsights: [
        'Mobile-first purchasing increased 55%',
        'Subscription models show 38% growth',
        'Personalization drives 60% higher conversion rates'
      ],
      tags: ['Consumer', 'Behavior', 'E-commerce', 'Personalization'],
    },
  ];

  const categories = [
    { id: 'all', name: 'All Reports' },
    { id: 'Startup Ecosystem', name: 'Startup Ecosystem' },
    { id: 'Technology', name: 'Technology' },
    { id: 'Finance', name: 'Finance' },
    { id: 'Sustainability', name: 'Sustainability' },
    { id: 'Digital Transformation', name: 'Digital Transformation' },
    { id: 'Consumer Insights', name: 'Consumer Insights' },
  ];

  const filteredReports = reports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Industry Reports</h1>
        <p className="text-gray-600 mt-1">Access comprehensive market research and industry analysis reports</p>
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
              The Global Startup Ecosystem Report shows your region has 25% higher growth potential than global average. 
              Focus on AI/ML and Sustainability sectors for maximum ROI based on current investment trends.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reports..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
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
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <div 
            key={report.id} 
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedReport(report)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{report.title}</h3>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 mt-2">
                  {report.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">{formatDate(report.date)}</div>
              </div>
            </div>
            
            <p className="mt-3 text-gray-600 text-sm line-clamp-2">{report.summary}</p>
            
            <div className="mt-4 flex flex-wrap gap-1">
              {report.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <span>📄 {report.pages} pages</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>👁️ {report.views.toLocaleString()}</span>
                <span>⬇️ {report.downloads.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <button className="w-full py-2 bg-[#FFF5EB] text-[#FF6A00] rounded-lg hover:bg-[#FFE9D7] transition-colors text-sm font-medium">
                View Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedReport.title}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                    {selectedReport.category}
                  </span>
                  <span className="text-sm text-gray-500">{formatDate(selectedReport.date)}</span>
                  <span className="text-sm text-gray-500">📄 {selectedReport.pages} pages</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedReport(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700">{selectedReport.summary}</p>
              
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Key Insights</h3>
                <ul className="space-y-2">
                  {selectedReport.keyInsights.map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#FF6A00] mr-2">•</span>
                      <span className="text-gray-700">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedReport.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-800">{selectedReport.views.toLocaleString()}</div>
                  <div className="text-sm text-blue-700">Total Views</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-800">{selectedReport.downloads.toLocaleString()}</div>
                  <div className="text-sm text-green-700">Downloads</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-800">{Math.round((selectedReport.downloads / selectedReport.views) * 100)}%</div>
                  <div className="text-sm text-purple-700">Download Rate</div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="px-6 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors font-medium">
                  Download PDF
                </button>
                <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Share Report
                </button>
                <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Analytics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Report Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">42</div>
            <div className="text-sm text-gray-600">Total Reports</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">125K+</div>
            <div className="text-sm text-gray-600">Total Downloads</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">285K+</div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">32%</div>
            <div className="text-sm text-gray-600">Avg. Download Rate</div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium text-gray-700 mb-3">Most Popular Categories</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Technology</span>
                <span>35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-blue-500" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Startup Ecosystem</span>
                <span>28%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-green-500" style={{ width: '28%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Sustainability</span>
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

export default IndustryReports;