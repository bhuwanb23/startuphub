import React from 'react';

const NotificationsUpdates = () => {
  // Mock data
  const notifications = [
    {
      id: 1,
      type: "session",
      message: "TechFlow Inc. rescheduled your meeting to Jun 16, 10:00 AM",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      type: "document",
      message: "GreenEnergy Solutions uploaded a new pitch deck",
      time: "1 day ago",
      unread: false
    },
    {
      id: 3,
      type: "request",
      message: "New startup request: BioTech Innovations",
      time: "2 days ago",
      unread: true
    },
    {
      id: 4,
      type: "session",
      message: "HealthTrack completed post-session feedback",
      time: "3 days ago",
      unread: false
    },
    {
      id: 5,
      type: "document",
      message: "FinTech Pro shared market research report",
      time: "4 days ago",
      unread: false
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "session":
        return "📅";
      case "document":
        return "📄";
      case "request":
        return "➕";
      default:
        return "🔔";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "session":
        return "bg-blue-100 text-blue-800";
      case "document":
        return "bg-green-100 text-green-800";
      case "request":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">Notifications & Updates</h2>
        <button className="text-[#FF6A00] hover:text-[#FF8C42] font-medium text-sm">Mark All Read</button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`flex items-start p-3 rounded-lg ${notification.unread ? 'bg-[#FFF9F0]' : 'bg-white'} hover:bg-[#FFF2DC] transition-colors`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getTypeColor(notification.type)}`}>
              <span>{getTypeIcon(notification.type)}</span>
            </div>
            <div className="flex-1">
              <p className={`text-sm ${notification.unread ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
            {notification.unread && (
              <div className="w-2 h-2 rounded-full bg-[#FF6A00] ml-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsUpdates;