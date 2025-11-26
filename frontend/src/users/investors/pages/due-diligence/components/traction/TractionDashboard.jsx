import React from 'react';
import KPICard from '../shared/KPICard';

const TractionDashboard = ({ data }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Traction Dashboard</h2>
      <p className="text-gray-600">Revenue trends, customer growth, and engagement KPIs</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Revenue Trends Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Revenue Trends</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {data.revenueData.map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-gradient-to-t from-[#FF8C42] to-[#FF6A00] rounded-t-lg"
                style={{ height: `${(value / Math.max(...data.revenueData)) * 100}%` }}
              ></div>
              <div className="text-xs text-gray-500 mt-2">M{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Customer Growth Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Customer Growth</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {data.customerData.map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-gradient-to-t from-[#FF8C42] to-[#FF6A00] rounded-t-lg"
                style={{ height: `${(value / Math.max(...data.customerData)) * 100}%` }}
              ></div>
              <div className="text-xs text-gray-500 mt-2">M{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    {/* Engagement KPIs */}
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-800 mb-4">Engagement KPIs</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard 
          title="Monthly Growth" 
          value={`${data.kpis.monthlyGrowth}%`} 
          indicator="positive" 
        />
        <KPICard 
          title="Churn Rate" 
          value={`${data.kpis.churnRate}%`} 
          indicator="negative" 
        />
        <KPICard 
          title="LTV" 
          value={`$${data.kpis.ltv}`} 
          indicator="positive" 
        />
        <KPICard 
          title="CAC" 
          value={`$${data.kpis.cac}`} 
          indicator="neutral" 
        />
      </div>
    </div>
  </div>
);

export default TractionDashboard;