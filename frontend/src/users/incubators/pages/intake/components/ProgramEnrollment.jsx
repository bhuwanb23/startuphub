import React, { useState } from 'react';

const ProgramEnrollment = () => {
  const [activeTab, setActiveTab] = useState('offer');
  const [offerLetter, setOfferLetter] = useState({
    startDate: '2023-07-01',
    endDate: '2024-01-01',
    programName: 'Innovation Incubator Program',
    cohort: 'Summer 2023',
    duration: '6 months',
    stipend: '$5,000',
    equity: '6%',
    milestones: [
      'Complete MVP development',
      'Secure first 10 customers',
      'Raise pre-seed funding'
    ]
  });

  const [acceptance, setAcceptance] = useState([
    { id: 1, startup: 'TechFlow Innovations', status: 'Accepted', date: '2023-06-15' },
    { id: 2, startup: 'GreenEnergy Solutions', status: 'Pending', date: '2023-06-14' },
    { id: 3, startup: 'FinTech Pro', status: 'Accepted', date: '2023-06-13' }
  ]);

  const [onboarding, setOnboarding] = useState({
    founderAgreement: false,
    ipAssignment: false,
    confidentiality: false,
    codeOfConduct: false
  });

  const handleOnboardingChange = (field) => {
    setOnboarding(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const generateOfferLetter = () => {
    // In a real app, this would generate a PDF
    console.log('Generating offer letter:', offerLetter);
    alert('Offer letter generated and sent to startup');
  };

  const uploadDocumentPack = () => {
    // In a real app, this would handle file uploads
    console.log('Uploading document pack');
    alert('Document pack uploaded successfully');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Program Enrollment</h2>
        <p className="text-gray-600">Manage startup enrollment and onboarding process</p>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('offer')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'offer'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Offer Letter
        </button>
        <button
          onClick={() => setActiveTab('acceptance')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'acceptance'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Acceptance Tracking
        </button>
        <button
          onClick={() => setActiveTab('onboarding')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'onboarding'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Onboarding
        </button>
      </div>

      {/* Offer Letter Generator */}
      {activeTab === 'offer' && (
        <div>
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Offer Letter Generator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                <input
                  type="text"
                  value={offerLetter.programName}
                  onChange={(e) => setOfferLetter({...offerLetter, programName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cohort</label>
                <input
                  type="text"
                  value={offerLetter.cohort}
                  onChange={(e) => setOfferLetter({...offerLetter, cohort: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={offerLetter.startDate}
                  onChange={(e) => setOfferLetter({...offerLetter, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={offerLetter.endDate}
                  onChange={(e) => setOfferLetter({...offerLetter, endDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={offerLetter.duration}
                  onChange={(e) => setOfferLetter({...offerLetter, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stipend</label>
                <input
                  type="text"
                  value={offerLetter.stipend}
                  onChange={(e) => setOfferLetter({...offerLetter, stipend: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Equity</label>
                <input
                  type="text"
                  value={offerLetter.equity}
                  onChange={(e) => setOfferLetter({...offerLetter, equity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Key Milestones</label>
              <div className="space-y-2">
                {offerLetter.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={milestone}
                      onChange={(e) => {
                        const newMilestones = [...offerLetter.milestones];
                        newMilestones[index] = e.target.value;
                        setOfferLetter({...offerLetter, milestones: newMilestones});
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    />
                    <button
                      onClick={() => {
                        const newMilestones = [...offerLetter.milestones];
                        newMilestones.splice(index, 1);
                        setOfferLetter({...offerLetter, milestones: newMilestones});
                      }}
                      className="ml-2 px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setOfferLetter({...offerLetter, milestones: [...offerLetter.milestones, '']})}
                  className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium"
                >
                  + Add Milestone
                </button>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={generateOfferLetter}
                className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500]"
              >
                Generate & Send Offer Letter
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                Preview
              </button>
            </div>
          </div>

          {/* Document Pack Uploader */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">Document Pack Uploader</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                <button 
                  onClick={uploadDocumentPack}
                  className="font-medium text-[#FF6A00] hover:text-[#e05500]"
                >
                  Upload document pack
                </button>
                or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF, DOC, XLS up to 10MB</p>
            </div>
          </div>
        </div>
      )}

      {/* Acceptance Tracking */}
      {activeTab === 'acceptance' && (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Startup
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {acceptance.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {record.startup}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        record.status === 'Accepted' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-[#FF6A00] hover:text-[#e05500] mr-3">
                        View Details
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        Resend
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Acceptance Statistics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-[#FF6A00]">2</div>
              <div className="text-gray-600">Accepted</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-yellow-600">1</div>
              <div className="text-gray-600">Pending</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-gray-600">3</div>
              <div className="text-gray-600">Total</div>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Form */}
      {activeTab === 'onboarding' && (
        <div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">Onboarding Requirements</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="founder-agreement"
                  checked={onboarding.founderAgreement}
                  onChange={() => handleOnboardingChange('founderAgreement')}
                  className="h-5 w-5 text-[#FF6A00] rounded focus:ring-[#FF6A00]"
                />
                <label htmlFor="founder-agreement" className="ml-3 text-gray-700">
                  Founder Agreement
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ip-assignment"
                  checked={onboarding.ipAssignment}
                  onChange={() => handleOnboardingChange('ipAssignment')}
                  className="h-5 w-5 text-[#FF6A00] rounded focus:ring-[#FF6A00]"
                />
                <label htmlFor="ip-assignment" className="ml-3 text-gray-700">
                  IP Assignment Agreement
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="confidentiality"
                  checked={onboarding.confidentiality}
                  onChange={() => handleOnboardingChange('confidentiality')}
                  className="h-5 w-5 text-[#FF6A00] rounded focus:ring-[#FF6A00]"
                />
                <label htmlFor="confidentiality" className="ml-3 text-gray-700">
                  Confidentiality Agreement
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="code-of-conduct"
                  checked={onboarding.codeOfConduct}
                  onChange={() => handleOnboardingChange('codeOfConduct')}
                  className="h-5 w-5 text-[#FF6A00] rounded focus:ring-[#FF6A00]"
                />
                <label htmlFor="code-of-conduct" className="ml-3 text-gray-700">
                  Code of Conduct
                </label>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-gray-800 mb-3">Additional Information</h4>
              <textarea
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                placeholder="Add any additional onboarding notes or requirements..."
              ></textarea>
            </div>

            <div className="mt-6 flex space-x-3">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                Save Draft
              </button>
              <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500]">
                Complete Onboarding
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramEnrollment;