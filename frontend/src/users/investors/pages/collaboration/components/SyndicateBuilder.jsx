import React, { useState } from 'react';

const SyndicateBuilder = () => {
  const [investors, setInvestors] = useState([
    { id: 1, name: 'Alpha Ventures', commitment: 40, color: '#FF6A00' },
    { id: 2, name: 'Beta Capital', commitment: 30, color: '#FF8C42' },
    { id: 3, name: 'Gamma Partners', commitment: 20, color: '#FFA970' },
    { id: 4, name: 'Delta Investments', commitment: 10, color: '#FFC59E' }
  ]);

  const [newInvestor, setNewInvestor] = useState({ name: '', commitment: 0 });
  const [terms, setTerms] = useState({
    managementFee: 2.0,
    carry: 20,
    votingRights: 'Pro-rata',
    decisionMaking: 'Unanimous for >50% investments'
  });

  const totalCommitment = investors.reduce((sum, investor) => sum + investor.commitment, 0);

  const handleAddInvestor = () => {
    if (newInvestor.name && newInvestor.commitment > 0) {
      setInvestors([
        ...investors,
        {
          id: investors.length + 1,
          name: newInvestor.name,
          commitment: newInvestor.commitment,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`
        }
      ]);
      setNewInvestor({ name: '', commitment: 0 });
    }
  };

  const handleRemoveInvestor = (id) => {
    setInvestors(investors.filter(investor => investor.id !== id));
  };

  const updateInvestorCommitment = (id, commitment) => {
    setInvestors(investors.map(investor => 
      investor.id === id ? { ...investor, commitment: parseInt(commitment) || 0 } : investor
    ));
  };

  const handleTermsChange = (e) => {
    const { name, value } = e.target;
    setTerms(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Syndicate Builder Tools</h2>
        <p className="text-gray-600">Create and manage investment syndicates with shared terms</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investor Grouping Module */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Investor Grouping</h3>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Total Commitment</span>
              <span className="text-sm font-bold text-[#FF6A00]">{totalCommitment}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2.5 rounded-full" 
                style={{ width: `${Math.min(totalCommitment, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            {investors.map((investor) => (
              <div key={investor.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div 
                  className="w-3 h-3 rounded-full mr-3" 
                  style={{ backgroundColor: investor.color }}
                ></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{investor.name}</div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={investor.commitment}
                    onChange={(e) => updateInvestorCommitment(investor.id, e.target.value)}
                    className="w-16 p-1 border border-gray-300 rounded text-center text-sm"
                  />
                  <span className="ml-1 text-gray-600">%</span>
                  <button 
                    onClick={() => handleRemoveInvestor(investor.id)}
                    className="ml-3 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Investor name"
              value={newInvestor.name}
              onChange={(e) => setNewInvestor({...newInvestor, name: e.target.value})}
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="number"
              min="0"
              max="100"
              placeholder="0"
              value={newInvestor.commitment || ''}
              onChange={(e) => setNewInvestor({...newInvestor, commitment: parseInt(e.target.value) || 0})}
              className="w-20 p-2 border border-gray-300 rounded-lg text-sm text-center"
            />
            <span className="flex items-center text-gray-600">%</span>
            <button 
              onClick={handleAddInvestor}
              className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
            >
              Add
            </button>
          </div>
        </div>

        {/* Shared Terms Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Shared Terms Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Management Fee (%)</label>
              <div className="flex items-center">
                <input
                  type="range"
                  name="managementFee"
                  min="0"
                  max="5"
                  step="0.1"
                  value={terms.managementFee}
                  onChange={handleTermsChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF6A00]"
                />
                <span className="ml-3 w-12 text-sm font-medium text-gray-800">{terms.managementFee}%</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Carry (%)</label>
              <div className="flex items-center">
                <input
                  type="range"
                  name="carry"
                  min="10"
                  max="30"
                  step="1"
                  value={terms.carry}
                  onChange={handleTermsChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF6A00]"
                />
                <span className="ml-3 w-12 text-sm font-medium text-gray-800">{terms.carry}%</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Voting Rights</label>
              <select
                name="votingRights"
                value={terms.votingRights}
                onChange={handleTermsChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              >
                <option value="Pro-rata">Pro-rata</option>
                <option value="Equal">Equal</option>
                <option value="Majority">Majority</option>
                <option value="Lead Investor">Lead Investor</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Decision Making</label>
              <input
                type="text"
                name="decisionMaking"
                value={terms.decisionMaking}
                onChange={handleTermsChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all font-medium">
              Save Syndicate Terms
            </button>
          </div>
        </div>
      </div>

      {/* Investment Splits Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Investment Splits</h3>
        <div className="flex flex-wrap gap-4">
          {investors.map((investor) => (
            <div key={investor.id} className="text-center">
              <div className="relative w-24 h-24 mb-2">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={investor.color}
                    strokeWidth="3"
                    strokeDasharray={`${investor.commitment}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-800">{investor.commitment}%</span>
                </div>
              </div>
              <div className="text-xs font-medium text-gray-800">{investor.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SyndicateBuilder;