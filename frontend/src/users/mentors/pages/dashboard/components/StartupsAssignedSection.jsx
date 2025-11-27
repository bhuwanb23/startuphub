import React from 'react';

const StartupsAssignedSection = () => {
  // Mock data
  const assignedStartups = [
    {
      id: 1,
      logo: "T",
      name: "TechFlow Inc.",
      stage: "Seed",
      nextMeeting: "2023-06-15",
      domain: "AI"
    },
    {
      id: 2,
      logo: "G",
      name: "GreenEnergy Solutions",
      stage: "Series A",
      nextMeeting: "2023-06-18",
      domain: "Clean Energy"
    },
    {
      id: 3,
      logo: "H",
      name: "HealthTrack",
      stage: "Idea",
      nextMeeting: "2023-06-20",
      domain: "Healthcare"
    },
    {
      id: 4,
      logo: "F",
      name: "FinTech Pro",
      stage: "Growth",
      nextMeeting: "2023-06-22",
      domain: "FinTech"
    },
    {
      id: 5,
      logo: "E",
      name: "EduTech Innovations",
      stage: "Seed",
      nextMeeting: "2023-06-25",
      domain: "Education"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">Startups Assigned</h2>
        <button className="text-[#FF6A00] hover:text-[#FF8C42] font-medium text-sm">View All</button>
      </div>

      <div className="flex overflow-x-auto pb-4 -mx-2 px-2">
        {assignedStartups.map((startup) => (
          <div key={startup.id} className="flex-shrink-0 w-64 bg-[#FFF9F0] rounded-xl p-4 mx-2">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-[#FF6A00] flex items-center justify-center text-white font-bold">
                {startup.logo}
              </div>
              <div className="ml-3">
                <h3 className="font-bold text-gray-800">{startup.name}</h3>
                <span className="text-xs px-2 py-1 bg-white rounded-full text-[#FF6A00]">
                  {startup.stage}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">Domain: {startup.domain}</p>
            <p className="text-sm text-gray-600 mb-3">Next meeting: {startup.nextMeeting}</p>
            <button className="w-full py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartupsAssignedSection;