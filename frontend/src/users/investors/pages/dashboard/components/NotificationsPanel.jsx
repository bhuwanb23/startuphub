import React from 'react';

const NotificationsPanel = () => {
  const notifications = [
    {
      id: 1,
      type: 'opportunity',
      title: 'New Investment Opportunity',
      message: 'GreenTech Solutions matches your investment criteria',
      time: '2 minutes ago',
      unread: true,
    },
    {
      id: 2,
      type: 'deadline',
      title: 'Due Diligence Reminder',
      message: 'Complete NeuroSync AI review by tomorrow',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      type: 'portfolio',
      title: 'Portfolio Update',
      message: 'HealthPulse AI valuation increased by 15%',
      time: '3 hours ago',
      unread: false,
    },
    {
      id: 4,
      type: 'alert',
      title: 'Risk Alert',
      message: 'New competitor threat identified for FinStream Analytics',
      time: '5 hours ago',
      unread: false,
    },
    {
      id: 5,
      type: 'pipeline',
      title: 'Pipeline Update',
      message: 'EcoPack Solutions moved to Term Negotiation stage',
      time: '1 day ago',
      unread: false,
    },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'opportunity': return '💡';
      case 'deadline': return '⏰';
      case 'portfolio': return '💼';
      case 'alert': return '⚠️';
      case 'pipeline': return '📈';
      default: return '🔔';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'opportunity': return 'bg-blue-100 text-blue-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      case 'portfolio': return 'bg-green-100 text-green-800';
      case 'alert': return 'bg-yellow-100 text-yellow-800';
      case 'pipeline': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
        <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
          Mark All Read
        </button>
      </div>
      
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${
              notification.unread ? 'bg-[#FFF5EB]/30' : 'bg-white'
            }`}
          >
            <div className="flex">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
                {getTypeIcon(notification.type)}
              </div>
              <div className="ml-3 flex-1">
                <h3 className="font-bold text-gray-800">{notification.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-gray-500">{notification.time}</span>
                  {notification.unread && (
                    <span className="ml-2 px-2 py-0.5 bg-[#FF6A00] text-white rounded-full text-xs">
                      New
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel;