import React, { useState } from 'react';

const NotificationCenter = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Term Sheet Ready for Review',
      content: 'The term sheet for TechStart Inc. Series A is ready for your review.',
      category: 'deal',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'New Message from GreenTech Solutions',
      content: 'Sarah Johnson has sent you a new message in the GreenTech deal chat.',
      category: 'message',
      time: '4 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Due Diligence Document Uploaded',
      content: 'Financial statements for MediCore Ltd. have been uploaded to the shared document room.',
      category: 'due-diligence',
      time: '1 day ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Portfolio Company Update',
      content: 'CleanEnergy Fund has raised an additional $50M in their Series B round.',
      category: 'portfolio',
      time: '1 day ago',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      title: 'NDA Expiring Soon',
      content: 'Your NDA with AI Innovations Corp will expire in 30 days.',
      category: 'deal',
      time: '2 days ago',
      read: false,
      priority: 'high'
    },
    {
      id: 6,
      title: 'Meeting Reminder',
      content: 'Your board meeting with TechStart Inc. is scheduled for tomorrow at 10:00 AM.',
      category: 'message',
      time: '2 days ago',
      read: true,
      priority: 'medium'
    }
  ]);
  
  const categories = [
    { id: 'all', name: 'All Notifications', count: notifications.length },
    { id: 'deal', name: 'Deal Alerts', count: notifications.filter(n => n.category === 'deal').length },
    { id: 'message', name: 'Messages', count: notifications.filter(n => n.category === 'message').length },
    { id: 'due-diligence', name: 'Due Diligence Updates', count: notifications.filter(n => n.category === 'due-diligence').length },
    { id: 'portfolio', name: 'Portfolio Alerts', count: notifications.filter(n => n.category === 'portfolio').length }
  ];
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'deal': return '💼';
      case 'message': return '💬';
      case 'due-diligence': return '🔍';
      case 'portfolio': return '📊';
      default: return '🔔';
    }
  };
  
  const getCategoryColor = (category) => {
    switch (category) {
      case 'deal': return 'bg-blue-100 text-blue-800';
      case 'message': return 'bg-purple-100 text-purple-800';
      case 'due-diligence': return 'bg-green-100 text-green-800';
      case 'portfolio': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const filteredNotifications = activeCategory === 'all' 
    ? notifications 
    : notifications.filter(n => n.category === activeCategory);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Notification Center</h2>
        <p className="text-gray-600">Stay updated with real-time alerts and important notifications</p>
      </div>
      
      {/* Header with Mark All as Read */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <h3 className="text-lg font-bold text-gray-800">
            Notifications {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-[#FF6A00] text-white rounded-full text-sm">
                {unreadCount} unread
              </span>
            )}
          </h3>
        </div>
        <button
          onClick={markAllAsRead}
          className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all"
        >
          Mark All as Read
        </button>
      </div>
      
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg transition-all flex items-center ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-2">{getCategoryIcon(category.id)}</span>
            {category.name} ({category.count})
          </button>
        ))}
      </div>
      
      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-5 hover:bg-gray-50 transition-all ${
                  !notification.read ? 'bg-[#FFF5EB]' : ''
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-[#FF8C42] flex items-center justify-center text-white">
                      {getCategoryIcon(notification.category)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {notification.title}
                      </h4>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <span className="w-2 h-2 rounded-full bg-[#FF6A00] mt-2"></span>
                        )}
                        <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(notification.priority)}`}>
                          {notification.priority}
                        </span>
                      </div>
                    </div>
                    
                    <p className={`mt-1 text-sm ${notification.read ? 'text-gray-600' : 'text-gray-800'}`}>
                      {notification.content}
                    </p>
                    
                    <div className="flex items-center mt-3">
                      <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(notification.category)}`}>
                        {categories.find(c => c.id === notification.category)?.name}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="px-3 py-1 bg-[#FF8C42] text-white rounded text-xs hover:bg-[#FF6A00] transition-all"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">🔔</div>
            <h3 className="text-lg font-bold text-gray-800">No notifications</h3>
            <p className="text-gray-600 mt-1">You're all caught up!</p>
          </div>
        )}
      </div>
      
      {/* Notification Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Notification Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Email Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Deal Alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6A00]"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Messages</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6A00]"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Due Diligence Updates</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6A00]"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Push Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Portfolio Alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6A00]"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">System Updates</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6A00]"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Weekly Digest</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6A00]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;