import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgressReports = () => {
  const [reportPeriod, setReportPeriod] = useState('monthly');
  const [selectedStartup, setSelectedStartup] = useState('all');

  // Mock data for progress reports
  const progressData = [
    { week: 'Week 1', overall: 65, milestones: 3, tasks: 12, kpi1: 70, kpi2: 60 },
    { week: 'Week 2', overall: 68, milestones: 4, tasks: 15, kpi1: 72, kpi2: 65 },
    { week: 'Week 3', overall: 72, milestones: 5, tasks: 18, kpi1: 75, kpi2: 68 },
    { week: 'Week 4', overall: 75, milestones: 6, tasks: 20, kpi1: 78, kpi2: 72 },
    { week: 'Week 5', overall: 78, milestones: 7, tasks: 22, kpi1: 80, kpi2: 75 },
    { week: 'Week 6', overall: 82, milestones: 8, tasks: 25, kpi1: 82, kpi2: 78 }
  ];

  const startupData = [
    { name: 'TechNova', progress: 85, milestones: 8, tasks: 24 },
    { name: 'MobileGenius', progress: 78, milestones: 7, tasks: 22 },
    { name: 'EcomPro', progress: 72, milestones: 6, tasks: 20 },
    { name: 'HealthTrack', progress: 88, milestones: 9, tasks: 26 },
    { name: 'AutoPilot', progress: 75, milestones: 7, tasks: 21 },
    { name: 'GreenEnergy', progress: 70, milestones: 6, tasks: 19 }
  ];

  const kpiData = [
    { name: 'Revenue Growth', value: 120 },
    { name: 'Customer Acquisition', value: 450 },
    { name: 'Product Adoption', value: 78 },
    { name: 'Team Expansion', value: 6 }
  ];

  // Colors for charts
  const COLORS = ['#FF6A00', '#FFA500', '#FFD580', '#4A90E2', '#50C878'];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Progress Auto-Reports</h1>
            <p className="text-gray-600">Automated progress reports and analytics</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
            <select
              value={selectedStartup}
              onChange={(e) => setSelectedStartup(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              <option value="all">All Startups</option>
              {startupData.map(startup => (
                <option key={startup.name} value={startup.name}>{startup.name}</option>
              ))}
            </select>
            <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors text-sm">
              Generate Report
            </button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-[#FF6A00] to-[#FFA500] rounded-2xl p-4 text-white">
            <h3 className="text-lg font-semibold mb-1">Avg. Progress</h3>
            <p className="text-2xl font-bold">76%</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
            <h3 className="text-lg font-semibold mb-1">Milestones</h3>
            <p className="text-2xl font-bold">42</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 text-white">
            <h3 className="text-lg font-semibold mb-1">Tasks Completed</h3>
            <p className="text-2xl font-bold">123</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
            <h3 className="text-lg font-semibold mb-1">KPI Score</h3>
            <p className="text-2xl font-bold">8.2/10</p>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Progress Over Time */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Progress Over Time</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={progressData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="overall" name="Overall Progress" stroke="#FF6A00" strokeWidth={2} />
                  <Line type="monotone" dataKey="kpi1" name="KPI 1" stroke="#4A90E2" strokeWidth={2} />
                  <Line type="monotone" dataKey="kpi2" name="KPI 2" stroke="#50C878" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Startup Comparison */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Startup Progress Comparison</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={startupData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="progress" name="Progress %" fill="#FF6A00" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* KPI Distribution */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">KPI Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={kpiData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {kpiData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Milestones & Tasks */}
          <div className="lg:col-span-2 bg-gray-50 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Milestones & Tasks Progress</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={progressData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="milestones" name="Milestones" fill="#4A90E2" />
                  <Bar dataKey="tasks" name="Tasks" fill="#50C878" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Detailed Data Table */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <h2 className="text-lg font-bold text-gray-800 p-5">Detailed Startup Progress</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Startup</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Progress</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Milestones</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Tasks</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">KPI Score</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {startupData.map((startup, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{startup.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="mr-2">{startup.progress}%</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#FF6A00] h-2 rounded-full" 
                            style={{ width: `${startup.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{startup.milestones}</td>
                    <td className="py-3 px-4">{startup.tasks}</td>
                    <td className="py-3 px-4">
                      <span className="font-medium">
                        {Math.round(startup.progress / 10)}/10
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        startup.progress >= 80 
                          ? 'bg-green-100 text-green-800' 
                          : startup.progress >= 60 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {startup.progress >= 80 ? 'Excellent' : startup.progress >= 60 ? 'Good' : 'Needs Attention'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Report Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Report Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
            Export as PDF
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Share Report
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Schedule Reports
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Customize Metrics
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressReports;