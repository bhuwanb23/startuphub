import React from 'react';

const Notifications = () => {
  const notifications = [
    { id: 1, type: 'deadline', title: 'Grant Deadline', message: 'NSF Grant application due in 3 days', time: '2 hours ago', priority: 'high' },
    { id: 2, type: 'review', title: 'Paper Review Request', message: 'Nature Journal requests review of your submission', time: '5 hours ago', priority: 'medium' },
    { id: 3, type: 'collab', title: 'Collaboration Invite', message: 'TechCorp wants to collaborate on Quantum Research', time: '1 day ago', priority: 'high' },
    { id: 4, type: 'ipr', title: 'IPR Alert', message: 'New patent filed in your research area', time: '1 day ago', priority: 'medium' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">🔔 Notifications & Updates</h2>
        <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
          Mark All Read
        </button>
      </div>
      
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 hover:border-[#FF8C42]/30 transition-all">
            <div className="flex">
              <div className="mr-3">
                {notification.type === 'deadline' && <div className="w-8 h-8 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00]">📅</div>}
                {notification.type === 'review' && <div className="w-8 h-8 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00]">📄</div>}
                {notification.type === 'collab' && <div className="w-8 h-8 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00]">🤝</div>}
                {notification.type === 'ipr' && <div className="w-8 h-8 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00]">🧠</div>}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">{notification.title}</h3>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <div className="mt-2 flex">
                  <button className="text-xs text-[#FF6A00] hover:text-[#e05500] font-medium">
                    Take Action
                  </button>
                  <button className="text-xs text-gray-500 hover:text-gray-700 ml-3 font-medium">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm text-[#FF6A00] hover:text-[#e05500] font-medium py-2">
        View All Notifications
      </button>
    </div>
  );
};

export default Notifications;