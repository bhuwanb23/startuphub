import React, { useState } from 'react';

const LicensingOpportunities = () => {
  const [opportunities, setOpportunities] = useState([
    { 
      id: 1, 
      title: 'AI-Powered Drug Discovery Platform', 
      department: 'Biotechnology', 
      stage: 'TRL 7', 
      industry: 'Pharmaceuticals',
      description: 'Novel AI algorithms for accelerating drug discovery process with 40% reduction in time-to-market.',
      contact: 'Dr. Sarah Johnson',
      matchScore: 92
    },
    { 
      id: 2, 
      title: 'Sustainable Energy Storage Solution', 
      department: 'Chemical Engineering', 
      stage: 'TRL 6', 
      industry: 'Clean Energy',
      description: 'Advanced battery technology with 3x longer lifespan and faster charging capabilities.',
      contact: 'Prof. Michael Chen',
      matchScore: 85
    },
    { 
      id: 3, 
      title: 'Quantum Computing Algorithms', 
      department: 'Computer Science', 
      stage: 'TRL 5', 
      industry: 'Tech/Finance',
      description: 'Breakthrough quantum algorithms for optimization problems with applications in finance and logistics.',
      contact: 'Dr. Emily Rodriguez',
      matchScore: 88
    },
    { 
      id: 4, 
      title: 'Biodegradable Plastics Formula', 
      department: 'Materials Science', 
      stage: 'TRL 4', 
      industry: 'Packaging',
      description: 'Environmentally friendly plastic alternatives that decompose within 90 days.',
      contact: 'Prof. James Wilson',
      matchScore: 78
    },
  ]);

  const getStatusColor = (stage) => {
    switch (stage) {
      case 'TRL 7': return 'bg-green-100 text-green-800';
      case 'TRL 6': return 'bg-blue-100 text-blue-800';
      case 'TRL 5': return 'bg-purple-100 text-purple-800';
      case 'TRL 4': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Licensing Opportunities</h1>
        <p className="text-gray-600">Marketplace-style listing of research available for licensing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-gray-800">{opportunity.title}</h2>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(opportunity.stage)}`}>
                  {opportunity.stage}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {opportunity.department}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {opportunity.industry}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {opportunity.contact}
                </div>
              </div>
              
              <p className="text-gray-700 text-sm mb-4">{opportunity.description}</p>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Match Score</div>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-[#F4A300] h-2 rounded-full" 
                        style={{ width: `${opportunity.matchScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">{opportunity.matchScore}%</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-[#F4A300] hover:text-[#F26B1D] text-sm font-medium">
                    View Details
                  </button>
                  <button className="bg-[#F4A300] hover:bg-[#F26B1D] text-white px-3 py-1 rounded text-sm transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors">
            Add New Opportunity
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors">
            Export Opportunities List
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors">
            Match with Industry Database
          </button>
        </div>
      </div>
    </div>
  );
};

export default LicensingOpportunities;