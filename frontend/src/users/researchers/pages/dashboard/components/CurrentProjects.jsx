import React from 'react';

const CurrentProjects = () => {
  const currentProjects = [
    { id: 1, title: 'Quantum Encryption Algorithms', version: 'v2.3', lastEdited: '2 hours ago', status: 'In Progress' },
    { id: 2, title: 'Neural Interface Chips', version: 'v1.8', lastEdited: '1 day ago', status: 'Review' },
    { id: 3, title: 'Bioengineered Materials', version: 'v3.1', lastEdited: '3 days ago', status: 'Testing' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">🔬 Current Projects Preview</h2>
        <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {currentProjects.map((project) => (
          <div key={project.id} className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 hover:border-[#FF8C42]/30 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800">{project.title}</h3>
                <div className="flex items-center mt-2">
                  <span className="text-xs bg-[#FFF5EB] text-[#FF6A00] px-2 py-1 rounded mr-2">{project.version}</span>
                  <span className="text-xs text-gray-500">{project.lastEdited}</span>
                </div>
              </div>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{project.status}</span>
            </div>
            <div className="flex space-x-2 mt-4">
              <button className="text-xs bg-[#FF6A00] text-white px-3 py-1 rounded-lg hover:bg-[#e05500] transition-colors">
                Open
              </button>
              <button className="text-xs border border-[#FF6A00] text-[#FF6A00] px-3 py-1 rounded-lg hover:bg-[#FFF5EB] transition-colors">
                Share
              </button>
              <button className="text-xs border border-gray-300 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                Export
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
        + New Research Project
      </button>
    </div>
  );
};

export default CurrentProjects;