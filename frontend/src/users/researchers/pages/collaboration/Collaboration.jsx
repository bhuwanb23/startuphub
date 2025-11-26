import React from 'react';

const Collaboration = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Collaboration & Co-Creation Hub</h1>
        <p className="text-gray-600">Connect with industry partners, academic institutions, and fellow researchers</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Active Collaborations</h2>
              <button className="py-2 px-4 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors">
                Start New Collaboration
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">Quantum Computing Research with TechCorp</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Active</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">Joint research project on quantum encryption algorithms with industry partner.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">Quantum Computing</span>
                  <span className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">Encryption</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#FF8C42] flex items-center justify-center text-white text-xs">TC</div>
                    <div className="w-8 h-8 rounded-full bg-[#FF6A00] flex items-center justify-center text-white text-xs">RD</div>
                  </div>
                  <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                    Open Workspace
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">Biotech Research Consortium</h3>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">Multi-institutional research consortium for personalized medicine development.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">Biotechnology</span>
                  <span className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">Healthcare</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#FF8C42] flex items-center justify-center text-white text-xs">U1</div>
                    <div className="w-8 h-8 rounded-full bg-[#FF6A00] flex items-center justify-center text-white text-xs">U2</div>
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">+3</div>
                  </div>
                  <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Collaboration Requests</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">MedTech Innovations</h3>
                  <span className="text-lg">🏥</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">Request to collaborate on medical device development project.</p>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 py-1 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm">
                    Accept
                  </button>
                  <button className="flex-1 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Network Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Partnerships</span>
                <span className="font-bold text-[#FF6A00]">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Requests</span>
                <span className="font-bold text-[#FF6A00]">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Institutions Connected</span>
                <span className="font-bold text-[#FF6A00]">8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;