import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const ProductReadiness = () => {
  // Mock data for product readiness
  const radarData = [
    { feature: 'User Interface', maturity: 90, fullMark: 100 },
    { feature: 'Core Functionality', maturity: 85, fullMark: 100 },
    { feature: 'Performance', maturity: 75, fullMark: 100 },
    { feature: 'Security', maturity: 80, fullMark: 100 },
    { feature: 'Scalability', maturity: 70, fullMark: 100 },
    { feature: 'Documentation', maturity: 65, fullMark: 100 }
  ];

  const readinessData = [
    { name: 'TechNova', readiness: 85 },
    { name: 'MobileGenius', readiness: 78 },
    { name: 'EcomPro', readiness: 72 },
    { name: 'HealthTrack', readiness: 92 },
    { name: 'AutoPilot', readiness: 80 }
  ];

  const featureMaturity = [
    { name: 'UI/UX Design', value: 90, color: '#FF6A00' },
    { name: 'Core Features', value: 85, color: '#4A90E2' },
    { name: 'Performance', value: 75, color: '#50C878' },
    { name: 'Security', value: 80, color: '#9B59B6' },
    { name: 'Scalability', value: 70, color: '#F1C40F' },
    { name: 'Documentation', value: 65, color: '#E67E22' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Product Readiness Index</h1>
            <p className="text-gray-600">Comprehensive assessment of product maturity and readiness</p>
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
        
        {/* Overall Readiness Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1 bg-gradient-to-r from-[#FFF9F0] to-[#FFF2DC] rounded-2xl p-6 border border-[#FF6A00]">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Overall Readiness Score</h2>
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#FF6A00"
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * 82) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-[#FF6A00]">82%</span>
                  <span className="text-gray-600">Readiness</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-600">Product is well-developed with strong core features</p>
                <div className="mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium inline-block">
                  Good to Launch
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature Maturity Bars */}
          <div className="lg:col-span-2 bg-gray-50 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Feature Maturity</h2>
            <div className="space-y-4">
              {featureMaturity.map((feature, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-800">{feature.name}</span>
                    <span className="font-medium text-[#FF6A00]">{feature.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{ 
                        width: `${feature.value}%`, 
                        backgroundColor: feature.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Radar Chart */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Feature vs Maturity Radar</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="feature" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Maturity"
                  dataKey="maturity"
                  stroke="#FF6A00"
                  fill="#FF6A00"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Startup Comparison */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Startup Readiness Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {readinessData.map((startup, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl p-4 text-center hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-gray-800 mb-3">{startup.name}</h3>
                <div className="relative w-24 h-24 mx-auto">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e0e0e0"
                      strokeWidth="8"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#FF6A00"
                      strokeWidth="8"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * startup.readiness) / 100}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-[#FF6A00]">{startup.readiness}%</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    startup.readiness >= 90 ? 'bg-green-100 text-green-800' :
                    startup.readiness >= 80 ? 'bg-blue-100 text-blue-800' :
                    startup.readiness >= 70 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {startup.readiness >= 90 ? 'Excellent' :
                     startup.readiness >= 80 ? 'Good' :
                     startup.readiness >= 70 ? 'Fair' : 'Needs Work'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReadiness;