import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MentorEngagement = () => {
  // Mock data for mentor engagement
  const engagementData = [
    { month: 'Jan', sessions: 24, hours: 48, impact: 75 },
    { month: 'Feb', sessions: 28, hours: 56, impact: 78 },
    { month: 'Mar', sessions: 32, hours: 64, impact: 82 },
    { month: 'Apr', sessions: 30, hours: 60, impact: 80 },
    { month: 'May', sessions: 35, hours: 70, impact: 85 },
    { month: 'Jun', sessions: 38, hours: 76, impact: 88 }
  ];

  const mentorData = [
    { name: 'Sarah Johnson', sessions: 42, hours: 84, startups: 5, impact: 92 },
    { name: 'Michael Chen', sessions: 38, hours: 76, startups: 4, impact: 88 },
    { name: 'David Wilson', sessions: 35, hours: 70, startups: 5, impact: 85 },
    { name: 'Emma Rodriguez', sessions: 32, hours: 64, startups: 4, impact: 82 },
    { name: 'James Miller', sessions: 28, hours: 56, startups: 3, impact: 78 }
  ];

  const sessionTypes = [
    { type: 'Business Strategy', count: 45, percentage: 35 },
    { type: 'Product Development', count: 38, percentage: 30 },
    { type: 'Market Analysis', count: 25, percentage: 20 },
    { type: 'Fundraising', count: 12, percentage: 10 },
    { type: 'Team Building', count: 8, percentage: 5 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mentor Engagement Score</h1>
            <p className="text-gray-600">Analysis of mentor involvement, sessions, hours, and impact</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]">
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Last 12 Months</option>
            </select>
            <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
              Generate Report
            </button>
          </div>
        </div>
        
        {/* Engagement Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-[#FF6A00] to-[#FFA500] rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Total Sessions</h3>
            <p className="text-2xl font-bold">197</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Total Hours</h3>
            <p className="text-2xl font-bold">394</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Avg. Impact Score</h3>
            <p className="text-2xl font-bold">84.6</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Active Mentors</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>
        
        {/* Engagement Over Time */}
        <div className="bg-gray-50 rounded-2xl p-5 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Mentor Engagement Over Time</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={engagementData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="sessions" name="Sessions" stroke="#FF6A00" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="hours" name="Hours" stroke="#4A90E2" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="impact" name="Impact Score" stroke="#50C878" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Mentor Performance */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Mentor Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Mentor</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Sessions</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Hours</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Startups</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Impact Score</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody>
                {mentorData.map((mentor, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">{mentor.name}</td>
                    <td className="py-4 px-4">{mentor.sessions}</td>
                    <td className="py-4 px-4">{mentor.hours}</td>
                    <td className="py-4 px-4">{mentor.startups}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="mr-2">{mentor.impact}</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#FF6A00] h-2 rounded-full" 
                            style={{ width: `${mentor.impact}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mentor.impact >= 90 ? 'bg-green-100 text-green-800' :
                        mentor.impact >= 80 ? 'bg-blue-100 text-blue-800' :
                        mentor.impact >= 70 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {mentor.impact >= 90 ? 'Excellent' :
                         mentor.impact >= 80 ? 'Good' :
                         mentor.impact >= 70 ? 'Fair' : 'Needs Improvement'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Session Types Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Session Types Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sessionTypes}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Number of Sessions" fill="#FF6A00" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Session Types Breakdown</h2>
            <div className="space-y-4">
              {sessionTypes.map((type, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-800">{type.type}</span>
                    <span className="font-medium text-[#FF6A00]">{type.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-[#FF6A00]" 
                      style={{ width: `${type.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{type.count} sessions</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Engagement Insights */}
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF2DC] rounded-2xl p-6 border border-[#FF6A00]">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Engagement Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-2">High Engagement</h3>
              <p className="text-sm text-gray-600">Mentors are consistently meeting with startups, with an average of 39 sessions per mentor.</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-2">Impact Correlation</h3>
              <p className="text-sm text-gray-600">Higher session frequency correlates with improved startup performance metrics.</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-2">Opportunities</h3>
              <p className="text-sm text-gray-600">Consider increasing focus on fundraising and team building sessions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorEngagement;