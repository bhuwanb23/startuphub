import React, { useState } from 'react';

const Shortlisting = () => {
  const [startups, setStartups] = useState([
    {
      id: 1,
      name: 'TechFlow Innovations',
      sector: 'AI',
      score: 85,
      status: 'Review Complete',
      teamSize: 5,
      stage: 'MVP'
    },
    {
      id: 2,
      name: 'GreenEnergy Solutions',
      sector: 'Clean Energy',
      score: 92,
      status: 'Recommended',
      teamSize: 8,
      stage: 'Growth'
    },
    {
      id: 3,
      name: 'HealthTrack',
      sector: 'Healthcare',
      score: 78,
      status: 'Review Complete',
      teamSize: 3,
      stage: 'Idea'
    },
    {
      id: 4,
      name: 'FinTech Pro',
      sector: 'FinTech',
      score: 95,
      status: 'Strongly Recommended',
      teamSize: 12,
      stage: 'Growth'
    },
    {
      id: 5,
      name: 'EduTech Innovations',
      sector: 'Education',
      score: 88,
      status: 'Recommended',
      teamSize: 6,
      stage: 'MVP'
    },
    {
      id: 6,
      name: 'BioTech Dynamics',
      sector: 'Biotech',
      score: 72,
      status: 'Rejected',
      teamSize: 4,
      stage: 'Idea'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Review Complete':
        return 'bg-gray-100 text-gray-800';
      case 'Recommended':
        return 'bg-blue-100 text-blue-800';
      case 'Strongly Recommended':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const moveStartup = (id, newStatus) => {
    setStartups(prev => prev.map(startup => 
      startup.id === id 
        ? { ...startup, status: newStatus } 
        : startup
    ));
  };

  const columns = [
    { id: 'review', title: 'Review Complete', status: 'Review Complete' },
    { id: 'recommended', title: 'Recommended', status: 'Recommended' },
    { id: 'strongly', title: 'Strongly Recommended', status: 'Strongly Recommended' },
    { id: 'rejected', title: 'Rejected', status: 'Rejected' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Shortlisting Workspace</h2>
        <p className="text-gray-600">Kanban board for startup shortlisting and candidate comparison</p>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">{column.title}</h3>
              <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
                {startups.filter(s => s.status === column.status).length}
              </span>
            </div>
            
            <div className="space-y-3 min-h-[100px]">
              {startups
                .filter(startup => startup.status === column.status)
                .map((startup) => (
                  <div key={startup.id} className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-800 text-sm">{startup.name}</h4>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {startup.score}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs mt-1">{startup.sector}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-500 text-xs">{startup.teamSize} members</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(startup.status)}`}>
                        {startup.stage}
                      </span>
                    </div>
                    
                    {/* Move buttons */}
                    <div className="flex justify-between mt-3">
                      {column.id !== 'review' && (
                        <button 
                          onClick={() => moveStartup(startup.id, 'Review Complete')}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          ←
                        </button>
                      )}
                      {column.id !== 'strongly' && column.id !== 'rejected' && (
                        <button 
                          onClick={() => moveStartup(
                            startup.id, 
                            column.id === 'review' ? 'Recommended' : 'Strongly Recommended'
                          )}
                          className="text-xs text-[#FF6A00] hover:text-[#e05500]"
                        >
                          {column.id === 'review' ? '→' : '→'}
                        </button>
                      )}
                      {column.id !== 'rejected' && (
                        <button 
                          onClick={() => moveStartup(startup.id, 'Rejected')}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Comparison Tool */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="font-bold text-gray-800 mb-4">Candidate Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Startup
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {startups
                .filter(s => s.status !== 'Rejected')
                .sort((a, b) => b.score - a.score)
                .map((startup) => (
                  <tr key={startup.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {startup.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {startup.sector}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {startup.teamSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {startup.stage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {startup.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(startup.status)}`}>
                        {startup.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ranking Panel */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4">Top Ranked Startups</h3>
        <div className="space-y-3">
          {startups
            .filter(s => s.status !== 'Rejected')
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map((startup, index) => (
              <div key={startup.id} className="flex items-center p-3 bg-white rounded-lg border border-gray-200">
                <div className="w-8 h-8 rounded-full bg-[#FF6A00] flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="ml-3 flex-1">
                  <h4 className="font-medium text-gray-800">{startup.name}</h4>
                  <p className="text-gray-600 text-sm">{startup.sector} • {startup.score} points</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(startup.status)}`}>
                  {startup.status}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Shortlisting;