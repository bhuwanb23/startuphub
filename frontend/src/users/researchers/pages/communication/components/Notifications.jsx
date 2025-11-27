import React from 'react';

const Notifications = () => {
  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New message from Dr. Sarah Johnson',
      content: 'We\'ve completed the initial testing phase and ready for peer review.',
      time: '2 hours ago',
      read: false,
      icon: '✉️'
    },
    {
      id: 2,
      type: 'document',
      title: 'Document updated: Quantum_Algorithm_Report.pdf',
      content: 'A new version of the document has been uploaded by Dr. Michael Chen.',
      time: '4 hours ago',
      read: true,
      icon: '📂'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Upcoming meeting: Quantum Computing Research Review',
      content: 'Your meeting is scheduled for tomorrow at 2:00 PM. Join link is available.',
      time: '1 day ago',
      read: false,
      icon: '📅'
    },
    {
      id: 4,
      type: 'system',
      title: 'System maintenance scheduled',
      content: 'The system will be under maintenance this weekend from 10 PM to 2 AM.',
      time: '1 day ago',
      read: true,
      icon: '⚙️'
    },
    {
      id: 5,
      type: 'message',
      title: 'Reply from Funding Board',
      content: 'Your grant proposal has been approved with minor revisions requested.',
      time: '2 days ago',
      read: false,
      icon: '✉️'
    },
    {
      id: 6,
      type: 'document',
      title: 'New document shared: Grant Proposal Draft.docx',
      content: 'Dr. Elena Rodriguez has shared a new document with you.',
      time: '2 days ago',
      read: true,
      icon: '📂'
    },
    {
      id: 7,
      type: 'meeting',
      title: 'Meeting recording available',
      content: 'The recording from yesterday\'s Prototype Testing Session is now available.',
      time: '3 days ago',
      read: true,
      icon: '📹'
    },
    {
      id: 8,
      type: 'system',
      title: 'New feature: AI Research Assistant',
      content: 'We\'ve launched a new AI-powered research assistant to help with your projects.',
      time: '3 days ago',
      read: true,
      icon: '🤖'
    }
  ];

  // Get type color
  const getTypeColor = (type) => {
    switch (type) {
      case 'message': return 'bg-blue-100 text-blue-800';
      case 'document': return 'bg-green-100 text-green-800';
      case 'meeting': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get type name
  const getTypeName = (type) => {
    switch (type) {
      case 'message': return 'Message';
      case 'document': return 'Document';
      case 'meeting': return 'Meeting';
      case 'system': return 'System';
      default: return 'Notification';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">🔔 Notifications</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Filters */}
        <div className="lg:w-1/4">
          <div className="bg-gray-50 rounded-lg p-4 border border-orange-100">
            <h2 className="font-semibold text-gray-900 mb-4">Filter Notifications</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-3 py-2 rounded-md text-sm bg-orange-100 text-orange-800 font-medium">
                All Notifications
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                Messages
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                Document Updates
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                Meeting Alerts
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                System Notifications
              </button>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium">
                Mark All as Read
              </button>
              <button className="w-full mt-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm font-medium">
                Clear All
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Notifications Timeline */}
        <div className="lg:w-3/4">
          <div className="bg-gray-50 rounded-lg p-4 border border-orange-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-gray-900">Recent Notifications</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {notifications.filter(n => !n.read).length} unread
              </span>
            </div>
            
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`bg-white rounded-lg p-4 border-l-4 ${
                    notification.read 
                      ? 'border-l-gray-300' 
                      : 'border-l-orange-500'
                  } hover:shadow-sm transition-shadow`}
                >
                  <div className="flex">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 text-lg mr-4">
                      {notification.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className={`font-medium ${notification.read ? 'text-gray-900' : 'text-gray-900 font-bold'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-orange-500"></span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{notification.content}</p>
                      <div className="flex items-center mt-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                          {getTypeName(notification.type)}
                        </span>
                        <span className="text-xs text-gray-500 ml-3">{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button className="text-orange-600 hover:text-orange-800 font-medium">
                Load More Notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;