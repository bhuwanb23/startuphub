import React from 'react';

const CollaborationControls = () => {
  const collaborators = [
    { id: 1, name: 'Dr. Smith', role: 'Lead Researcher', avatar: 'DS' },
    { id: 2, name: 'Dr. Johnson', role: 'Co-researcher', avatar: 'DJ' },
    { id: 3, name: 'Dr. Williams', role: 'Reviewer', avatar: 'DW' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">🤝 Collaboration Controls</h2>
      
      {/* Access Permissions */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-800">Access Permissions</h3>
          <button className="text-xs text-[#FF6A00] hover:text-[#e05500] font-medium">
            Edit
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Public access</span>
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
          </div>
        </div>
      </div>
      
      {/* Collaborators */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-800">Collaborators</h3>
          <button className="text-xs text-[#FF6A00] hover:text-[#e05500] font-medium">
            + Add
          </button>
        </div>
        <div className="space-y-3">
          {collaborators.map((collaborator) => (
            <div key={collaborator.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#FF8C42] flex items-center justify-center text-white text-xs mr-3">
                  {collaborator.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{collaborator.name}</div>
                  <div className="text-xs text-gray-500">{collaborator.role}</div>
                </div>
              </div>
              <button className="text-xs text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Comment Threads */}
      <div>
        <h3 className="font-medium text-gray-800 mb-3">Comment Threads</h3>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-[#FF8C42] flex items-center justify-center text-white text-xs mr-2">
                DS
              </div>
              <div className="text-xs font-medium text-gray-800">Dr. Smith</div>
              <span className="text-xs text-gray-500 ml-2">2 hours ago</span>
            </div>
            <p className="text-xs text-gray-600">This section needs more experimental data to support the claims.</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-[#FF6A00] flex items-center justify-center text-white text-xs mr-2">
                DJ
              </div>
              <div className="text-xs font-medium text-gray-800">Dr. Johnson</div>
              <span className="text-xs text-gray-500 ml-2">1 day ago</span>
            </div>
            <p className="text-xs text-gray-600">I've added the additional data in the supplementary file.</p>
          </div>
        </div>
        <button className="w-full mt-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
          + Add Comment
        </button>
      </div>
    </div>
  );
};

export default CollaborationControls;