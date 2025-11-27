import React from 'react';

const AISuggestedStartupsPanel = () => {
  // Mock data
  const suggestedStartups = [
    {
      id: 1,
      name: "MediScan AI",
      sector: "Healthcare",
      problemStatement: "Early detection of diseases using AI-powered medical imaging",
      mentorFitScore: 94,
      logo: "M"
    },
    {
      id: 2,
      name: "EcoCharge",
      sector: "Clean Energy",
      problemStatement: "Portable solar charging solutions for remote areas",
      mentorFitScore: 89,
      logo: "E"
    },
    {
      id: 3,
      name: "SmartFarm",
      sector: "Agriculture",
      problemStatement: "IoT-based precision farming for small-scale farmers",
      mentorFitScore: 92,
      logo: "S"
    },
    {
      id: 4,
      name: "LearnVR",
      sector: "Education",
      problemStatement: "Immersive virtual reality learning experiences",
      mentorFitScore: 87,
      logo: "L"
    },
    {
      id: 5,
      name: "SecureChain",
      sector: "Cybersecurity",
      problemStatement: "Blockchain-based identity verification system",
      mentorFitScore: 91,
      logo: "S"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">AI-Suggested Startups</h2>
        <button className="text-[#FF6A00] hover:text-[#FF8C42] font-medium text-sm">View All</button>
      </div>

      <div className="flex overflow-x-auto pb-4 -mx-2 px-2">
        {suggestedStartups.map((startup) => (
          <div key={startup.id} className="flex-shrink-0 w-72 bg-gradient-to-br from-[#FFF9F0] to-white rounded-xl p-5 mx-2 border border-[#FFF2DC] hover:shadow-md transition-all">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-[#FF6A00] flex items-center justify-center text-white font-bold text-lg">
                {startup.logo}
              </div>
              <div className="ml-3">
                <h3 className="font-bold text-gray-800">{startup.name}</h3>
                <span className="text-xs px-2 py-1 bg-[#FFF2DC] text-[#FF6A00] rounded-full">
                  {startup.sector}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
              {startup.problemStatement}
            </p>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 text-sm">Mentor Fit</span>
                <span className="text-[#FF6A00] font-medium">{startup.mentorFitScore}%</span>
              </div>
              <div className="w-full bg-[#FFF2DC] rounded-full h-2">
                <div 
                  className="bg-[#FF6A00] h-2 rounded-full" 
                  style={{ width: `${startup.mentorFitScore}%` }}
                ></div>
              </div>
            </div>
            
            <button className="w-full py-2 bg-white border border-[#FF6A00] text-[#FF6A00] rounded-lg hover:bg-[#FFF2DC] transition-colors font-medium">
              Review Match
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AISuggestedStartupsPanel;