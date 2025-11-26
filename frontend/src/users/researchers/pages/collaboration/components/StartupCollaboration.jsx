import React, { useState } from 'react';

const StartupCollaboration = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');

  const startups = [
    {
      id: 1,
      name: 'BioTech Innovations',
      domain: 'Biotechnology',
      description: 'Specializing in gene therapy and personalized medicine solutions',
      techCompatibility: 87,
      teamSize: '15-50',
      fundingStage: 'Series A'
    },
    {
      id: 2,
      name: 'Quantum Computing Ltd',
      domain: 'Quantum Computing',
      description: 'Developing quantum algorithms for optimization problems',
      techCompatibility: 92,
      teamSize: '10-15',
      fundingStage: 'Seed'
    },
    {
      id: 3,
      name: 'Green Energy Solutions',
      domain: 'Clean Energy',
      description: 'Next-generation solar panel technology with increased efficiency',
      techCompatibility: 78,
      teamSize: '50-100',
      fundingStage: 'Series B'
    },
    {
      id: 4,
      name: 'AI Robotics Corp',
      domain: 'Robotics',
      description: 'Autonomous robots for industrial automation',
      techCompatibility: 85,
      teamSize: '25-50',
      fundingStage: 'Series A'
    }
  ];

  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          startup.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === 'all' || startup.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const domains = ['all', ...new Set(startups.map(s => s.domain))];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">🔍 Collaborate with Startups</h1>
      
      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search startups by name or domain..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              {domains.map(domain => (
                <option key={domain} value={domain}>
                  {domain === 'all' ? 'All Domains' : domain}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Startup Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStartups.map((startup) => (
          <div key={startup.id} className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <div className="flex items-start mb-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div className="ml-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-900">{startup.name}</h3>
                <p className="text-orange-600 font-medium">{startup.domain}</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-500 mr-2">{startup.teamSize} employees</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    {startup.fundingStage}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{startup.description}</p>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Tech Compatibility Score</span>
                <span className="font-medium">{startup.techCompatibility}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full" 
                  style={{ width: `${startup.techCompatibility}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-grow bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                View Profile
              </button>
              <button className="flex-grow bg-white hover:bg-gray-50 border border-orange-500 text-orange-600 py-2 px-4 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                Request Collaboration
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartupCollaboration;