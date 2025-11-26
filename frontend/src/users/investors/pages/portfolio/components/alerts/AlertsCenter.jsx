import React, { useState } from 'react';

const AlertsCenter = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock alert data
  const alerts = [
    {
      id: 1,
      type: 'burn',
      title: 'High Burn Rate Alert',
      description: 'NeuroSync AI burn rate increased 18% this month, exceeding threshold',
      startup: 'NeuroSync AI',
      severity: 'high',
      date: '2023-06-28',
      read: false
    },
    {
      id: 2,
      type: 'runway',
      title: 'Runway Warning',
      description: 'GreenTech Pro runway decreased to 5.2 months, below 6-month threshold',
      startup: 'GreenTech Pro',
      severity: 'medium',
      date: '2023-06-25',
      read: false
    },
    {
      id: 3,
      type: 'kpi',
      title: 'KPI Drop Detected',
      description: 'FinStream Analytics MRR decreased 8% for two consecutive months',
      startup: 'FinStream Analytics',
      severity: 'medium',
      date: '2023-06-22',
      read: true
    },
    {
      id: 4,
      type: 'market',
      title: 'Market Risk Notification',
      description: 'New regulatory changes in EU may impact NeuroSync AI expansion plans',
      startup: 'NeuroSync AI',
      severity: 'high',
      date: '2023-06-20',
      read: false
    },
    {
      id: 5,
      type: 'burn',
      title: 'Burn Rate Alert',
      description: 'HealthPulse AI burn rate increased 12% this quarter',
      startup: 'HealthPulse AI',
      severity: 'low',
      date: '2023-06-18',
      read: true
    },
    {
      id: 6,
      type: 'runway',
      title: 'Runway Alert',
      description: 'EcoPack Solutions runway at 7.1 months, approaching threshold',
      startup: 'EcoPack Solutions',
      severity: 'low',
      date: '2023-06-15',
      read: true
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'burn': return '🔥';
      case 'runway': return '⛽';
      case 'kpi': return '📊';
      case 'market': return '🌍';
      default: return '⚠️';
    }
  };

  const filteredAlerts = activeFilter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === activeFilter);

  const unreadCount = alerts.filter(alert => !alert.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Alerts Center</h2>
        <p className="text-gray-600">Portfolio risk notifications and warnings</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Alerts ({alerts.length})
          </button>
          <button
            onClick={() => setActiveFilter('burn')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'burn'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Burn Rate (2)
          </button>
          <button
            onClick={() => setActiveFilter('runway')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'runway'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Runway (2)
          </button>
          <button
            onClick={() => setActiveFilter('kpi')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'kpi'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            KPI Drops (1)
          </button>
          <button
            onClick={() => setActiveFilter('market')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === 'market'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Market Risk (1)
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-800">Recent Alerts</h3>
          <div className="text-sm text-gray-600">
            {unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 rounded-lg border ${
                alert.read 
                  ? 'bg-white border-gray-200' 
                  : 'bg-[#FFF5EB] border-[#FF8C42]'
              }`}
            >
              <div className="flex items-start">
                <div className="text-2xl mr-3">{getTypeIcon(alert.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-800">{alert.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(alert.severity)}`}>
                      {getSeverityIcon(alert.severity)} {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{alert.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-sm">
                      <span className="font-medium text-gray-800">{alert.startup}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-gray-500">{alert.date}</span>
                    </div>
                    {!alert.read && (
                      <span className="w-2 h-2 rounded-full bg-[#FF6A00]"></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Severity Legend */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Alert Severity Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-red-500 mr-2">🔴</span>
            <div>
              <div className="font-medium text-red-800">High Severity</div>
              <div className="text-xs text-red-600">Requires immediate attention</div>
            </div>
          </div>
          <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <span className="text-yellow-500 mr-2">🟡</span>
            <div>
              <div className="font-medium text-yellow-800">Medium Severity</div>
              <div className="text-xs text-yellow-600">Monitor closely</div>
            </div>
          </div>
          <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-green-500 mr-2">🟢</span>
            <div>
              <div className="font-medium text-green-800">Low Severity</div>
              <div className="text-xs text-green-600">Informational</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsCenter;