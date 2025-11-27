import React, { useState } from 'react';

const RecognitionBadges = () => {
  const [timeFilter, setTimeFilter] = useState('all-time');

  const badges = [
    { id: 1, name: 'Gold Mentor', description: 'Awarded for exceptional mentoring over 100 hours', icon: '🥇', earned: true, date: '2023-01-15' },
    { id: 2, name: 'DeepTech Expert', description: 'Recognized for expertise in DeepTech mentoring', icon: '🔬', earned: true, date: '2023-03-22' },
    { id: 3, name: 'Impact Leader', description: 'Achieved significant startup growth metrics', icon: '🚀', earned: true, date: '2023-05-10' },
    { id: 4, name: 'Innovation Catalyst', description: 'Helped startups file 5+ patents', icon: '💡', earned: false, progress: 80 },
    { id: 5, name: 'Community Builder', description: 'Facilitated 10+ cross-startup collaborations', icon: '🤝', earned: false, progress: 45 },
    { id: 6, name: 'Investor Connector', description: 'Connected startups with 15+ investors', icon: '💼', earned: false, progress: 65 }
  ];

  const certifications = [
    { id: 1, name: 'Advanced Mentoring Techniques', issuer: 'StartupHub Academy', date: '2023-02-15', expiry: '2024-02-15' },
    { id: 2, name: 'AI/ML Industry Expert', issuer: 'TechEdge Institute', date: '2023-04-10', expiry: '2024-04-10' },
    { id: 3, name: 'Startup Finance Mastery', issuer: 'Venture Capital Academy', date: '2023-06-05', expiry: '2024-06-05' }
  ];

  const earnedBadges = badges.filter(badge => badge.earned);
  const inProgressBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Recognition & Badges</h2>
        <div className="flex space-x-2">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00] text-sm"
          >
            <option value="last-month">Last Month</option>
            <option value="last-quarter">Last Quarter</option>
            <option value="all-time">All Time</option>
          </select>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Earned Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {earnedBadges.map((badge) => (
            <div key={badge.id} className="bg-gradient-to-br from-[#FFF9F0] to-[#FFECD1] rounded-xl p-5 border border-[#FFD580]">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">{badge.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-800">{badge.name}</h4>
                  <p className="text-xs text-gray-600">{badge.date}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">In Progress Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {inProgressBadges.map((badge) => (
            <div key={badge.id} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3 opacity-50">{badge.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-800">{badge.name}</h4>
                  <p className="text-xs text-gray-500">In Progress</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-600">Progress</span>
                  <span className="text-xs font-medium text-gray-800">{badge.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]"
                    style={{ width: `${badge.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Level Progress</h3>
        <div className="bg-[#FFF9F0] rounded-xl p-5">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-800">Mentor Level: Expert</span>
            <span className="font-medium text-gray-800">Level 5 of 10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div 
              className="h-4 rounded-full bg-gradient-to-r from-[#FF6A00] to-[#FF8C42]"
              style={{ width: '50%' }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>0 XP</span>
            <span>5,000 XP</span>
            <span>10,000 XP</span>
          </div>
          <div className="mt-4 text-sm text-gray-700">
            <p>Earn 2,500 more XP to reach the next level. Complete 3 more mentoring sessions to earn 1,500 XP.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start mb-3">
                <div className="bg-[#FF6A00] text-white rounded-lg p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{cert.name}</h4>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                </div>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p><span className="font-medium">Issued:</span> {cert.date}</p>
                <p><span className="font-medium">Expires:</span> {cert.expiry}</p>
              </div>
              <button className="mt-3 w-full py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors text-sm font-medium">
                View Certificate
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecognitionBadges;