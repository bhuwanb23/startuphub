import React, { useState } from 'react';

const DocumentSharing = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterSharedBy, setFilterSharedBy] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  
  // Mock document data
  const documents = [
    {
      id: 1,
      name: 'Quantum Algorithm Research.pdf',
      type: 'pdf',
      size: '2.4 MB',
      sharedBy: 'Dr. Sarah Johnson',
      sharedByAvatar: 'SJ',
      date: '2025-11-25',
      version: 'v2.1',
      permissions: 'Edit',
      tags: ['Research', 'Quantum Computing']
    },
    {
      id: 2,
      name: 'Materials Lab Results.xlsx',
      type: 'excel',
      size: '1.8 MB',
      sharedBy: 'Dr. Elena Rodriguez',
      sharedByAvatar: 'ER',
      date: '2025-11-24',
      version: 'v1.0',
      permissions: 'Comment',
      tags: ['Lab Results', 'Materials Science']
    },
    {
      id: 3,
      name: 'Grant Proposal Draft.docx',
      type: 'word',
      size: '0.9 MB',
      sharedBy: 'Dr. Michael Chen',
      sharedByAvatar: 'MC',
      date: '2025-11-23',
      version: 'v3.2',
      permissions: 'Read',
      tags: ['Funding', 'Proposal']
    },
    {
      id: 4,
      name: 'Prototype Design Files.zip',
      type: 'zip',
      size: '15.2 MB',
      sharedBy: 'Dr. James Wilson',
      sharedByAvatar: 'JW',
      date: '2025-11-22',
      version: 'v1.5',
      permissions: 'Edit',
      tags: ['Prototype', 'Design']
    },
    {
      id: 5,
      name: 'Conference Presentation.pptx',
      type: 'powerpoint',
      size: '4.7 MB',
      sharedBy: 'Dr. Priya Sharma',
      sharedByAvatar: 'PS',
      date: '2025-11-20',
      version: 'v1.0',
      permissions: 'Read',
      tags: ['Presentation', 'Conference']
    },
    {
      id: 6,
      name: 'Data Analysis Scripts.py',
      type: 'code',
      size: '0.3 MB',
      sharedBy: 'Dr. Robert Kim',
      sharedByAvatar: 'RK',
      date: '2025-11-18',
      version: 'v4.0',
      permissions: 'Edit',
      tags: ['Code', 'Analysis']
    }
  ];

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const typeMatch = filterType === 'all' || doc.type === filterType;
    const sharedByMatch = filterSharedBy === 'all' || doc.sharedBy === filterSharedBy;
    const dateMatch = filterDate === 'all' || doc.date.includes(filterDate);
    return typeMatch && sharedByMatch && dateMatch;
  });

  // Get document icon
  const getDocumentIcon = (type) => {
    switch (type) {
      case 'pdf':
        return (
          <div className="w-10 h-10 rounded bg-red-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'word':
        return (
          <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'excel':
        return (
          <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'powerpoint':
        return (
          <div className="w-10 h-10 rounded bg-orange-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'zip':
        return (
          <div className="w-10 h-10 rounded bg-yellow-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'code':
        return (
          <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
    }
  };

  // Get permission color
  const getPermissionColor = (permission) => {
    switch (permission) {
      case 'Edit': return 'bg-green-100 text-green-800';
      case 'Comment': return 'bg-blue-100 text-blue-800';
      case 'Read': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">📂 Document Sharing Room</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Document Grid */}
        <div className="lg:w-2/3">
          <div className="bg-gray-50 rounded-lg p-4 border border-orange-100">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="pdf">PDF</option>
                  <option value="word">Word</option>
                  <option value="excel">Excel</option>
                  <option value="powerpoint">PowerPoint</option>
                  <option value="zip">ZIP</option>
                  <option value="code">Code</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shared By</label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={filterSharedBy}
                  onChange={(e) => setFilterSharedBy(e.target.value)}
                >
                  <option value="all">All Users</option>
                  {Array.from(new Set(documents.map(doc => doc.sharedBy))).map(user => (
                    <option key={user} value={user}>{user}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                >
                  <option value="all">All Dates</option>
                  <option value="2025-11">November 2025</option>
                  <option value="2025-10">October 2025</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload Document
                </button>
              </div>
            </div>
            
            {/* Document Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocuments.map((doc) => (
                <div 
                  key={doc.id}
                  onClick={() => setSelectedDocument(doc)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedDocument?.id === doc.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start">
                    {getDocumentIcon(doc.type)}
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {doc.size}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPermissionColor(doc.permissions)}`}>
                          {doc.permissions}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {doc.version}
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mr-2">
                          {doc.sharedByAvatar}
                        </div>
                        <span className="text-xs text-gray-600">{doc.sharedBy} • {doc.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {doc.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Panel - Preview Window */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-lg p-4 border border-orange-100">
            {selectedDocument ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-semibold text-gray-900 truncate">{selectedDocument.name}</h2>
                    <p className="text-sm text-gray-600">Version {selectedDocument.version}</p>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                  <div className="flex justify-center mb-4">
                    {getDocumentIcon(selectedDocument.type)}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{selectedDocument.name}</p>
                    <p className="text-xs text-gray-500">{selectedDocument.size}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Shared By</h3>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold mr-2">
                        {selectedDocument.sharedByAvatar}
                      </div>
                      <span className="text-sm text-gray-900">{selectedDocument.sharedBy}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Date Shared</h3>
                    <p className="text-sm text-gray-900">{selectedDocument.date}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Permissions</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPermissionColor(selectedDocument.permissions)}`}>
                      {selectedDocument.permissions}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Tags</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedDocument.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Version History</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Version {selectedDocument.version}</p>
                        <p className="text-xs text-gray-500">Current</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xs text-gray-500">2.0</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Version 2.0</p>
                        <p className="text-xs text-gray-500">Nov 20, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xs text-gray-500">1.5</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Version 1.5</p>
                        <p className="text-xs text-gray-500">Nov 15, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <button className="flex-grow bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </button>
                  <button className="bg-white hover:bg-gray-50 border border-orange-500 text-orange-600 py-2 px-4 rounded-md text-sm font-medium">
                    Share
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No document selected</h3>
                <p className="mt-1 text-sm text-gray-500">Select a document from the grid to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentSharing;