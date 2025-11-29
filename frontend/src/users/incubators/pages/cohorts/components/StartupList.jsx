import React, { useState } from 'react';

const StartupList = () => {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [sortBy, setSortBy] = useState('name');
  const [filterStage, setFilterStage] = useState('all');

  // Mock data for startups
  const startups = [
    { id: 1, logo: "🚀", name: "TechNova", trl: 7, stage: "Growth", readinessScore: 8.2, mentor: "Sarah Johnson" },
    { id: 2, logo: "📱", name: "MobileGenius", trl: 6, stage: "Validation", readinessScore: 7.5, mentor: "Michael Chen" },
    { id: 3, logo: "🛍️", name: "EcomPro", trl: 5, stage: "Validation", readinessScore: 6.8, mentor: "David Wilson" },
    { id: 4, logo: "🏥", name: "HealthTrack", trl: 8, stage: "Growth", readinessScore: 9.1, mentor: "Emma Rodriguez" },
    { id: 5, logo: "🚗", name: "AutoPilot", trl: 7, stage: "Growth", readinessScore: 8.7, mentor: "James Miller" },
    { id: 6, logo: "🌱", name: "GreenEnergy", trl: 6, stage: "Validation", readinessScore: 7.9, mentor: "Lisa Thompson" }
  ];

  // Filter startups based on stage
  const filteredStartups = filterStage === 'all' 
    ? startups 
    : startups.filter(startup => startup.stage.toLowerCase() === filterStage);

  // Sort startups
  const sortedStartups = [...filteredStartups].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'trl') {
      return b.trl - a.trl;
    } else if (sortBy === 'score') {
      return b.readinessScore - a.readinessScore;
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Startup Directory</h1>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">View:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    viewMode === 'table' 
                      ? 'bg-white text-[#FF6A00] shadow' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Table
                </button>
                <button 
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    viewMode === 'cards' 
                      ? 'bg-white text-[#FF6A00] shadow' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Cards
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Stage:</span>
              <select 
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              >
                <option value="all">All Stages</option>
                <option value="validation">Validation</option>
                <option value="growth">Growth</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              >
                <option value="name">Name</option>
                <option value="trl">TRL</option>
                <option value="score">Readiness Score</option>
              </select>
            </div>
          </div>
        </div>
        
        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Startup</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">TRL</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Stage</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Readiness Score</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Mentor</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedStartups.map((startup) => (
                  <tr key={startup.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{startup.logo}</span>
                        <span className="font-medium">{startup.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        TRL {startup.trl}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        startup.stage === 'Validation' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {startup.stage}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{startup.readinessScore}/10</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#FF6A00] h-2 rounded-full" 
                            style={{ width: `${startup.readinessScore * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{startup.mentor}</td>
                    <td className="py-4 px-4">
                      <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium mr-3">
                        View
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                        Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedStartups.map((startup) => (
              <div key={startup.id} className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{startup.logo}</span>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{startup.name}</h3>
                      <p className="text-gray-600 text-sm">{startup.stage} Stage</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    TRL {startup.trl}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Readiness Score</span>
                    <span className="font-medium">{startup.readinessScore}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#FF6A00] h-2 rounded-full" 
                      style={{ width: `${startup.readinessScore * 10}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600 text-sm">Mentor:</span>
                  <span className="font-medium">{startup.mentor}</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-[#FF6A00] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#e05500] transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StartupList;