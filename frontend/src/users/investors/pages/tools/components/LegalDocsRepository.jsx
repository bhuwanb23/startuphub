import React, { useState } from 'react';

const LegalDocsRepository = () => {
  const [activeFolder, setActiveFolder] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const folders = [
    { id: 'all', name: 'All Documents', icon: '📂', count: 42 },
    { id: 'term-sheets', name: 'Term Sheets', icon: '📝', count: 12 },
    { id: 'share-purchase', name: 'Share Purchase Agreements', icon: '📜', count: 8 },
    { id: 'investment', name: 'Investment Agreements', icon: '💼', count: 10 },
    { id: 'governance', name: 'Governance Documents', icon: '🏛️', count: 7 },
    { id: 'ip', name: 'IP Agreements', icon: '🧠', count: 5 }
  ];
  
  const documents = [
    {
      id: 1,
      name: 'Standard Term Sheet v3.2',
      type: 'term-sheets',
      fileType: 'pdf',
      size: '245 KB',
      modified: '2025-11-15',
      restricted: false,
      tags: ['Convertible', 'Valuation Cap', 'Discount']
    },
    {
      id: 2,
      name: 'Share Purchase Agreement - TechStart Inc.',
      type: 'share-purchase',
      fileType: 'docx',
      size: '1.2 MB',
      modified: '2025-10-22',
      restricted: true,
      tags: ['Series A', 'Preferred Shares', 'Voting Rights']
    },
    {
      id: 3,
      name: 'Investment Agreement - CleanEnergy Fund',
      type: 'investment',
      fileType: 'pdf',
      size: '890 KB',
      modified: '2025-09-30',
      restricted: false,
      tags: ['SAFE', 'Key Terms', 'Milestones']
    },
    {
      id: 4,
      name: 'Board Consent - Q3 2025',
      type: 'governance',
      fileType: 'pdf',
      size: '156 KB',
      modified: '2025-11-05',
      restricted: true,
      tags: ['Board Approval', 'Financials', 'Strategic Decisions']
    },
    {
      id: 5,
      name: 'IP Assignment Agreement - AI Algorithms',
      type: 'ip',
      fileType: 'docx',
      size: '340 KB',
      modified: '2025-08-18',
      restricted: true,
      tags: ['Patents', 'Trade Secrets', 'Assignments']
    },
    {
      id: 6,
      name: 'Side Letter - Liquidation Preferences',
      type: 'investment',
      fileType: 'pdf',
      size: '98 KB',
      modified: '2025-10-12',
      restricted: true,
      tags: ['Liquidation', 'Preferences', 'Participating']
    }
  ];
  
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf': return '📄';
      case 'docx': return '📝';
      case 'xlsx': return '📊';
      default: return '📎';
    }
  };
  
  const getTypeColor = (type) => {
    switch (type) {
      case 'term-sheets': return 'bg-blue-100 text-blue-800';
      case 'share-purchase': return 'bg-green-100 text-green-800';
      case 'investment': return 'bg-purple-100 text-purple-800';
      case 'governance': return 'bg-yellow-100 text-yellow-800';
      case 'ip': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const filteredDocuments = documents.filter(doc => {
    const matchesFolder = activeFolder === 'all' || doc.type === activeFolder;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFolder && matchesSearch;
  });
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Legal Documents Repository</h2>
        <p className="text-gray-600">Secure storage and access to all investment-related legal documents</p>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
              <div className="absolute left-3 top-3.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          {/* Folder Filter */}
          <div className="flex flex-wrap gap-2">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setActiveFolder(folder.id)}
                className={`px-4 py-2 rounded-lg transition-all flex items-center ${
                  activeFolder === folder.id
                    ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{folder.icon}</span>
                {folder.name} ({folder.count})
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Document Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all">
            <div className="flex items-center">
              <div className="text-2xl mr-4">{getFileIcon(doc.fileType)}</div>
              
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-bold text-gray-800">{doc.name}</h3>
                  {doc.restricted && (
                    <span className="ml-2 text-red-500" title="Restricted Access">
                      🔒
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className={`px-2 py-1 rounded text-xs ${getTypeColor(doc.type)}`}>
                    {folders.find(f => f.id === doc.type)?.name}
                  </span>
                  
                  <span className="text-xs text-gray-500">
                    {doc.fileType.toUpperCase()} • {doc.size}
                  </span>
                  
                  <span className="text-xs text-gray-500">
                    Modified {doc.modified}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {doc.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm">
                  Preview
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm">
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Folder Structure Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Document Repository Structure</h3>
        
        <div className="space-y-3">
          {folders.filter(f => f.id !== 'all').map((folder) => (
            <div key={folder.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setActiveFolder(folder.id)}
                className="w-full flex items-center p-4 text-left hover:bg-gray-50 transition-all"
              >
                <span className="text-xl mr-3">{folder.icon}</span>
                <span className="font-medium text-gray-800">{folder.name}</span>
                <span className="ml-2 text-sm text-gray-500">({folder.count} documents)</span>
                <span className="ml-auto text-gray-400">▶</span>
              </button>
              
              {activeFolder === folder.id && (
                <div className="pl-12 pr-4 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {documents
                      .filter(doc => doc.type === folder.id)
                      .map(doc => (
                        <div key={doc.id} className="flex items-center p-2 bg-gray-50 rounded">
                          <span className="mr-2">{getFileIcon(doc.fileType)}</span>
                          <span className="text-sm text-gray-700 truncate">{doc.name}</span>
                          {doc.restricted && <span className="ml-1 text-red-500">🔒</span>}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Security Notice */}
      <div className="bg-gradient-to-r from-[#FFF5EB] to-[#FFE9D7] border border-[#FF8C42] rounded-xl p-5">
        <div className="flex">
          <div className="flex-shrink-0 text-[#FF6A00] text-xl mr-3">🔒</div>
          <div>
            <h4 className="font-bold text-gray-800">Document Security</h4>
            <p className="text-gray-700 mt-1">
              All documents in this repository are encrypted and access is logged. 
              Restricted documents (🔒) require additional authorization for access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDocsRepository;