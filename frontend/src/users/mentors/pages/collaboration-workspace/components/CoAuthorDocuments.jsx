import React, { useState } from 'react';

const CoAuthorDocuments = () => {
  const [documents, setDocuments] = useState([
    { 
      id: 1, 
      name: 'TechFlow Market Strategy', 
      owner: 'Alex Morgan', 
      collaborators: ['You', 'TechFlow Team'], 
      lastModified: '2023-06-15 14:30',
      status: 'In Progress'
    },
    { 
      id: 2, 
      name: 'GreenEnergy Funding Plan', 
      owner: 'Sarah Johnson', 
      collaborators: ['You', 'GreenEnergy Team', 'Investor Relations'], 
      lastModified: '2023-06-14 09:15',
      status: 'Review'
    },
    { 
      id: 3, 
      name: 'HealthTrack Product Requirements', 
      owner: 'Michael Chen', 
      collaborators: ['You', 'Product Team'], 
      lastModified: '2023-06-12 16:45',
      status: 'Completed'
    }
  ]);

  const [activeDocument, setActiveDocument] = useState(null);
  const [documentContent, setDocumentContent] = useState('');
  const [comments, setComments] = useState([
    { id: 1, author: 'TechFlow Inc.', content: 'Great insights on the market analysis section!', timestamp: '2023-06-15 10:30' },
    { id: 2, author: 'You', content: 'Thanks! I\'ve updated the financial projections based on your feedback.', timestamp: '2023-06-15 11:15' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleCreateDocument = () => {
    const newDoc = {
      id: Date.now(),
      name: 'New Document',
      owner: 'You',
      collaborators: ['You'],
      lastModified: new Date().toLocaleString(),
      status: 'Draft'
    };
    setDocuments([newDoc, ...documents]);
    setActiveDocument(newDoc);
    setDocumentContent('');
  };

  const handleSaveDocument = () => {
    if (activeDocument) {
      setDocuments(documents.map(doc => 
        doc.id === activeDocument.id 
          ? { ...doc, lastModified: new Date().toLocaleString() } 
          : doc
      ));
      alert('Document saved successfully!');
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: 'You',
        content: newComment,
        timestamp: new Date().toLocaleString()
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Co-author Documents</h2>
        <button 
          onClick={handleCreateDocument}
          className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Document
        </button>
      </div>

      {!activeDocument ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div 
              key={doc.id} 
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setActiveDocument(doc)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">{doc.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  doc.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  doc.status === 'Review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {doc.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Owner: {doc.owner}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {doc.collaborators.slice(0, 3).map((collaborator, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {collaborator}
                  </span>
                ))}
                {doc.collaborators.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    +{doc.collaborators.length - 3}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">Last modified: {doc.lastModified}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{activeDocument.name}</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={handleSaveDocument}
                  className="px-3 py-1 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors text-sm"
                >
                  Save
                </button>
                <button 
                  onClick={() => setActiveDocument(null)}
                  className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Back to List
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg mb-4">
              <textarea
                value={documentContent}
                onChange={(e) => setDocumentContent(e.target.value)}
                placeholder="Start typing your document here..."
                className="w-full h-96 p-4 border-none focus:ring-0"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                Owner: {activeDocument.owner}
              </span>
              {activeDocument.collaborators.map((collaborator, index) => (
                <span key={index} className="px-2 py-1 bg-[#FFF9F0] text-[#FF6A00] rounded-full text-xs">
                  {collaborator}
                </span>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-[#FFF9F0] rounded-xl p-4 mb-4">
              <h4 className="font-medium text-gray-800 mb-3">Version History</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FF6A00] rounded-full mr-2"></div>
                  <div className="text-sm">
                    <div className="font-medium">Current Version</div>
                    <div className="text-gray-600">Just now</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                  <div className="text-sm">
                    <div className="font-medium">Version 3</div>
                    <div className="text-gray-600">2023-06-15 14:30</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                  <div className="text-sm">
                    <div className="font-medium">Version 2</div>
                    <div className="text-gray-600">2023-06-14 09:15</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-xl p-4">
              <h4 className="font-medium text-gray-800 mb-3">Comments</h4>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddComment}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows="2"
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                ></textarea>
                <button
                  type="submit"
                  className="mt-2 px-3 py-1 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors text-sm"
                >
                  Add Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoAuthorDocuments;