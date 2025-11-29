import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AutomatedAlerts = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Sample alert data
  const alerts = [
    {
      id: 1,
      type: 'Burn Rate Warning',
      severity: 'high',
      startup: 'TechFlow Inc.',
      message: 'Burn rate exceeded projected budget by 25%',
      time: '2 hours ago',
      resolved: false
    },
    {
      id: 2,
      type: 'Low Traction Alert',
      severity: 'medium',
      startup: 'EcoPack Solutions',
      message: 'User growth has stalled for past 2 weeks',
      time: '5 hours ago',
      resolved: false
    },
    {
      id: 3,
      type: 'Session Due Alert',
      severity: 'low',
      startup: 'HealthTrack Pro',
      message: 'Mentor session scheduled for tomorrow',
      time: '1 day ago',
      resolved: true
    },
    {
      id: 4,
      type: 'Funding Deadline',
      severity: 'high',
      startup: 'AgriTech Dynamics',
      message: 'Grant application deadline approaching in 3 days',
      time: '1 day ago',
      resolved: false
    },
    {
      id: 5,
      type: 'Milestone Missed',
      severity: 'medium',
      startup: 'FinSecure Systems',
      message: 'Failed to reach user acquisition milestone',
      time: '2 days ago',
      resolved: false
    }
  ];

  // Severity colors
  const severityColors = {
    high: '#EF4444',    // red
    medium: '#F59E0B',  // amber
    low: '#10B981'      // green
  };

  // Filter alerts based on active tab
  const filteredAlerts = activeTab === 'all' 
    ? alerts 
    : activeTab === 'resolved' 
      ? alerts.filter(alert => alert.resolved)
      : alerts.filter(alert => !alert.resolved);

  // Data for severity distribution chart
  const severityData = [
    { name: 'High', value: alerts.filter(a => a.severity === 'high' && !a.resolved).length },
    { name: 'Medium', value: alerts.filter(a => a.severity === 'medium' && !a.resolved).length },
    { name: 'Low', value: alerts.filter(a => a.severity === 'low' && !a.resolved).length }
  ];

  // Data for alerts by type chart
  const alertTypes = [...new Set(alerts.map(alert => alert.type))];
  const alertTypeData = alertTypes.map(type => ({
    name: type,
    value: alerts.filter(a => a.type === type && !a.resolved).length
  }));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Automated Alerts</h2>
        <p className="text-gray-600">Real-time notifications for critical startup metrics</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFE5B4]">
          <div className="text-2xl font-bold text-[#FF6A00]">12</div>
          <div className="text-sm text-gray-600">Active Alerts</div>
        </div>
        <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFE5B4]">
          <div className="text-2xl font-bold text-[#EF4444]">5</div>
          <div className="text-sm text-gray-600">High Priority</div>
        </div>
        <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFE5B4]">
          <div className="text-2xl font-bold text-[#F59E0B]">4</div>
          <div className="text-sm text-gray-600">Medium Priority</div>
        </div>
        <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFE5B4]">
          <div className="text-2xl font-bold text-[#10B981]">3</div>
          <div className="text-sm text-gray-600">Low Priority</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Severity Distribution Chart */}
        <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFE5B4]">
          <h3 className="font-semibold text-gray-800 mb-4">Severity Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={severityColors[entry.name.toLowerCase()]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts by Type Chart */}
        <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFE5B4]">
          <h3 className="font-semibold text-gray-800 mb-4">Alerts by Type</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={alertTypeData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#FF6A00" name="Unresolved Alerts" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'all'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Alerts
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'unresolved'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('unresolved')}
        >
          Unresolved
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'resolved'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('resolved')}
        >
          Resolved
        </button>
      </div>

      {/* Alerts List */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Alert
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Startup
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Severity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAlerts.map((alert) => (
              <tr key={alert.id} className={alert.resolved ? 'bg-gray-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{alert.type}</div>
                  <div className="text-sm text-gray-500">{alert.message}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {alert.startup}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    style={{
                      backgroundColor: `${severityColors[alert.severity]}20`,
                      color: severityColors[alert.severity]
                    }}
                  >
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {alert.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {alert.resolved ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Resolved
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Active
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {alert.resolved ? (
                    <button className="text-[#FF6A00] hover:text-[#e05d00]">
                      Reopen
                    </button>
                  ) : (
                    <button className="text-[#FF6A00] hover:text-[#e05d00]">
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alert Settings */}
      <div className="mt-8 bg-[#FFF9F0] rounded-xl p-6 border border-[#FFE5B4]">
        <h3 className="font-semibold text-gray-800 mb-4">Alert Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Burn Rate Threshold (%)</label>
            <input
              type="number"
              defaultValue="20"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-[#FF6A00] focus:border-[#FF6A00]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Growth Stagnation (days)</label>
            <input
              type="number"
              defaultValue="14"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-[#FF6A00] focus:border-[#FF6A00]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mentor Session Reminder (days)</label>
            <input
              type="number"
              defaultValue="1"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-[#FF6A00] focus:border-[#FF6A00]"
            />
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05d00] transition-colors">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomatedAlerts;