import React, { useState } from 'react';
import GovtGrants from './components/GovtGrants';
import InternationalFunding from './components/InternationalFunding';
import StartupCollaboration from './components/StartupCollaboration';
import EligibilityChecker from './components/EligibilityChecker';
import ProposalAssistant from './components/ProposalAssistant';
import TimelineTracker from './components/TimelineTracker';

const Grants = () => {
  const [activeTab, setActiveTab] = useState('landing');

  const tabs = [
    { id: 'landing', name: 'Funding Hub' },
    { id: 'govt', name: 'Government Grants' },
    { id: 'international', name: 'International Funding' },
    { id: 'startup', name: 'Startup Collaboration' },
    { id: 'eligibility', name: 'Eligibility Checker' },
    { id: 'proposal', name: 'Proposal Assistant' },
    { id: 'timeline', name: 'Timeline Tracker' },
  ];

  // Quick stats data
  const stats = [
    { title: 'Eligible Grants', value: '14', icon: '💰' },
    { title: 'New Matches', value: '5', icon: '🎯' },
    { title: 'Deadlines This Week', value: '3', icon: '📅' },
    { title: 'Success Probability', value: '78%', icon: '📈' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🎨 Grant & Funding Matchmaking</h1>
        <p className="text-gray-600 mt-2">Discover and apply for research grants and funding opportunities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h2>
            <div className="space-y-3">
              {tabs.slice(1).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Top Section - Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-2xl font-bold text-[#FF6A00]">{stat.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.title}</div>
                  </div>
                  <div className="text-2xl">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {activeTab === 'landing' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Grant & Funding Hub</h2>
                  <button className="py-2 px-4 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors font-medium">
                    AI-Based Funding Match
                  </button>
                </div>

                {/* Government Grants Explorer */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">🏛️ Government Grants Explorer</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { agency: 'DST', title: 'Advanced Research Fellowship', amount: '₹50 Lakhs', deadline: 'Dec 15, 2025' },
                      { agency: 'DRDO', title: 'Defense Technology Innovation', amount: '₹2 Crores', deadline: 'Jan 30, 2026' },
                      { agency: 'ISRO', title: 'Space Research Grant', amount: '₹1.5 Crores', deadline: 'Feb 28, 2026' },
                    ].map((grant, index) => (
                      <div key={index} className="border border-[#FF8C42] rounded-xl p-4 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-800">{grant.title}</h4>
                          <span className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">{grant.agency}</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-3">{grant.amount}</div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Deadline: {grant.deadline}</span>
                          <button className="text-xs text-[#FF6A00] hover:text-[#e05500] font-medium">
                            Check Eligibility
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* International Funding Agencies */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">🌍 International Funding Agencies</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['All Regions', 'EU', 'US', 'UK', 'Japan'].map((region, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { agency: 'Horizon Europe', country: 'EU', type: 'Research Grant', amount: '€2.5M' },
                      { agency: 'NSF', country: 'US', type: 'Research Grant', amount: '$500K' },
                      { agency: 'NIH', country: 'US', type: 'Biomedical Research', amount: '$1M' },
                      { agency: 'World Bank', country: 'Global', type: 'Development', amount: '$10M' },
                    ].map((funder, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-800">{funder.agency}</h4>
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{funder.country}</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{funder.type}</div>
                        <div className="text-sm text-[#FF6A00] font-medium">{funder.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Startup Collaboration Grants */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">🤝 Startup Collaboration Grants</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { program: 'Industry-Academia Joint Fund', type: 'Co-funded', score: '87%' },
                      { program: 'Tech Transfer Initiative', type: 'Joint Research', score: '92%' },
                    ].map((grant, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-800">{grant.program}</h4>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{grant.type}</span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <div className="text-sm text-gray-600">Compatibility Score</div>
                            <div className="text-lg font-bold text-[#FF6A00]">{grant.score}</div>
                          </div>
                          <button className="py-1 px-3 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm">
                            Match with Startup
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'govt' && <GovtGrants />}
            {activeTab === 'international' && <InternationalFunding />}
            {activeTab === 'startup' && <StartupCollaboration />}
            {activeTab === 'eligibility' && <EligibilityChecker />}
            {activeTab === 'proposal' && <ProposalAssistant />}
            {activeTab === 'timeline' && <TimelineTracker />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grants;