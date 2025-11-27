import React, { useState } from 'react';

const SharedResourceLibrary = () => {
  const [folders, setFolders] = useState([
    { id: 1, name: 'Business Plans', itemCount: 12, lastModified: '2023-06-15' },
    { id: 2, name: 'Market Research', itemCount: 8, lastModified: '2023-06-10' },
    { id: 3, name: 'Financial Models', itemCount: 5, lastModified: '2023-06-05' },
    { id: 4, name: 'Pitch Decks', itemCount: 15, lastModified: '2023-06-18' },
    { id: 5, name: 'Technical Documentation', itemCount: 22, lastModified: '2023-06-12' }
  ]);

  const [files, setFiles] = useState([
    { id: 1, name: 'TechFlow Business Plan.pdf', type: 'pdf', size: '2.4 MB', owner: 'TechFlow Inc.', lastModified: '2023-06-15' },
    { id: 2, name: 'Market Analysis Q2.xlsx', type: 'xls', size: '1.1 MB', owner: 'GreenEnergy Solutions', lastModified: '2023-06-10' },
    { id: 3, name: 'Financial Projections.docx', type: 'doc', size: '0.8 MB', owner: 'HealthTrack', lastModified: '2023-06-05' }
  ]);

  const [selectedFolder, setSelectedFolder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFile = {
        id: Date.now(),
        name: file.name,
        type: file.type.split('/')[1] || 'file',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        owner: 'You',
        lastModified: new Date().toISOString().split('T')[0]
      };
      setFiles([...files, newFile]);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'doc': return '📝';
      case 'docx': return '📝';
      case 'xls': return '📊';
      case 'xlsx': return '📊';
      case 'ppt': return '📋';
      case 'pptx': return '📋';
      default: return '📁';
    }
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Shared Resource Library</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <label className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors cursor-pointer flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Upload
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {folders.map((folder) => (
          <div 
            key={folder.id} 
            className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => setSelectedFolder(folder)}
          >
            <div className="flex items-center">
              <div className="text-2xl mr-3">📁</div>
              <div>
                <h3 className="font-medium text-gray-800">{folder.name}</h3>
                <p className="text-sm text-gray-600">{folder.itemCount} items</p>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">Last modified: {folder.lastModified}</div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Files</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFiles.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-lg mr-3">{getTypeIcon(file.type)}</div>
                      <div className="text-sm font-medium text-gray-900">{file.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">{file.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.lastModified}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-[#FF6A00] hover:text-[#FF8C42] mr-3">View</button>
                    <button className="text-[#FF6A00] hover:text-[#FF8C42]">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedFolder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">{selectedFolder.name}</h3>
              <button 
                onClick={() => setSelectedFolder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">Folder contents: {selectedFolder.itemCount} items</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {files.slice(0, 3).map((file) => (
                  <div key={file.id} className="border border-gray-200 rounded-lg p-4 flex items-center">
                    <div className="text-2xl mr-3">{getTypeIcon(file.type)}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{file.name}</h4>
                      <p className="text-sm text-gray-600">{file.size} • {file.owner}</p>
                    </div>
                    <button className="text-[#FF6A00] hover:text-[#FF8C42]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedResourceLibrary;