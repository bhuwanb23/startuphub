import React from 'react';

const EthicsGuidelines = () => {
  const documents = [
    {
      id: 1,
      title: 'Plagiarism Guidelines',
      description: 'Comprehensive guide to avoiding plagiarism in academic writing',
      category: 'Academic Integrity',
      pages: 24,
      updated: '2025-11-15'
    },
    {
      id: 2,
      title: 'Ethical Compliance Handbook',
      description: 'Research ethics and compliance requirements for all projects',
      category: 'Research Ethics',
      pages: 36,
      updated: '2025-10-22'
    },
    {
      id: 3,
      title: 'IRB Checklist',
      description: 'Institutional Review Board submission checklist',
      category: 'Human Subjects',
      pages: 12,
      updated: '2025-11-05'
    },
    {
      id: 4,
      title: 'Data Privacy Guidelines',
      description: 'Protection of sensitive data in research projects',
      category: 'Data Security',
      pages: 18,
      updated: '2025-09-18'
    },
    {
      id: 5,
      title: 'Animal Research Ethics',
      description: 'Ethical guidelines for research involving animals',
      category: 'Animal Welfare',
      pages: 22,
      updated: '2025-08-30'
    },
    {
      id: 6,
      title: 'Conflict of Interest Policy',
      description: 'Disclosure and management of potential conflicts',
      category: 'Professional Ethics',
      pages: 15,
      updated: '2025-10-12'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">⚖️ Research Policy & Ethics Guidelines</h1>
      
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
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Updated: {document.updated}</span>
            </div>
            
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>
        ))}
      </div>
      
      {/* Ethics Framework */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">🏛️ Research Ethics Framework</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 font-bold text-lg mb-2">1. Integrity</div>
            <p className="text-sm text-gray-600">Maintain honesty and accuracy in all research activities and reporting.</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 font-bold text-lg mb-2">2. Respect</div>
            <p className="text-sm text-gray-600">Respect the rights, dignity, and welfare of all research participants.</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 font-bold text-lg mb-2">3. Responsibility</div>
            <p className="text-sm text-gray-600">Take responsibility for the ethical implications of research decisions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicsGuidelines;