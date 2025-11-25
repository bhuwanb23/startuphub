import React, { useState } from 'react';

const Documents = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Incorporation Certificate',
      type: 'PDF',
      size: '2.4 MB',
      uploaded: '2023-01-15',
      status: 'Verified',
    },
    {
      id: 2,
      name: 'Trademark Registration',
      type: 'PDF',
      size: '1.8 MB',
      uploaded: '2023-03-22',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Financial Statements 2022',
      type: 'XLSX',
      size: '5.1 MB',
      uploaded: '2023-04-10',
      status: 'Verified',
    },
    {
      id: 4,
      name: 'Board Resolution',
      type: 'DOCX',
      size: '0.8 MB',
      uploaded: '2023-05-18',
      status: 'Verified',
    },
  ]);

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: '',
    file: null,
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDocument({
        ...newDocument,
        file: file,
        name: file.name,
      });
    }
  };

  const handleUploadDocument = (e) => {
    e.preventDefault();
    if (newDocument.file) {
      const document = {
        id: documents.length + 1,
        name: newDocument.name,
        type: newDocument.file.type.split('/')[1].toUpperCase(),
        size: `${(newDocument.file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploaded: new Date().toISOString().split('T')[0],
        status: 'Pending',
      };
      setDocuments([...documents, document]);
      setNewDocument({ name: '', file: null });
      setShowUploadForm(false);
    }
  };

  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Documents & Certificates</h1>
          <p className="text-gray-600 mt-1">Upload and manage your startup's important documents</p>
        </div>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="mt-4 md:mt-0 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
        >
          {showUploadForm ? 'Cancel' : 'Upload Document'}
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Upload New Document</h2>
          <form onSubmit={handleUploadDocument} className="space-y-4">
            <div>
              <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-1">
                Select Document
              </label>
              <div className="flex items-center">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOC, XLSX, JPG, PNG (MAX. 10MB)</p>
                  </div>
                  <input 
                    id="document" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
              {newDocument.file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {newDocument.name}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newDocument.file}
                className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                Upload Document
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Documents List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-[#FF8C42]/20 rounded-lg flex items-center justify-center">
                        <span className="text-[#FF6A00] font-medium">{doc.type}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.uploaded}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      doc.status === 'Verified' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#FF6A00] hover:text-[#FF8C42] mr-3">
                      Download
                    </button>
                    <button 
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
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

export default Documents;