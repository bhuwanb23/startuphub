import React, { useState } from 'react';

const ClaimGenerationTools = () => {
  const [claims, setClaims] = useState([
    { id: 1, text: 'A method for AI-assisted drug discovery comprising...', level: 1, risk: 'Medium' },
    { id: 2, text: 'The method of claim 1, wherein the AI model comprises...', level: 2, risk: 'Low' },
    { id: 3, text: 'A system for drug discovery utilizing the method of claim 1...', level: 1, risk: 'High' },
  ]);

  const addClaim = () => {
    const newClaim = {
      id: claims.length + 1,
      text: 'New claim text...',
      level: 1,
      risk: 'Medium'
    };
    setClaims([...claims, newClaim]);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Claim Generation Tools</h1>
        <p className="text-gray-600">Auto-generate structured claims with hierarchy builder</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Claims Builder */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Claims Hierarchy Builder</h2>
              <button 
                onClick={addClaim}
                className="bg-[#F4A300] hover:bg-[#F26B1D] text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Claim
              </button>
            </div>
            
            <div className="space-y-4">
              {claims.map((claim) => (
                <div key={claim.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-800 mr-2">Claim {claim.id}:</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(claim.risk)}`}>
                        Risk: {claim.risk}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={claim.text}
                    onChange={(e) => {
                      const updatedClaims = claims.map(c => 
                        c.id === claim.id ? {...c, text: e.target.value} : c
                      );
                      setClaims(updatedClaims);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
                    rows="3"
                  />
                  <div className="mt-2 flex items-center">
                    <label className="text-sm text-gray-600 mr-2">Level:</label>
                    <select 
                      value={claim.level}
                      onChange={(e) => {
                        const updatedClaims = claims.map(c => 
                          c.id === claim.id ? {...c, level: parseInt(e.target.value)} : c
                        );
                        setClaims(updatedClaims);
                      }}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value={1}>Independent</option>
                      <option value={2}>Dependent</option>
                      <option value={3}>Sub-dependent</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Assessment Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Risk Assessment</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Novelty Risk</span>
                  <span className="text-sm font-medium text-gray-800">Medium</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#F4A300] h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Prior Art Risk</span>
                  <span className="text-sm font-medium text-gray-800">Low</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Enforceability Risk</span>
                  <span className="text-sm font-medium text-gray-800">High</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Generate Independent Claims
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Optimize Claim Structure
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                Check for Redundancy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimGenerationTools;