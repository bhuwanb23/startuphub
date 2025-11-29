import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CohortPerformance = () => {
  // Mock data for cohort performance
  const cohortData = [
    { week: 'Week 1', techNova: 65, mobileGenius: 58, ecomPro: 52, healthTrack: 72, autoPilot: 60, greenEnergy: 55 },
    { week: 'Week 2', techNova: 68, mobileGenius: 62, ecomPro: 55, healthTrack: 75, autoPilot: 63, greenEnergy: 58 },
    { week: 'Week 3', techNova: 72, mobileGenius: 65, ecomPro: 58, healthTrack: 78, autoPilot: 66, greenEnergy: 62 },
    { week: 'Week 4', techNova: 75, mobileGenius: 68, ecomPro: 62, healthTrack: 82, autoPilot: 70, greenEnergy: 65 },
    { week: 'Week 5', techNova: 78, mobileGenius: 72, ecomPro: 65, healthTrack: 85, autoPilot: 73, greenEnergy: 68 },
    { week: 'Week 6', techNova: 82, mobileGenius: 75, ecomPro: 68, healthTrack: 88, autoPilot: 76, greenEnergy: 72 }
  ];

  const startupAverages = [
    { startup: 'TechNova', avgScore: 75.5, growth: '+18.5%' },
    { startup: 'MobileGenius', avgScore: 67.5, growth: '+15.2%' },
    { startup: 'EcomPro', avgScore: 60.5, growth: '+12.8%' },
    { startup: 'HealthTrack', avgScore: 81.0, growth: '+22.1%' },
    { startup: 'AutoPilot', avgScore: 69.5, growth: '+16.7%' },
    { startup: 'GreenEnergy', avgScore: 63.5, growth: '+13.4%' }
  ];

  const kpiComparison = [
    { kpi: 'Traction', techNova: 85, mobileGenius: 78, ecomPro: 72, healthTrack: 92, autoPilot: 80, greenEnergy: 75 },
    { kpi: 'Revenue', techNova: 82, mobileGenius: 75, ecomPro: 68, healthTrack: 88, autoPilot: 78, greenEnergy: 72 },
    { kpi: 'User Growth', techNova: 78, mobileGenius: 72, ecomPro: 65, healthTrack: 85, autoPilot: 75, greenEnergy: 68 },
    { kpi: 'Product Maturity', techNova: 80, mobileGenius: 74, ecomPro: 67, healthTrack: 87, autoPilot: 76, greenEnergy: 70 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Cohort Performance Analytics</h1>
            <p className="text-gray-600">Comparative analysis of startup performance within cohort</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]">
              <option>Batch Alpha 2025</option>
              <option>Batch Beta 2025</option>
              <option>Batch Gamma 2024</option>
            </select>
            <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
              Export Report
            </button>
          </div>
        </div>
        
        {/* Cohort Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-[#FF6A00] to-[#FFA500] rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Avg. Cohort Score</h3>
            <p className="text-2xl font-bold">72.8</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Top Performer</h3>
            <p className="text-2xl font-bold">HealthTrack</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Avg. Growth Rate</h3>
            <p className="text-2xl font-bold">+17.1%</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Cohort Size</h3>
            <p className="text-2xl font-bold">6 Startups</p>
          </div>
        </div>
        
        {/* Performance Over Time Chart */}
        <div className="bg-gray-50 rounded-2xl p-5 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Performance Over Time</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={cohortData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="techNova" name="TechNova" stroke="#FF6A00" strokeWidth={2} />
                <Line type="monotone" dataKey="mobileGenius" name="MobileGenius" stroke="#4A90E2" strokeWidth={2} />
                <Line type="monotone" dataKey="ec omPro" name="EcomPro" stroke="#50C878" strokeWidth={2} />
                <Line type="monotone" dataKey="healthTrack" name="HealthTrack" stroke="#9B59B6" strokeWidth={2} />
                <Line type="monotone" dataKey="autoPilot" name="AutoPilot" stroke="#F1C40F" strokeWidth={2} />
                <Line type="monotone" dataKey="greenEnergy" name="GreenEnergy" stroke="#E67E22" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Startup Averages */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Startup Performance Averages</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Startup</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Average Score</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Growth Rate</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody>
                {startupAverages.map((startup, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">{startup.startup}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="mr-2">{startup.avgScore}</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#FF6A00] h-2 rounded-full" 
                            style={{ width: `${startup.avgScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-green-600 font-medium">{startup.growth}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        startup.avgScore >= 80 ? 'bg-green-100 text-green-800' :
                        startup.avgScore >= 70 ? 'bg-blue-100 text-blue-800' :
                        startup.avgScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {startup.avgScore >= 80 ? 'Excellent' :
                         startup.avgScore >= 70 ? 'Good' :
                         startup.avgScore >= 60 ? 'Fair' : 'Needs Attention'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* KPI Comparison Chart */}
        <div className="bg-gray-50 rounded-2xl p-5 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">KPI Comparison Across Startups</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={kpiComparison}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="kpi" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="techNova" name="TechNova" fill="#FF6A00" />
                <Bar dataKey="mobileGenius" name="MobileGenius" fill="#4A90E2" />
                <Bar dataKey="ecomPro" name="EcomPro" fill="#50C878" />
                <Bar dataKey="healthTrack" name="HealthTrack" fill="#9B59B6" />
                <Bar dataKey="autoPilot" name="AutoPilot" fill="#F1C40F" />
                <Bar dataKey="greenEnergy" name="GreenEnergy" fill="#E67E22" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Cohort Ranking */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Cohort Ranking</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-3">Top Performers</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#FF6A00] rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                  <div>
                    <h4 className="font-medium">HealthTrack</h4>
                    <p className="text-sm text-gray-600">81.0 avg score</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold mr-3">2</div>
                  <div>
                    <h4 className="font-medium">TechNova</h4>
                    <p className="text-sm text-gray-600">75.5 avg score</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center text-white font-bold mr-3">3</div>
                  <div>
                    <h4 className="font-medium">AutoPilot</h4>
                    <p className="text-sm text-gray-600">69.5 avg score</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-3">Improvement Leaders</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#FF6A00] rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                  <div>
                    <h4 className="font-medium">HealthTrack</h4>
                    <p className="text-sm text-gray-600">+22.1% growth</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold mr-3">2</div>
                  <div>
                    <h4 className="font-medium">TechNova</h4>
                    <p className="text-sm text-gray-600">+18.5% growth</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center text-white font-bold mr-3">3</div>
                  <div>
                    <h4 className="font-medium">MobileGenius</h4>
                    <p className="text-sm text-gray-600">+15.2% growth</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-3">Areas for Support</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3">!</div>
                  <div>
                    <h4 className="font-medium">EcomPro</h4>
                    <p className="text-sm text-gray-600">60.5 avg score</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3">!</div>
                  <div>
                    <h4 className="font-medium">GreenEnergy</h4>
                    <p className="text-sm text-gray-600">63.5 avg score</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-3">!</div>
                  <div>
                    <h4 className="font-medium">AutoPilot</h4>
                    <p className="text-sm text-gray-600">Needs mentor support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CohortPerformance;