import React, { useState } from 'react';

const CollaborationWorkspace = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Business Plan Template.docx', type: 'doc', owner: 'You', lastModified: '2023-06-10' },
    { id: 2, name: 'Market Research.xlsx', type: 'xls', owner: 'TechFlow Inc.', lastModified: '2023-06-08' },
    { id: 3, name: 'Pitch Deck.pptx', type: 'ppt', owner: 'GreenEnergy Solutions', lastModified: '2023-06-05' }
  ]);

  const projects = [
    { id: 1, name: 'TechFlow Inc. - Market Expansion', status: 'In Progress', progress: 75 },
    { id: 2, name: 'GreenEnergy Solutions - Funding Round', status: 'Review', progress: 90 },
    { id: 3, name: 'HealthTrack - Product Development', status: 'Planning', progress: 30 }
  ];

  const discussions = [
    { id: 1, title: 'Market Entry Strategy for TechFlow', author: 'You', replies: 12, lastActivity: '2 hours ago' },
    { id: 2, title: 'Investor Pitch Feedback', author: 'Mentor Smith', replies: 8, lastActivity: '1 day ago' },
    { id: 3, title: 'Regulatory Compliance Questions', author: 'GreenEnergy Solutions', replies: 5, lastActivity: '2 days ago' }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Collaborative Workspace</h1>
        <p className="text-gray-600">Work together with your mentees on projects and documents</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'projects'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'documents'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveTab('discussions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'discussions'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Discussions
          </button>
        </nav>
      </div>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Active Projects</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {projects.map(project => (
              <div key={project.id} className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                    <div className="flex items-center mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'Review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                      <div className="ml-4 w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#FF6A00] h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{project.progress}%</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                      View Details
                    </button>
                    <button className="px-3 py-1 text-sm bg-[#FF6A00] text-white rounded-md hover:bg-[#e05500]">
                      Update Progress
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Shared Documents</h2>
            <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-md hover:bg-[#e05500] transition-colors">
              Upload Document
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {documents.map(doc => (
              <div key={doc.id} className="p-6 flex items-center">
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
                  {doc.type === 'doc' && <span className="text-blue-600">📝</span>}
                  {doc.type === 'xls' && <span className="text-green-600">📊</span>}
                  {doc.type === 'ppt' && <span className="text-red-600">📋</span>}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{doc.name}</h3>
                  <div className="flex text-sm text-gray-500">
                    <span>Owner: {doc.owner}</span>
                    <span className="mx-2">•</span>
                    <span>Last modified: {doc.lastModified}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                    Download
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Discussions Tab */}
      {activeTab === 'discussions' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Project Discussions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {discussions.map(discussion => (
              <div key={discussion.id} className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{discussion.title}</h3>
                    <div className="flex text-sm text-gray-500 mt-1">
                      <span>Started by {discussion.author}</span>
                      <span className="mx-2">•</span>
                      <span>{discussion.lastActivity}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {discussion.replies} replies
                    </span>
                    <button className="ml-4 px-3 py-1 text-sm bg-[#FF6A00] text-white rounded-md hover:bg-[#e05500]">
                      View Thread
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaborationWorkspace;