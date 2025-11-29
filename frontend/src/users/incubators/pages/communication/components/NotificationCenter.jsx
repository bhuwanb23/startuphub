import React, { useState } from 'react';

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'alert', 
      title: 'Mentor Session Reminder', 
      content: 'Your session with Dr. Sarah Johnson is scheduled for tomorrow at 2 PM', 
      time: '2 hours ago', 
      read: false,
      priority: 'high'
    },
    { 
      id: 2, 
      type: 'reminder', 
      title: 'Application Deadline', 
      content: 'Deadline for Demo Day applications is approaching (July 1st)', 
      time: '1 day ago', 
      read: false,
      priority: 'medium'
    },
    { 
      id: 3, 
      type: 'mention', 
      title: 'New Mention', 
      content: 'Alex Johnson mentioned you in \'General Discussion\'', 
      time: '1 day ago', 
      read: true,
      priority: 'low'
    },
    { 
      id: 4, 
      type: 'alert', 
      title: 'System Maintenance', 
      content: 'Scheduled maintenance this Sunday from 2 AM to 4 AM', 
      time: '2 days ago', 
      read: true,
      priority: 'medium'
    },
    { 
      id: 5, 
      type: 'reminder', 
      title: 'Feedback Request', 
      content: 'Please provide feedback for the mentorship session', 
      time: '3 days ago', 
      read: false,
      priority: 'low'
    }
  ]);

  const tabs = [
    { id: 'all', name: 'All Notifications' },
    { id: 'alerts', name: 'Alerts' },
    { id: 'reminders', name: 'Reminders' },
    { id: 'mentions', name: 'Mentions' }
  ];

  const filteredNotifications = notifications.filter(notification => {
    return activeTab === 'all' || notification.type === activeTab;
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Notification Center</h2>
            <p className="text-gray-600">Manage your alerts, reminders, and mentions</p>
          </div>
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-orange-600 hover:text-orange-800 text-sm font-medium"
          >
            Mark All as Read
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === tab.id
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 border border-gray-200 rounded-lg ${
              !notification.read ? 'bg-blue-50 border-l-4 border-l-orange-500' : 'bg-white'
            }`}
          >
            <div className="flex justify-between">
              <div>
                <div className="flex items-center mb-1">
                  {!notification.read && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  )}
                  <h3 className="font-medium text-gray-800">{notification.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">{notification.content}</p>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-xs px-2 py-1 rounded-full mb-2 ${
                  notification.priority === 'high' 
                    ? 'bg-red-100 text-red-800' 
                    : notification.priority === 'medium' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                }`}>
                  {notification.priority}
                </span>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-xs text-orange-600 hover:text-orange-800"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔔</div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
          <p className="text-gray-500">You're all caught up!</p>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;