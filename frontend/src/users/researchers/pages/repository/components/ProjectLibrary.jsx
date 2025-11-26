import React from 'react';

const ProjectLibrary = ({ viewMode, setViewMode }) => {
  const projects = [
    {
      id: 1,
      title: 'Quantum Encryption Algorithms',
      tags: ['AI', 'Cryptography', 'Security'],
      version: 'v2.3',
      collaborators: ['Dr. Smith', 'Dr. Johnson'],
      lastUpdated: '2 hours ago',
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Neural Interface Chips',
      tags: ['Biotech', 'Hardware', 'Neuroscience'],
      version: 'v1.8',
      collaborators: ['Dr. Williams', 'Dr. Brown'],
      lastUpdated: '1 day ago',
      status: 'Review'
    },
    {
      id: 3,
      title: 'Bioengineered Materials',
      tags: ['Materials', 'Sustainability', 'Chemistry'],
      version: 'v3.1',
      collaborators: ['Dr. Davis', 'Dr. Miller'],
      lastUpdated: '3 days ago',
      status: 'Testing'
    },
    {
      id: 4,
      title: 'AI-Powered Drug Discovery',
      tags: ['AI', 'Biotech', 'Healthcare'],
      version: 'v1.2',
      collaborators: ['Dr. Wilson', 'Dr. Taylor'],
      lastUpdated: '1 week ago',
      status: 'Draft'
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">🔬 Research Project Library</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#FF6A00] text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#FF6A00] text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="py-2 px-4 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
            + New Project
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all bg-white">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-800 text-lg">{project.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'Review' ? 'bg-yellow-100 text-yellow-800' :
                  project.status === 'Testing' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span key={index} className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <span>Version: {project.version}</span>
                <span>Updated: {project.lastUpdated}</span>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="flex -space-x-2">
                  {project.collaborators.slice(0, 3).map((collaborator, index) => (
                    <div key={index} className="w-8 h-8 rounded-full bg-[#FF8C42] flex items-center justify-center text-white text-xs border-2 border-white">
                      {collaborator.charAt(0)}
                    </div>
                  ))}
                  {project.collaborators.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs border-2 border-white">
                      +{project.collaborators.length - 3}
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-500 ml-2">
                  {project.collaborators.length} collaborator{project.collaborators.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Open Project
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collaborators</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{project.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 2 && (
                        <span className="text-xs text-gray-500">+{project.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.version}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        {project.collaborators.slice(0, 2).map((collaborator, index) => (
                          <div key={index} className="w-6 h-6 rounded-full bg-[#FF8C42] flex items-center justify-center text-white text-xs border-2 border-white">
                            {collaborator.charAt(0)}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{project.collaborators.length}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'Review' ? 'bg-yellow-100 text-yellow-800' :
                      project.status === 'Testing' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-[#FF6A00] hover:text-[#e05500] font-medium">
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectLibrary;