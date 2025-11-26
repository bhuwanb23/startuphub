import React from 'react';

const Grants = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Grant & Funding Matchmaking</h1>
        <p className="text-gray-600">Discover and apply for research grants and funding opportunities</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Recommended Grants</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search grants..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">NSF Grant for Quantum Computing Research</h3>
                  <span className="text-lg">💰</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">National Science Foundation funding for breakthrough research in quantum computing applications.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">Technology</span>
                  <span className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">Quantum</span>
                  <span className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">$500K - $2M</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Deadline: Dec 15, 2025</span>
                  <button className="py-1 px-3 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">NIH Biomedical Research Grant</h3>
                  <span className="text-lg">🧬</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">National Institutes of Health funding for innovative biomedical research projects.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">Healthcare</span>
                  <span className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">Biotech</span>
                  <span className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">$250K - $1M</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Deadline: Jan 30, 2026</span>
                  <button className="py-1 px-3 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Funding Statistics</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Applications Submitted</span>
                  <span className="font-bold">8</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#FF6A00] h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Success Rate</span>
                  <span className="font-bold">37.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#FF6A00] h-2 rounded-full" style={{ width: '37.5%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Total Funding Secured</span>
                  <span className="font-bold">$1.2M</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#FF6A00] h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Submit New Application
              </button>
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                View Application Status
              </button>
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Grant Writing Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grants;