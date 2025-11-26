import React, { useState } from 'react';

const ResearchNetwork = () => {
  const [selectedDomains, setSelectedDomains] = useState([]);

  const institutions = [
    {
      id: 1,
      name: 'MIT Research Labs',
      location: 'Cambridge, MA',
      domain: 'AI/ML',
      credibilityScore: 95,
      publications: 1240,
      collaborations: 42,
      logo: 'MIT',
      description: 'Leading research in artificial intelligence and machine learning'
    },
    {
      id: 2,
      name: 'Stanford BioTech Center',
      location: 'Stanford, CA',
      domain: 'Biotech',
      credibilityScore: 92,
      publications: 980,
      collaborations: 38,
      logo: 'Stanford',
      description: 'Pioneering biotechnology research and innovation'
    },
    {
      id: 3,
      name: 'ETH Zurich Energy Institute',
      location: 'Zurich, Switzerland',
      domain: 'Clean Energy',
      credibilityScore: 88,
      publications: 760,
      collaborations: 31,
      logo: 'ETH',
      description: 'Advancing sustainable energy technologies and solutions'
    },
    {
      id: 4,
      name: 'Oxford Quantum Computing',
      location: 'Oxford, UK',
      domain: 'Quantum',
      credibilityScore: 90,
      publications: 650,
      collaborations: 27,
      logo: 'Oxford',
      description: 'Leading research in quantum computing and applications'
    },
    {
      id: 5,
      name: 'National University of Singapore',
      location: 'Singapore',
      domain: 'Fintech',
      credibilityScore: 85,
      publications: 540,
      collaborations: 24,
      logo: 'NUS',
      description: 'Innovative research in financial technology and blockchain'
    },
    {
      id: 6,
      name: 'Max Planck Institute',
      location: 'Munich, Germany',
      domain: 'Neuroscience',
      credibilityScore: 94,
      publications: 1120,
      collaborations: 45,
      logo: 'MPI',
      description: 'Fundamental research in neuroscience and cognitive science'
    }
  ];

  const domains = ['AI/ML', 'Biotech', 'Clean Energy', 'Quantum', 'Fintech', 'Neuroscience', 'Materials', 'Robotics'];

  const toggleDomain = (domain) => {
    setSelectedDomains(prev => {
      if (prev.includes(domain)) {
        return prev.filter(d => d !== domain);
      } else {
        return [...prev, domain];
      }
    });
  };

  const filteredInstitutions = selectedDomains.length > 0
    ? institutions.filter(inst => selectedDomains.includes(inst.domain))
    : institutions;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Research Institution Network</h2>
        <p className="text-gray-600">Connect with leading universities and research centers</p>
      </div>

      {/* Domain Filter Sidebar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Research Domains</h3>
        <div className="flex flex-wrap gap-2">
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => toggleDomain(domain)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedDomains.includes(domain)
                  ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* Institution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstitutions.map((institution) => (
          <div key={institution.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00] font-bold">
                {institution.logo}
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-800">{institution.name}</h3>
                <p className="text-sm text-gray-600">{institution.location}</p>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{institution.description}</p>
            
            <div className="flex items-center mb-4">
              <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                {institution.domain}
              </span>
              <div className="ml-2 flex items-center bg-yellow-100 px-2 py-1 rounded">
                <span className="text-yellow-500 mr-1">⭐</span>
                <span className="text-xs font-bold text-gray-800">{institution.credibilityScore}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-800">{institution.publications}</div>
                <div className="text-xs text-gray-600">Publications</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-800">{institution.collaborations}</div>
                <div className="text-xs text-gray-600">Collaborations</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Connect
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchNetwork;