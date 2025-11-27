import React from 'react';

const MentorDashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mentor Dashboard</h1>
        <p className="text-gray-600">Welcome to your mentoring portal</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Mentees Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Mentees</span>
              <span className="font-bold">12</span>
            </div>
            <div className="flex justify-between">
              <span>Active Sessions</span>
              <span className="font-bold">8</span>
            </div>
            <div className="flex justify-between">
              <span>Completed Programs</span>
              <span className="font-bold">5</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-[#FF6A00] pl-3 py-1">
              <p className="font-medium">Startup Pitch Review</p>
              <p className="text-sm text-gray-600">Today, 3:00 PM</p>
            </div>
            <div className="border-l-4 border-[#FF8C42] pl-3 py-1">
              <p className="font-medium">Business Model Workshop</p>
              <p className="text-sm text-gray-600">Tomorrow, 10:00 AM</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="bg-[#FFF2DC] rounded-full p-2 mr-3">
                <span className="text-[#FF6A00]">📝</span>
              </div>
              <div>
                <p className="font-medium">Feedback submitted</p>
                <p className="text-sm text-gray-600">For TechFlow Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="text-[#FF6A00] text-2xl mb-2">📅</div>
            <div>Schedule Session</div>
          </button>
          <button className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="text-[#FF6A00] text-2xl mb-2">📊</div>
            <div>View Reports</div>
          </button>
          <button className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="text-[#FF6A00] text-2xl mb-2">👥</div>
            <div>Manage Mentees</div>
          </button>
          <button className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="text-[#FF6A00] text-2xl mb-2">⚙️</div>
            <div>Settings</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;