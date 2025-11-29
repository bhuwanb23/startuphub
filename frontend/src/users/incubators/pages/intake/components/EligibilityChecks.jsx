import React, { useState } from 'react';

const EligibilityChecks = () => {
  const [checks, setChecks] = useState([
    {
      id: 1,
      name: 'TRL Requirement',
      description: 'Technology Readiness Level must be between 3-7',
      status: 'Pass',
      aiSuggestion: 'Meets TRL requirement'
    },
    {
      id: 2,
      name: 'Sector Eligibility',
      description: 'Must operate in eligible sectors: Tech, Healthcare, Clean Energy, FinTech',
      status: 'Pass',
      aiSuggestion: 'Eligible sector'
    },
    {
      id: 3,
      name: 'IP Ownership',
      description: 'Clear IP ownership with no disputes',
      status: 'Warning',
      aiSuggestion: 'Borderline - requires review'
    },
    {
      id: 4,
      name: 'Team Capability',
      description: 'Minimum 2 founders with relevant experience',
      status: 'Pass',
      aiSuggestion: 'Strong team profile'
    },
    {
      id: 5,
      name: 'Minimum Traction',
      description: 'Some market validation or early customers',
      status: 'Fail',
      aiSuggestion: 'Not eligible - lacks traction'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pass':
        return 'bg-green-100 text-green-800';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'Fail':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOverallStatus = () => {
    const failCount = checks.filter(check => check.status === 'Fail').length;
    const warningCount = checks.filter(check => check.status === 'Warning').length;
    
    if (failCount > 0) return 'Not Eligible';
    if (warningCount > 0) return 'Borderline';
    return 'Likely Eligible';
  };

  const getOverallStatusColor = () => {
    const status = getOverallStatus();
    switch (status) {
      case 'Likely Eligible':
        return 'bg-green-100 text-green-800';
      case 'Borderline':
        return 'bg-yellow-100 text-yellow-800';
      case 'Not Eligible':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Eligibility Checks</h2>
        <p className="text-gray-600">Evaluate startup eligibility against program criteria</p>
      </div>

      {/* Overall Status */}
      <div className="mb-8 bg-gray-50 rounded-xl p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-800">Overall Eligibility</h3>
            <p className="text-gray-600">AI-based assessment result</p>
          </div>
          <span className={`px-4 py-2 text-lg font-bold rounded-full ${getOverallStatusColor()}`}>
            {getOverallStatus()}
          </span>
        </div>
        
        <div className="mt-4 flex space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-600">Pass: {checks.filter(c => c.status === 'Pass').length}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-sm text-gray-600">Warning: {checks.filter(c => c.status === 'Warning').length}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm text-gray-600">Fail: {checks.filter(c => c.status === 'Fail').length}</span>
          </div>
        </div>
      </div>

      {/* Eligibility Criteria */}
      <div className="space-y-4">
        {checks.map((check) => (
          <div key={check.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800">{check.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{check.description}</p>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(check.status)}`}>
                {check.status}
              </span>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-2 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">AI Suggestion</h4>
                  <p className="text-blue-700 text-sm">{check.aiSuggestion}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                View Details
              </button>
              <button className="px-3 py-1 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] text-sm">
                Override
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end space-x-3">
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
          Request More Info
        </button>
        <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500]">
          Proceed to Screening
        </button>
      </div>
    </div>
  );
};

export default EligibilityChecks;