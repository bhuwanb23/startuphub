import React from 'react';

const Dashboard = () => {
  // Mock data for dashboard cards
  const stats = [
    { id: 1, name: 'Total Revenue', value: '$45,231', change: '+20.1%', changeType: 'positive' },
    { id: 2, name: 'New Customers', value: '2,350', change: '+18.2%', changeType: 'positive' },
    { id: 3, name: 'Pending IPR Filings', value: '12', change: '-2.1%', changeType: 'negative' },
    { id: 4, name: 'Active Collaborations', value: '8', change: '+4.5%', changeType: 'positive' },
  ];

  const recentActivity = [
    { id: 1, title: 'Patent Application Submitted', description: 'Trademark application for "InnovateX" submitted successfully', time: '2 hours ago' },
    { id: 2, name: 'Alex Johnson', role: 'Mentor', action: 'sent you a message', time: '4 hours ago' },
    { id: 3, title: 'Funding Match Found', description: 'New investor match: VentureCap Partners', time: '1 day ago' },
    { id: 4, name: 'Sarah Williams', role: 'Investor', action: 'viewed your profile', time: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Startup Name!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your startup today.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
            <p className={`text-sm mt-2 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
            <button className="text-[#FF6A00] text-sm font-medium hover:underline">View all</button>
          </div>
          <div className="mt-4 space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center">
                  {activity.name ? (
                    <span className="text-[#FF6A00] font-medium">{activity.name.charAt(0)}</span>
                  ) : (
                    <span className="text-[#FF6A00]">📝</span>
                  )}
                </div>
                <div className="ml-3">
                  {activity.name ? (
                    <>
                      <p className="text-sm font-medium text-gray-800">
                        {activity.name} <span className="font-normal text-gray-600">{activity.action}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.role}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    </>
                  )}
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-800">Quick Actions</h2>
          <div className="mt-4 space-y-3">
            <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00]">
                📝
              </div>
              <span className="ml-3 font-medium text-gray-700">Submit IPR Application</span>
            </button>
            <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00]">
                👥
              </div>
              <span className="ml-3 font-medium text-gray-700">Find Mentors</span>
            </button>
            <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00]">
                💰
              </div>
              <span className="ml-3 font-medium text-gray-700">Check Funding Matches</span>
            </button>
            <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00]">
                📊
              </div>
              <span className="ml-3 font-medium text-gray-700">View Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;