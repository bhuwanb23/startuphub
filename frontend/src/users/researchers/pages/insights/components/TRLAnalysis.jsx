import React, { useState } from 'react';

const TRLAnalysis = () => {
  const [currentTRL, setCurrentTRL] = useState(6);
  
  // TRL definitions
  const trlLevels = [
    {
      level: 1,
      title: 'Basic Principles Observed',
      description: 'Scientific report or publication validates the underlying principles',
      requirements: ['Literature review', 'Theoretical analysis'],
      nextSteps: 'Conduct feasibility study'
    },
    {
      level: 2,
      title: 'Technology Concept Formulated',
      description: 'Practical application of the concept is formulated',
      requirements: ['Conceptual design', 'Initial modeling'],
      nextSteps: 'Develop proof of concept'
    },
    {
      level: 3,
      title: 'Experimental Proof of Concept',
      description: 'Laboratory studies validate analytical studies',
      requirements: ['Laboratory experiments', 'Proof of concept prototype'],
      nextSteps: 'Validate in laboratory environment'
    },
    {
      level: 4,
      title: 'Technology Validated in Lab',
      description: 'Basic technological components integrated in laboratory setting',
      requirements: ['Lab-scale integration', 'Component testing'],
      nextSteps: 'Test in relevant environment'
    },
    {
      level: 5,
      title: 'Technology Validated in Relevant Environment',
      description: 'Technology tested in environment similar to intended application',
      requirements: ['Field testing', 'Environmental validation'],
      nextSteps: 'Develop system prototype'
    },
    {
      level: 6,
      title: 'Technology Demonstrated in Relevant Environment',
      description: 'System prototype demonstrated in relevant environment',
      requirements: ['Prototype development', 'Performance testing'],
      nextSteps: 'Prepare for actual system demonstration'
    },
    {
      level: 7,
      title: 'System Prototype Demonstration in Operational Environment',
      description: 'Prototype near or at planned operational system demonstrated',
      requirements: ['Operational testing', 'System integration'],
      nextSteps: 'Complete system qualification'
    },
    {
      level: 8,
      title: 'Actual System Completed and Qualified',
      description: 'Actual technology completed and qualified through successful testing',
      requirements: ['Final system testing', 'Certification'],
      nextSteps: 'Begin production'
    },
    {
      level: 9,
      title: 'Actual System Proven in Operational Environment',
      description: 'Actual technology proven during operational use',
      requirements: ['Operational deployment', 'Performance monitoring'],
      nextSteps: 'Scale production and market expansion'
    }
  ];

  // Get current TRL data
  const currentTRLData = trlLevels.find(trl => trl.level === currentTRL);
  
  // Calculate progress percentage for circular meter
  const progressPercentage = (currentTRL / 9) * 100;
  
  // Calculate stroke dasharray for circular progress
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">⚙️ TRL Analysis</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Circular TRL Meter */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Technology Readiness Level</h2>
            
            {/* Circular TRL Meter */}
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 100 100)"
                  />
                  {/* Center text */}
                  <text
                    x="100"
                    y="100"
                    textAnchor="middle"
                    dy="7"
                    fontSize="36"
                    fontWeight="bold"
                    fill="#f97316"
                  >
                    TRL {currentTRL}
                  </text>
                  <text
                    x="100"
                    y="130"
                    textAnchor="middle"
                    fontSize="14"
                    fill="#6b7280"
                  >
                    of 9
                  </text>
                </svg>
              </div>
            </div>
            
            {/* TRL Status */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">{currentTRLData?.title}</h3>
              <p className="text-gray-600 mt-1">{currentTRLData?.description}</p>
            </div>
            
            {/* Progress Indicators */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">TRL Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-orange-500 h-2.5 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>TRL 1</span>
                <span>TRL 9</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle Column - Current TRL Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100 h-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current TRL Requirements</h2>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{currentTRLData?.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Requirements to Maintain TRL {currentTRL}</h3>
              <ul className="space-y-2">
                {currentTRLData?.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span className="text-gray-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">AI Recommendation</h3>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800">
                  <span className="font-semibold">To progress to TRL {currentTRL + 1}:</span> {currentTRLData?.nextSteps}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - TRL Ladder */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">TRL Ladder</h2>
            
            <div className="space-y-4">
              {trlLevels.map((trl) => (
                <div 
                  key={trl.level}
                  className={`border rounded-lg p-4 transition-all duration-150 ${
                    trl.level === currentTRL
                      ? 'border-orange-500 bg-orange-50'
                      : trl.level < currentTRL
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">TRL {trl.level}</h3>
                    {trl.level === currentTRL && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        Current
                      </span>
                    )}
                    {trl.level < currentTRL && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{trl.title}</p>
                </div>
              ))}
            </div>
            
            {/* Checklist for Next Level */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Checklist for TRL {currentTRL + 1}</h3>
              <div className="space-y-2">
                {currentTRLData?.requirements.map((req, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium">
                Mark as Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TRLAnalysis;