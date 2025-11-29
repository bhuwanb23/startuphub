import React, { useState } from 'react';

const AcademicCollaboration = () => {
  const [activeTab, setActiveTab] = useState('institutes');

  // Mock data for academic partners
  const institutes = [
    { id: 1, name: 'Stanford University', logo: 'SU', description: 'Leading research university', projects: 8, faculty: 12 },
    { id: 2, name: 'MIT Research Labs', logo: 'MIT', description: 'Innovation and technology research', projects: 5, faculty: 8 },
    { id: 3, name: 'Cambridge Institute', logo: 'CI', description: 'Advanced scientific research', projects: 6, faculty: 10 }
  ];

  // Mock data for joint research projects
  const projects = [
    { id: 1, title: 'Quantum Computing Applications', institute: 'MIT Research Labs', status: 'Active', progress: 65 },
    { id: 2, title: 'Biomedical Engineering Solutions', institute: 'Stanford University', status: 'Planning', progress: 20 },
    { id: 3, title: 'Sustainable Energy Research', institute: 'Cambridge Institute', status: 'Completed', progress: 100 }
  ];

  // Mock data for facility access requests
  const requests = [
    { id: 1, requester: 'Dr. Jane Smith', institute: 'Stanford University', facility: 'BioLab A', status: 'Approved', date: '2023-06-15' },
    { id: 2, requester: 'Prof. John Davis', institute: 'MIT Research Labs', facility: 'ChemLab B', status: 'Pending', date: '2023-06-18' },
    { id: 3, requester: 'Dr. Emily Wilson', institute: 'Cambridge Institute', facility: 'Physics Lab C', status: 'Rejected', date: '2023-06-10' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Academic & Research Collaboration</h2>
        <p className="text-gray-600">Coordinate with academic institutions and manage research partnerships</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'institutes'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('institutes')}
        >
          Partner Institutes
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'projects'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('projects')}
        >
          Joint Research Projects
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'facilities'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('facilities')}
        >
          Facility Access Requests
        </button>
      </div>

      {/* Partner Institutes */}
      {activeTab === 'institutes' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {institutes.map((institute) => (
              <div key={institute.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold mr-3">
                    {institute.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{institute.name}</h3>
                    <p className="text-sm text-gray-600">{institute.projects} active projects</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{institute.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{institute.faculty} faculty members</span>
                  <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                    View Projects
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Joint Research Projects */}
      {activeTab === 'projects' && (
        <div>
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institute</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.institute}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        project.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : project.status === 'Planning' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-orange-600 hover:text-orange-900 mr-3">View</button>
                      <button className="text-gray-600 hover:text-gray-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Shared Project Boards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-gray-800 mb-2">To Do</h4>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600">Literature review</li>
                  <li className="text-sm text-gray-600">Experimental setup</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-gray-800 mb-2">In Progress</h4>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600">Data collection</li>
                  <li className="text-sm text-gray-600">Prototype development</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-gray-800 mb-2">Completed</h4>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600">Project proposal</li>
                  <li className="text-sm text-gray-600">Initial research</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Facility Access Requests */}
      {activeTab === 'facilities' && (
        <div>
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requester</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institute</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.requester}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.institute}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.facility}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === 'Approved' 
                          ? 'bg-green-100 text-green-800' 
                          : request.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-orange-600 hover:text-orange-900 mr-3">Review</button>
                      <button className="text-gray-600 hover:text-gray-900">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
              New Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicCollaboration;