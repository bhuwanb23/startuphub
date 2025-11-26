import React, { useState } from 'react';

const IPRWorkflow = () => {
  const [activeWorkflow, setActiveWorkflow] = useState('filing');
  
  const workflows = [
    { id: 'filing', name: 'Patent Filing Pipeline' },
    { id: 'trademark', name: 'Trademark Tools' },
    { id: 'copyright', name: 'Copyright Documentation' },
    { id: 'tracker', name: 'IP Status Tracker' }
  ];
  
  const pipelineStages = [
    { id: 1, name: 'Draft', status: 'completed', date: '2025-10-15' },
    { id: 2, name: 'Review', status: 'completed', date: '2025-10-22' },
    { id: 3, name: 'Filed', status: 'completed', date: '2025-11-01' },
    { id: 4, name: 'Office Action', status: 'current', date: 'Pending' },
    { id: 5, name: 'Response', status: 'pending', date: 'TBD' },
    { id: 6, name: 'Granted', status: 'pending', date: 'TBD' }
  ];
  
  const deadlines = [
    { id: 1, title: 'Response to Office Action', date: '2025-12-15', priority: 'high' },
    { id: 2, title: 'Annual Maintenance Fee', date: '2026-01-30', priority: 'medium' },
    { id: 3, title: 'Trademark Renewal', date: '2026-03-15', priority: 'low' }
  ];
  
  const alerts = [
    { id: 1, title: 'New Prior Art Found', message: '3 new publications related to your patent', time: '2 hours ago', type: 'warning' },
    { id: 2, title: 'Office Action Received', message: 'USPTO has issued an office action', time: '1 day ago', type: 'info' },
    { id: 3, title: 'Deadline Reminder', message: 'Response due in 15 days', time: '1 day ago', type: 'urgent' }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">📋 IPR Workflow Pages</h2>
      
      {/* Workflow Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {workflows.map((workflow) => (
          <button
            key={workflow.id}
            onClick={() => setActiveWorkflow(workflow.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeWorkflow === workflow.id
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {workflow.name}
          </button>
        ))}
      </div>
      
      {/* Patent Filing Pipeline */}
      {activeWorkflow === 'filing' && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-6">Patent Filing Pipeline</h3>
          
          {/* Pipeline Stages */}
          <div className="mb-8">
            <h4 className="font-medium text-gray-800 mb-4">Stages</h4>
            <div className="flex flex-wrap justify-between relative">
              {/* Connecting line */}
              <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0"></div>
              
              {pipelineStages.map((stage, index) => (
                <div key={stage.id} className="flex flex-col items-center z-10 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    stage.status === 'completed' ? 'bg-green-500 text-white' :
                    stage.status === 'current' ? 'bg-[#FF6A00] text-white' :
                    'bg-gray-300 text-gray-600'
                  }`}>
                    {stage.status === 'completed' ? '✓' : stage.id}
                  </div>
                  <div className={`text-xs text-center ${
                    stage.status === 'current' ? 'font-bold text-[#FF6A00]' : 'text-gray-600'
                  }`}>
                    {stage.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stage.date}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Deadlines */}
          <div className="mb-8">
            <h4 className="font-medium text-gray-800 mb-4">Upcoming Deadlines</h4>
            <div className="space-y-3">
              {deadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800">{deadline.title}</div>
                    <div className="text-sm text-gray-600">{deadline.date}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    deadline.priority === 'high' ? 'bg-red-100 text-red-800' :
                    deadline.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {deadline.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Alerts */}
          <div>
            <h4 className="font-medium text-gray-800 mb-4">Recent Alerts</h4>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <div className={`mr-3 mt-1 w-2 h-2 rounded-full ${
                    alert.type === 'urgent' ? 'bg-red-500' :
                    alert.type === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{alert.title}</div>
                    <div className="text-sm text-gray-600">{alert.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{alert.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Other workflow pages would be implemented similarly */}
      {activeWorkflow !== 'filing' && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">
            {activeWorkflow === 'trademark' ? '™️' : 
             activeWorkflow === 'copyright' ? '©️' : '📊'}
          </div>
          <h3 className="font-bold text-gray-800 mb-2">
            {workflows.find(w => w.id === activeWorkflow)?.name}
          </h3>
          <p className="text-gray-600">Content for this workflow section will be implemented here.</p>
        </div>
      )}
    </div>
  );
};

export default IPRWorkflow;