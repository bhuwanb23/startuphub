import React, { useState } from 'react';

const ApiKeys = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKey, setNewKey] = useState({
    name: '',
    service: '',
    permissions: [],
    expires: '',
  });
  
  // Mock data for API keys
  const apiKeys = [
    {
      id: 1,
      name: 'Stripe Payment Integration',
      service: 'Stripe',
      key: 'sk_test_51J...',
      status: 'active',
      createdAt: '2024-01-15',
      expiresAt: '2025-01-15',
      permissions: ['payments', 'refunds'],
      usage: 1240,
      limit: 10000,
    },
    {
      id: 2,
      name: 'AWS S3 Storage',
      service: 'AWS',
      key: 'AKIAJ...',
      status: 'active',
      createdAt: '2024-02-20',
      expiresAt: '2025-02-20',
      permissions: ['s3-read', 's3-write'],
      usage: 890,
      limit: 50000,
    },
    {
      id: 3,
      name: 'Google Maps API',
      service: 'Google',
      key: 'AIzaS...',
      status: 'active',
      createdAt: '2024-03-10',
      expiresAt: '2025-03-10',
      permissions: ['maps', 'geocoding'],
      usage: 2100,
      limit: 100000,
    },
    {
      id: 4,
      name: 'Twilio SMS Service',
      service: 'Twilio',
      key: 'SKac4...',
      status: 'expiring',
      createdAt: '2024-04-05',
      expiresAt: '2024-07-05',
      permissions: ['sms-send', 'sms-read'],
      usage: 450,
      limit: 2000,
    },
    {
      id: 5,
      name: 'SendGrid Email API',
      service: 'SendGrid',
      key: 'SG.xGc...',
      status: 'inactive',
      createdAt: '2024-05-12',
      expiresAt: '2025-05-12',
      permissions: ['email-send'],
      usage: 0,
      limit: 10000,
    },
  ];

  const services = [
    { id: 'all', name: 'All Services' },
    { id: 'stripe', name: 'Stripe' },
    { id: 'aws', name: 'AWS' },
    { id: 'google', name: 'Google' },
    { id: 'twilio', name: 'Twilio' },
    { id: 'sendgrid', name: 'SendGrid' },
  ];

  const permissionsList = [
    'read', 'write', 'delete', 'admin', 'payments', 'refunds', 
    's3-read', 's3-write', 'maps', 'geocoding', 'sms-send', 'sms-read', 'email-send'
  ];

  const filteredKeys = apiKeys.filter(key => {
    const matchesSearch = key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         key.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = selectedService === 'all' || key.service.toLowerCase() === selectedService;
    
    return matchesSearch && matchesService;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const maskKey = (key) => {
    if (key.length <= 8) return key;
    return key.substring(0, 6) + '...' + key.substring(key.length - 4);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">API Keys</h1>
        <p className="text-gray-600 mt-1">Manage your third-party API keys and credentials</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Security Insight</h2>
            <p className="text-gray-700 mt-1">
              Your Twilio API key is expiring in 30 days. Rotate credentials to maintain service continuity. 
              Consider implementing key rotation automation for better security.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search API keys..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => setShowNewKeyForm(true)}
              className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors font-medium"
            >
              Create New Key
            </button>
          </div>
        </div>
      </div>

      {/* API Keys Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Key
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expires
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredKeys.map((key) => (
                <tr key={key.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{key.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                      {key.service}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 font-mono">{maskKey(key.key)}</span>
                      <button className="ml-2 text-[#FF6A00] hover:text-[#e05500]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(key.status)}`}>
                      {key.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{key.usage.toLocaleString()}</span>
                      <span className="mx-1 text-gray-300">/</span>
                      <span className="text-sm text-gray-500">{key.limit.toLocaleString()}</span>
                      <div className="ml-2 w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-[#FF6A00]"
                          style={{ width: `${(key.usage / key.limit) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {key.expiresAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-[#FF6A00] hover:text-[#e05500] mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New API Key Form */}
      {showNewKeyForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Create New API Key</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Name</label>
                <input
                  type="text"
                  value={newKey.name}
                  onChange={(e) => setNewKey({...newKey, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  placeholder="Enter key name"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                <select
                  value={newKey.service}
                  onChange={(e) => setNewKey({...newKey, service: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                >
                  <option value="">Select service</option>
                  {services.filter(s => s.id !== 'all').map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                <input
                  type="date"
                  value={newKey.expires}
                  onChange={(e) => setNewKey({...newKey, expires: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                />
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
                <div className="space-y-2 max-h-40 overflow-y-auto p-2 border border-gray-300 rounded-lg">
                  {permissionsList.map((permission) => (
                    <div key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        id={permission}
                        checked={newKey.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewKey({...newKey, permissions: [...newKey.permissions, permission]});
                          } else {
                            setNewKey({...newKey, permissions: newKey.permissions.filter(p => p !== permission)});
                          }
                        }}
                        className="h-4 w-4 text-[#FF6A00] border-gray-300 rounded focus:ring-[#FF6A00]"
                      />
                      <label htmlFor={permission} className="ml-2 text-sm text-gray-700">
                        {permission}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <button className="px-6 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors font-medium">
              Generate Key
            </button>
            <button 
              onClick={() => setShowNewKeyForm(false)}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* API Keys Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">API Keys Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">12</div>
            <div className="text-sm text-gray-600">Active Keys</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">2</div>
            <div className="text-sm text-gray-600">Expiring Soon</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">42K</div>
            <div className="text-sm text-gray-600">Total API Calls</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">98%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;