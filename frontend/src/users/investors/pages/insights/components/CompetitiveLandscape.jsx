import React, { useState } from 'react';

const CompetitiveLandscape = () => {
  const [selectedReport, setSelectedReport] = useState(1);

  const competitiveReports = [
    {
      id: 1,
      industry: 'AI/ML Platforms',
      marketSize: '$45.2B',
      competitors: ['OpenAI', 'Google AI', 'Microsoft Azure', 'Amazon AI', 'IBM Watson'],
      summary: 'Market consolidation expected with major cloud providers dominating. OpenAI maintains lead in generative AI applications.'
    },
    {
      id: 2,
      industry: 'Electric Vehicles',
      marketSize: '$78.9B',
      competitors: ['Tesla', 'BYD', 'Volkswagen', 'GM', 'Ford'],
      summary: 'Chinese manufacturers gaining significant market share globally. Tesla maintains technological lead but faces increasing competition.'
    }
  ];

  const currentReport = competitiveReports.find(report => report.id === selectedReport);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">💡 Competitive Landscape Reports</h2>
        <p className="text-gray-600">Market positioning and competitive analysis across industries</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-gray-800 mb-3">Industries</h3>
          <div className="space-y-2">
            {competitiveReports.map((report) => (
              <div 
                key={report.id} 
                onClick={() => setSelectedReport(report.id)}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedReport === report.id
                    ? 'border-[#FF6A00] bg-[#FFF5EB]'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium text-gray-800">{report.industry}</div>
                <div className="text-sm text-gray-600">{report.marketSize}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-800 mb-3">Detailed Report</h3>
          {currentReport && (
            <div className="border border-gray-200 rounded-lg p-5">
              <div className="font-bold text-gray-800">{currentReport.industry}</div>
              <div className="text-sm text-gray-600 mt-1">Market Size: {currentReport.marketSize}</div>
              
              <div className="mt-4">
                <div className="text-sm font-medium text-gray-800 mb-2">Top 5 Competitors</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {currentReport.competitors.map((competitor, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#FF6A00] mr-1">•</span>
                      <span>{competitor}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4">
                <div className="text-sm font-medium text-gray-800 mb-1">AI Commentary</div>
                <p className="text-sm text-gray-600">
                  {currentReport.summary}
                </p>
              </div>
              
              <div className="flex gap-2 mt-5">
                <button className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                  Download PDF
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm">
                  Open Full Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitiveLandscape;