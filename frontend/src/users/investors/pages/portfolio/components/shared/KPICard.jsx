import React from 'react';

const KPICard = ({ title, value, change, icon }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-gray-600 text-sm">{title}</div>
        <div className="text-xl font-bold text-gray-800 mt-1">{value}</div>
        {change && (
          <div className={`text-xs mt-1 ${
            change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-500'
          }`}>
            {change > 0 ? '↑' : change < 0 ? '↓' : '→'} {Math.abs(change)}% from last period
          </div>
        )}
      </div>
      {icon && (
        <div className="w-10 h-10 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00]">
          {icon}
        </div>
      )}
    </div>
  </div>
);

export default KPICard;