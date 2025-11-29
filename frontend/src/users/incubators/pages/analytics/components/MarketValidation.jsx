import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MarketValidation = () => {
  // Mock data for market validation
  const validationData = [
    { startup: 'TechNova', surveys: 120, pilots: 8, lois: 5, adoption: 45, evidenceScore: 85 },
    { startup: 'MobileGenius', surveys: 95, pilots: 6, lois: 3, adoption: 32, evidenceScore: 72 },
    { startup: 'EcomPro', surveys: 80, pilots: 4, lois: 2, adoption: 28, evidenceScore: 65 },
    { startup: 'HealthTrack', surveys: 150, pilots: 12, lois: 8, adoption: 68, evidenceScore: 92 },
    { startup: 'AutoPilot', surveys: 110, pilots: 7, lois: 4, adoption: 42, evidenceScore: 78 },
    { startup: 'GreenEnergy', surveys: 90, pilots: 5, lois: 3, adoption: 35, evidenceScore: 70 }
  ];

  const evidenceTypes = [
    { type: 'Customer Surveys', weight: 30, description: 'Quantitative feedback from potential customers' },
    { type: 'Pilot Programs', weight: 25, description: 'Small-scale implementations with real users' },
    { type: 'Letters of Intent', weight: 20, description: 'Written commitments from potential customers' },
    { type: 'Early Adoption', weight: 25, description: 'Actual usage and payment by early customers' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Market Validation Score</h1>
            <p className="text-gray-600">Evidence-based market validation metrics and confidence levels</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]">
              <option>All Startups</option>
              <option>TechNova</option>
              <option>MobileGenius</option>
              <option>HealthTrack</option>
            </select>
            <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
              Generate Report
            </button>
          </div>
        </div>
        
        {/* Market Validation Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-[#FF6A00] to-[#FFA500] rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Avg. Evidence Score</h3>
            <p className="text-2xl font-bold">77/100</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">High Confidence</h3>
            <p className="text-2xl font-bold">3 Startups</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Medium Confidence</h3>
            <p className="text-2xl font-bold">2 Startups</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-5 text-white">
            <h3 className="text-lg font-semibold mb-1">Needs Validation</h3>
            <p className="text-2xl font-bold">1 Startup</p>
          </div>
        </div>
        
        {/* Evidence Score Breakdown */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Evidence Score Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Startup</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Surveys</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Pilots</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">LOIs</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Adoption</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Evidence Score</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {validationData.map((startup, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">{startup.startup}</td>
                    <td className="py-4 px-4">{startup.surveys}</td>
                    <td className="py-4 px-4">{startup.pilots}</td>
                    <td className="py-4 px-4">{startup.lois}</td>
                    <td className="py-4 px-4">{startup.adoption}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="mr-2">{startup.evidenceScore}/100</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#FF6A00] h-2 rounded-full" 
                            style={{ width: `${startup.evidenceScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        startup.evidenceScore >= 80 ? 'bg-green-100 text-green-800' :
                        startup.evidenceScore >= 60 ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {startup.evidenceScore >= 80 ? 'High' :
                         startup.evidenceScore >= 60 ? 'Medium' : 'Low'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Evidence Types Weighting */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Evidence Types & Weighting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {evidenceTypes.map((type, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-gray-800 mb-2">{type.type}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Weight</span>
                  <span className="font-bold text-[#FF6A00]">{type.weight}%</span>
                </div>
                <p className="text-sm text-gray-600">{type.description}</p>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#FF6A00] h-2 rounded-full" 
                    style={{ width: `${type.weight}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Validation Score Chart */}
        <div className="bg-gray-50 rounded-2xl p-5 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Market Validation Scores</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={validationData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="startup" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="evidenceScore" name="Evidence Score" fill="#FF6A00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Confidence Level Legend */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Confidence Level Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center bg-green-100 p-4 rounded-2xl">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
              <div>
                <h3 className="font-bold text-green-800">High Confidence (80-100)</h3>
                <p className="text-sm text-green-700">Strong market validation evidence</p>
              </div>
            </div>
            <div className="flex items-center bg-blue-100 p-4 rounded-2xl">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <h3 className="font-bold text-blue-800">Medium Confidence (60-79)</h3>
                <p className="text-sm text-blue-700">Moderate validation evidence</p>
              </div>
            </div>
            <div className="flex items-center bg-yellow-100 p-4 rounded-2xl">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
              <div>
                <h3 className="font-bold text-yellow-800">Low Confidence (0-59)</h3>
                <p className="text-sm text-yellow-700">Insufficient validation evidence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketValidation;