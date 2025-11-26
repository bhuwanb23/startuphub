import React, { useState } from 'react';

const SharedDocumentRoom = () => {
  const [activeFolder, setActiveFolder] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const folders = [
    { id: 'all', name: 'All Documents', icon: '📂', count: 42 },
    { id: 'due-diligence', name: 'Due Diligence', icon: '🔍', count: 15 },
    { id: 'financials', name: 'Financial Documents', icon: '💰', count: 12 },
    { id: 'legal', name: 'Legal Agreements', icon: '📜', count: 8 },
    { id: 'ip', name: 'IP Documents', icon: '🧠', count: 4 },
    { id: 'presentations', name: 'Presentations', icon: '📊', count: 3 }
  ];
  
  const documents = [
    {
      id: 1,
      name: 'TechStart_Financials_Q3_2025.pdf',
      type: 'pdf',
      size: '2.4 MB',
      modified: '2025-11-20',
      folder: 'financials',
      permissions: 'read-write',
      owner: 'TechStart CFO',
      activity: [
        { user: 'You', action: 'viewed', time: '2 hours ago' },
        { user: 'Sarah Johnson', action: 'downloaded', time: '1 day ago' }
      ]
    },
    {
      id: 2,
      name: 'Cap_Table_Analysis.xlsx',
      type: 'xlsx',
      size: '1.1 MB',
      modified: '2025-11-18',
      folder: 'financials',
      permissions: 'read-only',
      owner: 'Investor',
      activity: [
        { user: 'David Chen', action: 'uploaded', time: '3 days ago' }
      ]
    },
    {
      id: 3,
      name: 'Term_Sheet_Draft_v3.docx',
      type: 'docx',
      size: '345 KB',
      modified: '2025-11-15',
      folder: 'legal',
      permissions: 'read-write',
      owner: 'Legal Team',
      activity: [
        { user: 'You', action: 'edited', time: '5 hours ago' },
        { user: 'Michael Brown', action: 'commented', time: '1 day ago' }
      ]
    },
    {
      id: 4,
      name: 'IP_Assignment_Agreement.pdf',
      type: 'pdf',
      size: '890 KB',
      modified: '2025-11-10',
      folder: 'ip',
      permissions: 'read-only',
      owner: 'TechStart Legal',
      activity: [
        { user: 'Lisa Wang', action: 'signed', time: '2 weeks ago' }
      ]
    },
    {
      id: 5,
      name: 'Investor_Presentation_Nov2025.pptx',
      type: 'pptx',
      size: '5.2 MB',
      modified: '2025-11-05',
      folder: 'presentations',
      permissions: 'read-only',
      owner: 'TechStart CEO',
      activity: [
        { user: 'You', action: 'viewed', time: '3 days ago' },
        { user: 'Investor Portal', action: 'shared', time: '3 weeks ago' }
      ]
    }
  ];
  
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf': return '📄';
      case 'docx': return '📝';
      case 'xlsx': return '📊';
      case 'pptx': return '📑';
      default: return '📎';
    }
  };
  
  const getPermissionColor = (permission) => {
    switch (permission) {
      case 'read-write': return 'bg-green-100 text-green-800';
      case 'read-only': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const filteredDocuments = documents.filter(doc => {
    const matchesFolder = activeFolder === 'all' || doc.folder === activeFolder;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Shared Document Room</h2>
        <p className="text-gray-600">Secure file sharing and collaboration space</p>
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
              <div className="text-2xl mr-4">{getFileIcon(doc.type)}</div>
              
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-bold text-gray-800">{doc.name}</h3>
                  <span className={`ml-3 px-2 py-1 rounded text-xs ${getPermissionColor(doc.permissions)}`}>
                    {doc.permissions}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500">
                    {doc.type.toUpperCase()} • {doc.size}
                  </span>
                  
                  <span className="text-xs text-gray-500">
                    Modified {doc.modified}
                  </span>
                  
                  <span className="text-xs text-gray-500">
                    Owner: {doc.owner}
                  </span>
                </div>
                
                {/* Activity Log */}
                <div className="mt-3">
                  <div className="text-xs text-gray-500 mb-1">Recent activity:</div>
                  <div className="flex flex-wrap gap-2">
                    {doc.activity.slice(0, 2).map((activity, index) => (
                      <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {activity.user} {activity.action} {activity.time}
                      </span>
                    ))}
                    {doc.activity.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{doc.activity.length - 2} more
                      </span>
                    )}
                  </div>
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
                      .filter(doc => doc.folder === folder.id)
                      .map(doc => (
                        <div key={doc.id} className="flex items-center p-2 bg-gray-50 rounded">
                          <span className="mr-2">{getFileIcon(doc.type)}</span>
                          <span className="text-sm text-gray-700 truncate">{doc.name}</span>
                          <span className={`ml-2 px-1 py-0.5 rounded text-xs ${getPermissionColor(doc.permissions)}`}>
                            {doc.permissions === 'read-write' ? 'RW' : 'RO'}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Upload Section */}
      <div className="bg-gradient-to-r from-[#FFF5EB] to-[#FFE9D7] border border-[#FF8C42] rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-gray-800">Upload New Documents</h3>
            <p className="text-gray-700 mt-1">
              Add files to the shared document room for secure collaboration
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all">
              Upload Files
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
              Create Folder
            </button>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-white rounded-lg border border-dashed border-gray-300">
          <div className="text-center">
            <div className="text-2xl text-gray-400 mb-2">📁</div>
            <p className="text-gray-600">Drag and drop files here or click upload</p>
            <p className="text-xs text-gray-500 mt-1">Maximum file size: 100MB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedDocumentRoom;