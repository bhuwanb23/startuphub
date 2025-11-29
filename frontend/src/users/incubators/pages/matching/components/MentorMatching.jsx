import React, { useState } from 'react';

const MentorMatching = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState('');

  // Mock data for skills-based matching
  const skillsMatching = [
    {
      id: 1,
      startup: 'TechFlow Inc.',
      mentor: 'Sarah Johnson',
      skills: ['Product Development', 'Scaling Operations', 'Fundraising'],
      matchPercentage: 92,
      mentorExpertise: 'CTO at ScaleUp Corp, 15+ years in tech'
    },
    {
      id: 2,
      startup: 'EcoPack Solutions',
      mentor: 'Michael Chen',
      skills: ['Sustainability', 'Supply Chain', 'Regulatory Compliance'],
      matchPercentage: 87,
      mentorExpertise: 'Former Head of Sustainability at GreenTech Inc.'
    },
    {
      id: 3,
      startup: 'HealthTrack Pro',
      mentor: 'Dr. Emily Rodriguez',
      skills: ['Healthcare Regulations', 'Medical Device Development', 'Clinical Trials'],
      matchPercentage: 95,
      mentorExpertise: 'MD, Former Director of R&D at MediCorp'
    }
  ];

  // Mock data for gap-based mentor needs
  const gapBasedNeeds = [
    {
      id: 1,
      startup: 'TechFlow Inc.',
      gaps: ['Business Strategy', 'Market Expansion'],
      recommendedMentors: ['Robert Kim', 'Jennifer Walsh']
    },
    {
      id: 2,
      startup: 'EcoPack Solutions',
      gaps: ['Financial Planning', 'Partnership Development'],
      recommendedMentors: ['David Park', 'Lisa Thompson']
    },
    {
      id: 3,
      startup: 'HealthTrack Pro',
      gaps: ['Regulatory Compliance', 'Clinical Validation'],
      recommendedMentors: ['Dr. James Wilson', 'Dr. Maria Garcia']
    }
  ];

  // Mock data for mentor availability
  const availabilityData = [
    { date: '2023-06-01', availability: 80 },
    { date: '2023-06-02', availability: 60 },
    { date: '2023-06-03', availability: 40 },
    { date: '2023-06-04', availability: 90 },
    { date: '2023-06-05', availability: 30 },
    { date: '2023-06-06', availability: 70 },
    { date: '2023-06-07', availability: 50 },
    { date: '2023-06-08', availability: 85 },
    { date: '2023-06-09', availability: 95 },
    { date: '2023-06-10', availability: 45 }
  ];

  // Mock mentors for dropdown
  const mentors = [
    'Sarah Johnson',
    'Michael Chen',
    'Dr. Emily Rodriguez',
    'Robert Kim',
    'Jennifer Walsh',
    'David Park',
    'Lisa Thompson',
    'Dr. James Wilson',
    'Dr. Maria Garcia'
  ];

  // Mock startups for dropdown
  const startups = [
    'TechFlow Inc.',
    'EcoPack Solutions',
    'HealthTrack Pro',
    'FinSecure Systems',
    'AgriTech Dynamics'
  ];

  return (
    <div className="space-y-6">
      {/* Header with buttons */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mentor Matching Dashboard</h1>
            <p className="text-gray-600">Skills-based mentor matching for startups</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button 
              className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05d00] transition-colors flex items-center"
              onClick={() => setShowAssignModal(true)}
            >
              <span className="mr-2">+</span> Assign Mentor
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <span className="mr-2">⚡</span> AI Recommendations
            </button>
          </div>
        </div>
      </div>

      {/* Skills-Based Matching */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Skills-Based Matching</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillsMatching.map((match) => (
            <div key={match.id} className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-800">{match.startup}</h3>
                <div className="bg-[#FF6A00] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {match.matchPercentage}%
                </div>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">Matched Mentor: <span className="font-medium">{match.mentor}</span></p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {match.skills.map((skill, index) => (
                    <span key={index} className="bg-[#FFF9F0] text-[#FF6A00] text-xs px-2 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium">Mentor Expertise:</p>
                <p>{match.mentorExpertise}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gap-Based Mentor Needs */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Gap-Based Mentor Needs</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Startup</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Identified Gaps</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Recommended Mentors</th>
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {gapBasedNeeds.map((need) => (
                <tr key={need.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium">{need.startup}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {need.gaps.map((gap, index) => (
                        <span key={index} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          {gap}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {need.recommendedMentors.map((mentor, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {mentor}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-[#FF6A00] hover:text-[#e05d00] text-sm font-medium">
                      Assign Mentor
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mentor Availability Tracker */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Mentor Availability Tracker</h2>
        <div className="grid grid-cols-5 gap-2">
          {availabilityData.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-500 mb-1">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className="text-xs text-gray-500 mb-2">{new Date(day.date).getDate()}</div>
              <div 
                className="w-full h-8 rounded-lg mx-auto"
                style={{
                  background: `linear-gradient(to top, #FF6A00 ${day.availability}%, #FFE5B4 ${day.availability}%)`
                }}
              ></div>
              <div className="text-xs mt-1 text-gray-600">{day.availability}%</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center mr-4">
            <div className="w-4 h-4 bg-[#FF6A00] rounded mr-2"></div>
            <span className="text-xs text-gray-600">High Availability</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#FFE5B4] rounded mr-2"></div>
            <span className="text-xs text-gray-600">Low Availability</span>
          </div>
        </div>
      </div>

      {/* Assign/Reassign Mentor Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Assign Mentor</h3>
              <button 
                onClick={() => setShowAssignModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Startup</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  value={selectedStartup}
                  onChange={(e) => setSelectedStartup(e.target.value)}
                >
                  <option value="">Choose a startup</option>
                  {startups.map((startup, index) => (
                    <option key={index} value={startup}>{startup}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Mentor</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]">
                  <option value="">Choose a mentor</option>
                  {mentors.map((mentor, index) => (
                    <option key={index} value={mentor}>{mentor}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">AI Suggestions</label>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#FFF9F0] text-[#FF6A00] text-xs px-2 py-1 rounded-full">
                    Sarah Johnson (92% match)
                  </span>
                  <span className="bg-[#FFF9F0] text-[#FF6A00] text-xs px-2 py-1 rounded-full">
                    Dr. Emily Rodriguez (88% match)
                  </span>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  onClick={() => setShowAssignModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05d00] transition-colors">
                  Assign Mentor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorMatching;