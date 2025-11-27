import React from 'react';

const OverviewSnapshotCard = () => {
  // Mock data
  const mentorData = {
    name: "Dr. Sarah Johnson",
    domainTags: ["AI", "Healthcare", "FinTech"],
    totalStartupsMentored: 24,
    avgSessionRating: 4.8,
    impactScore: 92,
    hoursVolunteered: 142
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC] hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Overview Snapshot</h2>
          <p className="text-gray-600 text-sm">Welcome back, {mentorData.name}</p>
        </div>
        <div className="bg-[#FFF2DC] rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {mentorData.domainTags.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-[#FFF2DC] text-[#FF6A00] rounded-full text-sm font-medium">
            {tag}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#FFF9F0] rounded-xl p-4">
          <p className="text-gray-600 text-sm">Total Startups</p>
          <p className="text-2xl font-bold text-[#FF6A00]">{mentorData.totalStartupsMentored}</p>
        </div>
        <div className="bg-[#FFF9F0] rounded-xl p-4">
          <p className="text-gray-600 text-sm">Avg. Rating</p>
          <p className="text-2xl font-bold text-[#FF6A00]">{mentorData.avgSessionRating}/5</p>
        </div>
        <div className="bg-[#FFF9F0] rounded-xl p-4">
          <p className="text-gray-600 text-sm">Impact Score</p>
          <p className="text-2xl font-bold text-[#FF6A00]">{mentorData.impactScore}%</p>
        </div>
        <div className="bg-[#FFF9F0] rounded-xl p-4">
          <p className="text-gray-600 text-sm">Hours Volunteered</p>
          <p className="text-2xl font-bold text-[#FF6A00]">{mentorData.hoursVolunteered}</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewSnapshotCard;