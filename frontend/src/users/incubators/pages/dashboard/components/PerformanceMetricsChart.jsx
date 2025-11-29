import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';

const PerformanceMetricsChart = () => {
  const { data } = useDashboardData();
  
  if (!data) return null;
  
  const { metrics } = data;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Performance Metrics</h2>
      
      <div className="space-y-5">
        {metrics.map((metric, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-gray-700 font-medium">{metric.name}</span>
              <span className="text-gray-600 text-sm">{metric.value}/{metric.target}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${metric.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-bold text-gray-800 mb-4">Key Insights</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-gray-600 text-sm">Program completion rate increased by 12%</span>
          </li>
          <li className="flex items-start">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span className="text-gray-600 text-sm">Mentor engagement improved by 8%</span>
          </li>
          <li className="flex items-start">
            <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center mr-2 mt-0.5">
              <svg className="w-3 h-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <span className="text-gray-600 text-sm">Revenue growth needs attention</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceMetricsChart;