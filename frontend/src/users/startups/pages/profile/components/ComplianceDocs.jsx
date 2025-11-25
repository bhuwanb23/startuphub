import React, { useState } from 'react';

const ComplianceDocs = () => {
  const [complianceDocs, setComplianceDocs] = useState([
    {
      id: 1,
      name: 'GDPR Compliance Report',
      type: 'Privacy',
      lastUpdated: '2023-09-15',
      status: 'Compliant',
      nextReview: '2024-03-15',
    },
    {
      id: 2,
      name: 'SOC 2 Type II Certification',
      type: 'Security',
      lastUpdated: '2023-07-22',
      status: 'Compliant',
      nextReview: '2024-07-22',
    },
    {
      id: 3,
      name: 'Financial Audit Report 2022',
      type: 'Financial',
      lastUpdated: '2023-04-30',
      status: 'Compliant',
      nextReview: '2024-04-30',
    },
    {
      id: 4,
      name: 'Employment Law Compliance',
      type: 'HR',
      lastUpdated: '2023-08-10',
      status: 'Review Needed',
      nextReview: '2023-11-10',
    },
  ]);

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newDoc, setNewDoc] = useState({
    name: '',
    type: 'Privacy',
    file: null,
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDoc({
        ...newDoc,
        file: file,
        name: file.name.replace(/\.[^/.]+$/, ""),
      });
    }
  };

  const handleUploadDoc = (e) => {
    e.preventDefault();
    if (newDoc.file) {
      const doc = {
        id: complianceDocs.length + 1,
        name: newDoc.name,
        type: newDoc.type,
        lastUpdated: new Date().toISOString().split('T')[0],
        status: 'Pending Review',
        nextReview: 'TBD',
      };
      setComplianceDocs([doc, ...complianceDocs]);
      setNewDoc({ name: '', type: 'Privacy', file: null });
      setShowUploadForm(false);
    }
  };

  const handleDeleteDoc = (id) => {
    setComplianceDocs(complianceDocs.filter(doc => doc.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Compliant':
        return 'bg-green-100 text-green-800';
      case 'Review Needed':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending Review':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Compliance & Legal Docs</h1>
          <p className="text-gray-600 mt-1">Manage your startup's compliance and legal documents</p>
        </div>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="mt-4 md:mt-0 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
        >
          {showUploadForm ? 'Cancel' : 'Add Document'}
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Compliance Document</h2>
          <form onSubmit={handleUploadDoc} className="space-y-4">
            <div>
              <label htmlFor="docName" className="block text-sm font-medium text-gray-700 mb-1">
                Document Name
              </label>
              <input
                type="text"
                id="docName"
                value={newDoc.name}
                onChange={(e) => setNewDoc({...newDoc, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                placeholder="e.g., GDPR Compliance Report"
                required
              />
            </div>
            <div>
              <label htmlFor="docType" className="block text-sm font-medium text-gray-700 mb-1">
                Document Type
              </label>
              <select
                id="docType"
                value={newDoc.type}
                onChange={(e) => setNewDoc({...newDoc, type: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              >
                <option value="Privacy">Privacy</option>
                <option value="Security">Security</option>
                <option value="Financial">Financial</option>
                <option value="HR">HR</option>
                <option value="Intellectual Property">Intellectual Property</option>
                <option value="Regulatory">Regulatory</option>
              </select>
            </div>
            <div>
              <label htmlFor="docFile" className="block text-sm font-medium text-gray-700 mb-1">
                Select File
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
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 20MB)</p>
                  </div>
                  <input 
                    id="docFile" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx"
                  />
                </label>
              </div>
              {newDoc.file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {newDoc.file.name}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newDoc.file}
                className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                Add Document
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Compliance Documents List */}
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
                  Last Updated
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Review
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
              {complianceDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.nextReview}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#FF6A00] hover:text-[#FF8C42] mr-3">
                      View
                    </button>
                    <button 
                      onClick={() => handleDeleteDoc(doc.id)}
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

      {/* Compliance Checklist */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Compliance Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="ml-3 text-gray-800">GDPR Compliance Training Completed</span>
          </div>
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="ml-3 text-gray-800">Annual Financial Audit Submitted</span>
          </div>
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span className="ml-3 text-gray-800">Update Employment Contracts</span>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="ml-3 text-gray-800">SOC 3 Certification</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDocs;