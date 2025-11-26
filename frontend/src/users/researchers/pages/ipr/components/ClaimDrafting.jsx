import React, { useState } from 'react';

const ClaimDrafting = () => {
  const [claimText, setClaimText] = useState('A method for secure data transmission comprising:');
  const [suggestions, setSuggestions] = useState([
    'encrypting the data using quantum encryption algorithms',
    'transmitting the encrypted data through a secure communication channel',
    'decrypting the received data using a corresponding decryption key'
  ]);
  
  const templates = [
    { id: 1, name: 'Method Claim', content: 'A method for [INVENTION] comprising:' },
    { id: 2, name: 'System Claim', content: 'A system for [INVENTION] comprising:' },
    { id: 3, name: 'Apparatus Claim', content: 'An apparatus for [INVENTION] comprising:' }
  ];
  
  const terminology = [
    'quantum encryption', 'secure communication', 'data transmission', 
    'cryptographic key', 'authentication protocol', 'blockchain verification'
  ];
  
  const patentabilityScore = 87;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">✍️ AI Claim Drafting Assistant</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Panel - Left */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Claim Editor</h3>
            <div className="flex gap-2">
              <button className="text-sm px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                Save
              </button>
              <button className="text-sm px-3 py-1 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors">
                Export
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <textarea
              className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              value={claimText}
              onChange={(e) => setClaimText(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setClaimText(template.content)}
                className="text-xs px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* AI Suggestions - Right */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">AI Suggestions</h3>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="mr-3 mt-1">
                    <input type="checkbox" className="rounded text-[#FF6A00] focus:ring-[#FF6A00]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">{suggestion}</p>
                    <button className="text-xs text-[#FF6A00] hover:text-[#e05500] mt-1">
                      Insert
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-[#FF6A00] text-[#FF6A00] rounded-lg hover:bg-[#FFF5EB] transition-colors text-sm font-medium">
              Generate More Suggestions
            </button>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">Technical Terminology</h3>
            <div className="flex flex-wrap gap-2">
              {terminology.map((term, index) => (
                <button
                  key={index}
                  onClick={() => setClaimText(claimText + ' ' + term)}
                  className="text-xs bg-[#FFF5EB] text-[#FF6A00] px-2 py-1 rounded hover:bg-[#FF6A00] hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">Patentability Score</h3>
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-[#FFF5EB] flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-[#FF6A00]">{patentabilityScore}%</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span>Novelty</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-[#FF6A00] h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Non-obviousness</span>
                  <span>84%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#FF6A00] h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
              Improve Score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimDrafting;