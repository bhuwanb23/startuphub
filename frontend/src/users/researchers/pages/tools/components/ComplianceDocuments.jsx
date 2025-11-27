import React from 'react';

const ComplianceDocuments = () => {
  const documents = [
    {
      id: 1,
      title: 'Ethics Approval Form',
      description: 'Standard form for requesting ethics committee approval',
      category: 'Ethics',
      pages: 5,
      editable: true
    },
    {
      id: 2,
      title: 'Informed Consent Template',
      description: 'Template for participant consent forms',
      category: 'Human Subjects',
      pages: 3,
      editable: true
    },
    {
      id: 3,
      title: 'Data Storage Compliance Checklist',
      description: 'Checklist for secure data storage requirements',
      category: 'Data Security',
      pages: 4,
      editable: true
    },
    {
      id: 4,
      title: 'Research Grant Reporting Template',
      description: 'Template for grant progress and financial reporting',
      category: 'Funding',
      pages: 8,
      editable: true
    },
    {
      id: 5,
      title: 'Intellectual Property Disclosure Form',
      description: 'Form for disclosing potential IP from research',
      category: 'IPR',
      pages: 6,
      editable: true
    },
    {
      id: 6,
      title: 'Animal Care Protocol Form',
      description: 'Protocol submission form for animal research',
      category: 'Animal Welfare',
      pages: 7,
      editable: true
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">📋 Compliance Documents</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((document) => (
          <div key={document.id} className="bg-white rounded-lg shadow p-6 border border-orange-100 hover:border-orange-300 transition-all duration-200">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{document.title}</h3>
                <p className="text-sm text-gray-600">{document.description}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {document.category}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {document.pages} pages
              </span>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-grow bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Fill Online
              </button>
              <button className="bg-white hover:bg-gray-50 border border-orange-500 text-orange-600 py-2 px-4 rounded-md text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Compliance Process Guide */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">📘 Compliance Process Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 font-bold text-lg mb-2">1. Identify</div>
            <p className="text-sm text-gray-600">Determine which compliance requirements apply to your research.</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 font-bold text-lg mb-2">2. Prepare</div>
            <p className="text-sm text-gray-600">Complete required documentation using our templates.</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 font-bold text-lg mb-2">3. Submit</div>
            <p className="text-sm text-gray-600">Submit forms through the online compliance portal.</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 font-bold text-lg mb-2">4. Track</div>
            <p className="text-sm text-gray-600">Monitor approval status and respond to requests.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDocuments;