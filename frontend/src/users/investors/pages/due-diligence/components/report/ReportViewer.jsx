import React from 'react';

const ReportViewer = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Auto-Generated Due Diligence Report</h2>
      <p className="text-gray-600">Preview of report sections with AI notes and summaries</p>
    </div>
    
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800">Executive Summary</h3>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors">
            Export PDF
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export Word
          </button>
        </div>
      </div>
      
      <div className="prose max-w-none">
        <p className="text-gray-700">
          NeuroSync AI presents a compelling investment opportunity with strong technological differentiation 
          and experienced founding team. The company demonstrates robust traction with accelerating revenue 
          growth and expanding customer base. Key risks include pending IP disputes and market competition, 
          but overall fundamentals support positive investment recommendation.
        </p>
        
        <div className="mt-6 p-4 bg-[#FFF5EB] rounded-lg">
          <h4 className="font-bold text-[#FF6A00] mb-2">AI Analyst Notes</h4>
          <p className="text-gray-700 text-sm">
            Confidence Score: 87% | Recommendation: Strong Buy | Key Drivers: Technology (25%), Team (20%), Market (18%)
          </p>
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Report Sections</h3>
        <div className="space-y-3">
          {[
            'Executive Summary',
            'Company Overview',
            'Market Analysis',
            'Technology Assessment',
            'Financial Review',
            'Team Evaluation',
            'Risk Analysis',
            'Investment Recommendation'
          ].map((section, index) => (
            <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
              <span className="text-[#FF6A00] mr-3">📄</span>
              <span className="text-gray-700">{section}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Watermarked Preview</h3>
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-full h-64 flex items-center justify-center relative">
          <div className="text-center">
            <div className="text-5xl mb-4">📑</div>
            <p className="text-gray-700">Report Preview</p>
            <p className="text-sm text-gray-500 mt-2">CONFIDENTIAL - FOR INVESTOR REVIEW ONLY</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="text-6xl font-bold text-[#FF6A00] rotate-45">PREVIEW</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ReportViewer;