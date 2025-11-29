import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InvestorMetrics = () => {
  // Mock data for investor metrics
  const investorData = [
    { month: 'Jan', meetings: 12, lois: 8, investments: 3, interest: 65 },
    { month: 'Feb', meetings: 15, lois: 12, investments: 5, interest: 72 },
    { month: 'Mar', meetings: 18, lois: 15, investments: 7, interest: 78 },
    { month: 'Apr', meetings: 20, lois: 18, investments: 9, interest: 82 },
    { month: 'May', meetings: 22, lois: 20, investments: 12, interest: 88 },
    { month: 'Jun', meetings: 25, lois: 22, investments: 15, interest: 92 }
  ];

  const startupData = [
    { startup: 'TechNova', meetings: 8, lois: 5, investments: 2, interest: 85 },
    { startup: 'MobileGenius', meetings: 6, lois: 4, investments: 1, interest: 78 },
    { startup: 'EcomPro', meetings: 4, lois: 2, investments: 0, interest: 65 },
    { startup: 'HealthTrack', meetings: 10, lois: 7, investments: 4, interest: 92 },
    { startup: 'AutoPilot', meetings: 7, lois: 5, investments: 2, interest: 80 },
    { startup: 'GreenEnergy', meetings: 5, lois: 3, investments: 1, interest: 72 }
  ];

  const investorTypes = [
    { type: 'Angel Investors', count: 15, avgInvestment: '$125K', participation: 45 },
    { type: 'Venture Capital', count: 8, avgInvestment: '$750K', participation: 30 },
    { type: 'Corporate VCs', count: 5, avgInvestment: '$1.2M', participation: 15 },
    { type: 'Family Offices', count: 7, avgInvestment: '$300K', participation: 10 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Investor Interaction Metrics</h1>
            <p className="text-gray-600">Timeline of investor meetings, LOIs, and interest levels</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]">
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Last 12 Months</option>
            </select>
            <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
              Export Data
            </button>
          </div>
        </div>
        
        {/* Investor Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-[#FF6A00] to-[#FFA500] rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Total Meetings</h3>
            <p className="text-2xl font-bold">90</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">LOIs Received</h3>
            <p className="text-2xl font-bold">70</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Investments Closed</h3>
            <p className="text-2xl font-bold">32</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Avg. Interest Level</h3>
            <p className="text-2xl font-bold">81%</p>
          </div>
        </div>
        
        {/* Investor Interactions Over Time */}
        <div className="bg-gray-50 rounded-2xl p-5 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Investor Interactions Over Time</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={investorData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="meetings" name="Meetings" stroke="#FF6A00" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="lois" name="LOIs" stroke="#4A90E2" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="investments" name="Investments" stroke="#50C878" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="interest" name="Interest Level (%)" stroke="#9B59B6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Startup Investor Metrics */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Startup Investor Metrics</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Startup</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Meetings</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">LOIs</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Investments</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Interest Level</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Funding Stage</th>
                </tr>
              </thead>
              <tbody>
                {startupData.map((startup, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">{startup.startup}</td>
                    <td className="py-4 px-4">{startup.meetings}</td>
                    <td className="py-4 px-4">{startup.lois}</td>
                    <td className="py-4 px-4">{startup.investments}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="mr-2">{startup.interest}%</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#FF6A00] h-2 rounded-full" 
                            style={{ width: `${startup.interest}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        startup.interest >= 90 ? 'bg-green-100 text-green-800' :
                        startup.interest >= 80 ? 'bg-blue-100 text-blue-800' :
                        startup.interest >= 70 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {startup.interest >= 90 ? 'Series A Ready' :
                         startup.interest >= 80 ? 'Seed Ready' :
                         startup.interest >= 70 ? 'Pre-Seed' : 'Early Stage'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Investor Type Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Investor Type Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={investorTypes}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Number of Investors" fill="#FF6A00" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Investor Participation</h2>
            <div className="space-y-4">
              {investorTypes.map((type, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-800">{type.type}</span>
                    <span className="font-medium text-[#FF6A00]">{type.participation}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-[#FF6A00]" 
                      style={{ width: `${type.participation}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{type.count} investors</span>
                    <span>Avg: {type.avgInvestment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Investment Pipeline */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Investment Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border border-gray-200 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-800 mb-1">15</div>
              <div className="text-sm text-gray-600">Initial Outreach</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
              <div className="text-sm text-gray-600">Meetings Scheduled</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">8</div>
              <div className="text-sm text-gray-600">LOIs Signed</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">5</div>
              <div className="text-sm text-gray-600">Investments Closed</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '62.5%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorMetrics;