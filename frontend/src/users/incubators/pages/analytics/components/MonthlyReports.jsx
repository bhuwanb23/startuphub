import React from 'react';

const MonthlyReports = () => {
  // Mock data for monthly reports
  const reports = [
    { id: 1, month: 'June 2025', startups: 6, avgScore: 72.8, growth: '+17.1%', status: 'published' },
    { id: 2, month: 'May 2025', startups: 6, avgScore: 68.5, growth: '+14.2%', status: 'published' },
    { id: 3, month: 'April 2025', startups: 6, avgScore: 64.2, growth: '+12.5%', status: 'published' },
    { id: 4, month: 'March 2025', startups: 6, avgScore: 60.5, growth: '+10.8%', status: 'published' },
    { id: 5, month: 'February 2025', startups: 6, avgScore: 57.2, growth: '+9.3%', status: 'published' },
    { id: 6, month: 'January 2025', startups: 6, avgScore: 54.0, growth: '+7.5%', status: 'published' }
  ];

  const currentReport = reports[0];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Monthly Reports</h1>
            <p className="text-gray-600">Comprehensive progress reports with PDF previews</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]">
              <option>June 2025</option>
              <option>May 2025</option>
              <option>April 2025</option>
            </select>
            <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
              Generate New Report
            </button>
          </div>
        </div>
        
        {/* Current Report Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-[#FF6A00] to-[#FFA500] rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Report Month</h3>
            <p className="text-2xl font-bold">{currentReport.month}</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Avg. Score</h3>
            <p className="text-2xl font-bold">{currentReport.avgScore}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Cohort Growth</h3>
            <p className="text-2xl font-bold">{currentReport.growth}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Startups</h3>
            <p className="text-2xl font-bold">{currentReport.startups}</p>
          </div>
        </div>
        
        {/* Report Preview */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Report Preview</h2>
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-gray-100 p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800">{currentReport.month} Progress Report</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Executive Summary</h4>
                  <p className="text-gray-600 mb-4">
                    The {currentReport.month} cohort showed significant progress with an average score of {currentReport.avgScore} 
                    and {currentReport.growth} growth compared to last month. All {currentReport.startups} startups in the cohort 
                    demonstrated positive momentum.
                  </p>
                  
                  <h4 className="font-bold text-gray-800 mb-3">Key Highlights</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#FF6A00] rounded-full mt-2 mr-3"></div>
                      <span>HealthTrack achieved the highest score of 88</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#FF6A00] rounded-full mt-2 mr-3"></div>
                      <span>Investor interest increased by 12% across the cohort</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#FF6A00] rounded-full mt-2 mr-3"></div>
                      <span>Mentor engagement reached record levels</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#FF6A00] rounded-full mt-2 mr-3"></div>
                      <span>New product features launched by 4 startups</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Cohort Average Score</span>
                        <span className="font-medium">{currentReport.avgScore}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#FF6A00] h-2 rounded-full" 
                          style={{ width: `${currentReport.avgScore}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Mentor Engagement</span>
                        <span className="font-medium">84.6</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#4A90E2] h-2 rounded-full" 
                          style={{ width: '84.6%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Investor Interest</span>
                        <span className="font-medium">92</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#50C878] h-2 rounded-full" 
                          style={{ width: '92%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-gray-800 mt-6 mb-3">Recommendations</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <span>Increase mentor support for lower-performing startups</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <span>Organize investor networking events</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <span>Schedule product showcase workshop</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Report Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="bg-[#FF6A00] text-white px-6 py-3 rounded-lg hover:bg-[#e05500] transition-colors flex items-center">
            <span className="mr-2">📄</span>
            Download PDF Report
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <span className="mr-2">📤</span>
            Share with Stakeholders
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <span className="mr-2">📊</span>
            View Detailed Analytics
          </button>
        </div>
        
        {/* Previous Reports */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Previous Reports</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Month</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Startups</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Avg. Score</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Growth</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">{report.month}</td>
                    <td className="py-4 px-4">{report.startups}</td>
                    <td className="py-4 px-4">{report.avgScore}</td>
                    <td className="py-4 px-4">
                      <span className="text-green-600 font-medium">{report.growth}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {report.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                          View
                        </button>
                        <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                          Download
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
    </div>
  );
};

export default MonthlyReports;