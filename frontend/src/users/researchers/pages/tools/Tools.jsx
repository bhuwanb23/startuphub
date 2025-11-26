import React from 'react';

const Tools = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tools Library for Researchers</h1>
        <p className="text-gray-600">Access specialized tools and resources to enhance your research productivity</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800">Data Analysis Toolkit</h3>
              <p className="text-gray-600 text-sm mt-1">Statistical analysis and visualization tools</p>
            </div>
            <span className="text-lg">📊</span>
          </div>
          <div className="mt-4">
            <button className="w-full py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm">
              Launch Tool
            </button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800">Literature Review Assistant</h3>
              <p className="text-gray-600 text-sm mt-1">AI-powered research paper analysis and synthesis</p>
            </div>
            <span className="text-lg">📚</span>
          </div>
          <div className="mt-4">
            <button className="w-full py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm">
              Launch Tool
            </button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800">Grant Writing Wizard</h3>
              <p className="text-gray-600 text-sm mt-1">Step-by-step guide for successful grant applications</p>
            </div>
            <span className="text-lg">📝</span>
          </div>
          <div className="mt-4">
            <button className="w-full py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm">
              Launch Tool
            </button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800">Patent Search Engine</h3>
              <p className="text-gray-600 text-sm mt-1">Comprehensive database for prior art searches</p>
            </div>
            <span className="text-lg">🔍</span>
          </div>
          <div className="mt-4">
            <button className="w-full py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm">
              Launch Tool
            </button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800">Collaboration Workspace</h3>
              <p className="text-gray-600 text-sm mt-1">Shared digital workspace for research teams</p>
            </div>
            <span className="text-lg">👥</span>
          </div>
          <div className="mt-4">
            <button className="w-full py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm">
              Launch Tool
            </button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800">Research Impact Tracker</h3>
              <p className="text-gray-600 text-sm mt-1">Monitor citations, downloads, and research influence</p>
            </div>
            <span className="text-lg">📈</span>
          </div>
          <div className="mt-4">
            <button className="w-full py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm">
              Launch Tool
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;