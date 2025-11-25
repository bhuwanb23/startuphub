import React, { useState } from 'react';

const CollaborationBoard = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for collaboration opportunities
  const opportunities = [
    {
      id: 1,
      title: 'AI-Powered Healthcare Diagnostics',
      description: 'Seeking ML engineers and healthcare domain experts for diagnostic tool development',
      postedBy: 'MedTech Innovations',
      postedDate: '2024-06-15',
      category: 'Healthcare',
      commitment: 'Part-time',
      compensation: 'Equity + $5K/month',
      applicants: 12,
      status: 'Open',
      tags: ['AI', 'Healthcare', 'Machine Learning'],
    },
    {
      id: 2,
      title: 'Sustainable Packaging Solution',
      description: 'Looking for materials scientists and sustainability experts for eco-friendly packaging',
      postedBy: 'GreenTech Solutions',
      postedDate: '2024-06-12',
      category: 'Sustainability',
      commitment: 'Full-time',
      compensation: 'Equity + $8K/month',
      applicants: 8,
      status: 'Open',
      tags: ['Materials Science', 'Sustainability', 'Manufacturing'],
    },
    {
      id: 3,
      title: 'Fintech Security Platform',
      description: 'Need cybersecurity experts and blockchain developers for financial security solution',
      postedBy: 'SecureFin Labs',
      postedDate: '2024-06-10',
      category: 'Financial Services',
      commitment: 'Contract',
      compensation: '$15K fixed',
      applicants: 15,
      status: 'Open',
      tags: ['Cybersecurity', 'Blockchain', 'Fintech'],
    },
  ];

  // Mock data for my collaborations
  const myCollaborations = [
    {
      id: 1,
      title: 'IoT Smart Agriculture System',
      role: 'Lead Developer',
      status: 'Active',
      startDate: '2024-05-01',
      collaborators: 5,
      progress: 75,
      nextMilestone: 'Prototype Testing - 2024-06-30',
    },
    {
      id: 2,
      title: 'Renewable Energy Analytics',
      role: 'Data Scientist',
      status: 'Active',
      startDate: '2024-04-15',
      collaborators: 3,
      progress: 60,
      nextMilestone: 'Beta Launch - 2024-07-15',
    },
  ];

  // Mock data for collaboration requests
  const requests = [
    {
      id: 1,
      from: 'Dr. Sarah Johnson',
      project: 'Genetic Engineering Research',
      message: 'Interested in collaborating on your CRISPR research project',
      date: '2024-06-16',
      status: 'Pending',
    },
    {
      id: 2,
      from: 'Alex Thompson',
      project: 'SaaS Product Development',
      message: 'Would like to join your startup as CTO',
      date: '2024-06-14',
      status: 'Accepted',
    },
  ];

  const filteredOpportunities = opportunities.filter(opp => 
    opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Collaboration Board</h1>
        <p className="text-gray-600 mt-1">Find collaboration opportunities and manage your projects</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Collaboration Insight</h2>
            <p className="text-gray-700 mt-1">
              The AI-Powered Healthcare Diagnostics project matches your expertise profile. 
              It has 12 applicants and offers equity + $5K/month compensation.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'opportunities'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Collaboration Opportunities
          </button>
          <button
            onClick={() => setActiveTab('my-collaborations')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'my-collaborations'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            My Collaborations
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'requests'
                ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Collaboration Requests
          </button>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search collaboration opportunities..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Collaboration Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <div className="mt-6 space-y-4">
            {filteredOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{opportunity.title}</h3>
                    <p className="text-gray-600 mt-1">{opportunity.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {opportunity.category}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {opportunity.commitment}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {opportunity.compensation}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        opportunity.status === 'Open' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {opportunity.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Posted by {opportunity.postedBy}</div>
                    <div className="text-sm text-gray-500 mt-1">{opportunity.postedDate}</div>
                    <div className="text-sm text-gray-500 mt-2">👥 {opportunity.applicants} applicants</div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1">
                    {opportunity.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Save for Later
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* My Collaborations Tab */}
        {activeTab === 'my-collaborations' && (
          <div className="mt-6 space-y-4">
            {myCollaborations.map((collab) => (
              <div key={collab.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{collab.title}</h3>
                    <p className="text-[#FF6A00] text-sm font-medium mt-1">My Role: {collab.role}</p>
                    <div className="mt-3 flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-[#FF6A00]"
                          style={{ width: `${collab.progress}%` }}
                        ></div>
                      </div>
                      <span className="ml-3 text-sm text-gray-600">{collab.progress}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      collab.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {collab.status}
                    </span>
                    <div className="text-sm text-gray-500 mt-2">Started: {collab.startDate}</div>
                    <div className="text-sm text-gray-500 mt-1">👥 {collab.collaborators} collaborators</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Next Milestone:</span>
                      <span className="text-sm text-gray-600 ml-2">{collab.nextMilestone}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-sm hover:bg-[#FFE9D7] transition-colors">
                        View Details
                      </button>
                      <button className="px-3 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-sm hover:bg-[#FFE9D7] transition-colors">
                        Message Team
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Collaboration Requests Tab */}
        {activeTab === 'requests' && (
          <div className="mt-6 space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Collaboration Request</h3>
                    <p className="text-gray-600 mt-1">
                      <span className="font-medium">{request.from}</span> wants to collaborate on 
                      <span className="font-medium"> {request.project}</span>
                    </p>
                    <p className="text-gray-500 text-sm mt-2">{request.message}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{request.date}</div>
                    <span className={`px-2 py-1 rounded text-xs font-medium mt-2 inline-block ${
                      request.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : request.status === 'Accepted' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                </div>
                
                {request.status === 'Pending' && (
                  <div className="mt-4 flex gap-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
                      Accept
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                      Decline
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      View Profile
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Board Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Collaboration Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">142</div>
            <div className="text-sm text-gray-600">Active Opportunities</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">28</div>
            <div className="text-sm text-gray-600">My Collaborations</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">12</div>
            <div className="text-sm text-gray-600">Pending Requests</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationBoard;