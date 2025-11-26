import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Researcher Dashboard</h1>
        <p className="text-gray-600">Welcome back, Researcher. Here's your research overview.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Research Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-[#FF6A00]">12</div>
                <div className="text-sm text-gray-600">Active Projects</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-[#FF6A00]">8</div>
                <div className="text-sm text-gray-600">Patents Filed</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-[#FF6A00]">15</div>
                <div className="text-sm text-gray-600">Collaborations</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00] mr-3">
                  📄
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Research Paper Published</h3>
                  <p className="text-sm text-gray-600">"Advanced AI Algorithms in Healthcare" published in Nature Journal</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00] mr-3">
                  💰
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Grant Application Submitted</h3>
                  <p className="text-sm text-gray-600">$250K NSF Grant for Quantum Computing Research</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Submit New Research
              </button>
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Apply for Grants
              </button>
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Collaborate with Industry
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Upcoming Deadlines</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-800">Patent Filing</div>
                <div className="text-sm text-gray-600">Quantum Encryption Algorithm</div>
                <div className="text-xs text-gray-500 mt-1">Due: Nov 30, 2025</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-800">Grant Report</div>
                <div className="text-sm text-gray-600">NIH Funding - Phase 2</div>
                <div className="text-xs text-gray-500 mt-1">Due: Dec 15, 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;