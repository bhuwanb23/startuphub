import React, { useState } from 'react';

const RenewalAlerts = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'INNOVATEX Patent Maintenance Fee',
      type: 'Patent',
      deadline: '2024-05-15',
      daysRemaining: 45,
      priority: 'High',
      status: 'Pending',
      amount: '$1,200',
    },
    {
      id: 2,
      title: 'INNOVATELOGO Trademark Renewal',
      type: 'Trademark',
      deadline: '2024-03-05',
      daysRemaining: 15,
      priority: 'High',
      status: 'Pending',
      amount: '$500',
    },
    {
      id: 3,
      title: 'INNOVATEX Trademark Renewal',
      type: 'Trademark',
      deadline: '2033-06-10',
      daysRemaining: 3425,
      priority: 'Low',
      status: 'Scheduled',
      amount: '$500',
    },
    {
      id: 4,
      title: 'InnovateX Software Copyright',
      type: 'Copyright',
      deadline: '2048-02-20',
      daysRemaining: 8785,
      priority: 'Low',
      status: 'Scheduled',
      amount: '$150',
    },
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMarkAsCompleted = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'Completed' } : alert
    ));
  };

  const handleSnooze = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, daysRemaining: alert.daysRemaining + 7 } : alert
    ));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (activeTab === 'upcoming') {
      return alert.daysRemaining <= 90 && alert.status !== 'Completed';
    } else if (activeTab === 'completed') {
      return alert.status === 'Completed';
    } else {
      return alert.status !== 'Completed';
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Renewal Alerts</h1>
        <p className="text-gray-600 mt-1">Manage deadlines and renewal notifications for your IPR assets</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'upcoming'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upcoming (3)
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All Alerts
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'completed'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Completed
          </button>
        </nav>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-red-600">2</div>
          <div className="text-sm text-gray-600">High Priority</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-yellow-600">0</div>
          <div className="text-sm text-gray-600">Medium Priority</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">2</div>
          <div className="text-sm text-gray-600">Low Priority</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-800">$1,850</div>
          <div className="text-sm text-gray-600">Total Due</div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          {activeTab === 'upcoming' ? 'Upcoming Renewals' : 
           activeTab === 'completed' ? 'Completed Renewals' : 'All Renewals'}
        </h2>
        <div className="space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{alert.title}</h3>
                    <div className="flex flex-wrap items-center mt-1 gap-2">
                      <span className="text-sm text-gray-600">{alert.type}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-600">Due: {alert.deadline}</span>
                      <span className="text-gray-300">•</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(alert.priority)}`}>
                        {alert.priority} Priority
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm font-medium text-gray-800">{alert.amount}</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                    {alert.daysRemaining > 0 && alert.status !== 'Completed' && (
                      <span className="ml-2 text-sm text-gray-600">
                        {alert.daysRemaining} days remaining
                      </span>
                    )}
                  </div>
                </div>
                {alert.status !== 'Completed' && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleMarkAsCompleted(alert.id)}
                      className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
                    >
                      Mark as Completed
                    </button>
                    <button
                      onClick={() => handleSnooze(alert.id)}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
                    >
                      Snooze 7 Days
                    </button>
                    <button className="text-[#FF6A00] text-sm font-medium hover:underline">
                      Set Reminder
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">No alerts found</div>
              <p className="text-gray-600">
                {activeTab === 'completed' 
                  ? 'You haven\'t completed any renewals yet.' 
                  : 'All renewals are up to date.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Notification Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">Email Notifications</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">90 days before deadline</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">30 days before deadline</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">7 days before deadline</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                <span className="ml-2 text-sm text-gray-700">On deadline day</span>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">SMS Notifications</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                <span className="ml-2 text-sm text-gray-700">90 days before deadline</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">30 days before deadline</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">7 days before deadline</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">On deadline day</span>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">In-App Notifications</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">90 days before deadline</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">30 days before deadline</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">7 days before deadline</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">On deadline day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Recommendations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">AI Recommendations</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Cost Optimization</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Consider bundling your trademark renewals to save 15% on filing fees.
                </p>
                <button className="mt-2 text-[#FF6A00] text-sm font-medium hover:underline">
                  View Details
                </button>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Risk Assessment</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Your patent maintenance fees are due soon. Missing this deadline could result in patent expiration.
                </p>
                <button className="mt-2 text-[#FF6A00] text-sm font-medium hover:underline">
                  Take Action
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewalAlerts;