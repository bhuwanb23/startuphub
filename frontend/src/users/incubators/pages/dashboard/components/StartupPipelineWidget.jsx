import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';

const StartupPipelineWidget = () => {
  const { data } = useDashboardData();
  
  if (!data) return null;
  
  const { pipeline } = data;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Startup Pipeline</h2>
        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">View Details</button>
      </div>

      <div className="space-y-4">
        {pipeline.stages.map((stage) => (
          <div key={stage.id} className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4">
              <span className={`w-8 h-8 rounded-full ${stage.color} flex items-center justify-center text-sm font-bold text-gray-700`}>
                {stage.count}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{stage.name}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`${stage.color.replace('200', '500')} h-2 rounded-full`} 
                  style={{ width: `${(stage.count / 30) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-bold text-gray-800 mb-4">Recent Applications</h3>
        <div className="space-y-3">
          {pipeline.recentApplications.map((app) => (
            <div key={app.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-3">
                {app.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{app.name}</h4>
                <p className="text-gray-600 text-sm">Submitted {app.submitted}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${app.status === 'Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartupPipelineWidget;