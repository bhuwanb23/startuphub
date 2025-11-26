import React from 'react';

const DonutChart = ({ data, title, size = 200 }) => {
  const radius = (size - 40) / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  // Colors for different sectors
  const colors = [
    '#FF6A00', '#FF8C42', '#F4A300', '#FFB347', '#FFCC99',
    '#FF9A76', '#FF6B6B', '#FFD166', '#06D6A0', '#118AB2'
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#f3f4f6"
            strokeWidth="30"
            fill="none"
          />
          {data.map((item, index) => {
            const strokeDasharray = (item.value / 100) * circumference;
            const strokeDashoffset = accumulatedOffset;
            accumulatedOffset -= strokeDasharray;
            
            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={colors[index % colors.length]}
                strokeWidth="30"
                fill="none"
                strokeDasharray={`${strokeDasharray} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">{data.length}</div>
            <div className="text-xs text-gray-500">Sectors</div>
          </div>
        </div>
      </div>
      {title && <div className="mt-3 text-sm font-medium text-gray-700">{title}</div>}
      <div className="mt-3 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            <span className="text-sm text-gray-700">{item.label}</span>
            <span className="text-sm text-gray-500 ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;