import React, { useState } from 'react';

const ResourceAllocation = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Mock data for startups and their resource allocations
  const startups = [
    { id: 1, name: 'BioTech Innovations', trl: 7, stage: 'Growth', facilities: ['Lab A', 'Equipment 1'], usage: 45 },
    { id: 2, name: 'Green Energy Solutions', trl: 5, stage: 'Prototype', facilities: ['Workstation 2'], usage: 32 },
    { id: 3, name: 'AI Health Diagnostics', trl: 6, stage: 'Validation', facilities: ['Lab B', 'Meeting Room Alpha'], usage: 67 },
    { id: 4, name: 'Sustainable Materials', trl: 4, stage: 'Prototype', facilities: ['Equipment 2'], usage: 28 },
    { id: 5, name: 'Quantum Computing', trl: 8, stage: 'Growth', facilities: ['Lab C', 'Workstation 1'], usage: 82 }
  ];

  // Mock conflict data
  const conflicts = [
    { id: 1, resource: 'Lab A', time: '2023-06-15 10:00', startups: ['BioTech Innovations', 'Green Energy Solutions'] },
    { id: 2, resource: 'Equipment 1', time: '2023-06-16 14:00', startups: ['BioTech Innovations', 'AI Health Diagnostics'] }
  ];

  // Mock resource requests
  const requests = [
    { id: 1, startup: 'BioTech Innovations', resource: 'Lab D', reason: 'Specialized equipment needed', priority: 'High' },
    { id: 2, startup: 'Quantum Computing', resource: 'Meeting Room Beta', reason: 'Investor presentation', priority: 'Medium' }
  ];

  const handleResolveConflict = () => {
    setShowConflictModal(true);
  };

  const handleCloseConflictModal = () => {
    setShowConflictModal(false);
  };

  const handleManageRequests = () => {
    setShowRequestModal(true);
  };

  const handleCloseRequestModal = () => {
    setShowRequestModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Resource Allocation</h2>
        <p className="text-gray-600">Manage resource distribution and resolve conflicts</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'dashboard'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('dashboard')}
        >
          Allocation Dashboard
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'priority'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('priority')}
        >
          Priority System
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'conflicts'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('conflicts')}
        >
          Conflict Resolution
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'requests'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('requests')}
        >
          Request Management
        </button>
      </div>

      {/* Allocation Dashboard */}
      {activeTab === 'dashboard' && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Startup-wise Allocation</h3>
              <div className="space-y-4">
                {startups.map((startup) => (
                  <div key={startup.id} className="flex items-center justify-between p-3 border-b border-gray-100">
                    <div>
                      <h4 className="font-medium text-gray-800">{startup.name}</h4>
                      <p className="text-sm text-gray-600">TRL: {startup.trl} | Stage: {startup.stage}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">{startup.usage}% usage</p>
                      <p className="text-xs text-gray-500">{startup.facilities.join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Allocation Visualization</h3>
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Pie chart showing resource allocation by startup</p>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Time-based Allocation Trends</h3>
            <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Bar chart showing allocation trends over time</p>
            </div>
          </div>
        </div>
      )}

      {/* Priority System */}
      {activeTab === 'priority' && (
        <div>
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Priority Allocation System</h3>
            <p className="text-gray-600">Resources are automatically assigned based on the following criteria:</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
              <div className="text-orange-600 text-2xl mb-2">🏆</div>
              <h4 className="font-semibold text-gray-800 mb-2">TRL Score</h4>
              <p className="text-sm text-gray-600">Higher TRL startups get priority access to advanced facilities</p>
            </div>
            
            <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
              <div className="text-orange-600 text-2xl mb-2">📈</div>
              <h4 className="font-semibold text-gray-800 mb-2">Stage</h4>
              <p className="text-sm text-gray-600">Growth stage startups have higher priority than Idea/Prototype</p>
            </div>
            
            <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
              <div className="text-orange-600 text-2xl mb-2">⏱️</div>
              <h4 className="font-semibold text-gray-800 mb-2">Usage Frequency</h4>
              <p className="text-sm text-gray-600">Startups with higher usage get priority for continued access</p>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-4">Priority Rankings</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Startup</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TRL</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority Score</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {startups.map((startup, index) => (
                    <tr key={startup.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{startup.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{startup.trl}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{startup.stage}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{startup.usage}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <span className="mr-2">{100 - (index * 15)}</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full" 
                              style={{ width: `${100 - (index * 15)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Conflict Resolution */}
      {activeTab === 'conflicts' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Conflict Resolution Engine</h3>
            <button 
              onClick={handleResolveConflict}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm"
            >
              Resolve Conflicts
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conflicting Startups</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {conflicts.map((conflict) => (
                  <tr key={conflict.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{conflict.resource}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{conflict.time}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {conflict.startups.map((startup, index) => (
                          <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                            {startup}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Unresolved
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Request Management */}
      {activeTab === 'requests' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Resource Requests</h3>
            <button 
              onClick={handleManageRequests}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm"
            >
              Manage Requests
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Startup</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Resource</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.startup}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.resource}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{request.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.priority === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : request.priority === 'Medium' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                      <button className="text-red-600 hover:text-red-900">Decline</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Conflict Resolution Modal */}
      {showConflictModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Resolve Conflict</h3>
                <button 
                  onClick={handleCloseConflictModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Conflict Details</h4>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-800">Resource: Lab A</p>
                  <p className="text-red-800">Time: 2023-06-15 10:00</p>
                  <p className="text-red-800">Conflicting Startups: BioTech Innovations, Green Energy Solutions</p>
                </div>
                
                <h4 className="font-semibold text-gray-800 mb-2">Suggested Alternatives</h4>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Lab B</span>
                      <span className="text-green-600">Available</span>
                    </div>
                    <p className="text-sm text-gray-600">Same capabilities as Lab A</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-sm">2023-06-15 11:00</span>
                      <button className="text-orange-600 hover:text-orange-800 text-sm">Assign</button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Lab C</span>
                      <span className="text-green-600">Available</span>
                    </div>
                    <p className="text-sm text-gray-600">Advanced capabilities</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-sm">2023-06-15 09:00</span>
                      <button className="text-orange-600 hover:text-orange-800 text-sm">Assign</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={handleCloseConflictModal}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                  Confirm Resolution
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Management Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Manage Request</h3>
                <button 
                  onClick={handleCloseRequestModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <div className="border border-gray-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Request Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Startup</p>
                      <p className="font-medium">BioTech Innovations</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Requested Resource</p>
                      <p className="font-medium">Lab D</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Reason</p>
                      <p className="font-medium">Specialized equipment needed</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Priority</p>
                      <p className="font-medium">High</p>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-gray-800 mb-2">Action</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="approve" 
                      name="action" 
                      className="h-4 w-4 text-orange-600"
                    />
                    <label htmlFor="approve" className="ml-2 text-gray-700">Approve Request</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      id="decline" 
                      name="action" 
                      className="h-4 w-4 text-orange-600"
                    />
                    <label htmlFor="decline" className="ml-2 text-gray-700">Decline Request</label>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason (if declining)</label>
                    <textarea 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows="3"
                      placeholder="Provide reason for declining..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={handleCloseRequestModal}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                  Submit Decision
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceAllocation;