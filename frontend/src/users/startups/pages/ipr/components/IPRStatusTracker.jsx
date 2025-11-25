import React, { useState } from 'react';

const IPRStatusTracker = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for IPR assets
  const iprAssets = [
    {
      id: 1,
      title: 'INNOVATEX Patent Application',
      type: 'Patent',
      status: 'Filed',
      applicationNumber: 'US2023XXXXXXA1',
      filingDate: '2023-11-15',
      nextDeadline: '2024-05-15',
      examiner: 'Dr. Sarah Williams',
      stage: 'Examination',
      priority: 'High',
    },
    {
      id: 2,
      title: 'INNOVATEX Trademark',
      type: 'Trademark',
      status: 'Registered',
      applicationNumber: 'TM2023XXXXXXB1',
      filingDate: '2023-06-10',
      nextDeadline: '2033-06-10',
      examiner: 'N/A',
      stage: 'Registration',
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'InnovateX Software Code',
      type: 'Copyright',
      status: 'Registered',
      applicationNumber: 'TX000789012',
      filingDate: '2023-02-20',
      nextDeadline: '2048-02-20',
      examiner: 'N/A',
      stage: 'Registration',
      priority: 'Low',
    },
    {
      id: 4,
      title: 'INNOVATELOGO Design',
      type: 'Trademark',
      status: 'Pending',
      applicationNumber: 'TM2023XXXXXXC1',
      filingDate: '2023-09-05',
      nextDeadline: '2024-03-05',
      examiner: 'Pending Assignment',
      stage: 'Examination',
      priority: 'High',
    },
    {
      id: 5,
      title: 'INNOVATEX User Manual',
      type: 'Copyright',
      status: 'Registered',
      applicationNumber: 'TX000123456',
      filingDate: '2022-08-15',
      nextDeadline: '2047-08-15',
      examiner: 'N/A',
      stage: 'Registration',
      priority: 'Low',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Filed':
        return 'bg-blue-100 text-blue-800';
      case 'Registered':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAssets = iprAssets.filter(asset => {
    const matchesFilter = activeFilter === 'all' || asset.type.toLowerCase() === activeFilter;
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          asset.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">IPR Status Tracker</h1>
        <p className="text-gray-600 mt-1">Monitor the status of all your intellectual property assets</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeFilter === 'all'
                  ? 'bg-[#FF6A00] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Assets
            </button>
            <button
              onClick={() => setActiveFilter('patent')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeFilter === 'patent'
                  ? 'bg-[#FF6A00] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Patents
            </button>
            <button
              onClick={() => setActiveFilter('trademark')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeFilter === 'trademark'
                  ? 'bg-[#FF6A00] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Trademarks
            </button>
            <button
              onClick={() => setActiveFilter('copyright')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeFilter === 'copyright'
                  ? 'bg-[#FF6A00] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Copyrights
            </button>
          </div>
          <div className="flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or application number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
            />
          </div>
        </div>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-800">5</div>
          <div className="text-sm text-gray-600">Total Assets</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">2</div>
          <div className="text-sm text-gray-600">Patents</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">2</div>
          <div className="text-sm text-gray-600">Trademarks</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">1</div>
          <div className="text-sm text-gray-600">Copyrights</div>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">IPR Assets</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Filing Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Deadline
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{asset.title}</div>
                    <div className="text-sm text-gray-500">{asset.examiner !== 'N/A' ? `Examiner: ${asset.examiner}` : ''}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.applicationNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.filingDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.nextDeadline}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(asset.priority)}`}>
                      {asset.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#FF6A00] hover:text-[#FF8C42] mr-3">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Upcoming Deadlines</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-800">INNOVATEX Patent Application</h3>
              <span className="text-sm text-gray-500">Patent</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-sm text-gray-600">Response to Office Action due</span>
              <span className="text-sm font-medium text-red-600">May 15, 2024</span>
            </div>
            <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
              Set Reminder
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-800">INNOVATELOGO Design</h3>
              <span className="text-sm text-gray-500">Trademark</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-sm text-gray-600">Examiner Assignment due</span>
              <span className="text-sm font-medium text-yellow-600">March 5, 2024</span>
            </div>
            <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
              Set Reminder
            </button>
          </div>
        </div>
      </div>

      {/* Timeline View */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Asset Timeline</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
          
          {/* Timeline items */}
          <div className="space-y-6">
            <div className="relative pl-12">
              <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-[#FF6A00] border-4 border-white"></div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">INNOVATEX Patent Filed</h3>
                  <span className="text-sm text-gray-500">Nov 15, 2023</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Patent application submitted to USPTO</p>
              </div>
            </div>
            
            <div className="relative pl-12">
              <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-[#FF6A00] border-4 border-white"></div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">INNOVATEX Trademark Registered</h3>
                  <span className="text-sm text-gray-500">Jun 10, 2023</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Trademark registration certificate issued</p>
              </div>
            </div>
            
            <div className="relative pl-12">
              <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-gray-300 border-4 border-white"></div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">INNOVATELOGO Examination</h3>
                  <span className="text-sm text-gray-500">Sep 5, 2023</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Trademark application under examination</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPRStatusTracker;