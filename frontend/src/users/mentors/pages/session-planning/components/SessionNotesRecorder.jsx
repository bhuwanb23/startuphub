import React, { useState } from 'react';

const SessionNotesRecorder = () => {
  const [activeTab, setActiveTab] = useState('notes');
  const [notes, setNotes] = useState('');
  const [recordings, setRecordings] = useState([
    { id: 1, title: 'TechFlow Inc. - Business Model Review', date: '2023-06-15', duration: '58:24' },
    { id: 2, title: 'GreenEnergy Solutions - Technical Architecture', date: '2023-06-18', duration: '1:02:15' }
  ]);
  const [videos, setVideos] = useState([
    { id: 1, title: 'HealthTrack - Product Demo', link: 'https://meet.google.com/abc-defg-hij', date: '2023-06-20' }
  ]);
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Market Research.pdf', type: 'pdf', size: '2.4 MB' },
    { id: 2, name: 'Financial Projections.xlsx', type: 'xls', size: '1.1 MB' }
  ]);

  const handleSummaryGenerate = () => {
    alert('AI Summary Generator would analyze the notes and generate a summary here.');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDoc = {
        id: Date.now(),
        name: file.name,
        type: file.type.split('/')[1] || 'doc',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
      };
      setDocuments([...documents, newDoc]);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Session Notes & Recording Logs</h2>
        <button 
          onClick={handleSummaryGenerate}
          className="px-3 py-1 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium text-sm flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          AI Summary
        </button>
      </div>

      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-6">
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notes'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Notes
          </button>
          <button
            onClick={() => setActiveTab('recordings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'recordings'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Audio Recordings
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'videos'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Video Links
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'documents'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Documents
          </button>
        </nav>
      </div>

      <div className="min-h-[200px]">
        {activeTab === 'notes' && (
          <div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter session notes here..."
              className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
            />
            <div className="mt-2 text-sm text-gray-500">
              Use markdown for formatting: **bold**, *italic*, # Heading, - List item
            </div>
          </div>
        )}

        {activeTab === 'recordings' && (
          <div>
            <div className="space-y-3">
              {recordings.map((recording) => (
                <div key={recording.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">{recording.title}</h3>
                    <p className="text-sm text-gray-600">{recording.date} • {recording.duration}</p>
                  </div>
                  <div className="space-x-2">
                    <button className="text-[#FF6A00] hover:text-[#FF8C42] text-sm font-medium">
                      Play
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-sm">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="px-4 py-2 border border-dashed border-gray-300 rounded-lg w-full text-gray-500 hover:border-[#FF6A00] hover:text-[#FF6A00]">
                + Upload New Recording
              </button>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div>
            <div className="space-y-3 mb-4">
              {videos.map((video) => (
                <div key={video.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">{video.title}</h3>
                    <p className="text-sm text-gray-600">{video.date}</p>
                    <p className="text-xs text-gray-500 mt-1 truncate max-w-md">{video.link}</p>
                  </div>
                  <div className="space-x-2">
                    <button className="text-[#FF6A00] hover:text-[#FF8C42] text-sm font-medium">
                      Join
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-sm">
                      Copy Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter video meeting link..."
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              />
              <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-r-lg hover:bg-[#FF8C42] transition-colors">
                Add
              </button>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div>
            <div className="space-y-3 mb-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-800 text-xs font-bold">{doc.type}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{doc.name}</h3>
                      <p className="text-sm text-gray-600">{doc.size}</p>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <button className="text-[#FF6A00] hover:text-[#FF8C42] text-sm font-medium">
                      View
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-sm">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="px-4 py-2 border border-dashed border-gray-300 rounded-lg w-full text-gray-500 hover:border-[#FF6A00] hover:text-[#FF6A00] cursor-pointer flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Upload Document
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionNotesRecorder;