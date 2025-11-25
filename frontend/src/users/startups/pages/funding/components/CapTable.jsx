import React, { useState } from 'react';

const CapTable = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for cap table
  const shareholders = [
    {
      id: 1,
      name: 'Founders',
      type: 'Founders',
      shares: 8000000,
      percentage: 65.2,
      value: '$16.3M',
      invested: '$200K',
      round: 'Pre-Seed',
    },
    {
      id: 2,
      name: 'Venture Capital Partners',
      type: 'Venture Capital',
      shares: 3000000,
      percentage: 24.4,
      value: '$6.1M',
      invested: '$5M',
      round: 'Series A',
    },
    {
      id: 3,
      name: 'Angel Investor Network',
      type: 'Angel Investors',
      shares: 800000,
      percentage: 6.5,
      value: '$1.6M',
      invested: '$1.2M',
      round: 'Seed',
    },
    {
      id: 4,
      name: 'Employee Pool',
      type: 'Option Pool',
      shares: 400000,
      percentage: 3.2,
      value: '$800K',
      invested: '$0',
      round: 'N/A',
    },
    {
      id: 5,
      name: 'Advisors',
      type: 'Advisors',
      shares: 80000,
      percentage: 0.7,
      value: '$160K',
      invested: '$0',
      round: 'N/A',
    },
  ];

  // Mock data for funding rounds
  const rounds = [
    {
      id: 1,
      name: 'Pre-Seed',
      date: '2023-03-15',
      amount: '$200K',
      preMoney: '$2M',
      postMoney: '$2.2M',
      investors: ['Founders'],
    },
    {
      id: 2,
      name: 'Seed',
      date: '2023-09-20',
      amount: '$1.2M',
      preMoney: '$8M',
      postMoney: '$9.2M',
      investors: ['Angel Investor Network'],
    },
    {
      id: 3,
      name: 'Series A',
      date: '2024-05-10',
      amount: '$5M',
      preMoney: '$20M',
      postMoney: '$25M',
      investors: ['Venture Capital Partners'],
    },
  ];

  // Mock data for scenarios
  const scenarios = [
    {
      id: 1,
      name: 'Conservative Growth',
      preMoney: '$35M',
      postMoney: '$40M',
      newShares: 1250000,
      dilution: '18.5%',
    },
    {
      id: 2,
      name: 'Aggressive Growth',
      preMoney: '$50M',
      postMoney: '$60M',
      newShares: 1666667,
      dilution: '22.3%',
    },
    {
      id: 3,
      name: 'Down Round',
      preMoney: '$15M',
      postMoney: '$18M',
      newShares: 1666667,
      dilution: '32.1%',
    },
  ];

  const filteredShareholders = shareholders.filter(shareholder => 
    shareholder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shareholder.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalShares = shareholders.reduce((sum, shareholder) => sum + shareholder.shares, 0);
  const totalValue = shareholders.reduce((sum, shareholder) => {
    const value = parseFloat(shareholder.value.replace(/[^0-9.]/g, ''));
    return sum + value;
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Cap Table Tools</h1>
        <p className="text-gray-600 mt-1">Manage your capitalization table and equity distribution</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Cap Table Insight</h2>
            <p className="text-gray-700 mt-1">
              Your current cap table shows healthy founder ownership at 65.2%. 
              With a proposed Series B at $40M pre-money, founders would retain 53.1% after dilution.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'current'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Current Cap Table
          </button>
          <button
            onClick={() => setActiveTab('rounds')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'rounds'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Funding Rounds
          </button>
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'scenarios'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Scenarios
          </button>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search shareholders or investor types..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Current Cap Table */}
        {activeTab === 'current' && (
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-[#FF6A00]">{totalShares.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Shares</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-[#FF6A00]">${totalValue.toFixed(1)}M</div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-[#FF6A00]">5</div>
                <div className="text-sm text-gray-600">Shareholders</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-[#FF6A00]">3</div>
                <div className="text-sm text-gray-600">Funding Rounds</div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shareholder
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shares
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ownership %
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invested
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Round
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredShareholders.map((shareholder) => (
                    <tr key={shareholder.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{shareholder.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                          {shareholder.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shareholder.shares.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">{shareholder.percentage}%</span>
                          <div className="ml-2 w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-[#FF6A00]"
                              style={{ width: `${shareholder.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#FF6A00]">
                        {shareholder.value}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shareholder.invested}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shareholder.round}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors font-medium">
                Add Shareholder
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Export Cap Table
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Run Scenario
              </button>
            </div>
          </div>
        )}

        {/* Funding Rounds */}
        {activeTab === 'rounds' && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Funding Round History</h3>
            <div className="space-y-4">
              {rounds.map((round) => (
                <div key={round.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{round.name}</h4>
                      <p className="text-gray-600 text-sm mt-1">Date: {round.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#FF6A00]">{round.amount}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Pre: {round.preMoney} • Post: {round.postMoney}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h5 className="text-sm font-semibold text-gray-700">Investors</h5>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {round.investors.map((investor, index) => (
                        <span key={index} className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded-full text-sm">
                          {investor}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <button className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-sm hover:bg-[#FFE9D7] transition-colors">
                      View Details
                    </button>
                    <button className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-sm hover:bg-[#FFE9D7] transition-colors">
                      Download Docs
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scenarios */}
        {activeTab === 'scenarios' && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Funding Scenarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {scenarios.map((scenario) => (
                <div key={scenario.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-gray-800">{scenario.name}</h4>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pre-Money Valuation</span>
                      <span className="font-medium text-gray-800">{scenario.preMoney}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Post-Money Valuation</span>
                      <span className="font-medium text-gray-800">{scenario.postMoney}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">New Shares Issued</span>
                      <span className="font-medium text-gray-800">{scenario.newShares.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founder Dilution</span>
                      <span className="font-medium text-red-600">{scenario.dilution}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button className="w-full py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
                      Run Scenario
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-[#FFF5EB] rounded-lg border border-[#FFD7B5]">
              <h4 className="font-bold text-[#FF6A00]">Scenario Planning Tip</h4>
              <p className="text-sm mt-2">
                Model multiple scenarios to understand the impact on ownership and valuation. 
                Conservative scenarios help set realistic expectations, while aggressive scenarios 
                prepare you for growth opportunities.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cap Table Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Cap Table Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">65.2%</div>
            <div className="text-sm text-gray-600">Founder Ownership</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">24.4%</div>
            <div className="text-sm text-gray-600">VC Ownership</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">3.2%</div>
            <div className="text-sm text-gray-600">Option Pool</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapTable;