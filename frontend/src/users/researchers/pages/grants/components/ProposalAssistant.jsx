import React, { useState } from 'react';

const ProposalAssistant = () => {
  const [proposalSections, setProposalSections] = useState({
    abstract: '',
    objectives: '',
    methodology: '',
    budget: '',
    impact: ''
  });

  const suggestions = [
    "Consider adding more specific metrics for measuring success",
    "Include a timeline with clear milestones",
    "Add details about potential risks and mitigation strategies",
    "Clarify how this research addresses a gap in current knowledge"
  ];

  const handleSectionChange = (section, value) => {
    setProposalSections({
      ...proposalSections,
      [section]: value
    });
  };

  const generateFullProposal = () => {
    // Implementation for generating full proposal
    alert('Full proposal would be generated and downloaded here');
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">✍️ Proposal Writing Assistant</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Writing Workspace - Left */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">Abstract</h3>
            <textarea
              value={proposalSections.abstract}
              onChange={(e) => handleSectionChange('abstract', e.target.value)}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              placeholder="Briefly describe your research project, its significance, and expected outcomes..."
            />
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">Objectives</h3>
            <textarea
              value={proposalSections.objectives}
              onChange={(e) => handleSectionChange('objectives', e.target.value)}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              placeholder="List the specific objectives of your research project..."
            />
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">Methodology</h3>
            <textarea
              value={proposalSections.methodology}
              onChange={(e) => handleSectionChange('methodology', e.target.value)}
              className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              placeholder="Describe your research approach, experimental design, and data collection methods..."
            />
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">Budget</h3>
            <textarea
              value={proposalSections.budget}
              onChange={(e) => handleSectionChange('budget', e.target.value)}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              placeholder="Detail the budget requirements for personnel, equipment, materials, and other expenses..."
            />
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">Expected Impact</h3>
            <textarea
              value={proposalSections.impact}
              onChange={(e) => handleSectionChange('impact', e.target.value)}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              placeholder="Explain the potential impact of your research on science, society, and industry..."
            />
          </div>
          
          <div className="text-center">
            <button 
              onClick={generateFullProposal}
              className="px-6 py-3 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors font-medium"
            >
              Generate Full Proposal
            </button>
          </div>
        </div>
        
        {/* AI Suggestions - Right */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-4">AI Suggestions</h3>
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-3 bg-[#FFF5EB] border-l-4 border-[#FF6A00] rounded-r-lg">
                <div className="flex">
                  <div className="text-[#FF6A00] mr-2">💡</div>
                  <div className="text-gray-800">{suggestion}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-800 mb-3">Writing Tips</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <div className="text-[#FF6A00] mr-2">•</div>
                <span>Use clear, concise language</span>
              </li>
              <li className="flex items-start">
                <div className="text-[#FF6A00] mr-2">•</div>
                <span>Justify all budget items</span>
              </li>
              <li className="flex items-start">
                <div className="text-[#FF6A00] mr-2">•</div>
                <span>Include references to prior work</span>
              </li>
              <li className="flex items-start">
                <div className="text-[#FF6A00] mr-2">•</div>
                <span>Address potential limitations</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-800 mb-3">Improvement Score</h4>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-[#FF6A00] h-2.5 rounded-full" style={{width: '75%'}}></div>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">75%</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">Your proposal is well-structured. Add more specific details to improve.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalAssistant;