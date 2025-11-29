import React from 'react';

const ExportOptions = () => {
  const exportOptions = [
    {
      id: 1,
      title: 'Full Dataset Export',
      description: 'Complete raw data in various formats',
      formats: ['CSV', 'Excel', 'JSON'],
      icon: '📊'
    },
    {
      id: 2,
      title: 'Performance Reports',
      description: 'Formatted reports with charts and summaries',
      formats: ['PDF', 'Word', 'HTML'],
      icon: '📈'
    },
    {
      id: 3,
      title: 'Startup Profiles',
      description: 'Individual startup data sheets',
      formats: ['PDF', 'Word'],
      icon: '🏢'
    },
    {
      id: 4,
      title: 'Cohort Analysis',
      description: 'Comparative cohort performance data',
      formats: ['PDF', 'Excel', 'CSV'],
      icon: '👥'
    },
    {
      id: 5,
      title: 'KPI Dashboards',
      description: 'Interactive dashboard snapshots',
      formats: ['PDF', 'PNG', 'PowerPoint'],
      icon: '📋'
    },
    {
      id: 6,
      title: 'Investor Portfolios',
      description: 'Investment-ready startup portfolios',
      formats: ['PDF', 'Excel', 'CSV'],
      icon: '💼'
    }
  ];

  const recentExports = [
    { id: 1, name: 'June_2025_Performance_Report.pdf', date: '2025-06-15', size: '2.4 MB' },
    { id: 2, name: 'Startup_Data_Export.csv', date: '2025-06-14', size: '1.8 MB' },
    { id: 3, name: 'Cohort_Analysis_June.xlsx', date: '2025-06-12', size: '3.1 MB' },
    { id: 4, name: 'Investor_Portfolio.pdf', date: '2025-06-10', size: '4.2 MB' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Export Options</h1>
            <p className="text-gray-600">Export data in various formats for sharing and analysis</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
              Export All Data
            </button>
          </div>
        </div>
        
        {/* Export Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {exportOptions.map((option) => (
            <div key={option.id} className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">{option.icon}</div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">{option.title}</h2>
              <p className="text-gray-600 mb-4">{option.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {option.formats.map((format, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {format}
                  </span>
                ))}
              </div>
              
              <button className="w-full bg-[#FF6A00] text-white py-2 rounded-lg hover:bg-[#e05500] transition-colors">
                Export {option.title}
              </button>
            </div>
          ))}
        </div>
        
        {/* Advanced Export Options */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Advanced Export Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                />
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Filters
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]">
                <option>All Data</option>
                <option>Performance Metrics Only</option>
                <option>Financial Data Only</option>
                <option>Startup Profiles Only</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Export Format
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]">
                <option>CSV</option>
                <option>Excel (.xlsx)</option>
                <option>JSON</option>
                <option>PDF</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
              Export with Filters
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Schedule Regular Exports
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Create Export Template
            </button>
          </div>
        </div>
        
        {/* Recent Exports */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Exports</h2>
            <button className="text-[#FF6A00] text-sm font-medium">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">File Name</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Size</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentExports.map((exportItem) => (
                  <tr key={exportItem.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">{exportItem.name}</td>
                    <td className="py-4 px-4 text-gray-600">{exportItem.date}</td>
                    <td className="py-4 px-4 text-gray-600">{exportItem.size}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-3">
                        <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                          Download
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                          Share
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Export Tips */}
      <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF2DC] rounded-2xl p-6 border border-[#FF6A00]">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Export Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-bold text-gray-800 mb-2">Data Freshness</h3>
            <p className="text-sm text-gray-600">Exports contain data up to the last full day. For real-time data, use live dashboards.</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-bold text-gray-800 mb-2">File Sizes</h3>
            <p className="text-sm text-gray-600">Large datasets may take time to generate. You'll receive a notification when ready.</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <h3 className="font-bold text-gray-800 mb-2">Scheduled Exports</h3>
            <p className="text-sm text-gray-600">Set up automated exports to receive regular data updates via email.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;