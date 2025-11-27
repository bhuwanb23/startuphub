import React, { useState } from 'react';

const DomainImpactHeatmap = () => {
  const [timeFilter, setTimeFilter] = useState('last-month');

  const domains = [
    { name: 'AI/ML', impact: 92, color: 'bg-orange-600' },
    { name: 'HealthTech', impact: 85, color: 'bg-orange-500' },
    { name: 'FinTech', impact: 78, color: 'bg-orange-400' },
    { name: 'AgriTech', impact: 70, color: 'bg-orange-300' },
    { name: 'DeepTech', impact: 88, color: 'bg-orange-500' }
  ];

  const heatmapData = [
    { domain: 'AI/ML', week1: 85, week2: 90, week3: 88, week4: 92 },
    { domain: 'HealthTech', week1: 78, week2: 82, week3: 85, week4: 85 },
    { domain: 'FinTech', week1: 70, week2: 75, week3: 78, week4: 78 },
    { domain: 'AgriTech', week1: 65, week2: 68, week3: 70, week4: 70 },
    { domain: 'DeepTech', week1: 80, week2: 85, week3: 88, week4: 88 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Domain Impact Heatmap</h2>
        <div className="flex space-x-2">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00] text-sm"
          >
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="last-quarter">Last Quarter</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-[#FFF9F0] rounded-xl p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Impact Distribution</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week 1</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week 2</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week 3</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week 4</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {heatmapData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.domain}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className={`w-16 h-8 rounded flex items-center justify-center text-white text-xs font-medium ${
                        row.week1 >= 90 ? 'bg-orange-600' : 
                        row.week1 >= 80 ? 'bg-orange-500' : 
                        row.week1 >= 70 ? 'bg-orange-400' : 'bg-orange-300'
                      }`}>
                        {row.week1}%
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className={`w-16 h-8 rounded flex items-center justify-center text-white text-xs font-medium ${
                        row.week2 >= 90 ? 'bg-orange-600' : 
                        row.week2 >= 80 ? 'bg-orange-500' : 
                        row.week2 >= 70 ? 'bg-orange-400' : 'bg-orange-300'
                      }`}>
                        {row.week2}%
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className={`w-16 h-8 rounded flex items-center justify-center text-white text-xs font-medium ${
                        row.week3 >= 90 ? 'bg-orange-600' : 
                        row.week3 >= 80 ? 'bg-orange-500' : 
                        row.week3 >= 70 ? 'bg-orange-400' : 'bg-orange-300'
                      }`}>
                        {row.week3}%
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className={`w-16 h-8 rounded flex items-center justify-center text-white text-xs font-medium ${
                        row.week4 >= 90 ? 'bg-orange-600' : 
                        row.week4 >= 80 ? 'bg-orange-500' : 
                        row.week4 >= 70 ? 'bg-orange-400' : 'bg-orange-300'
                      }`}>
                        {row.week4}%
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {Math.round((row.week1 + row.week2 + row.week3 + row.week4) / 4)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#FFF9F0] rounded-xl p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Overall Impact</h3>
          <div className="space-y-4">
            {domains.map((domain, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{domain.name}</span>
                  <span className="text-sm font-medium text-gray-800">{domain.impact}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${domain.color}`}
                    style={{ width: `${domain.impact}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Impact Legend</h4>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-600 rounded mr-1"></div>
                <span className="text-xs text-gray-600">90%+</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded mr-1"></div>
                <span className="text-xs text-gray-600">80-89%</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-400 rounded mr-1"></div>
                <span className="text-xs text-gray-600">70-79%</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-300 rounded mr-1"></div>
                <span className="text-xs text-gray-600">{'<'}70%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Impact Trends</h3>
        <div className="h-64 flex items-end justify-between pt-8">
          {domains.map((domain, index) => (
            <div key={index} className="flex flex-col items-center flex-1 mx-1">
              <div className="text-gray-600 text-xs mb-2">{domain.name}</div>
              <div
                className={`w-12 rounded-t-md transition-all duration-500 ${domain.color}`}
                style={{ height: `${domain.impact * 0.8}%` }}
              ></div>
              <div className="text-xs text-gray-600 mt-2">{domain.impact}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DomainImpactHeatmap;