import React, { useState } from 'react';

const PatentDraftingAssistant = () => {
  const [draftContent, setDraftContent] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState([
    'Consider adding claims about the novel algorithm used in drug discovery',
    'Include specific examples of molecular structures tested',
    'Add data on efficacy compared to existing treatments'
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Patent Drafting Assistant</h1>
        <p className="text-gray-600">AI-powered patent drafting with real-time suggestions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Patent Draft Editor</h2>
              <button className="bg-[#F4A300] hover:bg-[#F26B1D] text-white px-4 py-2 rounded-lg transition-colors">
                Generate Draft PDF
              </button>
            </div>
            <textarea
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
              placeholder="Start typing your patent draft here..."
            />
          </div>
        </div>

        {/* AI Suggestions Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">AI Suggestions</h2>
            <div className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="p-3 bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg">
                  <div className="text-sm text-gray-800">{suggestion}</div>
                  <div className="flex mt-2 space-x-2">
                    <button className="text-xs text-[#F4A300] hover:text-[#F26B1D]">Apply</button>
                    <button className="text-xs text-gray-500 hover:text-gray-700">Dismiss</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-gray-800 mb-2">Auto-Claims Generator</h3>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition-colors">
                Generate Claims
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatentDraftingAssistant;