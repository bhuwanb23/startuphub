import React, { useState } from 'react';
import StartupCollaboration from './components/StartupCollaboration';
import IndustryPartnership from './components/IndustryPartnership';
import CoFoundersExperts from './components/CoFoundersExperts';
import TechTransfer from './components/TechTransfer';
import CommercializationSuggestions from './components/CommercializationSuggestions';
import JointResearchProjects from './components/JointResearchProjects';
import AgreementVault from './components/AgreementVault';

const Collaboration = () => {
  const [activeTab, setActiveTab] = useState('landing');

  const tabs = [
    { id: 'landing', name: 'Collaboration Hub' },
    { id: 'startups', name: 'Collaborate with Startups' },
    { id: 'industry', name: 'Industry Partnership Finder' },
    { id: 'cofounders', name: 'Co-Founders & Experts' },
    { id: 'techtransfer', name: 'Tech Transfer Opportunities' },
    { id: 'commercialization', name: 'Commercialization Suggestions' },
    { id: 'projects', name: 'Joint Research Projects' },
    { id: 'agreements', name: 'NDA & Agreement Vault' },
  ];

  // Stats data
  const stats = [
    { title: 'Potential Partners', value: '28' },
    { title: 'Active Collaborations', value: '4' },
    { title: 'New Matches', value: '7' },
    { title: 'Tech Transfer Opportunities', value: '5' },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage stats={stats} />;
      case 'startups':
        return <StartupCollaboration />;
      case 'industry':
        return <IndustryPartnership />;
      case 'cofounders':
        return <CoFoundersExperts />;
      case 'techtransfer':
        return <TechTransfer />;
      case 'commercialization':
        return <CommercializationSuggestions />;
      case 'projects':
        return <JointResearchProjects />;
      case 'agreements':
        return <AgreementVault />;
      default:
        return <LandingPage stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🎨 Co-Creation & Collaboration Center</h1>
          <p className="text-gray-600">Connect with partners, explore opportunities, and accelerate innovation</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

// Landing Page Component
const LandingPage = ({ stats }) => {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-6 border-l-4 border-orange-500">
            <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Interactive Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Collaborate with Startups */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🚀 Collaborate with Startups</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow p-4 border border-orange-100">
                  <div className="flex items-center mb-3">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">Startup Name {item}</h3>
                      <p className="text-sm text-gray-500">Domain expertise</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tech Compatibility</span>
                      <span className="font-medium">8{item}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `8${item}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                    Initiate Collaboration
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Partnership Finder */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🏭 Industry Partnership Finder</h2>
            <div className="mb-4">
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Search industry challenges..." 
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md font-medium">
                  Search
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {['AI/ML', 'Biotech', 'Clean Energy', 'Materials'].map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full cursor-pointer hover:bg-orange-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow p-4 border border-orange-100">
                  <h3 className="font-semibold text-gray-900 mb-1">Industry Challenge {item}</h3>
                  <p className="text-sm text-gray-600 mb-3">Brief description of the business problem statement from the industry partner...</p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded-md text-sm font-medium">
                    Offer Collaboration
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Co-Founders & Experts Matching */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">👥 Co-Founders & Experts Matching</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow p-4 text-center border border-orange-100">
                  <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-full w-16 h-16 mb-3" />
                  <h3 className="font-semibold text-gray-900">Expert {item}</h3>
                  <p className="text-sm text-gray-500 mb-2">Specialization Area</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Skill Alignment</span>
                      <span className="font-medium">9{item}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-orange-500 h-1.5 rounded-full" 
                        style={{ width: `9${item}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded-md text-xs font-medium">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Transfer Opportunities */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🔄 Tech Transfer Opportunities</h2>
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow p-4 border border-orange-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">Technology {item}</h3>
                      <p className="text-sm text-gray-600">Patent/IP description for licensing...</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      TRL {item + 3}
                    </span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded-md text-sm font-medium">
                      View License Terms
                    </button>
                    <button className="bg-white hover:bg-gray-50 border border-orange-500 text-orange-600 py-1 px-3 rounded-md text-sm font-medium">
                      Request Info
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Joint Research Projects */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🔬 Joint Research Projects</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Research Collaboration Pipeline</h3>
                <span className="text-sm text-gray-500">Kanban View</span>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {['Ideas', 'Review', 'Prototype', 'Testing', 'Publish'].map((stage, index) => (
                  <div key={index} className="border border-gray-200 rounded p-3">
                    <h4 className="font-medium text-gray-900 text-sm mb-2">{stage}</h4>
                    <div className="space-y-2">
                      <div className="bg-orange-50 border border-orange-100 rounded p-2">
                        <p className="text-xs text-gray-700">Project {index + 1}</p>
                      </div>
                      <div className="bg-orange-50 border border-orange-100 rounded p-2">
                        <p className="text-xs text-gray-700">Project {index + 2}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - AI Panel */}
        <div className="space-y-8">
          {/* AI-Based Commercialization Suggestions */}
          <div className="bg-gradient-to-b from-orange-50 to-saffron-50 rounded-lg p-6 border border-orange-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🤖 AI-Based Commercialization Suggestions</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Industry Vertical Fit</h3>
                <p className="text-sm text-gray-600 mb-2">Healthcare Diagnostics</p>
                <div className="flex justify-between text-sm mb-1">
                  <span>Demand Potential</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Recommended Use Cases</h3>
                <ul className="text-sm text-gray-600 space-y-1 mt-2">
                  <li>• Point-of-care diagnostic devices</li>
                  <li>• Laboratory automation systems</li>
                  <li>• Telemedicine platforms</li>
                </ul>
              </div>
              
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium">
                Convert to Startup Idea
              </button>
            </div>
          </div>

          {/* Agreement & NDA Vault */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🔒 Agreement & NDA Vault</h2>
            <div className="space-y-3">
              {['MoU with Partner A.pdf', 'NDA with Startup B.docx', 'IP Agreement C.pdf'].map((doc, index) => (
                <div key={index} className="flex justify-between items-center bg-white rounded-lg p-3 border border-gray-200">
                  <span className="text-sm text-gray-700">{doc}</span>
                  <div className="flex space-x-2">
                    <button className="text-orange-600 hover:text-orange-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="text-orange-600 hover:text-orange-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full bg-white border border-orange-500 text-orange-600 hover:bg-orange-50 py-2 px-4 rounded-md text-sm font-medium">
              Upload New Document
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collaboration;