import React, { useState } from 'react';

const CorporatePartnerships = () => {
  const [activeTab, setActiveTab] = useState('directory');

  // Mock data for corporate partners
  const partners = [
    { id: 1, name: 'TechGlobal Inc.', logo: 'TG', description: 'Leading technology solutions provider', type: 'Technology', collaborations: 5 },
    { id: 2, name: 'InnovateCorp', logo: 'IC', description: 'Innovation-driven corporation', type: 'R&D', collaborations: 3 },
    { id: 3, name: 'FutureSystems Ltd.', logo: 'FS', description: 'Advanced systems integrator', type: 'Engineering', collaborations: 7 },
    { id: 4, name: 'DigitalTransform', logo: 'DT', description: 'Digital transformation specialists', type: 'Consulting', collaborations: 2 }
  ];

  // Mock data for partnership opportunities
  const opportunities = [
    { id: 1, title: 'AI-Powered Supply Chain Optimization', company: 'TechGlobal Inc.', challenge: 'Reduce logistics costs by 20%', reward: '$50,000' },
    { id: 2, title: 'Sustainable Packaging Solutions', company: 'InnovateCorp', challenge: 'Develop eco-friendly packaging', reward: '$30,000' },
    { id: 3, title: 'IoT-Based Asset Tracking', company: 'FutureSystems Ltd.', challenge: 'Real-time equipment monitoring', reward: '$40,000' }
  ];

  // Mock data for sponsored programs
  const programs = [
    { id: 1, name: 'GreenTech Accelerator', funding: '$500,000', startups: 12, progress: 75 },
    { id: 2, name: 'Healthcare Innovation Challenge', funding: '$300,000', startups: 8, progress: 40 },
    { id: 3, name: 'Smart Cities Initiative', funding: '$750,000', startups: 15, progress: 90 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Corporate Partnerships</h2>
        <p className="text-gray-600">Manage relationships with corporate partners and explore opportunities</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'directory'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('directory')}
        >
          Partner Directory
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'opportunities'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('opportunities')}
        >
          Opportunities Explorer
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'programs'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('programs')}
        >
          Sponsored Programs
        </button>
      </div>

      {/* Partner Directory */}
      {activeTab === 'directory' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {partners.map((partner) => (
              <div key={partner.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold mr-3">
                    {partner.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{partner.name}</h3>
                    <p className="text-sm text-gray-600">{partner.type}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{partner.collaborations} collaborations</span>
                  <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Partnership Opportunities */}
      {activeTab === 'opportunities' && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-800">{opportunity.title}</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded">
                    {opportunity.reward}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">Company: {opportunity.company}</p>
                <p className="text-gray-700 mb-4">{opportunity.challenge}</p>
                <div className="flex justify-between items-center">
                  <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                    Apply Now
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sponsored Programs */}
      {activeTab === 'programs' && (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Funding</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Startups</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {programs.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{program.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{program.funding}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{program.startups}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${program.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{program.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-orange-600 hover:text-orange-900 mr-3">View</button>
                      <button className="text-gray-600 hover:text-gray-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorporatePartnerships;