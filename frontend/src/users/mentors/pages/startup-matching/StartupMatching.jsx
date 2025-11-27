import React, { useState } from 'react';

const StartupMatching = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    industry: '',
    stage: '',
    location: ''
  });

  const startups = [
    {
      id: 1,
      name: 'TechFlow Inc.',
      industry: 'Software',
      stage: 'Seed',
      location: 'Bangalore',
      description: 'AI-powered workflow automation platform',
      matchScore: 92
    },
    {
      id: 2,
      name: 'GreenEnergy Solutions',
      industry: 'Clean Energy',
      stage: 'Series A',
      location: 'Hyderabad',
      description: 'Solar panel efficiency optimization',
      matchScore: 87
    },
    {
      id: 3,
      name: 'HealthTrack',
      industry: 'Healthcare',
      stage: 'Pre-seed',
      location: 'Mumbai',
      description: 'Wearable health monitoring device',
      matchScore: 78
    }
  ];

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">AI-Based Startup Matching System</h1>
        <p className="text-gray-600">Discover startups that align with your expertise</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Filter Startups</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedFilters.industry}
              onChange={(e) => handleFilterChange('industry', e.target.value)}
            >
              <option value="">All Industries</option>
              <option value="Software">Software</option>
              <option value="Clean Energy">Clean Energy</option>
              <option value="Healthcare">Healthcare</option>
              <option value="FinTech">FinTech</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedFilters.stage}
              onChange={(e) => handleFilterChange('stage', e.target.value)}
            >
              <option value="">All Stages</option>
              <option value="Pre-seed">Pre-seed</option>
              <option value="Seed">Seed</option>
              <option value="Series A">Series A</option>
              <option value="Series B">Series B</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedFilters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Matched Startups</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {startups.map(startup => (
            <div key={startup.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{startup.name}</h3>
                  <p className="text-gray-600 mt-1">{startup.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {startup.industry}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {startup.stage}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {startup.location}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#FF6A00]">{startup.matchScore}%</div>
                  <div className="text-sm text-gray-500">Match Score</div>
                  <button className="mt-2 px-4 py-2 bg-[#FF6A00] text-white rounded-md hover:bg-[#e05500] transition-colors">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartupMatching;