import React from 'react';

const DueDiligenceAlerts = () => {
  const alerts = [
    {
      id: 1,
      company: 'NeuroSync AI',
      stage: 'Series A',
      deadline: '2 days',
      priority: 'High',
      tasks: 12,
      completed: 8,
    },
    {
      id: 2,
      company: 'EcoPack Solutions',
      stage: 'Seed',
      deadline: '1 week',
      priority: 'Medium',
      tasks: 8,
      completed: 5,
    },
    {
      id: 3,
      company: 'FinStream Analytics',
      stage: 'Pre-Seed',
      deadline: '3 days',
      priority: 'High',
      tasks: 15,
      completed: 10,
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Pending Due Diligence</h2>
        <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
          View Due Diligence
        </button>
      </div>
      
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold text-gray-800">{alert.company}</h3>
                <div className="flex items-center mt-1">
                  <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {alert.stage}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                    {alert.priority} Priority
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-800">{alert.deadline} left</div>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress: {alert.completed}/{alert.tasks} tasks</span>
                <span className="font-bold text-gray-800">{Math.round((alert.completed / alert.tasks) * 100)}%</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-[#FF6A00]"
                  style={{ width: `${(alert.completed / alert.tasks) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1 bg-[#FF6A00] text-white rounded text-sm hover:bg-[#e05500] transition-colors">
                Continue Review
              </button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
              ⚠️
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">Attention Required</h3>
              <p className="text-xs text-gray-600">NeuroSync AI requires immediate attention - deadline in 2 days</p>
            </div>
          </div>
          <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
            Take Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default DueDiligenceAlerts;