import React from 'react';

const TRLScore = () => {
  // Mock data for TRL scores
  const startups = [
    { id: 1, name: "TechNova", trl: 7, stage: "System Prototype Demonstration in Operational Environment" },
    { id: 2, name: "MobileGenius", trl: 6, stage: "Technology Demonstrated in Relevant Environment" },
    { id: 3, name: "EcomPro", trl: 5, stage: "Technology Validated in Relevant Environment" },
    { id: 4, name: "HealthTrack", trl: 8, stage: "Actual System Completed and Qualified" },
    { id: 5, name: "AutoPilot", trl: 7, stage: "System Prototype Demonstration in Operational Environment" },
    { id: 6, name: "GreenEnergy", trl: 6, stage: "Technology Demonstrated in Relevant Environment" }
  ];

  // TRL descriptions
  const trlDescriptions = [
    { level: 1, title: "Basic Principles Observed", description: "Scientific research begins to be translated into applied research and development" },
    { level: 2, title: "Technology Concept Formulated", description: "Invention begins to be formulated and practical applications are identified" },
    { level: 3, title: "Experimental Proof of Concept", description: "Active research and development begins, analytical studies and laboratory studies" },
    { level: 4, title: "Technology Validated in Lab", description: "Basic technological components are integrated to establish that they work together" },
    { level: 5, title: "Technology Validated in Relevant Environment", description: "Fidelity laboratory-scale prototype in simulated environment" },
    { level: 6, title: "Technology Demonstrated in Relevant Environment", description: "Fidelity system prototype demonstrated in simulated operational environment" },
    { level: 7, title: "System Prototype Demonstrated in Operational Environment", description: "Prototype near or at planned operational system demonstrated in operational environment" },
    { level: 8, title: "Actual System Completed and Qualified", description: "Technology completed and qualified through successful mission critical testing" },
    { level: 9, title: "Actual System Proven in Operational Environment", description: "Actual technology completed and qualified through successful mission operations" }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">TRL Score (Technology Readiness Level)</h1>
            <p className="text-gray-600">9-level TRL progress visualization for technology maturity</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]">
              <option>All Startups</option>
              <option>TechNova</option>
              <option>MobileGenius</option>
              <option>HealthTrack</option>
            </select>
            <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
              Export Data
            </button>
          </div>
        </div>
        
        {/* TRL Visualization */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">TRL Progress Visualization</h2>
          <div className="relative">
            {/* TRL Levels */}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              {trlDescriptions.map((trl, index) => (
                <div 
                  key={index} 
                  className={`flex-1 border rounded-2xl p-4 transition-all duration-300 ${
                    startups.some(startup => startup.trl === trl.level) 
                      ? 'border-[#FF6A00] bg-[#FFF9F0]' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      startups.some(startup => startup.trl === trl.level) 
                        ? 'bg-[#FF6A00] text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {trl.level}
                    </div>
                    <h3 className="font-bold text-gray-800">{trl.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{trl.description}</p>
                  
                  {/* Startups at this TRL */}
                  <div className="mt-3">
                    {startups.filter(startup => startup.trl === trl.level).map((startup, idx) => (
                      <div key={idx} className="flex items-center mt-2">
                        <div className="w-2 h-2 bg-[#FF6A00] rounded-full mr-2"></div>
                        <span className="text-sm font-medium">{startup.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Startup TRL Scores */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Startup TRL Scores</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Startup</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">TRL Level</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Stage Description</th>
                  <th className="text-left py-3 px-4 text-gray-700 font-medium">Progress</th>
                </tr>
              </thead>
              <tbody>
                {startups.map((startup) => (
                  <tr key={startup.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">{startup.name}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-[#FF6A00] text-white rounded-full text-sm">
                        TRL {startup.trl}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{startup.stage}</td>
                    <td className="py-4 px-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-[#FF6A00] h-2.5 rounded-full" 
                          style={{ width: `${(startup.trl / 9) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* TRL Distribution */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">TRL Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-3">TRL 5-6 (Validation/Demonstration)</h3>
              <div className="text-3xl font-bold text-[#FF6A00] mb-2">
                {startups.filter(s => s.trl === 5 || s.trl === 6).length}
              </div>
              <p className="text-gray-600">Startups</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {startups.filter(s => s.trl === 5 || s.trl === 6).map((s, i) => (
                  <span key={i} className="bg-white border border-gray-200 rounded-full px-2 py-1 text-xs">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-3">TRL 7-8 (Prototype/Production)</h3>
              <div className="text-3xl font-bold text-[#FF6A00] mb-2">
                {startups.filter(s => s.trl === 7 || s.trl === 8).length}
              </div>
              <p className="text-gray-600">Startups</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {startups.filter(s => s.trl === 7 || s.trl === 8).map((s, i) => (
                  <span key={i} className="bg-white border border-gray-200 rounded-full px-2 py-1 text-xs">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-3">TRL 1-4 (Research/Development)</h3>
              <div className="text-3xl font-bold text-[#FF6A00] mb-2">
                {startups.filter(s => s.trl <= 4).length}
              </div>
              <p className="text-gray-600">Startups</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {startups.filter(s => s.trl <= 4).map((s, i) => (
                  <span key={i} className="bg-white border border-gray-200 rounded-full px-2 py-1 text-xs">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TRLScore;