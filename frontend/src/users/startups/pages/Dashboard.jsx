import React from 'react';

const Dashboard = () => {
  // Mock data for dashboard cards
  const kpiData = [
    { id: 1, name: 'Revenue', value: '$45,231', change: '+20.1%', changeType: 'positive', icon: '💰' },
    { id: 2, name: 'Customers', value: '2,350', change: '+18.2%', changeType: 'positive', icon: '👥' },
    { id: 3, name: 'Conversion', value: '4.2%', change: '+2.1%', changeType: 'positive', icon: '📈' },
    { id: 4, name: 'Churn', value: '1.2%', change: '-0.3%', changeType: 'positive', icon: '📉' },
  ];

  const projects = [
    { id: 1, name: 'Product Launch', progress: 75, status: 'On Track', dueDate: '2023-12-15' },
    { id: 2, name: 'Market Expansion', progress: 40, status: 'In Progress', dueDate: '2024-01-30' },
    { id: 3, name: 'Team Hiring', progress: 90, status: 'Almost Done', dueDate: '2023-11-30' },
  ];

  const iprStatus = [
    { id: 1, name: 'Trademark Application', status: 'Filed', date: '2023-10-15' },
    { id: 2, name: 'Patent Pending', status: 'Under Review', date: '2023-09-22' },
    { id: 3, name: 'Copyright Registration', status: 'Approved', date: '2023-08-10' },
  ];

  const fundingPipeline = [
    { id: 1, name: 'Seed Round', amount: '$1.2M', status: 'Negotiation', progress: 70 },
    { id: 2, name: 'Series A', amount: '$5M', status: 'Due Diligence', progress: 45 },
    { id: 3, name: 'Grant Application', amount: '$500K', status: 'Submitted', progress: 90 },
  ];

  const tasks = [
    { id: 1, name: 'Prepare investor deck', due: 'Today', priority: 'High' },
    { id: 2, name: 'Review legal documents', due: 'Tomorrow', priority: 'Medium' },
    { id: 3, name: 'Schedule team meeting', due: 'Dec 5', priority: 'Low' },
  ];

  const notifications = [
    { id: 1, message: 'New investor match found', time: '2 hours ago', unread: true },
    { id: 2, message: 'IPR application approved', time: '4 hours ago', unread: true },
    { id: 3, message: 'Team meeting reminder', time: '1 day ago', unread: false },
  ];

  const aiSuggestions = [
    { id: 1, suggestion: 'Consider applying for the Green Tech Grant', confidence: 'High' },
    { id: 2, suggestion: 'Schedule a meeting with mentor Alex Johnson', confidence: 'Medium' },
    { id: 3, suggestion: 'Update your market analysis report', confidence: 'High' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, InnovateX Team!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your startup today.</p>
      </div>

      {/* Overview Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Key Metrics (KPIs) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Key Metrics</h2>
            <button className="text-[#FF6A00] text-sm font-medium hover:underline">View Report</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi) => (
              <div key={kpi.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{kpi.icon}</span>
                  <span className={`text-sm font-medium ${kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-800 mt-2">{kpi.value}</p>
                <p className="text-sm text-gray-500 mt-1">{kpi.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications Center */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
            <button className="text-[#FF6A00] text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-3 rounded-lg ${notification.unread ? 'bg-[#FF8C42]/10 border border-[#FF8C42]/30' : 'bg-gray-50'}`}
              >
                <p className="text-sm text-gray-800">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Row - Active Projects, IPR Status, Funding Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Active Projects</h2>
            <button className="text-[#FF6A00] text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">{project.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">{project.status}</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-800">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Due: {project.dueDate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* IPR Status Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">IPR Status</h2>
            <button className="text-[#FF6A00] text-sm font-medium hover:underline">Manage IPR</button>
          </div>
          <div className="space-y-4">
            {iprStatus.map((ipr) => (
              <div key={ipr.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <h3 className="font-medium text-gray-800">{ipr.name}</h3>
                  <p className="text-xs text-gray-500">{ipr.date}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">{ipr.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Funding Pipeline Snapshot */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Funding Pipeline</h2>
            <button className="text-[#FF6A00] text-sm font-medium hover:underline">View Pipeline</button>
          </div>
          <div className="space-y-4">
            {fundingPipeline.map((funding) => (
              <div key={funding.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">{funding.name}</h3>
                  <span className="font-bold text-gray-800">{funding.amount}</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{funding.status}</span>
                    <span className="font-medium text-gray-800">{funding.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                      style={{ width: `${funding.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row - Task Tracker, AI Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task & Milestone Tracker */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">Task Tracker</h2>
            <button className="text-[#FF6A00] text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div className="flex-shrink-0 w-5 h-5 rounded-full border border-gray-300 mr-3"></div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{task.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">Due: {task.due}</span>
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                      task.priority === 'High' ? 'bg-red-100 text-red-800' : 
                      task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions Panel */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">AI Suggestions</h2>
            <button className="text-[#FF6A00] text-sm font-medium hover:underline">Refresh</button>
          </div>
          <div className="space-y-4">
            {aiSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="p-4 rounded-lg border border-gray-200 hover:border-[#FF8C42]/30 transition-colors">
                <div className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF8C42]/20 flex items-center justify-center mr-3">
                    <span className="text-[#FF6A00]">🤖</span>
                  </div>
                  <div>
                    <p className="text-gray-800">{suggestion.suggestion}</p>
                    <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                      suggestion.confidence === 'High' ? 'bg-green-100 text-green-800' : 
                      suggestion.confidence === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      Confidence: {suggestion.confidence}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full py-3 text-center text-[#FF6A00] font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
              Generate More Suggestions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;