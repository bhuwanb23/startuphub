import React, { useState } from 'react';

const IndustryPartnership = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');

  const challenges = [
    {
      id: 1,
      company: 'TechCorp Industries',
      industry: 'Information Technology',
      title: 'Edge Computing Optimization',
      description: 'Need solutions for reducing latency in edge computing environments while maintaining security protocols.',
      domain: 'Computer Science',
      feasibility: 85,
      expectedOutcome: '20% reduction in processing latency',
      postedDate: '2025-11-15'
    },
    {
      id: 2,
      company: 'MediHealth Solutions',
      industry: 'Healthcare',
      title: 'AI-Powered Diagnostic Tool',
      description: 'Seeking partnerships to develop machine learning models for early disease detection from medical imaging.',
      domain: 'Biomedical Engineering',
      feasibility: 92,
      expectedOutcome: '95% accuracy in preliminary diagnosis',
      postedDate: '2025-11-10'
    },
    {
      id: 3,
      company: 'GreenManufacturing Inc',
      industry: 'Manufacturing',
      title: 'Sustainable Production Processes',
      description: 'Looking for research collaborations to implement circular economy principles in manufacturing.',
      domain: 'Environmental Science',
      feasibility: 78,
      expectedOutcome: '30% reduction in waste production',
      postedDate: '2025-11-05'
    },
    {
      id: 4,
      company: 'AutoDrive Systems',
      industry: 'Automotive',
      title: 'Autonomous Vehicle Sensor Fusion',
      description: 'Require advanced algorithms for integrating data from multiple sensors in autonomous vehicles.',
      domain: 'Electrical Engineering',
      feasibility: 88,
      expectedOutcome: 'Improved object detection accuracy in adverse weather',
      postedDate: '2025-11-01'
    }
  ];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         challenge.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || challenge.industry === selectedIndustry;
    const matchesDomain = selectedDomain === 'all' || challenge.domain === selectedDomain;
    return matchesSearch && matchesIndustry && matchesDomain;
  });

  const industries = ['all', ...new Set(challenges.map(c => c.industry))];
  const domains = ['all', ...new Set(challenges.map(c => c.domain))];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">🏭 Industry Partnership Finder</h1>
      
      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search challenges or companies..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>
                  {industry === 'all' ? 'All Industries' : industry}
                </option>
              ))}
            </select>
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

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredChallenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
                <p className="text-orange-600 font-medium">{challenge.company}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {challenge.industry}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{challenge.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {challenge.domain}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Posted: {challenge.postedDate}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Technical Feasibility Rating</span>
                <span className="font-medium">{challenge.feasibility}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full" 
                  style={{ width: `${challenge.feasibility}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900">Expected Outcome:</p>
              <p className="text-sm text-gray-600">{challenge.expectedOutcome}</p>
            </div>
            
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium transition duration-150 ease-in-out">
              Propose Solution
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryPartnership;