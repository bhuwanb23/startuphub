import React from 'react';
import { useDashboardData } from '../hooks';
import { formatNumber } from '../utils/formatters';

const IncubationMetrics = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Incubation & Innovation Metrics</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-3 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
        <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Incubation & Innovation Metrics</h2>
        <div className="text-red-500">Error loading data: {error}</div>
      </div>
    );
  }

  if (!data) return null;

  const { incubationMetrics } = data;

  // Mock data for cohort health heatmap
  const cohortHealthData = [
    { week: 'W1', health: 85 },
    { week: 'W2', health: 78 },
    { week: 'W3', health: 92 },
    { week: 'W4', health: 88 },
    { week: 'W5', health: 76 },
    { week: 'W6', health: 91 },
    { week: 'W7', health: 83 },
    { week: 'W8', health: 89 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Incubation & Innovation Metrics</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Cohorts Active</div>
          <div className="text-xl font-bold text-gray-800">{formatNumber(incubationMetrics.activeCohorts)}</div>
        </div>
        
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Sessions Conducted</div>
          <div className="text-xl font-bold text-gray-800">{formatNumber(incubationMetrics.sessionsConducted)}</div>
        </div>
        
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Mentor Pool Strength</div>
          <div className="text-xl font-bold text-gray-800">{formatNumber(incubationMetrics.mentorPoolStrength)}</div>
        </div>
        
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Industry Projects</div>
          <div className="text-xl font-bold text-gray-800">{formatNumber(incubationMetrics.industryProjects)}</div>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium text-gray-800 mb-2">Cohort Health Heatmap</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between mb-2">
            {cohortHealthData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-600 mb-1">{item.week}</div>
                <div 
                  className="w-8 h-8 rounded flex items-center justify-center text-xs font-medium"
                  style={{
                    backgroundColor: `rgba(244, 163, 0, ${item.health / 100})`,
                    color: item.health > 50 ? 'white' : 'black'
                  }}
                >
                  {item.health}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center mt-2">
            <div className="text-xs text-gray-600 mr-2">Health Score:</div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-200 rounded mr-1"></div>
              <span className="text-xs text-gray-600">Low</span>
            </div>
            <div className="flex items-center ml-2">
              <div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>
              <span className="text-xs text-gray-600">High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncubationMetrics;