import React, { useState } from 'react';

const InvestmentDocuments = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'NeuroSync AI - Term Sheet.pdf',
      type: 'term-sheet',
      startup: 'NeuroSync AI',
      date: '2023-06-15',
      size: '2.4 MB',
      status: 'signed'
    },
    {
      id: 2,
      name: 'FinStream Analytics - SHA.pdf',
      type: 'sha',
      startup: 'FinStream Analytics',
      date: '2023-05-22',
      size: '1.8 MB',
      status: 'pending'
    },
    {
      id: 3,
      name: 'GreenTech Pro - NDA.pdf',
      type: 'nda',
      startup: 'GreenTech Pro',
      date: '2023-04-10',
      size: '0.9 MB',
      status: 'signed'
    },
    {
      id: 4,
      name: 'HealthPulse AI - Investment Agreement.pdf',
      type: 'agreement',
      startup: 'HealthPulse AI',
      date: '2023-03-18',
      size: '4.2 MB',
      status: 'signed'
    },
    {
      id: 5,
      name: 'EcoPack Solutions - Due Diligence Report.pdf',
      type: 'report',
      startup: 'EcoPack Solutions',
      date: '2023-02-28',
      size: '3.1 MB',
      status: 'completed'
    }
  ]);

  const [dragActive, setDragActive] = useState(false);

  const getFileIcon = (type) => {
    switch (type) {
      case 'term-sheet': return '📄';
      case 'sha': return '🔒';
      case 'nda': return '📜';
      case 'agreement': return '✍️';
      case 'report': return '📊';
      default: return '📁';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'signed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // In a real app, you would upload the files here
      // For now, we'll just show an alert
      alert(`File "${e.dataTransfer.files[0].name}" would be uploaded in a real application`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Investment Documents & Agreements</h2>
        <p className="text-gray-600">Document vault and management system</p>
      </div>

      {/* Drag and Drop Uploader */}
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive 
            ? 'border-[#FF6A00] bg-[#FFF5EB]' 
            : 'border-gray-300 bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl mb-4">📁</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Drag & Drop Files</h3>
          <p className="text-gray-600 mb-4">Upload investment documents, agreements, and reports</p>
          <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors">
            Browse Files
          </button>
          <p className="text-xs text-gray-500 mt-3">Supports PDF, DOC, XLS up to 10MB</p>
        </div>
        <input 
          type="file" 
          className="hidden" 
          multiple 
          accept=".pdf,.doc,.docx,.xls,.xlsx" 
        />
      </div>

      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-800">12</div>
          <div className="text-sm text-gray-600">Total Documents</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">8</div>
          <div className="text-sm text-gray-600">Signed</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-yellow-600">3</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">1</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
      </div>

      {/* Document List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Document Vault</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Startup</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-xl mr-3">{getFileIcon(doc.type)}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{doc.type.replace('-', ' ')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{doc.startup}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{doc.date}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(doc.status)}`}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <button className="text-[#FF6A00] hover:text-[#e05500] mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-900">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Term Sheets</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <span className="text-sm text-gray-700">NeuroSync AI</span>
              <span className="text-xs text-green-600">Signed</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <span className="text-sm text-gray-700">FinStream Analytics</span>
              <span className="text-xs text-yellow-600">Pending</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Legal Agreements</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <span className="text-sm text-gray-700">HealthPulse AI</span>
              <span className="text-xs text-green-600">Signed</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <span className="text-sm text-gray-700">GreenTech Pro</span>
              <span className="text-xs text-green-600">Signed</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Reports</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <span className="text-sm text-gray-700">EcoPack Solutions</span>
              <span className="text-xs text-blue-600">Completed</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <span className="text-sm text-gray-700">Market Analysis Q2</span>
              <span className="text-xs text-blue-600">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDocuments;