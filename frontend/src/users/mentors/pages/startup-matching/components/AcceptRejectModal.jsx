import React from 'react';

const AcceptRejectModal = ({ startup, isOpen, onClose, onAccept, onReject }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Match Request</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {startup && (
            <>
              <div className="flex items-center mb-6 p-4 bg-[#FFF9F0] rounded-lg">
                <div className="w-16 h-16 rounded-full bg-[#FF6A00] flex items-center justify-center text-white font-bold text-xl">
                  {startup.logo}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-800">{startup.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-[#FFF2DC] text-[#FF6A00] rounded-full text-sm">
                      {startup.sector}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {startup.stage}
                    </span>
                    <div className="bg-gradient-to-r from-[#FF6A00] to-[#FF8C42] rounded-full px-3 py-1 flex items-center">
                      <span className="text-white font-bold text-sm">AI Score: {startup.mentorFitScore}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2">Problem Statement</h4>
                <p className="text-gray-600">
                  {startup.problemStatement || "This startup is working on solving a critical problem in their industry by leveraging innovative technology and business models."}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-3">Why AI Matched You</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-[#FF6A00] rounded-full p-1 mt-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-600">Your expertise in {startup.sector} aligns with their domain needs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#FF6A00] rounded-full p-1 mt-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-600">Your previous success with {startup.stage} startups</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#FF6A00] rounded-full p-1 mt-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-600">Gap analysis shows your skills match their needs</span>
                  </li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => onAccept(startup)}
                  className="flex-1 py-3 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-bold"
                >
                  Accept Match
                </button>
                <button
                  onClick={() => onReject(startup)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-bold"
                >
                  Reject
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcceptRejectModal;