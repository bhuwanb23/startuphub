import React, { useState } from 'react';

const PatentDrafting = () => {
  const [draft, setDraft] = useState({
    title: '',
    abstract: '',
    description: '',
    claims: '',
  });

  const [generatedSections, setGeneratedSections] = useState({
    abstract: '',
    claims: '',
    background: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (section) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockData = {
        abstract: 'This invention relates to a novel method for improving data processing efficiency in distributed computing systems. The method comprises steps of...',
        claims: '1. A method for data processing, comprising: receiving a plurality of data packets; analyzing the packets using machine learning algorithms; and optimizing processing based on the analysis.',
        background: 'The present invention relates to data processing systems and more particularly to methods for optimizing data processing in distributed computing environments.',
      };
      
      setGeneratedSections(prev => ({
        ...prev,
        [section]: mockData[section]
      }));
      
      setIsGenerating(false);
    }, 1500);
  };

  const handleSaveDraft = () => {
    // In a real app, this would save to a database
    alert('Patent draft saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Patent Drafting Assistant</h1>
        <p className="text-gray-600 mt-1">AI-powered patent drafting and generation tools</p>
      </div>

      {/* Patent Information Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Patent Information</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Patent Title
            </label>
            <input
              type="text"
              id="title"
              value={draft.title}
              onChange={(e) => setDraft({...draft, title: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              placeholder="Enter patent title"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Technical Description
            </label>
            <textarea
              id="description"
              value={draft.description}
              onChange={(e) => setDraft({...draft, description: e.target.value})}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              placeholder="Describe your invention in detail..."
            />
          </div>
        </div>
      </div>

      {/* AI-Powered Drafting Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Abstract Generator */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Abstract Generator</h2>
            <button
              onClick={() => handleGenerate('abstract')}
              disabled={isGenerating}
              className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Generate'}
            </button>
          </div>
          <div className="mt-4">
            <textarea
              value={generatedSections.abstract}
              onChange={(e) => setGeneratedSections({...generatedSections, abstract: e.target.value})}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              placeholder="Generated abstract will appear here..."
            />
          </div>
        </div>

        {/* Claims Generator */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Claims Generator</h2>
            <button
              onClick={() => handleGenerate('claims')}
              disabled={isGenerating}
              className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Generate'}
            </button>
          </div>
          <div className="mt-4">
            <textarea
              value={generatedSections.claims}
              onChange={(e) => setGeneratedSections({...generatedSections, claims: e.target.value})}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              placeholder="Generated claims will appear here..."
            />
          </div>
        </div>
      </div>

      {/* Background Generator */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Background Generator</h2>
          <button
            onClick={() => handleGenerate('background')}
            disabled={isGenerating}
            className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className="mt-4">
          <textarea
            value={generatedSections.background}
            onChange={(e) => setGeneratedSections({...generatedSections, background: e.target.value})}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
            placeholder="Generated background will appear here..."
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
          Reset
        </button>
        <button
          onClick={handleSaveDraft}
          className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
        >
          Save Draft
        </button>
      </div>
    </div>
  );
};

export default PatentDrafting;