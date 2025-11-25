import React, { useState } from 'react';

const MentorMatching = () => {
  const [matches, setMatches] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Williams',
      expertise: 'AI & Machine Learning',
      company: 'TechGlobal Inc.',
      experience: '15 years',
      rating: 4.8,
      compatibility: 92,
      matchReason: 'PhD in Computer Science, 5+ years mentoring AI startups',
    },
    {
      id: 2,
      name: 'Michael Chen',
      expertise: 'Product Development',
      company: 'InnovateX',
      experience: '12 years',
      rating: 4.6,
      compatibility: 87,
      matchReason: 'Successfully launched 3 AI products, strong in scaling teams',
    },
    {
      id: 3,
      name: 'Priya Sharma',
      expertise: 'Business Strategy',
      company: 'VenturePath',
      experience: '10 years',
      rating: 4.9,
      compatibility: 85,
      matchReason: 'Former COO of two unicorn startups, specializes in growth',
    },
  ]);

  const [selectedMentor, setSelectedMentor] = useState(null);

  const handleConnect = (mentor) => {
    alert(`Connection request sent to ${mentor.name}!`);
  };

  const handleViewProfile = (mentor) => {
    setSelectedMentor(mentor);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Mentor Matching</h1>
        <p className="text-gray-600 mt-1">AI-powered mentor recommendations based on your startup profile</p>
      </div>

      {/* AI Recommendation Summary */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Recommendation</h2>
            <p className="text-gray-700 mt-1">
              Based on your startup's focus on AI-powered solutions and team size of 8 members, 
              we've identified mentors with strong expertise in scaling technology teams and 
              navigating enterprise sales cycles.
            </p>
          </div>
        </div>
      </div>

      {/* Mentor Matches */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((mentor) => (
          <div key={mentor.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#FF8C42]/30 transition-all shadow-sm hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{mentor.name}</h3>
                <p className="text-[#FF6A00] font-medium">{mentor.expertise}</p>
                <p className="text-sm text-gray-600 mt-1">{mentor.company}</p>
              </div>
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-bold">{mentor.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FF6A00] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{mentor.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Experience: {mentor.experience}</span>
                <span>Compatibility</span>
              </div>
              <div className="mt-1 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full" 
                    style={{ width: `${mentor.compatibility}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-bold text-[#FF6A00]">{mentor.compatibility}%</span>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Why recommended:</span> {mentor.matchReason}
              </p>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => handleConnect(mentor)}
                className="flex-1 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
              >
                Connect
              </button>
              <button
                onClick={() => handleViewProfile(mentor)}
                className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Request New Match */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Request Custom Match</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry Focus
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]">
              <option>AI & Machine Learning</option>
              <option>FinTech</option>
              <option>HealthTech</option>
              <option>E-Commerce</option>
              <option>Clean Energy</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specific Expertise
            </label>
            <input
              type="text"
              placeholder="e.g., Scaling teams, Fundraising, Product..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Requirements
            </label>
            <textarea
              rows={3}
              placeholder="Any specific requirements or preferences for your mentor..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg">
            Request Match
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorMatching;