import React, { useState } from 'react';

const MentorContributionAnalytics = () => {
  const [timeFilter, setTimeFilter] = useState('last-month');

  const contributionData = [
    { area: 'Tech Guidance', percentage: 25, hours: 42, color: '#FF6A00' },
    { area: 'Strategy', percentage: 20, hours: 35, color: '#FF8C42' },
    { area: 'Pitch', percentage: 15, hours: 28, color: '#FFA500' },
    { area: 'Product', percentage: 20, hours: 32, color: '#FFB347' },
    { area: 'Growth', percentage: 20, hours: 30, color: '#FFD580' }
  ];

  const totalHours = contributionData.reduce((sum, item) => sum + item.hours, 0);
  const totalSessions = 42;

  const highImpactInterventions = [
    { id: 1, title: 'Tech Architecture Overhaul', startup: 'TechFlow Inc.', impact: '95%', date: '2023-06-15' },
    { id: 2, title: 'Investor Pitch Refinement', startup: 'GreenEnergy Solutions', impact: '88%', date: '2023-06-18' },
    { id: 3, title: 'Market Entry Strategy', startup: 'HealthTrack', impact: '92%', date: '2023-06-20' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Mentor Contribution Analytics</h2>
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contribution by Area</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {contributionData.map((item, index) => {
                  const startAngle = contributionData.slice(0, index).reduce((sum, d) => sum + d.percentage, 0) * 3.6;
                  const endAngle = startAngle + item.percentage * 3.6;
                  const startRad = (startAngle - 90) * Math.PI / 180;
                  const endRad = (endAngle - 90) * Math.PI / 180;
                  const startX = 50 + 40 * Math.cos(startRad);
                  const startY = 50 + 40 * Math.sin(startRad);
                  const endX = 50 + 40 * Math.cos(endRad);
                  const endY = 50 + 40 * Math.sin(endRad);
                  const largeArcFlag = item.percentage > 50 ? 1 : 0;

                  return (
                    <path
                      key={index}
                      d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                      fill={item.color}
                      stroke="#fff"
                      strokeWidth="1"
                    />
                  );
                })}
                <circle cx="50" cy="50" r="15" fill="#fff" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#FF6A00]">{totalHours}</span>
                <span className="text-gray-600 text-sm">Total Hours</span>
              </div>
            </div>
            <div className="ml-8">
              {contributionData.map((item, index) => (
                <div key={index} className="flex items-center mb-3">
                  <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                  <div className="w-32 text-sm text-gray-700">{item.area}</div>
                  <div className="text-sm font-medium text-gray-800 ml-2">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#FFF9F0] rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Sessions</span>
                <span className="font-medium text-gray-800">{totalSessions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Session Duration</span>
                <span className="font-medium text-gray-800">58 mins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-medium text-gray-800">92%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Repeat Mentees</span>
                <span className="font-medium text-gray-800">7</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FFF9F0] rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Hours Distribution</h3>
            <div className="space-y-3">
              {contributionData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700">{item.area}</span>
                    <span className="text-sm font-medium text-gray-800">{item.hours} hrs</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${(item.hours / totalHours) * 100}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">High-Impact Interventions</h3>
          <button className="text-sm text-[#FF6A00] hover:text-[#FF8C42] font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intervention</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Startup</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {highImpactInterventions.map((intervention) => (
                <tr key={intervention.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{intervention.title}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{intervention.startup}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {intervention.impact}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{intervention.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MentorContributionAnalytics;