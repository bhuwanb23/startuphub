import React from 'react';
import KPICard from '../shared/KPICard';
import CircularGauge from '../shared/CircularGauge';
import DonutChart from '../shared/DonutChart';

const PortfolioOverview = () => {
  // Mock data
  const kpiData = [
    { title: 'Total Invested', value: '$42.5M', change: 12.5, icon: '💰' },
    { title: 'Active Startups', value: '24', change: 8.3, icon: '🏢' },
    { title: 'Avg. Return', value: '2.8x', change: 5.2, icon: '📈' },
    { title: 'Distributions', value: '$8.2M', change: 15.7, icon: '💸' }
  ];

  const sectorData = [
    { label: 'Fintech', value: 25 },
    { label: 'HealthTech', value: 20 },
    { label: 'Clean Energy', value: 15 },
    { label: 'AI/ML', value: 18 },
    { label: 'E-commerce', value: 12 },
    { label: 'Others', value: 10 }
  ];

  const performanceData = [
    { month: 'Jan', value: 120 },
    { month: 'Feb', value: 135 },
    { month: 'Mar', value: 128 },
    { month: 'Apr', value: 142 },
    { month: 'May', value: 156 },
    { month: 'Jun', value: 168 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Portfolio Overview Dashboard</h2>
        <p className="text-gray-600">Track your investments and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard 
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            icon={kpi.icon}
          />
        ))}
      </div>

      {/* Portfolio Health and Sector Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Portfolio Health Score</h3>
          <div className="flex justify-center">
            <CircularGauge score={87} maxScore={100} title="Health Index" size={150} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Sector Distribution</h3>
          <div className="flex justify-center">
            <DonutChart data={sectorData} title="Investment by Sector" />
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Year-to-Date Performance</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {performanceData.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-gradient-to-t from-[#FF8C42] to-[#FF6A00] rounded-t-lg"
                style={{ height: `${(item.value / Math.max(...performanceData.map(d => d.value))) * 100}%` }}
              ></div>
              <div className="text-xs text-gray-500 mt-2">{item.month}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;