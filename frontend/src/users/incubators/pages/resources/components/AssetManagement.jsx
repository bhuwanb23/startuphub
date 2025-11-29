import React, { useState } from 'react';

const AssetManagement = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [selectedAsset, setSelectedAsset] = useState(null);

  // Mock data for assets
  const assets = [
    { id: 'EQ001', name: 'Centrifuge X100', category: 'Laboratory', condition: 'Good', lastUsed: '2023-05-15', status: 'Available' },
    { id: 'EQ002', name: 'PCR Machine', category: 'Biotech', condition: 'Excellent', lastUsed: '2023-05-18', status: 'In Use' },
    { id: 'EQ003', name: 'Spectrophotometer UV-Vis', category: 'Analytics', condition: 'Fair', lastUsed: '2023-05-10', status: 'Maintenance' },
    { id: 'EQ004', name: 'Autoclave Pro', category: 'Sterilization', condition: 'Good', lastUsed: '2023-05-20', status: 'Available' },
    { id: 'EQ005', name: 'Microscope Olympus', category: 'Optics', condition: 'Excellent', lastUsed: '2023-05-22', status: 'Reserved' }
  ];

  // Mock maintenance alerts
  const maintenanceAlerts = [
    { id: 1, assetId: 'EQ003', assetName: 'Spectrophotometer UV-Vis', type: 'Overdue', dueDate: '2023-04-15' },
    { id: 2, assetId: 'EQ006', assetName: 'Incubator Thermo', type: 'Upcoming', dueDate: '2023-06-01' },
    { id: 3, assetId: 'EQ001', assetName: 'Centrifuge X100', type: 'Upcoming', dueDate: '2023-06-10' }
  ];

  const handleViewDetails = (asset) => {
    setSelectedAsset(asset);
  };

  const handleCloseDetail = () => {
    setSelectedAsset(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Asset Management</h2>
        <p className="text-gray-600">Track and manage all equipment and assets</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'inventory'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('inventory')}
        >
          Asset Inventory
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'tracking'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('tracking')}
        >
          Equipment Tracking
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'maintenance'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('maintenance')}
        >
          Maintenance Alerts
        </button>
      </div>

      {/* Asset Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      asset.condition === 'Excellent' 
                        ? 'bg-green-100 text-green-800' 
                        : asset.condition === 'Good' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {asset.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.lastUsed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      asset.status === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : asset.status === 'In Use' 
                          ? 'bg-blue-100 text-blue-800' 
                          : asset.status === 'Maintenance' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-purple-100 text-purple-800'
                    }`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button 
                      onClick={() => handleViewDetails(asset)}
                      className="text-orange-600 hover:text-orange-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Equipment Tracking Dashboard */}
      {activeTab === 'tracking' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Tracking Method</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="gps" 
                    name="tracking" 
                    className="h-4 w-4 text-orange-600"
                    defaultChecked
                  />
                  <label htmlFor="gps" className="ml-2 text-sm text-gray-700">GPS Enabled</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="manual" 
                    name="tracking" 
                    className="h-4 w-4 text-orange-600"
                  />
                  <label htmlFor="manual" className="ml-2 text-sm text-gray-700">Manual Check-in</label>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Last Check-in</h3>
              <p className="text-2xl font-bold text-gray-800">2 hours ago</p>
              <p className="text-sm text-gray-600">Equipment ID: EQ001</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">User Logs</h3>
              <p className="text-2xl font-bold text-gray-800">24</p>
              <p className="text-sm text-gray-600">Active users today</p>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Tracking Map</h3>
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Interactive map showing equipment locations</p>
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Alerts */}
      {activeTab === 'maintenance' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Overdue Maintenance</h3>
              <p className="text-3xl font-bold text-red-600">2</p>
              <p className="text-sm text-gray-600">Assets requiring immediate attention</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Upcoming Servicing</h3>
              <p className="text-3xl font-bold text-orange-600">5</p>
              <p className="text-sm text-gray-600">Scheduled in the next 30 days</p>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {maintenanceAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.assetId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.assetName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        alert.type === 'Overdue' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {alert.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-orange-600 hover:text-orange-900 mr-3">Schedule</button>
                      <button className="text-gray-600 hover:text-gray-900">Dismiss</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Asset Details</h3>
                <button 
                  onClick={handleCloseDetail}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Basic Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID:</span>
                      <span className="font-medium">{selectedAsset.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{selectedAsset.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{selectedAsset.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Condition:</span>
                      <span className="font-medium">{selectedAsset.condition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium">{selectedAsset.status}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Usage History</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Used:</span>
                      <span className="font-medium">{selectedAsset.lastUsed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Uses:</span>
                      <span className="font-medium">42</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Duration:</span>
                      <span className="font-medium">2.5 hours</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Condition Trend</h4>
                <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Condition trend graph would be displayed here</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Repair Log</h4>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-600">No repair history available</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={handleCloseDetail}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetManagement;