import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StartupPerformance = () => {
  // Mock data for charts
  const tractionData = [
    { month: 'Jan', value: 120 },
    { month: 'Feb', value: 190 },
    { month: 'Mar', value: 150 },
    { month: 'Apr', value: 220 },
    { month: 'May', value: 280 },
    { month: 'Jun', value: 320 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 15000, users: 120 },
    { month: 'Feb', revenue: 22000, users: 190 },
    { month: 'Mar', revenue: 18000, users: 150 },
    { month: 'Apr', revenue: 30000, users: 220 },
    { month: 'May', revenue: 42000, users: 280 },
    { month: 'Jun', revenue: 55000, users: 320 }
  ];

  const startupHealth = [
    { name: 'TechNova', score: 8.2 },
    { name: 'MobileGenius', score: 7.5 },
    { name: 'EcomPro', score: 6.8 },
    { name: 'HealthTrack', score: 9.1 },
    { name: 'AutoPilot', score: 7.9 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Startup Performance Dashboard</h1>
            <p className="text-gray-600">Comprehensive analytics dashboard for startup progress tracking</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
              Generate Report
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Export Data
            </button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-[#FF6A00] to-[#FFA500] rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Avg. Traction Growth</h3>
            <p className="text-2xl font-bold">↑ 24.5%</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Revenue Growth</h3>
            <p className="text-2xl font-bold">↑ 32.1%</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">User Growth</h3>
            <p className="text-2xl font-bold">↑ 28.7%</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Health Score</h3>
            <p className="text-2xl font-bold">8.2/10</p>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Traction Growth Chart */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Traction Growth</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={tractionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" name="Traction Score" stroke="#FF6A00" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Revenue & User Growth Chart */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Revenue & User Growth</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" name="Revenue ($)" fill="#4A90E2" />
                  <Bar yAxisId="right" dataKey="users" name="Users" fill="#50C878" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Startup Health Scores */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Startup Health Scores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {startupHealth.map((startup, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl p-4 text-center hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-gray-800">{startup.name}</h3>
                <div className="mt-3 relative">
                  <div className="text-3xl font-bold text-[#FF6A00]">{startup.score}</div>
                  <div className="text-sm text-gray-500">/10</div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#FF6A00] h-2 rounded-full" 
                      style={{ width: `${startup.score * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* AI Insights */}
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF2DC] rounded-2xl p-6 border border-[#FF6A00]">
          <h2 className="text-lg font-bold text-gray-800 mb-4">AI Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-2">Growth Pattern</h3>
              <p className="text-sm text-gray-600">Startups showing consistent month-over-month growth in user acquisition.</p>
              <div className="mt-2 text-[#FF6A00] font-medium">↑ Positive Trend</div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-2">Revenue Optimization</h3>
              <p className="text-sm text-gray-600">Opportunity to increase pricing for enterprise customers.</p>
              <div className="mt-2 text-[#FF6A00] font-medium">↑ Revenue Potential</div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-2">Risk Alert</h3>
              <p className="text-sm text-gray-600">Two startups showing declining engagement metrics.</p>
              <div className="mt-2 text-red-500 font-medium">⚠️ Attention Needed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupPerformance;