import React, { useState } from 'react';

const IPStatusRenewalTracker = () => {
  const [patents, setPatents] = useState([
    { id: 1, title: 'AI-Powered Drug Discovery Method', status: 'Filed', filedDate: '2023-01-15', renewalDate: '2026-01-15', nextRenewal: '2026-01-15' },
    { id: 2, title: 'Sustainable Energy Storage System', status: 'Granted', filedDate: '2022-08-22', renewalDate: '2025-08-22', nextRenewal: '2025-08-22' },
    { id: 3, title: 'Quantum Computing Algorithms', status: 'Published', filedDate: '2023-03-10', renewalDate: '2026-03-10', nextRenewal: '2026-03-10' },
    { id: 4, title: 'Biodegradable Plastics Formula', status: 'Expired', filedDate: '2020-11-05', renewalDate: '2023-11-05', nextRenewal: '2023-11-05' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Filed': return 'bg-blue-100 text-blue-800';
      case 'Published': return 'bg-purple-100 text-purple-800';
      case 'Granted': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">IP Status & Renewal Tracker</h1>
        <p className="text-gray-600">Track patent status and upcoming renewals</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Patent Portfolio</h2>
          <div className="flex space-x-4">
            <button className="bg-[#F4A300] hover:bg-[#F26B1D] text-white px-4 py-2 rounded-lg transition-colors">
              Export Report
            </button>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
              Add Patent
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patent Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filed Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renewal Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Renewal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patents.map((patent) => (
                <tr key={patent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patent.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patent.status)}`}>
                      {patent.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patent.filedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patent.renewalDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className={patent.status === 'Expired' ? 'text-red-600' : ''}>
                        {patent.nextRenewal}
                      </span>
                      {patent.status !== 'Expired' && (
                        <span className="ml-2 text-xs text-[#F4A300]">
                          ({Math.ceil((new Date(patent.nextRenewal) - new Date()) / (1000 * 60 * 60 * 24))} days)
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-[#F4A300] hover:text-[#F26B1D] mr-3">View</button>
                    <button className="text-[#F4A300] hover:text-[#F26B1D]">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Auto-reminder System */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Auto-Reminder System</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-800">3</div>
              <div className="text-sm text-gray-600">Renewals due in 30 days</div>
            </div>
            <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-800">1</div>
              <div className="text-sm text-gray-600">Renewals due in 60 days</div>
            </div>
            <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-800">0</div>
              <div className="text-sm text-gray-600">Overdue renewals</div>
            </div>
          </div>
          
          <div className="mt-4">
            <button className="text-[#F4A300] hover:text-[#F26B1D] font-medium">
              Configure Reminder Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPStatusRenewalTracker;