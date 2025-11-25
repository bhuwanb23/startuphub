import React, { useState } from 'react';

const BusinessModel = () => {
  const [businessModel, setBusinessModel] = useState({
    revenueModel: 'Subscription',
    targetCustomers: 'Enterprise businesses seeking AI automation solutions',
    valueProposition: 'Reduce operational costs by 40% through AI-powered automation',
    distributionChannels: ['Direct Sales', 'Partnerships', 'Online Marketplace'],
    costStructure: 'R&D, Sales & Marketing, Operations',
    keyResources: 'AI Engineers, Data Scientists, Cloud Infrastructure',
    keyActivities: 'Product Development, Customer Support, Market Research',
    keyPartners: 'Cloud Providers, Technology Partners, Distribution Channels',
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessModel(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save the data to the backend
    console.log('Business model saved:', businessModel);
    setEditing(false);
    alert('Business model updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Business Model Summary</h1>
        <p className="text-gray-600 mt-1">Define and manage your startup's business model</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6">
          {!editing ? (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
                >
                  Edit Business Model
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Revenue Model</h3>
                  <p className="text-gray-600">{businessModel.revenueModel}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Target Customers</h3>
                  <p className="text-gray-600">{businessModel.targetCustomers}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-bold text-gray-800 mb-2">Value Proposition</h3>
                  <p className="text-gray-600">{businessModel.valueProposition}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Distribution Channels</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {businessModel.distributionChannels.map((channel, index) => (
                      <li key={index}>{channel}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Cost Structure</h3>
                  <p className="text-gray-600">{businessModel.costStructure}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Key Resources</h3>
                  <p className="text-gray-600">{businessModel.keyResources}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Key Activities</h3>
                  <p className="text-gray-600">{businessModel.keyActivities}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Key Partners</h3>
                  <p className="text-gray-600">{businessModel.keyPartners}</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="revenueModel" className="block text-sm font-medium text-gray-700 mb-1">
                    Revenue Model
                  </label>
                  <input
                    type="text"
                    id="revenueModel"
                    name="revenueModel"
                    value={businessModel.revenueModel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  />
                </div>
                <div>
                  <label htmlFor="targetCustomers" className="block text-sm font-medium text-gray-700 mb-1">
                    Target Customers
                  </label>
                  <input
                    type="text"
                    id="targetCustomers"
                    name="targetCustomers"
                    value={businessModel.targetCustomers}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="valueProposition" className="block text-sm font-medium text-gray-700 mb-1">
                    Value Proposition
                  </label>
                  <textarea
                    id="valueProposition"
                    name="valueProposition"
                    value={businessModel.valueProposition}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  />
                </div>
                <div>
                  <label htmlFor="distributionChannels" className="block text-sm font-medium text-gray-700 mb-1">
                    Distribution Channels (comma separated)
                  </label>
                  <input
                    type="text"
                    id="distributionChannels"
                    name="distributionChannels"
                    value={businessModel.distributionChannels.join(', ')}
                    onChange={(e) => setBusinessModel(prev => ({
                      ...prev,
                      distributionChannels: e.target.value.split(',').map(item => item.trim())
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  />
                </div>
                <div>
                  <label htmlFor="costStructure" className="block text-sm font-medium text-gray-700 mb-1">
                    Cost Structure
                  </label>
                  <input
                    type="text"
                    id="costStructure"
                    name="costStructure"
                    value={businessModel.costStructure}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  />
                </div>
                <div>
                  <label htmlFor="keyResources" className="block text-sm font-medium text-gray-700 mb-1">
                    Key Resources
                  </label>
                  <input
                    type="text"
                    id="keyResources"
                    name="keyResources"
                    value={businessModel.keyResources}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  />
                </div>
                <div>
                  <label htmlFor="keyActivities" className="block text-sm font-medium text-gray-700 mb-1">
                    Key Activities
                  </label>
                  <input
                    type="text"
                    id="keyActivities"
                    name="keyActivities"
                    value={businessModel.keyActivities}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  />
                </div>
                <div>
                  <label htmlFor="keyPartners" className="block text-sm font-medium text-gray-700 mb-1">
                    Key Partners
                  </label>
                  <input
                    type="text"
                    id="keyPartners"
                    name="keyPartners"
                    value={businessModel.keyPartners}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessModel;