import React from 'react';

const Insights = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Research Market Insights Hub</h1>
        <p className="text-gray-600">Stay informed about market trends, commercialization opportunities, and industry demands</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Market Trend Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800">AI in Healthcare</h3>
                  <span className="text-green-500 font-bold">↗ 12%</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">Growing demand for AI-powered diagnostic tools and personalized treatment platforms.</p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Market Potential</span>
                    <span>High</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-[#FF6A00] h-1.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800">Quantum Computing</h3>
                  <span className="text-green-500 font-bold">↗ 28%</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">Rapid adoption in cybersecurity, financial modeling, and drug discovery.</p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Market Potential</span>
                    <span>Very High</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-[#FF6A00] h-1.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Commercialization Opportunities</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technology</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Readiness</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partnership Interest</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Neural Interface Chips</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Beta
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Patent Pending</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 font-medium">High</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bioengineered Materials</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Ready
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Patented</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 font-medium">Very High</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Industry News</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                <h3 className="font-medium text-gray-800">TechCorp Announces Quantum Partnership</h3>
                <p className="text-gray-600 text-sm mt-1">Major tech company partners with university for quantum research lab.</p>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <div className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                <h3 className="font-medium text-gray-800">$50M VC Fund for Biotech Startups</h3>
                <p className="text-gray-600 text-sm mt-1">New venture capital fund focuses on early-stage biotechnology companies.</p>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Assess Commercialization Potential
              </button>
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Market Research Reports
              </button>
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Industry Connection Requests
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;