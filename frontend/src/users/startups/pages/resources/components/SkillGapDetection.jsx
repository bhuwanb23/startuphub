import React, { useState } from 'react';

const SkillGapDetection = () => {
  const [teamSkills] = useState({
    technical: [
      { skill: 'React Development', current: 85, required: 90, gap: 5 },
      { skill: 'Node.js Backend', current: 70, required: 80, gap: 10 },
      { skill: 'Machine Learning', current: 60, required: 75, gap: 15 },
      { skill: 'Cloud Architecture', current: 75, required: 85, gap: 10 },
      { skill: 'DevOps', current: 65, required: 70, gap: 5 },
    ],
    business: [
      { skill: 'Product Management', current: 80, required: 85, gap: 5 },
      { skill: 'Sales & Marketing', current: 55, required: 70, gap: 15 },
      { skill: 'Financial Planning', current: 60, required: 75, gap: 15 },
      { skill: 'Customer Success', current: 70, required: 75, gap: 5 },
    ],
    leadership: [
      { skill: 'Team Leadership', current: 75, required: 80, gap: 5 },
      { skill: 'Strategic Planning', current: 65, required: 80, gap: 15 },
      { skill: 'Change Management', current: 60, required: 70, gap: 10 },
    ],
  });

  const [recommendations] = useState([
    {
      id: 1,
      title: 'Advanced React Training',
      type: 'Course',
      provider: 'TechAcademy',
      duration: '6 weeks',
      cost: '$499',
      impact: 'High',
      description: 'Advanced React patterns and performance optimization',
    },
    {
      id: 2,
      title: 'Sales Fundamentals Workshop',
      type: 'Workshop',
      provider: 'BusinessEdge',
      duration: '2 days',
      cost: '$299',
      impact: 'High',
      description: 'Essential sales techniques for startup founders',
    },
    {
      id: 3,
      title: 'Machine Learning Specialization',
      type: 'Certification',
      provider: 'DataScience Pro',
      duration: '4 months',
      cost: '$799',
      impact: 'Medium',
      description: 'Comprehensive ML skills for technical team members',
    },
  ]);

  const getGapColor = (gap) => {
    if (gap >= 15) return 'bg-red-500';
    if (gap >= 10) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getImpactColor = (impact) => {
    if (impact === 'High') return 'bg-red-100 text-red-800';
    if (impact === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Skill Gap Detection</h1>
        <p className="text-gray-600 mt-1">AI-powered analysis of team skills and development recommendations</p>
      </div>

      {/* AI Recommendation Summary */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Skill Analysis</h2>
            <p className="text-gray-700 mt-1">
              Based on your product roadmap and growth projections, we've identified critical skill gaps 
              in Sales & Marketing, Strategic Planning, and Machine Learning that could impact your 
              ability to scale effectively.
            </p>
          </div>
        </div>
      </div>

      {/* Skill Gap Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Technical Skills</h2>
          <div className="space-y-4">
            {teamSkills.technical.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-800">{skill.skill}</span>
                  <span className="text-gray-600">{skill.gap}% gap</span>
                </div>
                <div className="mt-1 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full relative"
                      style={{ 
                        width: `${skill.current}%`,
                        background: 'linear-gradient(to right, #FF8C42, #FF6A00)'
                      }}
                    ></div>
                  </div>
                  <div 
                    className={`w-4 h-4 rounded-full -ml-2 ${getGapColor(skill.gap)} border-2 border-white`}
                    title={`Required: ${skill.required}%`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Business Skills</h2>
          <div className="space-y-4">
            {teamSkills.business.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-800">{skill.skill}</span>
                  <span className="text-gray-600">{skill.gap}% gap</span>
                </div>
                <div className="mt-1 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full relative"
                      style={{ 
                        width: `${skill.current}%`,
                        background: 'linear-gradient(to right, #FF8C42, #FF6A00)'
                      }}
                    ></div>
                  </div>
                  <div 
                    className={`w-4 h-4 rounded-full -ml-2 ${getGapColor(skill.gap)} border-2 border-white`}
                    title={`Required: ${skill.required}%`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Leadership Skills</h2>
          <div className="space-y-4">
            {teamSkills.leadership.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-800">{skill.skill}</span>
                  <span className="text-gray-600">{skill.gap}% gap</span>
                </div>
                <div className="mt-1 flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full relative"
                      style={{ 
                        width: `${skill.current}%`,
                        background: 'linear-gradient(to right, #FF8C42, #FF6A00)'
                      }}
                    ></div>
                  </div>
                  <div 
                    className={`w-4 h-4 rounded-full -ml-2 ${getGapColor(skill.gap)} border-2 border-white`}
                    title={`Required: ${skill.required}%`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Development Recommendations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Development Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-800">{rec.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(rec.impact)}`}>
                  {rec.impact} Impact
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{rec.description}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>
                  <span className="font-medium">Type:</span> {rec.type}
                </div>
                <div>
                  <span className="font-medium">Provider:</span> {rec.provider}
                </div>
                <div>
                  <span className="font-medium">Duration:</span> {rec.duration}
                </div>
                <div>
                  <span className="font-medium">Cost:</span> {rec.cost}
                </div>
              </div>
              <button className="mt-4 w-full bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white py-2 rounded-lg text-sm font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg">
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Team Skill Matrix */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Team Skill Matrix</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Member
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Technical Skills
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business Skills
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leadership Skills
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Alex Johnson</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  CTO
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-green-500" title="React (90%)"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500" title="Node.js (80%)"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500" title="ML (60%)"></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-green-500" title="Product Mgmt (85%)"></div>
                    <div className="w-3 h-3 rounded-full bg-red-500" title="Sales (40%)"></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" title="Leadership (70%)"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Sarah Williams</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  CEO
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500" title="React (50%)"></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" title="Sales (65%)"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500" title="Finance (60%)"></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" title="Leadership (75%)"></div>
                    <div className="w-3 h-3 rounded-full bg-red-500" title="Strategy (55%)"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkillGapDetection;