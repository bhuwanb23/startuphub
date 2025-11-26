import React, { useState } from 'react';

const TechTransfer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTRL, setSelectedTRL] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');

  const technologies = [
    {
      id: 1,
      title: 'Novel Gene Therapy Platform',
      description: 'Proprietary vector system for targeted gene delivery with enhanced safety profile',
      domain: 'Biotechnology',
      trl: 6,
      ipType: 'Patent Pending',
      application: 'Rare Genetic Disorders',
      readiness: 'Prototype validated in animal models'
    },
    {
      id: 2,
      title: 'Quantum Encryption Algorithm',
      description: 'Post-quantum cryptographic protocol resistant to quantum computing attacks',
      domain: 'Cybersecurity',
      trl: 4,
      ipType: 'Patent Filed',
      application: 'Financial Services, Government',
      readiness: 'Lab-scale validation complete'
    },
    {
      id: 3,
      title: 'Advanced Battery Materials',
      description: 'Next-generation lithium-sulfur battery chemistry with 3x energy density',
      domain: 'Energy Storage',
      trl: 5,
      ipType: 'Patent Granted',
      application: 'Electric Vehicles, Grid Storage',
      readiness: 'Component validation in relevant environment'
    },
    {
      id: 4,
      title: 'AI-Powered Drug Discovery',
      description: 'Machine learning platform for predicting molecular interactions and toxicity',
      domain: 'Pharmaceuticals',
      trl: 7,
      ipType: 'Trade Secret',
      application: 'Drug Development, Biotech',
      readiness: 'System prototype demonstration in operational environment'
    },
    {
      id: 5,
      title: 'Smart Agriculture Sensors',
      description: 'Low-cost IoT sensors for precision farming with edge analytics',
      domain: 'Agriculture',
      trl: 8,
      ipType: 'Patent Pending',
      application: 'Precision Agriculture, Smart Farming',
      readiness: 'Actual system completed and qualified'
    }
  ];

  const filteredTechnologies = technologies.filter(tech => {
    const matchesSearch = tech.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tech.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTRL = selectedTRL === 'all' || tech.trl === parseInt(selectedTRL);
    const matchesDomain = selectedDomain === 'all' || tech.domain === selectedDomain;
    return matchesSearch && matchesTRL && matchesDomain;
  });

  const domains = ['all', ...new Set(technologies.map(t => t.domain))];
  const trlLevels = ['all', 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Function to get TRL color
  const getTRLColor = (trl) => {
    if (trl <= 3) return 'bg-red-100 text-red-800';
    if (trl <= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">🔄 Tech Transfer Opportunities</h1>
      
      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search technologies by title or description..."
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
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={selectedTRL}
              onChange={(e) => setSelectedTRL(e.target.value)}
            >
              {trlLevels.map(trl => (
                <option key={trl} value={trl}>
                  {trl === 'all' ? 'All TRL Levels' : `TRL ${trl}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Technologies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTechnologies.map((tech) => (
          <div key={tech.id} className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{tech.title}</h3>
                <p className="text-orange-600 font-medium">{tech.domain}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTRLColor(tech.trl)}`}>
                  TRL {tech.trl}
                </span>
                <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {tech.ipType}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{tech.description}</p>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900">Applications:</p>
              <p className="text-sm text-gray-600">{tech.application}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900">Technology Readiness:</p>
              <p className="text-sm text-gray-600">{tech.readiness}</p>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-grow bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                Request Technology Transfer
              </button>
              <button className="flex-grow bg-white hover:bg-gray-50 border border-orange-500 text-orange-600 py-2 px-4 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                View License Terms
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechTransfer;