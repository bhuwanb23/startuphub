import React, { useState } from 'react';
import DealFlowSidebar from './components/DealFlowSidebar';
import FiltersPanel from './components/FiltersPanel';
import StartupCards from './components/StartupCards';
import DealRankingGraph from './components/DealRankingGraph';
import { DEALFLOW_NAVIGATION } from './constants/navigation';

const DealFlow = () => {
  const [activeSection, setActiveSection] = useState('recommended');

  // Mock data for founder profile
  const founderData = {
    name: "Alex Johnson",
    title: "CEO & Founder",
    company: "NeuroSync AI",
    credibilityScore: 92,
    experience: "15+ years in AI and Neuroscience",
    education: "PhD in Computational Neuroscience, MIT",
    previousExits: "2 successful exits in health tech",
    linkedin: "linkedin.com/in/alexjohnson",
    achievements: [
      "Published 25+ research papers in top journals",
      "Keynote speaker at AI World Conference 2023",
      "Advised 3 unicorn startups in the health tech space"
    ]
  };

  // Mock data for pipeline actions
  const pipelineActions = [
    { id: 1, name: "NeuroSync AI", stage: "Due Diligence", status: "In Progress" },
    { id: 2, name: "GreenTech Pro", stage: "Term Sheet", status: "Pending" },
    { id: 3, name: "FinStream Analytics", stage: "Initial Review", status: "Completed" }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'recommended':
        return (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section - Filters */}
            <div className="w-full lg:w-1/4">
              <FiltersPanel />
            </div>
            
            {/* Right Section - Startup Cards */}
            <div className="w-full lg:w-3/4">
              <StartupCards />
            </div>
          </div>
        );
      case 'ranking':
        return <DealRankingGraph />;
      case 'profile':
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Founder Credibility Score Badge</h2>
              <div className="flex items-center bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-3 py-1 rounded-full">
                <span className="text-sm font-bold">Score: {founderData.credibilityScore}/100</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center mx-auto" />
                <h3 className="text-lg font-bold text-center mt-4">{founderData.name}</h3>
                <p className="text-gray-600 text-center">{founderData.title}, {founderData.company}</p>
                
                <div className="mt-6 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700">Experience</h4>
                    <p className="text-sm text-gray-600">{founderData.experience}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Education</h4>
                    <p className="text-sm text-gray-600">{founderData.education}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Previous Exits</h4>
                    <p className="text-sm text-gray-600">{founderData.previousExits}</p>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="font-bold text-gray-800 mb-3">Key Achievements</h3>
                <ul className="space-y-2">
                  {founderData.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#FF6A00] mr-2">✓</span>
                      <span className="text-gray-700 text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6">
                  <h3 className="font-bold text-gray-800 mb-3">Credibility Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#FFF5EB] p-4 rounded-lg">
                      <div className="text-[#FF6A00] font-bold text-lg">92%</div>
                      <div className="text-gray-600 text-sm">Team Strength</div>
                    </div>
                    <div className="bg-[#FFF5EB] p-4 rounded-lg">
                      <div className="text-[#FF6A00] font-bold text-lg">88%</div>
                      <div className="text-gray-600 text-sm">Track Record</div>
                    </div>
                    <div className="bg-[#FFF5EB] p-4 rounded-lg">
                      <div className="text-[#FF6A00] font-bold text-lg">95%</div>
                      <div className="text-gray-600 text-sm">Vision Clarity</div>
                    </div>
                    <div className="bg-[#FFF5EB] p-4 rounded-lg">
                      <div className="text-[#FF6A00] font-bold text-lg">85%</div>
                      <div className="text-gray-600 text-sm">Execution Ability</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'pipeline':
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Save to Pipeline / Reject UI</h2>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Current Pipeline Actions</h3>
              <div className="space-y-3">
                {pipelineActions.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">{action.name}</h4>
                      <p className="text-sm text-gray-600">Stage: {action.stage}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        action.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        action.status === 'Pending' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {action.status}
                      </span>
                      <button className="ml-4 text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-gray-700 mb-3">Add New Deal to Pipeline</h3>
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors font-medium">
                  Save to Pipeline
                </button>
                <button className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Reject Deal
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section - Filters */}
            <div className="w-full lg:w-1/4">
              <FiltersPanel />
            </div>
            
            {/* Right Section - Startup Cards */}
            <div className="w-full lg:w-3/4">
              <StartupCards />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <DealFlowSidebar 
          navigation={DEALFLOW_NAVIGATION} 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900">Smart Deal Flow Engine</h1>
          <p className="text-gray-600 mt-2">AI-driven investment discovery and deal pipeline management</p>
        </div>
        
        {/* Page Content */}
        <div className="flex-1 overflow-hidden p-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 h-full overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealFlow;