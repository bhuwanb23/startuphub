import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const KPIMetrics = () => {
  // Mock data for KPIs
  const kpiData = [
    { month: 'Jan', traction: 120, cac: 85, ltv: 420, revenue: 15000, runway: 18 },
    { month: 'Feb', traction: 190, cac: 78, ltv: 480, revenue: 22000, runway: 17 },
    { month: 'Mar', traction: 150, cac: 82, ltv: 450, revenue: 18000, runway: 16 },
    { month: 'Apr', traction: 220, cac: 75, ltv: 520, revenue: 30000, runway: 15 },
    { month: 'May', traction: 280, cac: 72, ltv: 580, revenue: 42000, runway: 14 },
    { month: 'Jun', traction: 320, cac: 70, ltv: 620, revenue: 55000, runway: 13 }
  ];

  const kpiCards = [
    {
      title: "Traction Score",
      value: "320",
      change: "+12.5%",
      trend: "up",
      color: "bg-blue-500",
      description: "User engagement and growth metrics"
    },
    {
      title: "Customer Acquisition Cost",
      value: "$70",
      change: "-5.2%",
      trend: "down",
      color: "bg-green-500",
      description: "Cost to acquire a new customer"
    },
    {
      title: "Lifetime Value",
      value: "$620",
      change: "+8.7%",
      trend: "up",
      color: "bg-purple-500",
      description: "Average revenue per customer"
    },
    {
      title: "Monthly Revenue",
      value: "$55K",
      change: "+25.3%",
      trend: "up",
      color: "bg-yellow-500",
      description: "Total monthly recurring revenue"
    },
    {
      title: "Runway (Months)",
      value: "13",
      change: "-1",
      trend: "down",
      color: "bg-red-500",
      description: "Months until funding depletion"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">KPI Metrics</h1>
            <p className="text-gray-600">Key performance indicators for startup success</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]">
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Last 12 Months</option>
            </select>
            <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
              Export
            </button>
          </div>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {kpiCards.map((kpi, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-800">{kpi.title}</h3>
                <div className={`w-3 h-3 rounded-full ${kpi.color}`}></div>
              </div>
              <div className="mb-2">
                <span className="text-2xl font-bold text-gray-800">{kpi.value}</span>
                <span className={`ml-2 text-sm font-medium ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change}
                </span>
              </div>
              <p className="text-sm text-gray-600">{kpi.description}</p>
            </div>
          ))}
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Traction & CAC Chart */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Traction vs CAC</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={kpiData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="traction" name="Traction Score" stroke="#4A90E2" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="cac" name="CAC ($)" stroke="#50C878" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Revenue & Runway Chart */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Revenue & Runway</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={kpiData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" name="Revenue ($)" fill="#FF6A00" />
                  <Bar yAxisId="right" dataKey="runway" name="Runway (months)" fill="#4A90E2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* LTV:CAC Ratio */}
        <div className="bg-gray-50 rounded-2xl p-5 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">LTV:CAC Ratio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#FF6A00] mb-2">8.86</div>
              <p className="text-gray-600">Current Ratio</p>
              <div className="mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Healthy
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 mb-2">3:1</div>
              <p className="text-gray-600">Target Ratio</p>
              <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Benchmark
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">↑ 5.2%</div>
              <p className="text-gray-600">Improvement</p>
              <div className="mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Positive Trend
              </div>
            </div>
          </div>
        </div>
        
        {/* KPI Score Chips */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">KPI Score Indicators</h2>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center bg-green-100 px-3 py-2 rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-800 font-medium">Excellent (8-10)</span>
            </div>
            <div className="flex items-center bg-blue-100 px-3 py-2 rounded-full">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-blue-800 font-medium">Good (6-7.9)</span>
            </div>
            <div className="flex items-center bg-yellow-100 px-3 py-2 rounded-full">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-yellow-800 font-medium">Needs Attention (4-5.9)</span>
            </div>
            <div className="flex items-center bg-red-100 px-3 py-2 rounded-full">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-red-800 font-medium">Critical (&lt;4)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIMetrics;