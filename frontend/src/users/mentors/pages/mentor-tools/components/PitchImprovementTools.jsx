import React, { useState } from 'react';

const PitchImprovementTools = () => {
  const [uploaded, setUploaded] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const mockAnalysis = {
    overallScore: 85,
    strengths: [
      "Clear problem statement",
      "Strong market opportunity",
      "Experienced founding team"
    ],
    improvements: [
      "Add more specific financial projections",
      "Clarify competitive differentiation",
      "Include customer testimonials"
    ],
    suggestions: [
      "Start with a compelling hook in the first 30 seconds",
      "Use data visualization to show market size",
      "End with a clear call-to-action"
    ]
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    setUploaded(true);
    setAnalysis(mockAnalysis);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pitch Improvement Tools</h2>
        <p className="text-gray-600">AI-powered pitch deck analyzer with real-time feedback</p>
      </div>

      {!uploaded ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-[#FFF9F0] rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Upload Your Pitch Deck</h3>
          <p className="text-gray-600 mb-4">Upload a PDF of your pitch deck for AI analysis</p>
          <form onSubmit={handleFileUpload}>
            <div className="flex justify-center">
              <label className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors cursor-pointer">
                <span>Select File</span>
                <input type="file" className="hidden" accept=".pdf,.ppt,.pptx" />
              </label>
              <button 
                type="submit"
                className="ml-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Analyze Pitch
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/3">
              <div className="bg-[#FFF9F0] rounded-xl p-5 border border-[#FFDAB9]">
                <h3 className="font-bold text-gray-800 mb-4">Overall Pitch Score</h3>
                <div className="text-center">
                  <div className="relative inline-block">
                    <svg className="w-32 h-32" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#FF6A00"
                        strokeWidth="3"
                        strokeDasharray={`${analysis.overallScore}, 100`}
                      />
                      <text x="18" y="20.5" textAnchor="middle" fill="#FF6A00" fontSize="8" fontWeight="bold">
                        {analysis.overallScore}%
                      </text>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {analysis.overallScore >= 80 ? 'Excellent pitch!' : 
                     analysis.overallScore >= 60 ? 'Good pitch with room for improvement' : 
                     'Needs significant improvements'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-bold text-green-800 mb-3">Strengths</h4>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mt-1 mr-2 text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-green-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <h4 className="font-bold text-yellow-800 mb-3">Areas for Improvement</h4>
                  <ul className="space-y-2">
                    {analysis.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mt-1 mr-2 text-yellow-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-sm text-yellow-700">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-200 mb-6">
            <h3 className="font-bold text-blue-800 mb-3">AI Suggestions</h3>
            <ul className="space-y-3">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <div className="mt-1 mr-3 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                  <span className="text-blue-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-between">
            <button 
              onClick={() => setUploaded(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Upload Another Deck
            </button>
            <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors">
              Generate Improvement Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PitchImprovementTools;