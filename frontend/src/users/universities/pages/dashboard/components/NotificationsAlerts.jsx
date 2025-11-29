import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { getNotificationTypeColor } from '../utils/formatters';

const NotificationsAlerts = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Notifications & Alerts</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-lg animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Notifications & Alerts</h2>
        <div className="text-red-500">Error loading data: {error}</div>
      </div>
    );
  }

  if (!data) return null;

  const { notificationsAlerts } = data;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Notifications & Alerts</h2>
      <div className="space-y-3">
        {notificationsAlerts.map((notification) => (
          <div key={notification.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex justify-between items-start mb-1">
              <div className="font-medium text-gray-800">{notification.title}</div>
              <span className={`text-xs px-2 py-1 rounded-full ${getNotificationTypeColor(notification.type)}`}>
                {notification.type}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
            <div className="text-xs text-gray-500">{notification.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsAlerts;