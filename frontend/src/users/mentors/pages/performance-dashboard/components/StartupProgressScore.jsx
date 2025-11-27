import React, { useState } from 'react';

const StartupProgressScore = () => {
  const [selectedStartup, setSelectedStartup] = useState('TechFlow Inc.');

  const startups = [
    { name: 'TechFlow Inc.', progress: 78, preIntervention: 45, postIntervention: 78 },
    { name: 'GreenEnergy Solutions', progress: 65, preIntervention: 30, postIntervention: 65 },
    { name: 'HealthTrack', progress: 82, preIntervention: 50, postIntervention: 82 },
    { name: 'FinTech Startup', progress: 55, preIntervention: 25, postIntervention: 55 }
  ];

  const currentStartup = startups.find(s => s.name === selectedStartup);

  const aiInsights = [
    "Significant improvement in business model clarity (+35%)",
    "Enhanced market positioning strategy",
    "Improved financial projection accuracy",
    "Better understanding of regulatory requirements"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Startup Progress Score</h2>
        <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium text-sm">
          View Improvement Areas
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Startup</label>
        <select
          value={selectedStartup}
          onChange={(e) => setSelectedStartup(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
        >
          {startups.map((startup) => (
            <option key={startup.name} value={startup.name}>{startup.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#FFF9F0] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress Score</h3>
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#FF6A00"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - currentStartup.progress / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#FF6A00]">{currentStartup.progress}</span>
                <span className="text-gray-500 text-sm">out of 100</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Overall Progress Score</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contribution Timeline</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Pre-Intervention</span>
                <span className="text-sm font-medium text-gray-700">{currentStartup.preIntervention}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gray-400 h-2.5 rounded-full"
                  style={{ width: `${currentStartup.preIntervention}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Post-Intervention</span>
                <span className="text-sm font-medium text-gray-700">{currentStartup.postIntervention}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-[#FF6A00] h-2.5 rounded-full"
                  style={{ width: `${currentStartup.postIntervention}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-md font-semibold text-gray-800 mb-2">Progress Trend</h4>
              <div className="h-32 flex items-end justify-between pt-4 border-t border-gray-200">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
                  <div key={month} className="flex flex-col items-center flex-1">
                    <div className="text-gray-600 text-xs mb-1">{month}</div>
                    <div
                      className="w-3/4 bg-[#FF6A00] rounded-t transition-all duration-300"
                      style={{ height: `${20 + index * 10}%` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FFF9F0] rounded-xl p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800">AI-Generated Insights</h3>
          <span className="px-2 py-1 bg-[#FF6A00] text-white text-xs rounded-full">AI</span>
        </div>
        <ul className="space-y-2">
          {aiInsights.map((insight, index) => (
            <li key={index} className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF6A00] mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">{insight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StartupProgressScore;