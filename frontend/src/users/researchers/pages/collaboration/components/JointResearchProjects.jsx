import React, { useState } from 'react';

const JointResearchProjects = () => {
  const [activeView, setActiveView] = useState('kanban'); // 'kanban' or 'timeline'
  const [selectedProject, setSelectedProject] = useState(null);

  // Sample projects data
  const projects = [
    {
      id: 1,
      title: 'Quantum Computing for Drug Discovery',
      description: 'Exploring quantum algorithms to accelerate molecular modeling for pharmaceutical research',
      status: 'in-progress',
      collaborators: ['Dr. Sarah Johnson', 'Prof. Michael Chen', 'BioTech Innovations'],
      startDate: '2025-10-01',
      endDate: '2027-09-30',
      budget: '₹2.5 Crores',
      progress: 35
    },
    {
      id: 2,
      title: 'Sustainable Aviation Fuels',
      description: 'Developing bio-based alternatives to conventional jet fuel',
      status: 'review',
      collaborators: ['Dr. Elena Rodriguez', 'GreenEnergy Solutions'],
      startDate: '2025-12-01',
      endDate: '2027-11-30',
      budget: '₹1.8 Crores',
      progress: 15
    },
    {
      id: 3,
      title: 'AI for Climate Modeling',
      description: 'Using machine learning to improve climate prediction models',
      status: 'prototype',
      collaborators: ['Dr. Robert Kim', 'Dr. James Wilson'],
      startDate: '2025-08-01',
      endDate: '2026-07-31',
      budget: '₹1.2 Crores',
      progress: 65
    }
  ];

  // Kanban board data
  const kanbanColumns = [
    {
      id: 'ideas',
      title: '💡 Ideas',
      color: 'bg-blue-100',
      projects: projects.filter(p => p.status === 'ideas')
    },
    {
      id: 'review',
      title: '🔍 Review',
      color: 'bg-yellow-100',
      projects: projects.filter(p => p.status === 'review')
    },
    {
      id: 'prototype',
      title: '🧪 Prototype',
      color: 'bg-orange-100',
      projects: projects.filter(p => p.status === 'prototype')
    },
    {
      id: 'testing',
      title: '🔬 Testing',
      color: 'bg-purple-100',
      projects: projects.filter(p => p.status === 'testing')
    },
    {
      id: 'publish',
      title: '📄 Publish',
      color: 'bg-green-100',
      projects: projects.filter(p => p.status === 'publish')
    }
  ];

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'ideas': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'prototype': return 'bg-orange-100 text-orange-800';
      case 'testing': return 'bg-purple-100 text-purple-800';
      case 'publish': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">🔬 Joint Research Projects</h1>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeView === 'kanban'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setActiveView('kanban')}
          >
            Kanban View
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeView === 'timeline'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setActiveView('timeline')}
          >
            Timeline View
          </button>
        </div>
      </div>

      {activeView === 'kanban' ? (
        // Kanban Board View
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {kanbanColumns.map((column) => (
            <div key={column.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-lg font-semibold ${column.color} px-3 py-1 rounded-full`}>
                  {column.title}
                </h2>
                <span className="bg-white text-gray-700 text-sm font-medium px-2 py-1 rounded-full">
                  {column.projects.length}
                </span>
              </div>
              
              <div className="space-y-4">
                {column.projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="bg-white rounded-lg shadow p-4 border border-gray-200 cursor-pointer hover:border-orange-300 transition-colors duration-150"
                    onClick={() => setSelectedProject(project)}
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-orange-500 h-1.5 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.collaborators.slice(0, 2).map((collaborator, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800"
                        >
                          {collaborator}
                        </span>
                      ))}
                      {project.collaborators.length > 2 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{project.collaborators.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Budget: {project.budget}</span>
                      <span>End: {project.endDate}</span>
                    </div>
                  </div>
                ))}
                
                {column.id === 'ideas' && (
                  <button className="w-full bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-orange-400 hover:text-orange-600 transition-colors duration-150">
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span className="text-sm font-medium">New Project Idea</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Timeline View
        <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Timeline</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-orange-200"></div>
            
            <div className="space-y-8">
              {projects.map((project, index) => (
                <div key={project.id} className="relative pl-12">
                  {/* Timeline dot */}
                  <div className="absolute left-2 top-4 w-4 h-4 rounded-full bg-orange-500 border-4 border-white"></div>
                  
                  <div 
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 cursor-pointer hover:border-orange-300 transition-colors duration-150"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="text-sm font-medium">{project.startDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">End Date</p>
                        <p className="text-sm font-medium">{project.endDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Budget</p>
                        <p className="text-sm font-medium">{project.budget}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.collaborators.map((collaborator, idx) => (
                        <span 
                          key={idx} 
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800"
                        >
                          {collaborator}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setSelectedProject(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">{selectedProject.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Project Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Start Date:</span>
                      <span className="font-medium">{selectedProject.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">End Date:</span>
                      <span className="font-medium">{selectedProject.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Budget:</span>
                      <span className="font-medium">{selectedProject.budget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedProject.status)}`}>
                        {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Progress</h3>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completion</span>
                      <span className="font-medium">{selectedProject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-orange-500 h-3 rounded-full" 
                        style={{ width: `${selectedProject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Collaborators</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.collaborators.map((collaborator, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"
                    >
                      {collaborator}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-grow bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                  Manage Team
                </button>
                <button className="flex-grow bg-white hover:bg-gray-50 border border-orange-500 text-orange-600 py-2 px-4 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                  Update Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JointResearchProjects;