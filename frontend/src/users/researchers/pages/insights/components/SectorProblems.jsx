import React, { useState } from 'react';

const SectorProblems = () => {
  const [selectedSector, setSelectedSector] = useState('all');
  const [sortBy, setSortBy] = useState('urgency');

  const sectors = [
    { id: 'all', name: 'All Sectors' },
    { id: 'ai', name: 'AI & Machine Learning' },
    { id: 'biotech', name: 'Biotechnology' },
    { id: 'energy', name: 'Energy & CleanTech' },
    { id: 'manufacturing', name: 'Advanced Manufacturing' },
    { id: 'materials', name: 'Advanced Materials' }
  ];

  // Mock problem statements
  const problems = [
    {
      id: 1,
      title: 'Data Privacy in Healthcare AI Systems',
      sector: 'AI & Machine Learning',
      description: 'Healthcare organizations struggle with implementing AI solutions while maintaining patient data privacy and complying with regulations like HIPAA and GDPR.',
      urgency: 92,
      value: 85,
      companiesAffected: 1200,
      potentialImpact: '₹450 Cr market opportunity'
    },
    {
      id: 2,
      title: 'Scalable Gene Therapy Manufacturing',
      sector: 'Biotechnology',
      description: 'Current gene therapy production methods are expensive and difficult to scale, limiting patient access to life-saving treatments.',
      urgency: 88,
      value: 90,
      companiesAffected: 850,
      potentialImpact: '₹320 Cr market opportunity'
    },
    {
      id: 3,
      title: 'Battery Recycling Infrastructure',
      sector: 'Energy & CleanTech',
      description: 'Lack of efficient recycling processes for lithium-ion batteries creates environmental concerns and supply chain bottlenecks for critical materials.',
      urgency: 85,
      value: 88,
      companiesAffected: 1500,
      potentialImpact: '₹580 Cr market opportunity'
    },
    {
      id: 4,
      title: 'Real-time Quality Control in Additive Manufacturing',
      sector: 'Advanced Manufacturing',
      description: 'Ensuring consistent quality in 3D-printed parts without slowing down production remains a significant challenge for manufacturers.',
      urgency: 78,
      value: 82,
      companiesAffected: 2100,
      potentialImpact: '₹290 Cr market opportunity'
    },
    {
      id: 5,
      title: 'High-temperature Superconductors for Power Grids',
      sector: 'Advanced Materials',
      description: 'Developing cost-effective, stable superconducting materials that can operate at higher temperatures for power transmission applications.',
      urgency: 80,
      value: 87,
      companiesAffected: 650,
      potentialImpact: '₹410 Cr market opportunity'
    },
    {
      id: 6,
      title: 'Edge AI Processing for Autonomous Vehicles',
      sector: 'AI & Machine Learning',
      description: 'Achieving low-latency, high-accuracy AI processing directly on autonomous vehicle hardware without relying on cloud connectivity.',
      urgency: 90,
      value: 92,
      companiesAffected: 950,
      potentialImpact: '₹670 Cr market opportunity'
    }
  ];

  // Filter and sort problems
  const filteredProblems = problems
    .filter(problem => selectedSector === 'all' || problem.sector.toLowerCase().includes(selectedSector.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'urgency') return b.urgency - a.urgency;
      if (sortBy === 'value') return b.value - a.value;
      return b.companiesAffected - a.companiesAffected;
    });

  // Get urgency color
  const getUrgencyColor = (urgency) => {
    if (urgency >= 90) return 'bg-red-100 text-red-800';
    if (urgency >= 80) return 'bg-orange-100 text-orange-800';
    if (urgency >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">🔍 Sector-Specific Problem Statements</h1>
      
      {/* Filters and Sorting */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
          >
            {sectors.map(sector => (
              <option key={sector.id} value={sector.id}>{sector.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="urgency">Urgency Score</option>
            <option value="value">Value Score</option>
            <option value="companies">Companies Affected</option>
          </select>
        </div>
      </div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProblems.map((problem) => (
          <div key={problem.id} className="bg-white rounded-lg shadow p-6 border border-orange-100 hover:border-orange-300 transition-colors duration-150">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{problem.title}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(problem.urgency)}`}>
                Urgency: {problem.urgency}/100
              </span>
            </div>
            
            <div className="mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {problem.sector}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{problem.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-orange-50 rounded-lg p-3">
                <p className="text-xs text-orange-800">Value Score</p>
                <p className="text-lg font-bold text-orange-600">{problem.value}/100</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <p className="text-xs text-orange-800">Companies Affected</p>
                <p className="text-lg font-bold text-orange-600">{problem.companiesAffected.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900">Potential Market Impact</p>
              <p className="text-sm text-gray-600">{problem.potentialImpact}</p>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-grow bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium">
                Submit Solution Proposal
              </button>
              <button className="bg-white hover:bg-gray-50 border border-orange-500 text-orange-600 py-2 px-4 rounded-md text-sm font-medium">
                Collaborate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Problem Statistics */}
      <div className="mt-8 bg-white rounded-lg shadow p-6 border border-orange-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Problem Landscape Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-orange-600">{problems.length}</p>
            <p className="text-sm text-gray-600">Total Problems</p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-orange-600">
              {problems.filter(p => p.urgency >= 90).length}
            </p>
            <p className="text-sm text-gray-600">Critical Issues</p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-orange-600">
              {sectors.filter(s => s.id !== 'all').length}
            </p>
            <p className="text-sm text-gray-600">Sectors Covered</p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-orange-600">
              {problems.reduce((sum, p) => sum + p.companiesAffected, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Companies Affected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorProblems;