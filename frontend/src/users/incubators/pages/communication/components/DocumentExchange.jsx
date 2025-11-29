import React, { useState } from 'react';

const DocumentExchange = () => {
  const [activeFolder, setActiveFolder] = useState('shared');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for folders
  const folders = [
    { id: 'shared', name: 'Shared Documents', count: 24 },
    { id: 'incubator', name: 'Incubator Resources', count: 18 },
    { id: 'startups', name: 'Startup Submissions', count: 32 },
    { id: 'mentors', name: 'Mentor Materials', count: 15 }
  ];

  // Mock data for documents
  const documents = {
    shared: [
      { id: 1, name: 'Program Guidelines.pdf', type: 'PDF', size: '2.4 MB', modified: '2023-06-15', version: 'v1.2' },
      { id: 2, name: 'Template - Business Plan.docx', type: 'DOCX', size: '0.8 MB', modified: '2023-06-12', version: 'v2.0' },
      { id: 3, name: 'Financial Projection.xlsx', type: 'XLSX', size: '1.2 MB', modified: '2023-06-10', version: 'v1.5' },
      { id: 4, name: 'NDAs and Legal Forms.zip', type: 'ZIP', size: '5.1 MB', modified: '2023-06-08', version: 'v1.0' }
    ],
    incubator: [
      { id: 5, name: 'Mentor Handbook.pdf', type: 'PDF', size: '3.7 MB', modified: '2023-06-14', version: 'v1.1' },
      { id: 6, name: 'Evaluation Criteria.docx', type: 'DOCX', size: '0.5 MB', modified: '2023-06-11', version: 'v1.3' }
    ],
    startups: [
      { id: 7, name: 'Startup Alpha - Pitch Deck.pptx', type: 'PPTX', size: '4.2 MB', modified: '2023-06-15', version: 'v1.0' },
      { id: 8, name: 'Beta Ventures - Financials.xlsx', type: 'XLSX', size: '2.1 MB', modified: '2023-06-13', version: 'v1.2' }
    ]
  };

  const currentDocuments = documents[activeFolder] || [];

  const filteredDocuments = currentDocuments.filter(doc => {
    return doc.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleUpload = () => {
    // In a real app, this would open a file upload dialog
    alert('Upload functionality would be implemented here');
  };

  const handleDownload = (docId) => {
    // In a real app, this would download the document
    const doc = currentDocuments.find(d => d.id === docId);
    alert(`Downloading ${doc.name}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Document Exchange Room</h2>
            <p className="text-gray-600">Share and access files with startups and mentors</p>
          </div>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Upload Document
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-3 text-gray-400">
            🔍
          </div>
        </div>
      </div>

      {/* Folder Navigation */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {folders.map((folder) => (
            <button
              key={folder.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                activeFolder === folder.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFolder(folder.id)}
            >
              <span className="mr-2">📁</span>
              {folder.name} ({folder.count})
            </button>
          ))}
        </div>
      </div>

      {/* Document List */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDocuments.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="mr-2">
                      {doc.type === 'PDF' ? '📄' : 
                       doc.type === 'DOCX' ? '📝' : 
                       doc.type === 'XLSX' ? '📊' : 
                       doc.type === 'PPTX' ? '📺' : 
                       doc.type === 'ZIP' ? '📦' : '📁'}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.modified}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.version}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleDownload(doc.id)}
                    className="text-orange-600 hover:text-orange-900 mr-3"
                  >
                    Download
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    Share
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📁</div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No documents found</h3>
          <p className="text-gray-500">Try adjusting your search or select a different folder</p>
        </div>
      )}
    </div>
  );
};

export default DocumentExchange;