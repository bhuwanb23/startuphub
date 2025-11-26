import React from 'react';

const KPICard = ({ title, value, indicator }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4">
    <div className="text-gray-600 text-sm">{title}</div>
    <div className={`text-xl font-bold mt-1 ${
      indicator === 'positive' ? 'text-green-600' : 
      indicator === 'negative' ? 'text-red-600' : 
      'text-gray-800'
    }`}>
      {value}
    </div>
  </div>
);

export default KPICard;