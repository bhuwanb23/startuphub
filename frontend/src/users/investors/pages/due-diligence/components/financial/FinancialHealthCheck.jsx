import React from 'react';
import IndicatorCard from '../shared/IndicatorCard';

const FinancialHealthCheck = ({ data }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Financial Health Check</h2>
      <p className="text-gray-600">Cashflow analysis, burn rate, and profitability indicators</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Cashflow Trends</h3>
        <div className="h-48 flex items-end justify-between space-x-2">
          {data.cashflow.map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className={`w-full rounded-t-lg ${
                  value >= 0 
                    ? 'bg-gradient-to-t from-[#FF8C42] to-[#FF6A00]' 
                    : 'bg-gradient-to-t from-red-500 to-red-300'
                }`}
                style={{ height: `${(Math.abs(value) / Math.max(...data.cashflow.map(Math.abs))) * 100}%` }}
              ></div>
              <div className="text-xs text-gray-500 mt-2">M{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Financial Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <IndicatorCard 
            title="Burn Rate" 
            value={`$${data.burnRate.toLocaleString()}/month`} 
            status="warning" 
            description="Monthly cash consumption"
          />
          <IndicatorCard 
            title="Runway" 
            value={`${data.runway} months`} 
            status={data.runway > 12 ? "good" : "warning"} 
            description="Months until funding needed"
          />
          <IndicatorCard 
            title="Profitability" 
            value={`${data.profitability >= 0 ? '+' : ''}${data.profitability}%`} 
            status={data.profitability >= 0 ? "good" : "critical"} 
            description="Net profit margin"
          />
        </div>
      </div>
    </div>
  </div>
);

export default FinancialHealthCheck;