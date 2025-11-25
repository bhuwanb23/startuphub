import React, { useState } from 'react';

const TeamRoleRecommendations = () => {
  const [recommendations] = useState([
    {
      id: 1,
      role: 'Chief Technology Officer',
      priority: 'High',
      reason: 'As you scale, you need dedicated technical leadership to manage architecture and team growth',
      responsibilities: [
        'Lead technical strategy and roadmap',
        'Manage engineering team (8+ members)',
        'Oversee product architecture',
        'Ensure technical scalability'
      ],
      timeline: 'Immediate',
      cost: '$150K - $250K',
    },
    {
      id: 2,
      role: 'Head of Sales',
      priority: 'High',
      reason: 'With product-market fit achieved, you need dedicated sales leadership to drive revenue growth',
      responsibilities: [
        'Build and lead sales team',
        'Develop sales processes and pipelines',
        'Manage key client relationships',
        'Achieve revenue targets'
      ],
      timeline: '2-3 months',
      cost: '$120K - $200K',
    },
    {
      id: 3,
      role: 'Product Manager',
      priority: 'Medium',
      reason: 'To bridge the gap between technical development and customer needs as product complexity increases',
      responsibilities: [
        'Define product roadmap',
        'Gather and prioritize requirements',
        'Work with engineering and design teams',
        'Conduct user research and feedback analysis'
      ],
      timeline: '3-6 months',
      cost: '$100K - $150K',
    },
  ]);

  const [currentTeam] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Co-Founder & CTO',
      skills: ['React', 'Node.js', 'Cloud Architecture'],
      utilization: 95,
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'Co-Founder & CEO',
      skills: ['Business Strategy', 'Fundraising', 'Leadership'],
      utilization: 85,
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Lead Developer',
      skills: ['Frontend Dev', 'UI/UX', 'Testing'],
      utilization: 90,
    },
    {
      id: 4,
      name: 'Priya Sharma',
      role: 'Data Scientist',
      skills: ['Machine Learning', 'Python', 'Analytics'],
      utilization: 80,
    },
  ]);

  const getPriorityColor = (priority) => {
    if (priority === 'High') return 'bg-red-100 text-red-800';
    if (priority === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const handleHire = (role) => {
    alert(`Initiating hiring process for ${role.role}!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Team Role Recommendations</h1>
        <p className="text-gray-600 mt-1">AI-powered role recommendations based on growth stage and team gaps</p>
      </div>

      {/* AI Recommendation Summary */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Team Analysis</h2>
            <p className="text-gray-700 mt-1">
              Based on your current team utilization (average 88%), growth trajectory, and upcoming product launches, 
              we recommend adding key leadership roles to prevent bottlenecks and enable scalable growth.
            </p>
          </div>
        </div>
      </div>

      {/* Role Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((role) => (
          <div key={role.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#FF8C42]/30 transition-all shadow-sm hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{role.role}</h3>
                <p className="text-sm text-gray-600 mt-1">{role.reason}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(role.priority)}`}>
                {role.priority} Priority
              </span>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-gray-800">Key Responsibilities</h4>
              <ul className="mt-2 space-y-1">
                {role.responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FF8C42]/20 flex items-center justify-center mt-0.5 mr-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></div>
                    </div>
                    <span className="text-sm text-gray-700">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Timeline:</span>
                <span className="ml-1 font-medium">{role.timeline}</span>
              </div>
              <div>
                <span className="text-gray-500">Cost Range:</span>
                <span className="ml-1 font-medium">{role.cost}</span>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => handleHire(role)}
                className="flex-1 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
              >
                Initiate Hiring
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Current Team Utilization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Current Team Utilization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentTeam.map((member) => (
            <div key={member.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-bold">{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-800">{member.name}</h3>
                  <p className="text-sm text-[#FF6A00]">{member.role}</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Utilization</span>
                  <span className="font-medium">{member.utilization}%</span>
                </div>
                <div className="mt-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] h-2 rounded-full"
                    style={{ width: `${member.utilization}%` }}
                  ></div>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-xs text-gray-500">Key Skills</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {member.skills.map((skill, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-[#FFF5E6] text-[#FF6A00] rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hiring Pipeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Hiring Pipeline</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-800">Senior Frontend Engineer</h3>
              <span className="text-sm text-gray-500">In Progress</span>
            </div>
            <div className="mt-2 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#FF6A00] h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="ml-2 text-sm text-gray-600">3 of 5 stages completed</span>
            </div>
            <div className="mt-3 flex space-x-2">
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Technical Interview</span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Team Fit</span>
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Pending</span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-800">DevOps Engineer</h3>
              <span className="text-sm text-gray-500">Scheduled</span>
            </div>
            <div className="mt-2 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#FF6A00] h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
              <span className="ml-2 text-sm text-gray-600">1 of 5 stages completed</span>
            </div>
            <div className="mt-3 flex space-x-2">
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Screening</span>
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">Technical Interview</span>
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">Team Fit</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">AI Insights</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Team Structure Optimization</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Consider creating a dedicated product team to reduce the burden on your CTO and enable faster product iterations.
                </p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Diversity & Inclusion</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Your team currently lacks diversity in technical roles. Consider targeted outreach to underrepresented groups in tech.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamRoleRecommendations;