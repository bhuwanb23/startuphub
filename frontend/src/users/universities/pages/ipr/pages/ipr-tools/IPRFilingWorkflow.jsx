import React, { useState } from 'react';

const IPRFilingWorkflow = () => {
  const [currentStep, setCurrentStep] = useState(2); // Draft stage
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Patent Draft v1.0.pdf', uploaded: '2023-06-15', status: 'Approved' },
    { id: 2, name: 'Technical Specifications.docx', uploaded: '2023-06-18', status: 'Pending Review' },
    { id: 3, name: 'Prior Art Search Report.pdf', uploaded: '2023-06-20', status: 'Approved' },
  ]);

  const workflowSteps = [
    { id: 1, name: 'Draft', description: 'Initial patent draft creation' },
    { id: 2, name: 'Review', description: 'Internal and external review process' },
    { id: 3, name: 'Filing', description: 'Official filing with patent office' },
    { id: 4, name: 'Office Actions', description: 'Responding to examiner feedback' },
    { id: 5, name: 'Grant', description: 'Patent officially granted' },
  ];

  const addDocument = () => {
    const newDocument = {
      id: documents.length + 1,
      name: 'New_Document_' + (documents.length + 1) + '.pdf',
      uploaded: new Date().toISOString().split('T')[0],
      status: 'Pending Review'
    };
    setDocuments([...documents, newDocument]);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">IPR Filing Workflow</h1>
        <p className="text-gray-600">Step-wise timeline for patent filing process</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow Timeline */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Filing Process Timeline</h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 transform translate-x-1/2"></div>
              
              <div className="space-y-8">
                {workflowSteps.map((step, index) => (
                  <div key={step.id} className="relative flex items-start">
                    <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                      step.id <= currentStep 
                        ? 'bg-[#F4A300] text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step.id}
                    </div>
                    <div className="ml-4 pt-1">
                      <h3 className={`text-lg font-medium ${
                        step.id <= currentStep ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.name}
                      </h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      
                      {step.id === currentStep && (
                        <div className="mt-3">
                          <div className="flex space-x-3">
                            <button className="bg-[#F4A300] hover:bg-[#F26B1D] text-white px-4 py-2 rounded-lg text-sm transition-colors">
                              Mark as Complete
                            </button>
                            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm transition-colors">
                              Add Notes
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Document Management */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Document Management</h2>
              <button 
                onClick={addDocument}
                className="text-[#F4A300] hover:text-[#F26B1D] text-sm font-medium"
              >
                + Add Document
              </button>
            </div>
            
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium text-gray-800 text-sm">{doc.name}</div>
                      <div className="text-xs text-gray-500">Uploaded: {doc.uploaded}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      doc.status === 'Approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <button className="text-xs text-[#F4A300] hover:text-[#F26B1D]">View</button>
                    <button className="text-xs text-[#F4A300] hover:text-[#F26B1D]">Download</button>
                    <button className="text-xs text-gray-500 hover:text-gray-700">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attorney Notes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Attorney Notes</h2>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
              placeholder="Add notes for attorneys..."
            ></textarea>
            <button className="mt-3 bg-[#F4A300] hover:bg-[#F26B1D] text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPRFilingWorkflow;