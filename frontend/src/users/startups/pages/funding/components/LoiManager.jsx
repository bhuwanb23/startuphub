import React, { useState } from 'react';

const LoiManager = () => {
  const [activeTab, setActiveTab] = useState('drafts');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for LOIs
  const lois = [
    {
      id: 1,
      investor: 'Venture Capital Partners',
      amount: '$5M',
      valuation: '$25M',
      status: 'Negotiation',
      date: '2024-06-15',
      terms: 'Series A, 20% equity, 3-year vesting',
      progress: 75,
    },
    {
      id: 2,
      investor: 'Innovation Fund',
      amount: '$3M',
      valuation: '$20M',
      status: 'Review',
      date: '2024-06-10',
      terms: 'Series A, 15% equity, standard terms',
      progress: 40,
    },
    {
      id: 3,
      investor: 'Growth Capital Partners',
      amount: '$8M',
      valuation: '$40M',
      status: 'Accepted',
      date: '2024-05-28',
      terms: 'Series B, 18% equity, 2-year vesting',
      progress: 100,
    },
    {
      id: 4,
      investor: 'Angel Investor Network',
      amount: '$1.5M',
      valuation: '$15M',
      status: 'Draft',
      date: '2024-06-20',
      terms: 'Convertible note, $20M cap, 20% discount',
      progress: 15,
    },
  ];

  // Mock data for LOI templates
  const templates = [
    {
      id: 1,
      name: 'Standard Series A LOI',
      description: 'Traditional term sheet for Series A funding rounds',
      usage: 'Most Common',
    },
    {
      id: 2,
      name: 'Convertible Note LOI',
      description: 'Term sheet for convertible note financing',
      usage: 'Seed Rounds',
    },
    {
      id: 3,
      name: 'SAFE LOI',
      description: 'Simple Agreement for Future Equity term sheet',
      usage: 'Pre-Seed/Seed',
    },
  ];

  const filteredLois = lois.filter(loi => 
    loi.investor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loi.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">LOI Manager</h1>
        <p className="text-gray-600 mt-1">Manage and track your term sheets and investment agreements</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI LOI Insight</h2>
            <p className="text-gray-700 mt-1">
              Your LOI with Venture Capital Partners is 75% complete. Key terms are favorable, 
              but consider negotiating the 3-year vesting period to 4 years for better alignment.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('drafts')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'drafts'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            LOI Tracker
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search LOIs by investor or status..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* LOI Tracker */}
        {activeTab === 'drafts' && (
          <div className="mt-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Investor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valuation
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLois.map((loi) => (
                    <tr key={loi.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{loi.investor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-bold text-[#FF6A00]">{loi.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {loi.valuation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          loi.status === 'Draft' 
                            ? 'bg-gray-100 text-gray-800' 
                            : loi.status === 'Review' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : loi.status === 'Negotiation' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                        }`}>
                          {loi.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(loi.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-[#FF6A00]"
                              style={{ width: `${loi.progress}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-600">{loi.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-[#FF6A00] hover:text-[#e05500] mr-3">
                          View
                        </button>
                        <button className="text-[#FF6A00] hover:text-[#e05500]">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors font-medium">
                Create New LOI
              </button>
            </div>
          </div>
        )}

        {/* Templates */}
        {activeTab === 'templates' && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">LOI Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">📄</div>
                  <h4 className="text-lg font-bold text-gray-800">{template.name}</h4>
                  <p className="text-gray-600 text-sm mt-2">{template.description}</p>
                  <div className="mt-4 text-sm text-gray-500">Usage: {template.usage}</div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
                      Use Template
                    </button>
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">LOI Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-[#FF6A00]">8</div>
                <div className="text-sm text-gray-600">Total LOIs</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-[#FF6A00]">3</div>
                <div className="text-sm text-gray-600">Active Negotiations</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-[#FF6A00]">1</div>
                <div className="text-sm text-gray-600">Accepted</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-[#FF6A00]">$17.5M</div>
                <div className="text-sm text-gray-600">Total Funding</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-bold text-gray-800 mb-3">Status Distribution</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Accepted</span>
                    <span>12%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: '12%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Negotiation</span>
                    <span>38%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: '38%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Review</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-yellow-500" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Draft</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gray-500" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Deal Flow Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Deal Flow Pipeline</h2>
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2">
              1
            </div>
            <div className="text-sm font-medium text-gray-800">Initial Contact</div>
            <div className="text-xs text-gray-500">8</div>
          </div>
          <div className="flex-1 h-1 bg-gray-200"></div>
          <div className="flex-1 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center mx-auto mb-2">
              2
            </div>
            <div className="text-sm font-medium text-gray-800">NDA Signed</div>
            <div className="text-xs text-gray-500">5</div>
          </div>
          <div className="flex-1 h-1 bg-gray-200"></div>
          <div className="flex-1 text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center mx-auto mb-2">
              3
            </div>
            <div className="text-sm font-medium text-gray-800">LOI Sent</div>
            <div className="text-xs text-gray-500">4</div>
          </div>
          <div className="flex-1 h-1 bg-gray-200"></div>
          <div className="flex-1 text-center">
            <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center mx-auto mb-2">
              4
            </div>
            <div className="text-sm font-medium text-gray-800">Negotiation</div>
            <div className="text-xs text-gray-500">3</div>
          </div>
          <div className="flex-1 h-1 bg-gray-200"></div>
          <div className="flex-1 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FF6A00] flex items-center justify-center mx-auto mb-2">
              5
            </div>
            <div className="text-sm font-medium text-gray-800">Closed</div>
            <div className="text-xs text-gray-500">1</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoiManager;