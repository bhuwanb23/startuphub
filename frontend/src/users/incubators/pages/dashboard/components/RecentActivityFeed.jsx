import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';

const RecentActivityFeed = () => {
  const { data } = useDashboardData();
  
  if (!data) return null;
  
  const { activities } = data;

  // Function to get background color class
  const getBgColorClass = (color) => {
    const colorClasses = {
      indigo: 'bg-indigo-100',
      green: 'bg-green-100',
      blue: 'bg-blue-100',
      purple: 'bg-purple-100',
      yellow: 'bg-yellow-100'
    };
    return colorClasses[color] || 'bg-gray-100';
  };

  // Function to get text color class
  const getTextColorClass = (color) => {
    const colorClasses = {
      indigo: 'text-indigo-600',
      green: 'text-green-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      yellow: 'text-yellow-600'
    };
    return colorClasses[color] || 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">View All</button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div className={`w-8 h-8 rounded-full ${getBgColorClass(activity.color)} flex items-center justify-center`}>
              <span className={`${getTextColorClass(activity.color)} text-sm`}>{activity.icon}</span>
            </div>
            <div className="ml-3 flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-800">{activity.title}</h3>
                <span className="text-gray-400 text-xs">{activity.time}</span>
              </div>
              <p className="text-gray-600 text-sm">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed;