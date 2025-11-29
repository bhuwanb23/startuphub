import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FundingAssigned = () => {
  // Mock data for funding distribution
  const fundingData = [
    { name: 'TechNova', grants: 120000, investments: 350000, stipends: 50000 },
    { name: 'MobileGenius', grants: 80000, investments: 200000, stipends: 40000 },
    { name: 'EcomPro', grants: 60000, investments: 150000, stipends: 30000 },
    { name: 'HealthTrack', grants: 150000, investments: 400000, stipends: 60000 },
    { name: 'AutoPilot', grants: 90000, investments: 250000, stipends: 45000 },
    { name: 'GreenEnergy', grants: 70000, investments: 180000, stipends: 35000 }
  ];

  // Aggregated funding data for pie chart
  const aggregatedFunding = [
    { name: 'Grants', value: 570000 },
    { name: 'Investments', value: 1530000 },
    { name: 'Stipends', value: 260000 }
  ];

  // Colors for charts
  const COLORS = ['#FF6A00', '#FFA500', '#FFD580'];
  const BAR_COLORS = ['#FF6A00', '#4A90E2', '#50C878'];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Funding Assigned</h1>
        <p className="text-gray-600 mb-6">Overview of funding distribution across startups</p>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-[#FF6A00] to-[#FFA500] rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Total Grants</h3>
            <p className="text-3xl font-bold">$570K</p>
          </div>
          <div className="bg-gradient-to-r from-[#4A90E2] to-[#5FA9FF] rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Total Investments</h3>
            <p className="text-3xl font-bold">$1.53M</p>
          </div>
          <div className="bg-gradient-to-r from-[#50C878] to-[#7ED957] rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Total Stipends</h3>
            <p className="text-3xl font-bold">$260K</p>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Funding Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={aggregatedFunding}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {aggregatedFunding.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Bar Chart */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Funding by Startup</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={fundingData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                  <YAxis tickFormatter={(value) => `$${value/1000}K`} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                  <Legend />
                  <Bar dataKey="grants" name="Grants" fill={BAR_COLORS[0]} />
                  <Bar dataKey="investments" name="Investments" fill={BAR_COLORS[1]} />
                  <Bar dataKey="stipends" name="Stipends" fill={BAR_COLORS[2]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Detailed Funding Table */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Detailed Funding Allocation</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Startup</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Grants</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Investments</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Stipends</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Total</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fundingData.map((startup, index) => {
                  const total = startup.grants + startup.investments + startup.stipends;
                  return (
                    <tr key={index} className="border-b border-gray-200 hover:bg-white">
                      <td className="py-4 px-4 font-medium">{startup.name}</td>
                      <td className="py-4 px-4">${startup.grants.toLocaleString()}</td>
                      <td className="py-4 px-4">${startup.investments.toLocaleString()}</td>
                      <td className="py-4 px-4">${startup.stipends.toLocaleString()}</td>
                      <td className="py-4 px-4 font-bold">${total.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                          Adjust
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-gray-100 font-bold">
                  <td className="py-4 px-4">Total</td>
                  <td className="py-4 px-4">$570,000</td>
                  <td className="py-4 px-4">$1,530,000</td>
                  <td className="py-4 px-4">$260,000</td>
                  <td className="py-4 px-4">$2,360,000</td>
                  <td className="py-4 px-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingAssigned;