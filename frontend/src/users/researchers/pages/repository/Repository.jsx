import React from 'react';

const Repository = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Innovation Repository</h1>
        <p className="text-gray-600">Access and manage your research innovations and intellectual property</p>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Research Innovations</h2>
          <button className="py-2 px-4 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors">
            Add New Innovation
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800">Innovation Title {item}</h3>
                <span className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">Draft</span>
              </div>
              <p className="text-gray-600 text-sm mt-2">Brief description of the innovation and its potential impact...</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500">Last updated: 2 days ago</span>
                <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Repository;