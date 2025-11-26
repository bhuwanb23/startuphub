import React from 'react';

const OverviewSnapshot = () => {
  const stats = [
    { name: 'Total Investments', value: '$24.8M', change: '+12.4%', icon: '💰' },
    { name: 'Active Portfolios', value: '42', change: '+3', icon: '💼' },
    { name: 'ROI (Annual)', value: '18.6%', change: '+2.1%', icon: '📈' },
    { name: 'New Opportunities', value: '18', change: '+5', icon: '💡' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Overview Snapshot</h2>
        <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
          View Detailed Report
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gradient-to-br from-white to-[#FFF5EB] rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-green-600 font-medium">{stat.change} from last month</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewSnapshot;