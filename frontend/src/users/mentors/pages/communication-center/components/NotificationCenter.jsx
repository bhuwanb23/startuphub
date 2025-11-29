import React, { useState } from 'react';

const NotificationCenter = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Sample notification data
  const notifications = [
    {
      id: 1,
      type: 'session',
      title: 'Upcoming Mentoring Session',
      message: 'Your session with TechStart Inc. is scheduled for tomorrow at 2:00 PM',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'document',
      title: 'New Document Uploaded',
      message: 'TechStart Inc. uploaded their quarterly report',
      time: '5 hours ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'feedback',
      title: 'Feedback Received',
      message: 'You have new feedback on your session with GrowthHackers',
      time: '1 day ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'match',
      title: 'New Match Recommendation',
      message: 'We found a potential match: InnovateLab for your expertise in AI',
      time: '1 day ago',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'session',
      title: 'Session Reminder',
      message: 'Reminder: Your session with DataDriven is in 1 hour',
      time: '1 day ago',
      read: true,
      priority: 'high'
    },
    {
      id: 6,
      type: 'document',
      title: 'Document Request',
      message: 'FinTech Solutions requested the market analysis template',
      time: '2 days ago',
      read: false,
      priority: 'medium'
    }
  ];

  const filterOptions = [
    { id: 'all', name: 'All Notifications', count: notifications.length },
    { id: 'session', name: 'Session Reminders', count: notifications.filter(n => n.type === 'session').length },
    { id: 'document', name: 'File Uploaded', count: notifications.filter(n => n.type === 'document').length },
    { id: 'feedback', name: 'Feedback Received', count: notifications.filter(n => n.type === 'feedback').length },
    { id: 'match', name: 'New Match Recommendations', count: notifications.filter(n => n.type === 'match').length }
  ];

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.type === activeFilter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    // In a real app, this would update the backend
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    // In a real app, this would update the backend
    console.log('Marking all notifications as read');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Notification Center</h2>
          <span className="bg-[#FF6A00] text-white text-xs font-bold px-2 py-1 rounded-full">
            {unreadCount} unread
          </span>
        </div>
        <p className="text-gray-600 mt-1">Manage all your notifications in one place</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-[#FFF9F0] text-[#FF6A00] border border-[#FFDAB9]'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.name} {filter.count > 0 && `(${filter.count})`}
          </button>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={markAllAsRead}
          className="text-sm text-[#FF6A00] hover:text-[#e05500] font-medium"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🔔</div>
            <p className="text-gray-500">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-4 rounded-xl border transition-all hover:shadow-md ${
                notification.read 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-[#FFF9F0] border-[#FFDAB9]'
              }`}
            >
              <div className="flex items-start">
                <div className={`w-3 h-3 rounded-full mr-3 mt-2 ${
                  notification.priority === 'high' ? 'bg-red-500' :
                  notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  <div className="flex mt-3">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 capitalize">
                      {notification.type.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                {!notification.read && (
                  <button 
                    onClick={() => markAsRead(notification.id)}
                    className="ml-2 text-xs text-[#FF6A00] hover:text-[#e05500]"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;