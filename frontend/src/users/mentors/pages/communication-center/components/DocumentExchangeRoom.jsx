import React, { useState } from 'react';

const DocumentExchangeRoom = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Q2 Financial Projections.xlsx',
      type: 'spreadsheet',
      size: '2.4 MB',
      uploadedBy: 'Alex Morgan',
      startup: 'TechFlow Inc.',
      project: 'Financial Planning',
      version: 'v2.1',
      date: '2023-06-10',
      tags: ['finance', 'q2']
    },
    {
      id: 2,
      name: 'Product Roadmap.pdf',
      type: 'pdf',
      size: '1.8 MB',
      uploadedBy: 'Sarah Johnson',
      startup: 'GreenEnergy Solutions',
      project: 'Product Development',
      version: 'v1.5',
      date: '2023-06-08',
      tags: ['product', 'roadmap']
    },
    {
      id: 3,
      name: 'User Research Findings.docx',
      type: 'document',
      size: '856 KB',
      uploadedBy: 'Mike Chen',
      startup: 'HealthTrack',
      project: 'UX Research',
      version: 'v3.0',
      date: '2023-06-05',
      tags: ['research', 'ux']
    },
    {
      id: 4,
      name: 'Technical Architecture Diagram.png',
      type: 'image',
      size: '3.2 MB',
      uploadedBy: 'Priya Sharma',
      startup: 'FinTech Pro',
      project: 'System Design',
      version: 'v1.2',
      date: '2023-06-03',
      tags: ['technical', 'architecture']
    },
    {
      id: 5,
      name: 'Market Analysis Report.pptx',
      type: 'presentation',
      size: '5.1 MB',
      uploadedBy: 'David Wilson',
      startup: 'EduTech Innovations',
      project: 'Market Research',
      version: 'v2.3',
      date: '2023-06-01',
      tags: ['market', 'analysis']
    }
  ]);

  const [projects] = useState([
    'Financial Planning',
    'Product Development',
    'UX Research',
    'System Design',
    'Market Research'
  ]);

  const [selectedProject, setSelectedProject] = useState('All Projects');
  const [searchTerm, setSearchTerm] = useState('');

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'document':
        return '📝';
      case 'spreadsheet':
        return '📊';
      case 'presentation':
        return '📽️';
      case 'image':
        return '🖼️';
      default:
        return '📁';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesProject = selectedProject === 'All Projects' || doc.project === selectedProject;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesProject && matchesSearch;
  });

  const handleFileUpload = () => {
    // In a real app, this would open a file picker and handle the upload
    alert('File upload functionality would be implemented here');
  };

  const handleRequestDocument = () => {
    // In a real app, this would open a request form
    alert('Document request functionality would be implemented here');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-800">Document Exchange Room</h2>
          <div className="flex space-x-2">
            <button 
              onClick={handleRequestDocument}
              className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Request Document
            </button>
            <button 
              onClick={handleFileUpload}
              className="px-3 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium text-sm"
            >
              Upload Files
            </button>
          </div>
        </div>
        <p className="text-gray-600">Drag-and-drop document exchange with version control</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
          >
            <option value="All Projects">All Projects</option>
            {projects.map((project) => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start mb-3">
                <div className="text-2xl mr-3">{getFileIcon(doc.type)}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 truncate">{doc.name}</h3>
                  <p className="text-sm text-gray-600">{doc.startup}</p>
                </div>
                <span className="px-2 py-1 bg-[#FFF2DC] text-[#FF6A00] text-xs rounded-full whitespace-nowrap">
                  {doc.version}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {doc.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{doc.size}</span>
                <span>{doc.date}</span>
              </div>
              
              <div className="flex justify-between mt-3">
                <button className="text-xs text-[#FF6A00] hover:text-[#FF8C42] font-medium">
                  Download
                </button>
                <button className="text-xs text-gray-500 hover:text-gray-700">
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No documents found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      <div className="mt-8">
        <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-start p-3 bg-gray-50 rounded-lg">
            <div className="mr-3 text-[#FF6A00]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-800"><span className="font-medium">Alex Morgan</span> uploaded a new version of Q2 Financial Projections</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-gray-50 rounded-lg">
            <div className="mr-3 text-[#FF6A00]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-800"><span className="font-medium">Sarah Johnson</span> requested the Product Roadmap document</p>
              <p className="text-xs text-gray-500">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentExchangeRoom;