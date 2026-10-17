import React, { useState } from 'react';

const ResearchPaperUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadedPapers, setUploadedPapers] = useState([
    { id: 1, title: 'AI-Powered Drug Discovery Methods', author: 'Dr. Sarah Johnson', department: 'Biotechnology', date: '2023-06-15', tags: ['AI', 'Pharmaceuticals', 'Machine Learning'] },
    { id: 2, title: 'Sustainable Energy Storage Solutions', author: 'Prof. Michael Chen', department: 'Chemical Engineering', date: '2023-05-22', tags: ['Energy', 'Battery', 'Sustainability'] },
    { id: 3, title: 'Quantum Computing Optimization Algorithms', author: 'Dr. Emily Rodriguez', department: 'Computer Science', date: '2023-07-10', tags: ['Quantum', 'Algorithms', 'Optimization'] }
  ]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(newFiles);
  };

  const handleUpload = () => {
    // In a real app, this would upload the files to a server
    const newPapers = files.map((file, index) => ({
      id: uploadedPapers.length + index + 1,
      title: file.name.replace('.pdf', ''),
      author: 'Current User',
      department: 'Unknown',
      date: new Date().toISOString().split('T')[0],
      tags: ['Auto-tagged']
    }));
    
    setUploadedPapers([...uploadedPapers, ...newPapers]);
    setFiles([]);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Research Paper Upload System</h1>
        <p className="text-gray-600">Upload and manage research publications with auto-tagging</p>
      </div>

      {/* Upload Panel */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Upload New Research Papers</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#F4A300] hover:text-[#F26B1D]">
              <span>Upload PDF files</span>
              <input 
                type="file" 
                multiple 
                accept=".pdf" 
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PDF up to 10MB</p>
        </div>
        
        {files.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {files.length} file(s) selected
              </div>
              <button 
                onClick={handleUpload}
                className="bg-[#F4A300] hover:bg-[#F26B1D] text-white px-4 py-2 rounded-lg transition-colors"
              >
                Upload Papers
              </button>
            </div>
            
            <div className="mt-3 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <span className="text-sm text-gray-800">{file.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Uploaded Papers */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Uploaded Research Papers</h2>
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Search papers..."
              className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
            />
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {uploadedPapers.map((paper) => (
                <tr key={paper.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{paper.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paper.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paper.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paper.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {paper.tags.map((tag, index) => (
                        <span key={index} className="inline-block bg-[#FFF9F0] text-[#F4A300] text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-[#F4A300] hover:text-[#F26B1D] mr-3">View</button>
                    <button className="text-[#F4A300] hover:text-[#F26B1D]">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResearchPaperUpload;