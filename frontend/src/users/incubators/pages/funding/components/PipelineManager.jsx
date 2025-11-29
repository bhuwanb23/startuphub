import React, { useState } from 'react';

const PipelineManager = () => {
  const [activeStage, setActiveStage] = useState('applied');
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Mock data for applied grants
  const appliedGrants = [
    {
      id: 1,
      name: 'Tech Innovation Grant',
      organization: 'National Science Foundation',
      amount: '$250,000',
      status: 'Under Review',
      submittedDate: '2023-05-15',
      deadline: '2023-08-30',
      progress: 60
    },
    {
      id: 2,
      name: 'Sustainability Startup Fund',
      organization: 'GreenFuture Foundation',
      amount: '$100,000',
      status: 'Documentation',
      submittedDate: '2023-06-01',
      deadline: '2023-09-15',
      progress: 85
    }
  ];

  // Mock data for received funding
  const receivedFunding = [
    {
      id: 1,
      name: 'Seed Investment',
      investor: 'VentureCap Partners',
      amount: '$1,200,000',
      date: '2023-04-20',
      type: 'Series A',
      utilization: 45
    },
    {
      id: 2,
      name: 'Research Grant',
      investor: 'EU Horizon Program',
      amount: '$750,000',
      date: '2023-03-10',
      type: 'Grant',
      utilization: 78
    }
  ];

  // Mock data for funding in process
  const fundingInProcess = [
    {
      id: 1,
      name: 'Growth Capital',
      investor: 'TechGrowth Fund',
      amount: '$3,500,000',
      stage: 'Term Sheet Negotiation',
      nextMilestone: 'Due Diligence Completion',
      dueDate: '2023-07-15'
    },
    {
      id: 2,
      name: 'Bridge Loan',
      investor: 'Innovation Bank',
      amount: '$500,000',
      stage: 'Final Documentation',
      nextMilestone: 'Signing Ceremony',
      dueDate: '2023-07-30'
    }
  ];

  // Mock data for documents and agreements
  const documents = [
    {
      id: 1,
      name: 'Term Sheet - VentureCap',
      type: 'Term Sheet',
      date: '2023-06-10',
      status: 'Signed',
      size: '245 KB'
    },
    {
      id: 2,
      name: 'NSF Grant Agreement',
      type: 'Grant Agreement',
      date: '2023-05-20',
      status: 'Pending Signature',
      size: '1.2 MB'
    },
    {
      id: 3,
      name: 'Financial Projections Q3',
      type: 'Financial Document',
      date: '2023-06-05',
      status: 'Approved',
      size: '890 KB'
    },
    {
      id: 4,
      name: 'IP Assignment Agreement',
      type: 'Legal Document',
      date: '2023-05-18',
      status: 'Signed',
      size: '156 KB'
    }
  ];

  // Function to open document viewer
  const openDocumentViewer = (document) => {
    setSelectedDocument(document);
    setShowDocumentViewer(true);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Funding Pipeline Manager</h1>
            <p className="text-gray-600">Track and manage your funding pipeline from application to disbursement</p>
          </div>
        </div>
      </div>

      {/* Stage Tabs */}
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeStage === 'applied'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveStage('applied')}
        >
          Applied Grants
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeStage === 'received'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveStage('received')}
        >
          Received Funding
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeStage === 'process'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveStage('process')}
        >
          Funding in Process
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeStage === 'documents'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveStage('documents')}
        >
          Documents & Agreements
        </button>
      </div>

      {/* Applied Grants Stage */}
      {activeStage === 'applied' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Applied Grants</h2>
          <div className="space-y-4">
            {appliedGrants.map((grant) => (
              <div key={grant.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{grant.name}</h3>
                    <p className="text-gray-600">{grant.organization}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <div className="text-xl font-bold text-[#FF6A00]">{grant.amount}</div>
                    <div className="text-sm text-gray-500">Submitted: {grant.submittedDate}</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-between mb-3">
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {grant.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Deadline: {grant.deadline}
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{grant.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#FF6A00] h-2 rounded-full" 
                      style={{ width: `${grant.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="text-[#FF6A00] hover:text-[#e05d00] text-sm font-medium">
                    View Details
                  </button>
                  <button className="text-[#FF6A00] hover:text-[#e05d00] text-sm font-medium">
                    Update Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Received Funding Stage */}
      {activeStage === 'received' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Received Funding</h2>
          <div className="space-y-4">
            {receivedFunding.map((funding) => (
              <div key={funding.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{funding.name}</h3>
                    <p className="text-gray-600">{funding.investor}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <div className="text-xl font-bold text-[#FF6A00]">{funding.amount}</div>
                    <div className="text-sm text-gray-500">Received: {funding.date}</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-between mb-3">
                  <div>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {funding.type}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Utilization: {funding.utilization}%
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fund Utilization</span>
                    <span>{funding.utilization}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#50C878] h-2 rounded-full" 
                      style={{ width: `${funding.utilization}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="text-[#FF6A00] hover:text-[#e05d00] text-sm font-medium">
                    View Utilization Report
                  </button>
                  <button className="text-[#FF6A00] hover:text-[#e05d00] text-sm font-medium">
                    Request Disbursement
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Funding in Process Stage */}
      {activeStage === 'process' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Funding in Process</h2>
          
          {/* Timeline Visualization */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4">Funding Timeline</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 h-full w-0.5 bg-[#FFE5B4]"></div>
              
              {/* Timeline items */}
              <div className="space-y-6 pl-12">
                <div className="relative">
                  <div className="absolute -left-12 top-1 w-8 h-8 rounded-full bg-[#FF6A00] flex items-center justify-center">
                    <span className="text-white text-sm">1</span>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-4">
                    <h4 className="font-bold text-gray-800">Initial Pitch</h4>
                    <p className="text-gray-600 text-sm">Completed on 2023-05-15</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-12 top-1 w-8 h-8 rounded-full bg-[#FF6A00] flex items-center justify-center">
                    <span className="text-white text-sm">2</span>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-4">
                    <h4 className="font-bold text-gray-800">Due Diligence</h4>
                    <p className="text-gray-600 text-sm">In Progress</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-12 top-1 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">3</span>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-4">
                    <h4 className="font-bold text-gray-800">Term Sheet Negotiation</h4>
                    <p className="text-gray-600 text-sm">Pending</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-12 top-1 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">4</span>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-4">
                    <h4 className="font-bold text-gray-800">Final Documentation</h4>
                    <p className="text-gray-600 text-sm">Pending</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-12 top-1 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">5</span>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-4">
                    <h4 className="font-bold text-gray-800">Funding Disbursement</h4>
                    <p className="text-gray-600 text-sm">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Funding Opportunities */}
          <div className="space-y-4">
            {fundingInProcess.map((funding) => (
              <div key={funding.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{funding.name}</h3>
                    <p className="text-gray-600">{funding.investor}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <div className="text-xl font-bold text-[#FF6A00]">{funding.amount}</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-between mb-3">
                  <div>
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      {funding.stage}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Next: {funding.nextMilestone} by {funding.dueDate}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="text-[#FF6A00] hover:text-[#e05d00] text-sm font-medium">
                    Update Progress
                  </button>
                  <button className="text-[#FF6A00] hover:text-[#e05d00] text-sm font-medium">
                    Schedule Meeting
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents & Agreements Stage */}
      {activeStage === 'documents' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Documents & Agreements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((document) => (
              <div 
                key={document.id} 
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openDocumentViewer(document)}
              >
                <div className="flex items-start mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FFF9F0] flex items-center justify-center text-[#FF6A00] mr-3">
                    📄
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{document.name}</h3>
                    <p className="text-gray-600 text-sm">{document.type}</p>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span>{document.date}</span>
                  <span>{document.size}</span>
                </div>
                
                <div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    document.status === 'Signed' ? 'bg-green-100 text-green-800' :
                    document.status === 'Pending Signature' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {document.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {showDocumentViewer && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">{selectedDocument.name}</h3>
              <button 
                onClick={() => setShowDocumentViewer(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 bg-gray-50 flex items-center justify-center">
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center w-full max-w-md">
                <div className="text-5xl mb-4">📄</div>
                <h4 className="font-bold text-gray-800 mb-2">{selectedDocument.name}</h4>
                <p className="text-gray-600 mb-4">This is a placeholder for the document viewer. In a real implementation, this would show the actual document content.</p>
                <div className="flex justify-center space-x-3">
                  <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05d00] transition-colors">
                    Download
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button 
                onClick={() => setShowDocumentViewer(false)}
                className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05d00] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelineManager;