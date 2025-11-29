import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { getResourceColor } from '../utils/formatters.js';

const ResourceUtilizationCard = () => {
  const { data } = useDashboardData();
  
  if (!data) return null;
  
  const { resources } = data;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Resource Utilization</h2>
      
      <div className="space-y-5">
        {resources.map((resource, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-gray-700 font-medium">{resource.name}</span>
              <span className="text-gray-600 text-sm">{resource.used}/{resource.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`${getResourceColor(resource.percentage)} h-2.5 rounded-full`} 
                style={{ width: `${resource.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-bold text-gray-800 mb-4">Facility Status</h3>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">All Systems Operational</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceUtilizationCard;