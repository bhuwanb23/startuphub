import React, { useState } from 'react';

const NDAManager = () => {
  const [activeTab, setActiveTab] = useState('tracking');
  const [searchTerm, setSearchTerm] = useState('');
  
  const ndas = [
    {
      id: 1,
      company: 'TechStart Inc.',
      status: 'signed',
      signedDate: '2025-11-15',
      expiryDate: '2027-11-15',
      signers: ['You', 'TechStart CEO'],
      template: 'Standard Mutual NDA',
      lastActivity: 'Viewed 2 hours ago'
    },
    {
      id: 2,
      company: 'GreenTech Solutions',
      status: 'pending',
      signedDate: null,
      expiryDate: '2026-12-01',
      signers: ['You'],
      template: 'One-way NDA',
      lastActivity: 'Sent 3 days ago'
    },
    {
      id: 3,
      company: 'MediCore Ltd.',
      status: 'expired',
      signedDate: '2023-10-20',
      expiryDate: '2025-10-20',
      signers: ['You', 'MediCore Legal'],
      template: 'Standard Mutual NDA',
      lastActivity: 'Expired 1 month ago'
    },
    {
      id: 4,
      company: 'AI Innovations Corp',
      status: 'signed',
      signedDate: '2025-10-30',
      expiryDate: '2027-10-30',
      signers: ['You', 'AI Innovations Legal'],
      template: 'Standard Mutual NDA',
      lastActivity: 'Viewed 1 week ago'
    }
  ];
  
  const templates = [
    {
      id: 1,
      name: 'Standard Mutual NDA',
      type: 'mutual',
      usage: 24,
      lastUpdated: '2025-11-01'
    },
    {
      id: 2,
      name: 'One-way NDA',
      type: 'one-way',
      usage: 12,
      lastUpdated: '2025-10-15'
    },
    {
      id: 3,
      name: 'Investor NDA',
      type: 'investor',
      usage: 8,
      lastUpdated: '2025-09-20'
    }
  ];
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'signed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'mutual': return 'bg-blue-100 text-blue-800';
      case 'one-way': return 'bg-purple-100 text-purple-800';
      case 'investor': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const filteredNdas = ndas.filter(nda => 
    nda.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">NDA Manager</h2>
        <p className="text-gray-600">Securely manage and track all non-disclosure agreements</p>
      </div>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('tracking')}
          className={`px-4 py-2 rounded-lg transition-all flex items-center ${
            activeTab === 'tracking'
              ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          📋 NDA Tracking
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 rounded-lg transition-all flex items-center ${
            activeTab === 'templates'
              ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          📄 Templates
        </button>
        <button
          onClick={() => setActiveTab('signers')}
          className={`px-4 py-2 rounded-lg transition-all flex items-center ${
            activeTab === 'signers'
              ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          👥 Signer Timeline
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search NDAs by company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
          />
          <div className="absolute left-3 top-3.5 text-gray-400">
            🔍
          </div>
        </div>
      </div>
      
      {/* NDA Tracking Tab */}
      {activeTab === 'tracking' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Signed Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Template
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNdas.map((nda) => (
                <tr key={nda.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{nda.company}</div>
                    <div className="text-sm text-gray-500">
                      {nda.signers.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(nda.status)}`}>
                      {nda.status.charAt(0).toUpperCase() + nda.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {nda.signedDate || 'Not signed'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {nda.expiryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {nda.template}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {nda.lastActivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#FF6A00] hover:text-[#e05500] mr-3">
                      View
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800">{template.name}</h3>
                <span className={`px-2 py-1 rounded text-xs ${getTypeColor(template.type)}`}>
                  {template.type}
                </span>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Usage:</span>
                  <span className="font-medium text-gray-800">{template.usage} times</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium text-gray-800">{template.lastUpdated}</span>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <button className="flex-1 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                  Use Template
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm">
                  Edit
                </button>
              </div>
            </div>
          ))}
          
          {/* Create New Template */}
          <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center hover:bg-gray-100 transition-all cursor-pointer">
            <div className="text-3xl text-gray-400 mb-2">📄</div>
            <h3 className="font-bold text-gray-800">Create New Template</h3>
            <p className="text-sm text-gray-600 mt-1 text-center">Build a custom NDA template</p>
            <button className="mt-4 px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
              Create Template
            </button>
          </div>
        </div>
      )}
      
      {/* Signer Timeline Tab */}
      {activeTab === 'signers' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Signer Activity Timeline</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {/* Timeline events */}
            <div className="space-y-6 pl-10">
              <div className="relative">
                <div className="absolute left-[-28px] w-6 h-6 rounded-full bg-[#FF6A00] border-4 border-[#FF8C42]"></div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-gray-800">TechStart Inc. NDA Signed</h4>
                    <span className="text-sm text-gray-500">2025-11-15</span>
                  </div>
                  <p className="text-gray-600 mt-1">Both parties have signed the mutual NDA. Document is now active.</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span>Signers: You, TechStart CEO</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-[-28px] w-6 h-6 rounded-full bg-[#FF8C42] border-4 border-[#FFA970]"></div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-gray-800">GreenTech Solutions NDA Sent</h4>
                    <span className="text-sm text-gray-500">2025-11-12</span>
                  </div>
                  <p className="text-gray-600 mt-1">NDA sent to GreenTech Solutions for review and signature.</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span>Signers: You (sent)</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-[-28px] w-6 h-6 rounded-full bg-gray-400 border-4 border-gray-300"></div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-gray-800">MediCore Ltd. NDA Expired</h4>
                    <span className="text-sm text-gray-500">2025-10-20</span>
                  </div>
                  <p className="text-gray-600 mt-1">NDA with MediCore Ltd. has expired and is no longer valid.</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span>Signers: You, MediCore Legal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-left">
            <div className="text-2xl mb-2">📤</div>
            <h4 className="font-medium text-gray-800">Send New NDA</h4>
            <p className="text-sm text-gray-600 mt-1">Create and send a new non-disclosure agreement</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-left">
            <div className="text-2xl mb-2">🔄</div>
            <h4 className="font-medium text-gray-800">Renew Expired NDA</h4>
            <p className="text-sm text-gray-600 mt-1">Extend an expired agreement with updated terms</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-left">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-medium text-gray-800">Export NDA Report</h4>
            <p className="text-sm text-gray-600 mt-1">Generate a comprehensive report of all NDAs</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NDAManager;