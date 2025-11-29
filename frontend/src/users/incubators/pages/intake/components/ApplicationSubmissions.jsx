import React, { useState } from 'react';

const ApplicationSubmissions = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Mock data for applications
  const applications = [
    {
      id: 1,
      startupName: 'TechFlow Innovations',
      teamSize: 5,
      stage: 'MVP',
      sector: 'AI',
      status: 'Pending Review',
      score: 85,
      date: '2023-06-15'
    },
    {
      id: 2,
      startupName: 'GreenEnergy Solutions',
      teamSize: 8,
      stage: 'Growth',
      sector: 'Clean Energy',
      status: 'Verified',
      score: 92,
      date: '2023-06-14'
    },
    {
      id: 3,
      startupName: 'HealthTrack',
      teamSize: 3,
      stage: 'Idea',
      sector: 'Healthcare',
      status: 'Needs Documents',
      score: 78,
      date: '2023-06-13'
    },
    {
      id: 4,
      startupName: 'FinTech Pro',
      teamSize: 12,
      stage: 'Growth',
      sector: 'FinTech',
      status: 'High Potential',
      score: 95,
      date: '2023-06-12'
    },
    {
      id: 5,
      startupName: 'EduTech Innovations',
      teamSize: 6,
      stage: 'MVP',
      sector: 'Education',
      status: 'Pending Review',
      score: 88,
      date: '2023-06-11'
    }
  ];

  const filterOptions = [
    { id: 'all', name: 'All Applications' },
    { id: 'pending', name: 'Pending Review' },
    { id: 'verified', name: 'Verified' },
    { id: 'documents', name: 'Needs Documents' },
    { id: 'high', name: 'High Potential' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-100 text-green-800';
      case 'Needs Documents':
        return 'bg-yellow-100 text-yellow-800';
      case 'High Potential':
        return 'bg-blue-100 text-blue-800';
      case 'Pending Review':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApplications = activeFilter === 'all' 
    ? applications 
    : applications.filter(app => {
        if (activeFilter === 'pending') return app.status === 'Pending Review';
        if (activeFilter === 'verified') return app.status === 'Verified';
        if (activeFilter === 'documents') return app.status === 'Needs Documents';
        if (activeFilter === 'high') return app.status === 'High Potential';
        return true;
      });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Application Submissions</h2>
        <p className="text-gray-600">Manage and review startup applications</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-[#FFF9F0] text-[#FF6A00] border border-[#FFDAB9]'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Startup
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team Size
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stage
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sector
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{app.startupName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {app.teamSize}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {app.stage}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {app.sector}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {app.score}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {app.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-[#FF6A00] hover:text-[#e05500]">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
          <span className="font-medium">{applications.length}</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
            Previous
          </button>
          <button className="px-3 py-1 rounded-md bg-[#FF6A00] text-white">
            1
          </button>
          <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
            2
          </button>
          <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSubmissions;