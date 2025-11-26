import React from 'react';

const IndicatorCard = ({ title, value, status, description }) => (
  <div className={`rounded-lg border p-4 ${
    status === 'good' ? 'border-green-200 bg-green-50' :
    status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
    status === 'critical' ? 'border-red-200 bg-red-50' :
    'border-gray-200'
  }`}>
    <div className="text-gray-600 text-sm">{title}</div>
    <div className={`text-xl font-bold mt-1 ${
      status === 'good' ? 'text-green-600' :
      status === 'warning' ? 'text-yellow-600' :
      status === 'critical' ? 'text-red-600' :
      'text-gray-800'
    }`}>
      {value}
    </div>
    <div className="text-xs text-gray-500 mt-1">{description}</div>
  </div>
);

export default IndicatorCard;