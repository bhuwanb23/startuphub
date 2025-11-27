import React, { useState } from 'react';

const SessionImpactMetrics = () => {
  const [timeFilter, setTimeFilter] = useState('last-month');

  const sessions = [
    { id: 1, name: 'Business Model Review', date: '2023-06-15', effectiveness: 85, engagement: 78, milestones: 3 },
    { id: 2, name: 'Technical Architecture', date: '2023-06-18', effectiveness: 92, engagement: 85, milestones: 2 },
    { id: 3, name: 'Product Demo', date: '2023-06-20', effectiveness: 76, engagement: 70, milestones: 1 },
    { id: 4, name: 'Funding Strategy', date: '2023-06-22', effectiveness: 88, engagement: 82, milestones: 4 }
  ];

  const tagInsights = [
    { tag: 'Strategy Impact', value: '+12%' },
    { tag: 'Technical Clarity', value: '+8%' },
    { tag: 'Market Positioning', value: '+15%' },
    { tag: 'Investor Readiness', value: '+20%' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Session Impact Metrics</h2>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#FFF9F0] rounded-xl p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Effectiveness Heat Map</h3>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-800">{session.name}</span>
                  <span className="text-sm text-gray-600">{session.date}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-3">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]"
                      style={{ width: `${session.effectiveness}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-[#FF6A00]">{session.effectiveness}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#FFF9F0] rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Engagement Levels</h3>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center">
                  <div className="w-32 text-sm text-gray-700 truncate">{session.name}</div>
                  <div className="flex-1 ml-3">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-[#FF6A00]"
                          style={{ width: `${session.engagement}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 ml-2 w-8">{session.engagement}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FFF9F0] rounded-xl p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Milestones Achieved</h3>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {sessions.map((session) => (
                  <div key={session.id} className="flex flex-col items-center">
                    <div className="text-xs text-gray-600 mb-1">{session.milestones}</div>
                    <div
                      className="w-8 bg-[#FF6A00] rounded-t-md transition-all duration-300"
                      style={{ height: `${session.milestones * 10}px` }}
                    ></div>
                    <div className="text-xs text-gray-600 mt-1 truncate w-16 text-center">{session.name.split(' ')[0]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Before/After Comparison</h3>
        <div className="h-64 flex items-end justify-between pt-8">
          {sessions.map((session, index) => (
            <div key={session.id} className="flex flex-col items-center flex-1 mx-1">
              <div className="text-gray-600 text-xs mb-2 text-center">{session.name.split(' ')[0]}</div>
              <div className="flex items-end h-32">
                <div
                  className="w-4 bg-gray-300 rounded-t mr-1 transition-all duration-500"
                  style={{ height: `${40 + index * 5}%` }}
                ></div>
                <div
                  className="w-4 bg-[#FF6A00] rounded-t transition-all duration-500"
                  style={{ height: `${60 + index * 8}%` }}
                ></div>
              </div>
              <div className="flex mt-2">
                <span className="text-xs text-gray-500 mx-1">B</span>
                <span className="text-xs text-gray-500 mx-1">A</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {tagInsights.map((insight, index) => (
          <div key={index} className="bg-[#FFF9F0] rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-[#FF6A00]">{insight.value}</div>
            <div className="text-sm text-gray-700">{insight.tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionImpactMetrics;