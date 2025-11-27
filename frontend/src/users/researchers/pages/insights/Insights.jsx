import React, { useState } from 'react';
import IndustryNeeds from './components/IndustryNeeds';
import TRLAnalysis from './components/TRLAnalysis';
import CommercialPotential from './components/CommercialPotential';
import CompetitorTracking from './components/CompetitorTracking';
import TrendForecasting from './components/TrendForecasting';
import GlobalReports from './components/GlobalReports';
import SectorProblems from './components/SectorProblems';
import ResearchBriefs from './components/ResearchBriefs';

const Insights = () => {
  const [activeTab, setActiveTab] = useState('landing');

  const tabs = [
    { id: 'landing', name: 'Market Insights Hub' },
    { id: 'industry', name: 'Industry Needs Mapping' },
    { id: 'trl', name: 'TRL Analysis' },
    { id: 'potential', name: 'Commercial Potential Score' },
    { id: 'competitors', name: 'Competitor Tech Tracking' },
    { id: 'trends', name: 'Trend Forecasting' },
    { id: 'reports', name: 'Global Innovation Reports' },
    { id: 'problems', name: 'Sector-Specific Problems' },
    { id: 'briefs', name: 'Downloadable Research Briefs' },
  ];

  // Summary data
  const summaryData = [
    { title: 'Industry Needs Map', value: 'High Demand in AI & Biotech', status: 'urgent' },
    { title: 'Global Trend Alerts', value: '3 New Trends Detected', status: 'new' },
    { title: 'Commercial Potential Score', value: '76/100', status: 'good' },
    { title: 'Technology Readiness Snapshot', value: 'TRL 6 - System Prototype', status: 'progress' },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage summaryData={summaryData} />;
      case 'industry':
        return <IndustryNeeds />;
      case 'trl':
        return <TRLAnalysis />;
      case 'potential':
        return <CommercialPotential />;
      case 'competitors':
        return <CompetitorTracking />;
      case 'trends':
        return <TrendForecasting />;
      case 'reports':
        return <GlobalReports />;
      case 'problems':
        return <SectorProblems />;
      case 'briefs':
        return <ResearchBriefs />;
      default:
        return <LandingPage summaryData={summaryData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Research Market Insights Hub</h1>
          <p className="text-gray-600">Data-driven insights for research commercialization</p>
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
const LandingPage = ({ summaryData }) => {
  return (
    <>
      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryData.map((item, index) => (
          <div key={index} className="bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-6 border-l-4 border-orange-500">
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            <p className="text-xl font-bold text-orange-600 mt-2">{item.value}</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 
              ${item.status === 'urgent' ? 'bg-red-100 text-red-800' : 
                item.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                item.status === 'good' ? 'bg-green-100 text-green-800' : 
                'bg-yellow-100 text-yellow-800'}">
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </div>
        ))}
      </div>

      {/* Data Visualization Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Industry Needs Mapping */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🏭 Industry Needs Mapping</h2>
          <div className="bg-white rounded-lg p-4 h-64 flex items-center justify-center border border-orange-100">
            <div className="text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-3" />
              <p className="text-gray-500">Interactive Heatmap Visualization</p>
              <p className="text-sm text-gray-400 mt-1">Filter by domain: AI, Energy, SpaceTech, BioTech</p>
            </div>
          </div>
        </div>

        {/* TRL Analysis */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">⚙️ TRL Analysis</h2>
          <div className="bg-white rounded-lg p-4 h-64 flex items-center justify-center border border-orange-100">
            <div className="text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 mx-auto mb-3" />
              <p className="text-gray-500">Circular TRL Meter</p>
              <p className="text-sm text-gray-400 mt-1">Recommended actions to progress to next level</p>
            </div>
          </div>
        </div>

        {/* Commercial Potential Score */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">💰 Commercial Potential Score</h2>
          <div className="bg-white rounded-lg p-4 h-64 flex items-center justify-center border border-orange-100">
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-600 mb-2">76/100</div>
              <p className="text-gray-500">AI-Generated Score</p>
              <p className="text-sm text-gray-400 mt-1">Comparison graph with competing technologies</p>
            </div>
          </div>
        </div>

        {/* Competitor Technology Tracking */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🆚 Competitor Technology Tracking</h2>
          <div className="bg-white rounded-lg p-4 h-64 flex items-center justify-center border border-orange-100">
            <div className="text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-3" />
              <p className="text-gray-500">Competitor Comparison Table</p>
              <p className="text-sm text-gray-400 mt-1">Radar chart comparing features</p>
            </div>
          </div>
        </div>

        {/* Trend Forecasting */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📈 Trend Forecasting</h2>
          <div className="bg-white rounded-lg p-4 h-64 flex items-center justify-center border border-orange-100">
            <div className="text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-3" />
              <p className="text-gray-500">Line Chart Prediction</p>
              <p className="text-sm text-gray-400 mt-1">AI insight summary</p>
            </div>
          </div>
        </div>

        {/* Global Innovation Reports */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🌍 Global Innovation Reports</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg p-3 border border-orange-100 flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Report {item}</p>
                  <p className="text-xs text-gray-500">Download PDF</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector-Specific Problem Statements */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🔍 Sector-Specific Problem Statements</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg p-4 border border-orange-100">
                <h3 className="font-medium text-gray-900 mb-1">Problem Statement {item}</h3>
                <p className="text-sm text-gray-600 mb-3">Brief description of a real industry challenge...</p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded-md text-sm font-medium">
                  Submit Solution Proposal
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Downloadable Research Briefs */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📚 Downloadable Research Briefs</h2>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg p-3 border border-orange-100 text-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-900">Brief {item}</p>
                <div className="flex justify-center space-x-1 mt-2">
                  <span className="text-xs text-gray-500">PDF</span>
                  <span className="text-xs text-gray-300">|</span>
                  <span className="text-xs text-gray-500">PPT</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Insights;