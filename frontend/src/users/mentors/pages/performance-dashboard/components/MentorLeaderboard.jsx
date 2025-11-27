import React, { useState } from 'react';

const MentorLeaderboard = () => {
  const [filter, setFilter] = useState('overall');
  const [domainFilter, setDomainFilter] = useState('all');

  const mentors = [
    { id: 1, name: 'Alex Morgan', domain: 'AI/ML', impact: 95, feedback: 4.9, progress: 88, hours: 125, avatar: 'AM' },
    { id: 2, name: 'Sarah Johnson', domain: 'HealthTech', impact: 92, feedback: 4.8, progress: 85, hours: 110, avatar: 'SJ' },
    { id: 3, name: 'Michael Chen', domain: 'FinTech', impact: 89, feedback: 4.7, progress: 82, hours: 95, avatar: 'MC' },
    { id: 4, name: 'Emma Rodriguez', domain: 'AgriTech', impact: 87, feedback: 4.6, progress: 78, hours: 88, avatar: 'ER' },
    { id: 5, name: 'David Kim', domain: 'DeepTech', impact: 85, feedback: 4.8, progress: 80, hours: 102, avatar: 'DK' },
    { id: 6, name: 'Priya Sharma', domain: 'AI/ML', impact: 83, feedback: 4.5, progress: 75, hours: 90, avatar: 'PS' },
    { id: 7, name: 'James Wilson', domain: 'HealthTech', impact: 80, feedback: 4.4, progress: 72, hours: 85, avatar: 'JW' },
    { id: 8, name: 'Lisa Zhang', domain: 'FinTech', impact: 78, feedback: 4.6, progress: 70, hours: 78, avatar: 'LZ' }
  ];

  const domains = ['All', 'AI/ML', 'HealthTech', 'FinTech', 'AgriTech', 'DeepTech'];

  const getRankColor = (rank) => {
    if (rank === 1) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (rank === 2) return 'bg-gray-100 text-gray-800 border-gray-300';
    if (rank === 3) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-white text-gray-800 border-gray-200';
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  // Filter mentors based on domain
  const filteredMentors = domainFilter === 'all' 
    ? mentors 
    : mentors.filter(mentor => mentor.domain.toLowerCase() === domainFilter.toLowerCase());

  // Sort mentors based on selected filter
  const sortedMentors = [...filteredMentors].sort((a, b) => {
    switch (filter) {
      case 'impact':
        return b.impact - a.impact;
      case 'feedback':
        return b.feedback - a.feedback;
      case 'progress':
        return b.progress - a.progress;
      case 'hours':
        return b.hours - a.hours;
      default:
        // Overall score calculation
        const aOverall = (a.impact + a.feedback * 20 + a.progress + a.hours / 5) / 4;
        const bOverall = (b.impact + b.feedback * 20 + b.progress + b.hours / 5) / 4;
        return bOverall - aOverall;
    }
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Mentor Leaderboard</h2>
        <div className="flex space-x-2">
          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00] text-sm"
          >
            {domains.map((domain) => (
              <option key={domain} value={domain.toLowerCase()}>{domain}</option>
            ))}
          </select>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00] text-sm"
          >
            <option value="overall">Overall Ranking</option>
            <option value="impact">By Impact</option>
            <option value="feedback">By Feedback</option>
            <option value="progress">By Startup Progress</option>
            <option value="hours">By Hours Contributed</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Startup Progress</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedMentors.map((mentor, index) => {
              const rank = index + 1;
              return (
                <tr key={mentor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRankColor(rank)}`}>
                      {getRankIcon(rank)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-[#FF6A00] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">
                        {mentor.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{mentor.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-[#FFF9F0] text-[#FF6A00] rounded-full text-xs font-medium">
                      {mentor.domain}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-[#FF6A00] h-2 rounded-full"
                          style={{ width: `${mentor.impact}%` }}
                        ></div>
                      </div>
                      <span>{mentor.impact}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {mentor.feedback}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mentor.progress}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#FF6A00]">{mentor.hours} hrs</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-[#FFF9F0] rounded-xl p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Position</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-[#FF6A00] text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mr-4">
              Y
            </div>
            <div>
              <div className="font-bold text-gray-800">You</div>
              <div className="text-sm text-gray-600">Current Rank: #3</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#FF6A00]">87.5%</div>
            <div className="text-sm text-gray-600">Overall Score</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-800">92%</div>
            <div className="text-sm text-gray-600">Impact</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-800">4.8</div>
            <div className="text-sm text-gray-600">Feedback</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorLeaderboard;