import React, { useState } from 'react';

const AgreementVault = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: '',
    tag: 'NDA',
    accessLevel: 'private'
  });

  const documents = [
    {
      id: 1,
      name: 'Confidentiality Agreement - BioTech Innovations.pdf',
      tag: 'NDA',
      uploadedBy: 'Dr. Sarah Johnson',
      uploadDate: '2025-11-15',
      size: '2.4 MB',
      accessLevel: 'private',
      collaborators: ['Dr. Sarah Johnson', 'BioTech Innovations Legal']
    },
    {
      id: 2,
      name: 'Research Collaboration MOU - Quantum Computing Ltd.docx',
      tag: 'MoU',
      uploadedBy: 'Prof. Michael Chen',
      uploadDate: '2025-11-10',
      size: '1.8 MB',
      accessLevel: 'team',
      collaborators: ['Prof. Michael Chen', 'Quantum Computing Legal', 'Dr. James Wilson']
    },
    {
      id: 3,
      name: 'IP Licensing Agreement - Green Energy Solutions.pdf',
      tag: 'IP Agreement',
      uploadedBy: 'Dr. Elena Rodriguez',
      uploadDate: '2025-11-05',
      size: '3.1 MB',
      accessLevel: 'private',
      collaborators: ['Dr. Elena Rodriguez', 'Green Energy Legal']
    },
    {
      id: 4,
      name: 'Data Sharing Agreement - MediHealth Solutions.pdf',
      tag: 'NDA',
      uploadedBy: 'Dr. Robert Kim',
      uploadDate: '2025-11-01',
      size: '1.5 MB',
      accessLevel: 'team',
      collaborators: ['Dr. Robert Kim', 'MediHealth Legal', 'Dr. Sarah Johnson']
    },
    {
      id: 5,
      name: 'Joint Development Agreement - AutoDrive Systems.docx',
      tag: 'Contract',
      uploadedBy: 'Dr. Priya Sharma',
      uploadDate: '2025-10-28',
      size: '4.2 MB',
      accessLevel: 'private',
      collaborators: ['Dr. Priya Sharma', 'AutoDrive Legal']
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || doc.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const tags = ['all', ...new Set(documents.map(d => d.tag))];

  const handleUpload = () => {
    // In a real app, this would handle file upload
    console.log('Uploading document:', newDocument);
    setUploadModalOpen(false);
    setNewDocument({
      name: '',
      tag: 'NDA',
      accessLevel: 'private'
    });
  };

  const getTagColor = (tag) => {
    switch (tag) {
      case 'NDA': return 'bg-red-100 text-red-800';
      case 'MoU': return 'bg-blue-100 text-blue-800';
      case 'IP Agreement': return 'bg-green-100 text-green-800';
      case 'Contract': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessIcon = (accessLevel) => {
    switch (accessLevel) {
      case 'private':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'team':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">🔒 NDA & Agreement Vault</h1>
        <button
          onClick={() => setUploadModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Upload Document
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search documents by name..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              {tags.map(tag => (
                <option key={tag} value={tag}>
                  {tag === 'all' ? 'All Tags' : tag}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-orange-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-gray-900 truncate max-w-[180px]">{doc.name}</h3>
                  <p className="text-xs text-gray-500">{doc.uploadedBy}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTagColor(doc.tag)}`}>
                {doc.tag}
              </span>
            </div>

            <div className="flex items-center text-xs text-gray-500 mb-3">
              <span>{doc.size}</span>
              <span className="mx-2">•</span>
              <span>{doc.uploadDate}</span>
            </div>

            <div className="flex items-center text-xs text-gray-500 mb-4">
              <div className="flex items-center mr-3">
                {getAccessIcon(doc.accessLevel)}
                <span className="ml-1 capitalize">{doc.accessLevel}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{doc.collaborators.length} collaborators</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-grow bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-md text-xs font-medium flex items-center justify-center transition duration-150 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              <button className="flex-grow bg-white hover:bg-gray-50 border border-orange-500 text-orange-600 py-2 px-3 rounded-md text-xs font-medium flex items-center justify-center transition duration-150 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Upload New Document</h2>
                <button 
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setUploadModalOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={newDocument.name}
                    onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
                    placeholder="Enter document name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={newDocument.tag}
                    onChange={(e) => setNewDocument({...newDocument, tag: e.target.value})}
                  >
                    <option value="NDA">NDA</option>
                    <option value="MoU">MoU</option>
                    <option value="IP Agreement">IP Agreement</option>
                    <option value="Contract">Contract</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={newDocument.accessLevel}
                    onChange={(e) => setNewDocument({...newDocument, accessLevel: e.target.value})}
                  >
                    <option value="private">Private (Only me)</option>
                    <option value="team">Team (Collaborators)</option>
                    <option value="public">Public (Organization)</option>
                  </select>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-600 mb-2">Drag and drop files here</p>
                  <p className="text-xs text-gray-500 mb-3">or</p>
                  <button className="bg-white border border-orange-500 text-orange-600 py-1 px-3 rounded-md text-sm font-medium hover:bg-orange-50">
                    Browse Files
                  </button>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="flex-grow bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  className="flex-grow bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium"
                >
                  Upload Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgreementVault;