import React, { useState } from 'react';

const MentorAssignments = () => {
  const [draggedStartup, setDraggedStartup] = useState(null);

  // Mock data for mentors and startups
  const mentors = [
    { id: 1, name: "Sarah Johnson", expertise: "Product Strategy", startups: [1, 2], avatar: "SJ" },
    { id: 2, name: "Michael Chen", expertise: "Technical Development", startups: [3], avatar: "MC" },
    { id: 3, name: "David Wilson", expertise: "Business Development", startups: [4, 5], avatar: "DW" },
    { id: 4, name: "Emma Rodriguez", expertise: "Marketing & Sales", startups: [6], avatar: "ER" }
  ];

  const startups = [
    { id: 1, name: "TechNova", logo: "🚀", trl: 7, stage: "Growth" },
    { id: 2, name: "MobileGenius", logo: "📱", trl: 6, stage: "Validation" },
    { id: 3, name: "EcomPro", logo: "🛍️", trl: 5, stage: "Validation" },
    { id: 4, name: "HealthTrack", logo: "🏥", trl: 8, stage: "Growth" },
    { id: 5, name: "AutoPilot", logo: "🚗", trl: 7, stage: "Growth" },
    { id: 6, name: "GreenEnergy", logo: "🌱", trl: 6, stage: "Validation" },
    { id: 7, name: "FinTech Solutions", logo: "💳", trl: 7, stage: "Growth" },
    { id: 8, name: "EdTech Pro", logo: "🎓", trl: 5, stage: "Validation" }
  ];

  // AI-suggested matches
  const suggestedMatches = [
    { startupId: 7, mentorId: 2, reason: "Strong technical alignment" },
    { startupId: 8, mentorId: 1, reason: "Product-market fit expertise" }
  ];

  // Get startups assigned to a mentor
  const getMentorStartups = (mentorId) => {
    return startups.filter(startup => 
      mentors.find(mentor => mentor.id === mentorId)?.startups.includes(startup.id)
    );
  };

  // Get unassigned startups
  const getUnassignedStartups = () => {
    const assignedStartupIds = mentors.flatMap(mentor => mentor.startups);
    return startups.filter(startup => !assignedStartupIds.includes(startup.id));
  };

  // Handle drag start
  const handleDragStart = (e, startup) => {
    setDraggedStartup(startup);
    e.dataTransfer.setData("startupId", startup.id);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e, mentorId) => {
    e.preventDefault();
    // In a real app, this would update the assignments
    console.log(`Dropped startup ${draggedStartup?.name} on mentor ${mentorId}`);
    setDraggedStartup(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Mentor Assignments</h1>
        <p className="text-gray-600 mb-6">Drag and drop startups to assign mentors</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Unassigned startups column */}
          <div className="border border-gray-200 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Unassigned Startups</h2>
            <div className="space-y-3">
              {getUnassignedStartups().map((startup) => (
                <div 
                  key={startup.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, startup)}
                  className="flex items-center p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
                >
                  <span className="text-2xl mr-3">{startup.logo}</span>
                  <div>
                    <h3 className="font-medium">{startup.name}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">TRL {startup.trl}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        startup.stage === 'Validation' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {startup.stage}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {getUnassignedStartups().length === 0 && (
                <p className="text-gray-500 text-center py-4">All startups assigned</p>
              )}
            </div>
          </div>
          
          {/* Mentors column */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Mentors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mentors.map((mentor) => (
                <div 
                  key={mentor.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, mentor.id)}
                  className="border border-gray-200 rounded-2xl p-5 hover:border-[#FF6A00] transition-colors"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#FF6A00] rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {mentor.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{mentor.name}</h3>
                      <p className="text-sm text-gray-600">{mentor.expertise}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Assigned Startups</span>
                      <span className="font-medium">{mentor.startups.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#FF6A00] h-2 rounded-full" 
                        style={{ width: `${(mentor.startups.length / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800 text-sm">Assigned Startups:</h4>
                    {getMentorStartups(mentor.id).map((startup) => (
                      <div key={startup.id} className="flex items-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-xl mr-2">{startup.logo}</span>
                        <span className="text-sm">{startup.name}</span>
                      </div>
                    ))}
                    
                    {getMentorStartups(mentor.id).length === 0 && (
                      <p className="text-gray-500 text-sm">No startups assigned</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Suggested Matches */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-xl font-bold text-gray-800 mb-4">AI-Suggested Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedMatches.map((match, index) => {
            const startup = startups.find(s => s.id === match.startupId);
            const mentor = mentors.find(m => m.id === match.mentorId);
            
            return (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{startup?.logo}</span>
                    <div>
                      <h3 className="font-medium">{startup?.name}</h3>
                      <p className="text-sm text-gray-600">{mentor?.name}</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Suggested
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{match.reason}</p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-[#FF6A00] text-white py-1.5 rounded-lg text-sm font-medium hover:bg-[#e05500] transition-colors">
                    Assign
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MentorAssignments;