import React, { useState } from 'react';

const TermSheetGenerator = () => {
  const [activeSection, setActiveSection] = useState('terms');
  const [formData, setFormData] = useState({
    companyName: 'TechStart Inc.',
    valuationCap: 10000000,
    discountRate: 20,
    investmentAmount: 2000000,
    preMoneyValuation: 8000000,
    postMoneyValuation: 10000000,
    investorRights: true,
    boardSeats: 1,
    liquidationPreference: 1.0,
    antiDilution: 'weightedAverage',
    vestingPeriod: 4,
    votingRights: 'standard'
  });

  const sections = [
    { id: 'terms', name: 'Basic Terms', icon: '📝' },
    { id: 'rights', name: 'Investor Rights', icon: '🛡️' },
    { id: 'valuation', name: 'Valuation', icon: '💰' },
    { id: 'vesting', name: 'Vesting', icon: '⏳' },
    { id: 'liquidation', name: 'Liquidation', icon: '🌊' },
    { id: 'preview', name: 'Document Preview', icon: '📄' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'terms':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Investment Amount ($)</label>
                <input
                  type="number"
                  name="investmentAmount"
                  value={formData.investmentAmount}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valuation Cap ($)</label>
                <input
                  type="number"
                  name="valuationCap"
                  value={formData.valuationCap}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Rate (%)</label>
                <input
                  type="number"
                  name="discountRate"
                  value={formData.discountRate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
                />
              </div>
            </div>
          </div>
        );
      
      case 'rights':
        return (
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="investorRights"
                name="investorRights"
                checked={formData.investorRights}
                onChange={handleInputChange}
                className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded"
              />
              <label htmlFor="investorRights" className="ml-2 block text-sm text-gray-700">
                Pro Rata Rights
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Board Seats</label>
              <select
                name="boardSeats"
                value={formData.boardSeats}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              >
                <option value={0}>None</option>
                <option value={1}>1 Seat</option>
                <option value={2}>2 Seats</option>
                <option value={3}>3+ Seats</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Voting Rights</label>
              <select
                name="votingRights"
                value={formData.votingRights}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              >
                <option value="standard">Standard Voting Rights</option>
                <option value="enhanced">Enhanced Voting Rights</option>
                <option value="limited">Limited Voting Rights</option>
              </select>
            </div>
          </div>
        );
      
      case 'valuation':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pre-Money Valuation ($)</label>
                <input
                  type="number"
                  name="preMoneyValuation"
                  value={formData.preMoneyValuation}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Post-Money Valuation ($)</label>
                <input
                  type="number"
                  name="postMoneyValuation"
                  value={formData.postMoneyValuation}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Anti-Dilution Protection</label>
              <select
                name="antiDilution"
                value={formData.antiDilution}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              >
                <option value="weightedAverage">Weighted Average</option>
                <option value="fullRatchet">Full Ratchet</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        );
      
      case 'vesting':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vesting Period (Years)</label>
              <input
                type="number"
                name="vestingPeriod"
                value={formData.vestingPeriod}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Standard Vesting Schedule</h4>
              <p className="text-sm text-gray-600">4 years with 1-year cliff</p>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                    style={{ width: '100%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Year 1</span>
                  <span>Year 2</span>
                  <span>Year 3</span>
                  <span>Year 4</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'liquidation':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Liquidation Preference</label>
              <input
                type="number"
                step="0.1"
                name="liquidationPreference"
                value={formData.liquidationPreference}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Liquidation Preference Explanation</h4>
              <p className="text-sm text-gray-600">
                {formData.liquidationPreference}x preference means investors receive 
                {formData.liquidationPreference} times their investment before common shareholders.
              </p>
            </div>
          </div>
        );
      
      case 'preview':
        return (
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-lg font-bold text-gray-800">Term Sheet Preview</h3>
              <p className="text-gray-600">For {formData.companyName}</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Investment Amount</p>
                  <p className="font-medium">${formData.investmentAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Valuation Cap</p>
                  <p className="font-medium">${formData.valuationCap.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Discount Rate</p>
                  <p className="font-medium">{formData.discountRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Board Seats</p>
                  <p className="font-medium">{formData.boardSeats}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2">Key Terms</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Pro Rata Rights: {formData.investorRights ? 'Yes' : 'No'}</li>
                  <li>• Anti-Dilution: {formData.antiDilution}</li>
                  <li>• Vesting Period: {formData.vestingPeriod} years</li>
                  <li>• Liquidation Preference: {formData.liquidationPreference}x</li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Term Sheet Generator</h2>
        <p className="text-gray-600">Create customizable term sheets for your investments</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg transition-all flex items-center ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-2">{section.icon}</span>
            {section.name}
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            {sections.find(s => s.id === activeSection)?.name}
          </h3>
          {activeSection !== 'preview' && (
            <button className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
              Save Section
            </button>
          )}
        </div>
        
        {renderSectionContent()}
        
        <div className="mt-6 flex justify-between">
          <button 
            onClick={() => {
              const currentIndex = sections.findIndex(s => s.id === activeSection);
              if (currentIndex > 0) {
                setActiveSection(sections[currentIndex - 1].id);
              }
            }}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
          >
            Previous
          </button>
          
          {activeSection !== 'preview' ? (
            <button 
              onClick={() => {
                const currentIndex = sections.findIndex(s => s.id === activeSection);
                if (currentIndex < sections.length - 1) {
                  setActiveSection(sections[currentIndex + 1].id);
                }
              }}
              className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all"
            >
              Next Section
            </button>
          ) : (
            <button className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all">
              Download Term Sheet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermSheetGenerator;