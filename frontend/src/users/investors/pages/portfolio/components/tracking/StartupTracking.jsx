import React from 'react';
import KPICard from '../shared/KPICard';

const StartupTracking = () => {
  // Mock data for a startup
  const startupData = {
    name: 'NeuroSync AI',
    sector: 'AI/ML',
    stage: 'Series B',
    invested: '$2.5M',
    currentValuation: '$18M',
    equity: '12.5%',
    kpis: [
      { title: 'MRR', value: '$425K', change: 18.5 },
      { title: 'Runway', value: '14 months', change: -2.1 },
      { title: 'CAC', value: '$850', change: -5.3 },
      { title: 'LTV', value: '$4,200', change: 12.8 }
    ],
    trends: [
      { month: 'Jan', mrr: 320000, users: 8500 },
      { month: 'Feb', mrr: 345000, users: 9200 },
      { month: 'Mar', mrr: 375000, users: 10100 },
      { month: 'Apr', mrr: 400000, users: 11200 },
      { month: 'May', mrr: 425000, users: 12500 },
      { month: 'Jun', mrr: 450000, users: 13800 }
    ],
    updates: [
      { date: '2023-06-15', author: 'Alex Johnson (CEO)', content: 'Completed successful Series B funding round with new strategic investors.' },
      { date: '2023-06-01', author: 'Maria Garcia (CMO)', content: 'Launched new marketing campaign in APAC region, early results promising.' },
      { date: '2023-05-20', author: 'Sam Chen (CTO)', content: 'Released version 2.1 with enhanced AI capabilities and improved performance.' }
    ],
    dilution: [
      { round: 'Seed', date: '2021-03', equity: '25%', valuation: '$2M' },
      { round: 'Series A', date: '2022-01', equity: '18%', valuation: '$8M' },
      { round: 'Series B', date: '2023-06', equity: '12.5%', valuation: '$18M' }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Individual Startup Tracking</h2>
        <p className="text-gray-600">Detailed performance metrics and updates</p>
      </div>

      {/* Startup Profile Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{startupData.name}</h3>
            <div className="flex items-center mt-2">
              <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                {startupData.sector}
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-600">{startupData.stage}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">{startupData.invested}</div>
              <div className="text-xs text-gray-500">Invested</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">{startupData.currentValuation}</div>
              <div className="text-xs text-gray-500">Valuation</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#FF6A00]">{startupData.equity}</div>
              <div className="text-xs text-gray-500">Equity</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {startupData.kpis.map((kpi, index) => (
          <KPICard 
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
          />
        ))}
      </div>

      {/* Charts and Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Monthly Revenue Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {startupData.trends.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-[#FF8C42] to-[#FF6A00] rounded-t-lg"
                  style={{ height: `${(item.mrr / Math.max(...startupData.trends.map(d => d.mrr))) * 100}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{item.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Updates */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Founder Updates</h3>
          <div className="space-y-4">
            {startupData.updates.map((update, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between">
                  <div className="font-medium text-gray-800">{update.author}</div>
                  <div className="text-xs text-gray-500">{update.date}</div>
                </div>
                <p className="text-gray-700 mt-2 text-sm">{update.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Equity & Dilution Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Equity & Dilution Timeline</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equity %</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valuation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {startupData.dilution.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.round}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-[#FF6A00] font-medium">{item.equity}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.valuation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <span className="text-yellow-500 mr-3 mt-0.5">⚠️</span>
            <div>
              <div className="font-medium text-yellow-800">Runway Alert</div>
              <div className="text-sm text-yellow-600">Runway decreased to 14 months, below target of 18 months</div>
            </div>
          </div>
          <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-green-500 mr-3 mt-0.5">✓</span>
            <div>
              <div className="font-medium text-green-800">Growth Milestone</div>
              <div className="text-sm text-green-600">MRR growth exceeded 18% this quarter</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupTracking;