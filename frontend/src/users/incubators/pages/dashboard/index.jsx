import React from 'react';

const IncubatorDashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Incubator Dashboard</h1>
        <p className="text-gray-600">Welcome to your incubator management hub</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 text-xl">📊</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Active Startups</h3>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-xl">👥</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Programs Active</h3>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-xl">💰</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Funding Secured</h3>
              <p className="text-2xl font-bold text-gray-900">$2.4M</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:shadow-lg transition-all hover:border-indigo-200 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-2xl mb-3">
              📋
            </div>
            <h3 className="font-semibold text-gray-800">New Application</h3>
            <p className="text-gray-600 text-sm mt-1">Review startup applications</p>
          </button>
          
          <button className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:shadow-lg transition-all hover:border-indigo-200 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl mb-3">
              📅
            </div>
            <h3 className="font-semibold text-gray-800">Schedule Session</h3>
            <p className="text-gray-600 text-sm mt-1">Plan mentoring sessions</p>
          </button>
          
          <button className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:shadow-lg transition-all hover:border-indigo-200 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl mb-3">
              💰
            </div>
            <h3 className="font-semibold text-gray-800">Funding Tracker</h3>
            <p className="text-gray-600 text-sm mt-1">Monitor funding progress</p>
          </button>
          
          <button className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:shadow-lg transition-all hover:border-indigo-200 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl mb-3">
              📊
            </div>
            <h3 className="font-semibold text-gray-800">Analytics</h3>
            <p className="text-gray-600 text-sm mt-1">View performance metrics</p>
          </button>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 text-sm">📋</span>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-800">New application received</h3>
                <p className="text-gray-600 text-sm">TechFlow Innovations submitted their application</p>
                <p className="text-gray-400 text-xs mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-sm">📅</span>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-800">Session scheduled</h3>
                <p className="text-gray-600 text-sm">Mentor meeting with GrowthHackers set for tomorrow</p>
                <p className="text-gray-400 text-xs mt-1">5 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-sm">💰</span>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-800">Funding milestone</h3>
                <p className="text-gray-600 text-sm">DataDriven secured Series A funding</p>
                <p className="text-gray-400 text-xs mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncubatorDashboard;