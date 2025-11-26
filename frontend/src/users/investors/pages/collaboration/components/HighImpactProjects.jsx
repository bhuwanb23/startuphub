import React, { useState } from 'react';

const HighImpactProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: 'Green Hydrogen Production Facility',
      sector: 'Clean Energy',
      impactScore: 95,
      budget: '$120M',
      partners: ['Department of Energy', 'CleanTech Ventures', 'Global Impact Fund'],
      description: 'Large-scale green hydrogen production facility to support industrial decarbonization efforts.',
      status: 'Funding',
      timeline: '24 months',
      sdgAlignment: ['SDG 7', 'SDG 13']
    },
    {
      id: 2,
      name: 'AI-Powered Precision Agriculture',
      sector: 'AgriTech',
      impactScore: 88,
      budget: '$45M',
      partners: ['Ministry of Agriculture', 'AgriVentures', 'Sustainable Growth Fund'],
      description: 'AI-driven precision agriculture platform to optimize crop yields and reduce resource consumption.',
      status: 'Implementation',
      timeline: '18 months',
      sdgAlignment: ['SDG 2', 'SDG 12']
    },
    {
      id: 3,
      name: 'Urban Mobility Solutions',
      sector: 'Mobility',
      impactScore: 92,
      budget: '$85M',
      partners: ['Ministry of Transport', 'Smart Cities Initiative', 'Urban Development Fund'],
      description: 'Integrated urban mobility platform combining electric vehicles, public transit, and bike-sharing.',
      status: 'Planning',
      timeline: '36 months',
      sdgAlignment: ['SDG 11', 'SDG 13']
    },
    {
      id: 4,
      name: 'Digital Health Infrastructure',
      sector: 'Healthtech',
      impactScore: 90,
      budget: '$65M',
      partners: ['Ministry of Health', 'Health Innovation Fund', 'Global Health Partners'],
      description: 'Nationwide digital health platform to improve healthcare access and outcomes in rural areas.',
      status: 'Funding',
      timeline: '30 months',
      sdgAlignment: ['SDG 3', 'SDG 10']
    },
    {
      id: 5,
      name: 'Ocean Plastic Cleanup Initiative',
      sector: 'Environment',
      impactScore: 87,
      budget: '$30M',
      partners: ['Environmental Protection Agency', 'Ocean Conservation Fund', 'Blue Planet Partners'],
      description: 'Advanced ocean cleanup technology to remove plastic waste and restore marine ecosystems.',
      status: 'Implementation',
      timeline: '20 months',
      sdgAlignment: ['SDG 14', 'SDG 15']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planning': return 'bg-blue-100 text-blue-800';
      case 'Funding': return 'bg-yellow-100 text-yellow-800';
      case 'Implementation': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openCaseStudy = (project) => {
    setSelectedProject(project);
  };

  const closeCaseStudy = () => {
    setSelectedProject(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">High-Impact Projects</h2>
        <p className="text-gray-600">Explore ventures with significant social and environmental impact</p>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all relative">
            {/* Saffron highlight bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] rounded-t-xl"></div>
            
            <div className="pt-2">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-800">{project.name}</h3>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              
              <div className="flex items-center mb-3">
                <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                  {project.sector}
                </span>
                <div className="ml-2 flex items-center bg-orange-100 px-2 py-1 rounded">
                  <span className="text-orange-500 mr-1">⭐</span>
                  <span className="text-xs font-bold text-gray-800">{project.impactScore}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{project.description}</p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <div className="text-xs text-gray-500">Budget</div>
                  <div className="font-medium text-gray-800">{project.budget}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Timeline</div>
                  <div className="font-medium text-gray-800">{project.timeline}</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">Partners</div>
                <div className="flex flex-wrap gap-1">
                  {project.partners.slice(0, 2).map((partner, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {partner}
                    </span>
                  ))}
                  {project.partners.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      +{project.partners.length - 2} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => openCaseStudy(project)}
                  className="flex-1 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
                >
                  View Case Study
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedProject.name}</h3>
                <button 
                  onClick={closeCaseStudy}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex items-center mb-4">
                <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                  {selectedProject.sector}
                </span>
                <div className="ml-2 flex items-center bg-orange-100 px-2 py-1 rounded">
                  <span className="text-orange-500 mr-1">⭐</span>
                  <span className="text-xs font-bold text-gray-800">{selectedProject.impactScore} Impact Score</span>
                </div>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusColor(selectedProject.status)}`}>
                  {selectedProject.status}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">{selectedProject.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-3">Project Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget:</span>
                      <span className="font-medium">{selectedProject.budget}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timeline:</span>
                      <span className="font-medium">{selectedProject.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SDG Alignment:</span>
                      <div>
                        {selectedProject.sdgAlignment.map((sdg, index) => (
                          <span key={index} className="ml-1 px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                            {sdg}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-3">Partners</h4>
                  <div className="space-y-2">
                    {selectedProject.partners.map((partner, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00] text-xs mr-2">
                          {partner.charAt(0)}
                        </div>
                        <span className="text-gray-800">{partner}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-3">Impact Metrics</h4>
                <div className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] p-4 rounded-lg text-white">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">{selectedProject.impactScore}</div>
                    <div className="text-sm">Overall Impact Score</div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all font-medium">
                  Express Interest
                </button>
                <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium">
                  Share Project
                </button>
                <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium">
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HighImpactProjects;