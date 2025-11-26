import React from 'react';

const ResearchLibrary = () => {
  const researchLibrary = [
    { id: 1, title: '2025 Sector Investment Review', type: 'Annual Review', size: '4.2 MB' },
    { id: 2, title: 'AI Market Deep Dive', type: 'Technology Paper', size: '2.8 MB' },
    { id: 3, title: 'Startup Landscape Report - Q4 2025', type: 'Market Report', size: '3.5 MB' },
    { id: 4, title: 'Climate Tech Investment Trends', type: 'Sector Report', size: '5.1 MB' },
    { id: 5, title: 'Global Fintech Evolution', type: 'Annual Review', size: '3.9 MB' },
    { id: 6, title: 'HealthTech Innovation Pipeline', type: 'Technology Paper', size: '4.7 MB' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">📘 Downloadable Research Library</h2>
        <p className="text-gray-600">Comprehensive reports and analysis for informed decision-making</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {researchLibrary.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
            <div className="flex items-start">
              <div className="text-2xl mr-3">📋</div>
              <div>
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                <div className="text-sm text-gray-600 mt-1">{item.type}</div>
                <div className="text-xs text-gray-500 mt-1">{item.size}</div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Download
              </button>
              <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm">
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchLibrary;