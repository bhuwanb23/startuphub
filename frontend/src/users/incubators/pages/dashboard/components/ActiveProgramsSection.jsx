import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { getStatusColor } from '../utils/formatters.js';

const ActiveProgramsSection = () => {
  const { data } = useDashboardData();
  
  if (!data) return null;
  
  const { activePrograms } = data;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Active Programs</h2>
        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">View All</button>
      </div>

      <div className="space-y-4">
        {activePrograms.map((program) => (
          <div key={program.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-800">{program.name}</h3>
                <p className="text-gray-600 text-sm">{program.duration} • {program.startups} startups</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                {program.status}
              </span>
            </div>
            
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-800">{program.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${program.progress}%` }}
                ></div>
              </div>
            </div>
            
            <button className="w-full py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium">
              Manage Program
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveProgramsSection;