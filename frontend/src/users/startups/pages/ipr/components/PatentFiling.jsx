import React, { useState } from 'react';

const PatentFiling = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [filingData, setFilingData] = useState({
    inventorName: '',
    assignee: '',
    patentTitle: '',
    technicalField: '',
    filingType: 'provisional',
    jurisdiction: 'us',
  });

  const steps = [
    { id: 1, name: 'Preparation', status: 'current' },
    { id: 2, name: 'Drafting', status: 'upcoming' },
    { id: 3, name: 'Review', status: 'upcoming' },
    { id: 4, name: 'Filing', status: 'upcoming' },
    { id: 5, name: 'Tracking', status: 'upcoming' },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit the filing
    alert('Patent filing initiated successfully!');
  };

  const updateSteps = () => {
    return steps.map(step => {
      if (step.id < currentStep) {
        return { ...step, status: 'complete' };
      } else if (step.id === currentStep) {
        return { ...step, status: 'current' };
      } else {
        return { ...step, status: 'upcoming' };
      }
    });
  };

  const updatedSteps = updateSteps();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Patent Filing Workflow</h1>
        <p className="text-gray-600 mt-1">Step-by-step guide for filing your patent application</p>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <nav aria-label="Progress">
          <ol className="space-y-4 md:space-y-0 md:flex md:space-x-8">
            {updatedSteps.map((step) => (
              <li key={step.id} className="md:flex-1">
                {step.status === 'complete' ? (
                  <div className="group flex flex-col border-l-4 border-[#FF6A00] py-2 pl-4 hover:border-[#FF8C42] md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-[#FF6A00]">{step.name}</span>
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                ) : step.status === 'current' ? (
                  <div className="flex flex-col border-l-4 border-[#FF6A00] py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4" aria-current="step">
                    <span className="text-sm font-medium text-[#FF6A00]">{step.name}</span>
                    <span className="text-sm font-medium">In Progress</span>
                  </div>
                ) : (
                  <div className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">{step.name}</span>
                    <span className="text-sm font-medium">Upcoming</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {currentStep === 1 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Preparation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="inventorName" className="block text-sm font-medium text-gray-700 mb-1">
                  Inventor Name
                </label>
                <input
                  type="text"
                  id="inventorName"
                  value={filingData.inventorName}
                  onChange={(e) => setFilingData({...filingData, inventorName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  placeholder="Full legal name"
                />
              </div>
              <div>
                <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
                  Assignee (if applicable)
                </label>
                <input
                  type="text"
                  id="assignee"
                  value={filingData.assignee}
                  onChange={(e) => setFilingData({...filingData, assignee: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  placeholder="Company or organization"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="patentTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Patent Title
                </label>
                <input
                  type="text"
                  id="patentTitle"
                  value={filingData.patentTitle}
                  onChange={(e) => setFilingData({...filingData, patentTitle: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  placeholder="Concise and descriptive title"
                />
              </div>
              <div>
                <label htmlFor="technicalField" className="block text-sm font-medium text-gray-700 mb-1">
                  Technical Field
                </label>
                <input
                  type="text"
                  id="technicalField"
                  value={filingData.technicalField}
                  onChange={(e) => setFilingData({...filingData, technicalField: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  placeholder="e.g., Artificial Intelligence, Biotechnology"
                />
              </div>
              <div>
                <label htmlFor="filingType" className="block text-sm font-medium text-gray-700 mb-1">
                  Filing Type
                </label>
                <select
                  id="filingType"
                  value={filingData.filingType}
                  onChange={(e) => setFilingData({...filingData, filingType: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                >
                  <option value="provisional">Provisional Patent</option>
                  <option value="non-provisional">Non-Provisional Patent</option>
                  <option value="pct">PCT International</option>
                </select>
              </div>
              <div>
                <label htmlFor="jurisdiction" className="block text-sm font-medium text-gray-700 mb-1">
                  Jurisdiction
                </label>
                <select
                  id="jurisdiction"
                  value={filingData.jurisdiction}
                  onChange={(e) => setFilingData({...filingData, jurisdiction: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                >
                  <option value="us">United States</option>
                  <option value="eu">European Union</option>
                  <option value="jp">Japan</option>
                  <option value="cn">China</option>
                  <option value="worldwide">Worldwide (PCT)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Drafting</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600">Your patent application is being prepared with the following documents:</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Detailed technical description</li>
                <li>Claims and abstract</li>
                <li>Drawings and figures</li>
                <li>Background and summary</li>
              </ul>
              <div className="mt-6 p-4 bg-[#FFF5E6] rounded-lg">
                <h3 className="font-bold text-gray-800">AI Assistant Note:</h3>
                <p className="text-gray-700 mt-2">Based on your technical field, we recommend including specific examples of implementation to strengthen your claims.</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Review</h2>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-2">Application Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Inventor:</span>
                  <span className="ml-2">{filingData.inventorName || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Assignee:</span>
                  <span className="ml-2">{filingData.assignee || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Title:</span>
                  <span className="ml-2">{filingData.patentTitle || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Technical Field:</span>
                  <span className="ml-2">{filingData.technicalField || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Filing Type:</span>
                  <span className="ml-2 capitalize">{filingData.filingType}</span>
                </div>
                <div>
                  <span className="text-gray-500">Jurisdiction:</span>
                  <span className="ml-2 uppercase">{filingData.jurisdiction}</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-bold text-gray-800 mb-2">Legal Review Checklist</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                  <span className="ml-2 text-gray-700">Claims are clear and specific</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                  <span className="ml-2 text-gray-700">Description enables reproduction</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                  <span className="ml-2 text-gray-700">Drawings are properly labeled</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                  <span className="ml-2 text-gray-700">Prior art references cited</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Filing</h2>
            <div className="border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#FF8C42]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#FF6A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to File</h3>
              <p className="text-gray-600 mb-6">Your patent application is ready for submission to the {filingData.jurisdiction.toUpperCase()} patent office.</p>
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <h4 className="font-bold text-gray-800 mb-2">Filing Details</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Filing Fee:</span>
                    <span className="font-medium">$1,250.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Estimated Processing Time:</span>
                    <span className="font-medium">12-18 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Application Number:</span>
                    <span className="font-medium">Will be assigned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Tracking</h2>
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{filingData.patentTitle || 'Untitled Patent'}</h3>
                  <p className="text-gray-600">Application Status: <span className="font-medium text-[#FF6A00]">Filed</span></p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Application Number</p>
                  <p className="font-mono">US2023XXXXXXA1</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6A00] flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-800">Application Filed</h4>
                    <p className="text-sm text-gray-500">November 15, 2023</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-800">Examiner Assigned</h4>
                    <p className="text-sm text-gray-500">Estimated: January 2024</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-800">First Office Action</h4>
                    <p className="text-sm text-gray-500">Estimated: March 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentStep === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
            >
              Complete Filing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatentFiling;