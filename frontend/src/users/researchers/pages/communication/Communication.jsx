import React from 'react';

const Communication = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Communication Center</h1>
        <p className="text-gray-600">Connect with your research network, manage discussions, and share updates</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Recent Messages</h2>
              <button className="py-2 px-4 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors">
                New Message
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">Quantum Computing Project Team</h3>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Dr. Smith: We've completed the initial testing phase and ready for peer review.</p>
                <div className="mt-2 flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-[#FF8C42] flex items-center justify-center text-white text-xs">DS</div>
                  <div className="w-6 h-6 rounded-full bg-[#FF6A00] flex items-center justify-center text-white text-xs">MJ</div>
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">+2</div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">Grant Application Feedback</h3>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Funding Board: Your proposal has been approved with minor revisions requested.</p>
                <div className="mt-2 flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-[#FF8C42] flex items-center justify-center text-white text-xs">FB</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Access</h2>
            <div className="space-y-3">
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Research Team Chats
              </button>
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Institutional Announcements
              </button>
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Conference Coordination
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00] mr-3">
                  📅
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Upcoming Conference</h3>
                  <p className="text-sm text-gray-600">International Research Summit - Registration closes in 3 days</p>
                  <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00] mr-3">
                  📄
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">New Publication</h3>
                  <p className="text-sm text-gray-600">Your paper has been accepted for publication in Nature Journal</p>
                  <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;