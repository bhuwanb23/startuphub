import React from 'react';

const MentorFitScore = ({ startup }) => {
  // Mock data for mentor fit score
  const fitScore = 92;
  
  const fitFactors = [
    { name: 'Expertise Match', value: 95 },
    { name: 'Prior Success', value: 88 },
    { name: 'Domain Overlap', value: 90 },
    { name: 'Industry Insights', value: 94 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Mentor Fit Score</h2>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i}
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 ${i < Math.floor(fitScore / 20) ? 'text-yellow-400' : 'text-gray-300'}`}
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-[#FFF2DC] flex items-center justify-center">
            <div className="text-center">
              <span className="text-2xl font-bold text-[#FF6A00]">{fitScore}%</span>
              <p className="text-gray-600 text-xs">AI Fit Score</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-[#FF6A00] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.312 6.26l-2.01 2.01a1 1 0 01-1.415 0l-1.005-1.005a1 1 0 00-1.415 1.415l1.005 1.005a3 3 0 004.242 0l2.01-2.01a1 1 0 10-1.414-1.414zm-4.242 8.486a1 1 0 011.415 0l1.005 1.005a1 1 0 001.415-1.415l-1.005-1.005a3 3 0 00-4.242 0l-2.01 2.01a1 1 0 101.414 1.414l2.01-2.01z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {fitFactors.map((factor, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-gray-700 text-sm">{factor.name}</span>
              <span className="text-[#FF6A00] font-medium">{factor.value}%</span>
            </div>
            <div className="w-full bg-[#FFF2DC] rounded-full h-2">
              <div 
                className="bg-[#FF6A00] h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${factor.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full py-2 bg-[#FFF2DC] text-[#FF6A00] rounded-lg hover:bg-[#FF6A00] hover:text-white transition-colors font-medium text-sm">
          View Detailed Explanation
        </button>
      </div>
    </div>
  );
};

export default MentorFitScore;