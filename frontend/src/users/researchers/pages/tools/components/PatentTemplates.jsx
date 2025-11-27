import React from 'react';

const PatentTemplates = () => {
  const templates = [
    {
      id: 1,
      name: 'Provisional Patent Draft',
      description: 'Template for filing provisional patent applications',
      type: 'Provisional',
      pages: 15,
      recommended: true
    },
    {
      id: 2,
      name: 'Utility Patent Draft',
      description: 'Complete template for utility patent applications',
      type: 'Utility',
      pages: 28,
      recommended: true
    },
    {
      id: 3,
      name: 'Design Patent Template',
      description: 'Template for design patent applications',
      type: 'Design',
      pages: 12,
      recommended: false
    },
    {
      id: 4,
      name: 'Plant Patent Template',
      description: 'Template for plant variety protection',
      type: 'Plant',
      pages: 10,
      recommended: false
    },
    {
      id: 5,
      name: 'Claims Template',
      description: 'Structured format for patent claims section',
      type: 'Claims',
      pages: 8,
      recommended: true
    },
    {
      id: 6,
      name: 'Prior Art Search Template',
      description: 'Template for documenting prior art references',
      type: 'Research',
      pages: 6,
      recommended: false
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">📜 Patent Draft Templates</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow p-6 border border-orange-100 hover:border-orange-300 transition-all duration-200 relative">
            {template.recommended && (
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  🤖 AI Recommended
                </span>
              </div>
            )}
            
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {template.type}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {template.pages} pages
              </span>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-grow bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              <button className="bg-white hover:bg-gray-50 border border-orange-500 text-orange-600 py-2 px-4 rounded-md text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* AI Recommendation Banner */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-6 border border-orange-200">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🤖 AI Recommendation</h3>
            <p className="text-gray-700 mb-3">
              Based on your research in biotechnology and recent publications, we recommend starting with the Provisional Patent Draft template. 
              This will help you establish early protection while you continue developing your innovation.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium">
              Use Recommended Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatentTemplates;