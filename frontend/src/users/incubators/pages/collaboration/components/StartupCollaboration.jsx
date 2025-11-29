import React, { useState } from 'react';

const StartupCollaboration = () => {
  const [activeTab, setActiveTab] = useState('finder');

  // Mock data for startups
  const startups = [
    { id: 1, name: 'BioTech Innovations', industry: 'Biotechnology', stage: 'Growth', needs: ['Marketing', 'Funding'], offers: ['Lab Equipment'] },
    { id: 2, name: 'Green Energy Solutions', industry: 'Clean Energy', stage: 'Prototype', needs: ['Engineering', 'Prototyping'], offers: ['Market Research'] },
    { id: 3, name: 'AI Health Diagnostics', industry: 'Health Tech', stage: 'Validation', needs: ['Regulatory', 'Clinical Trials'], offers: ['AI Algorithms'] },
    { id: 4, name: 'Sustainable Materials', industry: 'Materials Science', stage: 'Prototype', needs: ['Chemistry', 'Testing'], offers: ['Raw Materials'] }
  ];

  // Mock data for service barter
  const services = [
    { id: 1, provider: 'BioTech Innovations', service: 'Lab Equipment Access', seeker: 'Green Energy Solutions', exchange: 'Marketing Campaign' },
    { id: 2, provider: 'AI Health Diagnostics', service: 'AI Algorithm Development', seeker: 'Sustainable Materials', exchange: 'Material Testing' }
  ];

  // Mock data for technology swaps
  const techSwaps = [
    { id: 1, provider: 'BioTech Innovations', tech: 'Genetic Sequencing Tools', seeker: 'AI Health Diagnostics', exchange: 'Predictive Analytics Engine' },
    { id: 2, provider: 'Green Energy Solutions', tech: 'Solar Panel Prototypes', seeker: 'Sustainable Materials', exchange: 'Biodegradable Polymers' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Startup–Startup Collaboration</h2>
        <p className="text-gray-600">Connect startups for mutual benefit and resource sharing</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'finder'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('finder')}
        >
          Co-Founder Finder
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'services'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('services')}
        >
          Service Barter System
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'technology'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('technology')}
        >
          Technology Swap Hub
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'proposals'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('proposals')}
        >
          Proposal Generator
        </button>
      </div>

      {/* Co-Founder Finder */}
      {activeTab === 'finder' && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {startups.map((startup) => (
              <div key={startup.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-800">{startup.name}</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded">
                    {startup.stage}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{startup.industry}</p>
                
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Needs</h4>
                  <div className="flex flex-wrap gap-1">
                    {startup.needs.map((need, index) => (
                      <span key={index} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                        {need}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Offers</h4>
                  <div className="flex flex-wrap gap-1">
                    {startup.offers.map((offer, index) => (
                      <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {offer}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service Barter System */}
      {activeTab === 'services' && (
        <div>
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Offered</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seeker</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exchange</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.provider}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.service}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.seeker}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.exchange}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
              Propose Barter
            </button>
          </div>
        </div>
      )}

      {/* Technology Swap Hub */}
      {activeTab === 'technology' && (
        <div>
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technology</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seeker</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exchange</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {techSwaps.map((swap) => (
                  <tr key={swap.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{swap.provider}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{swap.tech}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{swap.seeker}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{swap.exchange}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Negotiation
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
              Propose Swap
            </button>
          </div>
        </div>
      )}

      {/* Proposal Generator */}
      {activeTab === 'proposals' && (
        <div>
          <div className="border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">Generate Collaboration Proposal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Proposal Title</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter proposal title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Collaboration Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Resource Sharing</option>
                  <option>Joint Development</option>
                  <option>Market Expansion</option>
                  <option>Technology Licensing</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Startup</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Select a startup</option>
                  {startups.map((startup) => (
                    <option key={startup.id}>{startup.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Startup</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value="Current Startup Name"
                  readOnly
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Proposal Description</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
                placeholder="Describe the collaboration opportunity..."
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What We Offer</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="3"
                  placeholder="List resources, expertise, or services you provide"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What We Seek</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="3"
                  placeholder="List resources, expertise, or services you need"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                Generate Proposal
              </button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Recent Proposals</h3>
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-800">Joint Product Development with BioTech Innovations</h4>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Accepted</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Proposed on June 10, 2023</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-800">Market Research Exchange with Green Energy Solutions</h4>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Proposed on June 15, 2023</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupCollaboration;