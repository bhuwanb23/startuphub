import React from 'react';
import SkillCard from '../shared/SkillCard';

const TeamEvaluation = ({ data }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Team Evaluation System</h2>
      <p className="text-gray-600">Founder backgrounds, skills, and team cohesion analysis</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.founders.map((founder, index) => (
        <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div className="ml-4">
              <h3 className="font-bold text-gray-800">{founder.name}</h3>
              <p className="text-sm text-gray-600">{founder.role}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Experience</span>
              <span className="font-medium">{founder.experience} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Score</span>
              <span className="font-medium text-[#FF6A00]">{founder.score}/100</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FF6A00]"
                style={{ width: `${founder.score}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SkillCard title="Technical Skills" score={data.skillMatrix.technical} />
      <SkillCard title="Business Acumen" score={data.skillMatrix.business} />
      <SkillCard title="Leadership" score={data.skillMatrix.leadership} />
    </div>
    
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-800 mb-4">Team Cohesion Score</h3>
      <div className="flex items-center justify-center py-4">
        <div className="relative">
          <div className="w-40 h-40 rounded-full border-8 border-[#FFF5EB] flex items-center justify-center">
            <div className="text-3xl font-bold text-[#FF6A00]">{data.cohesion}/100</div>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-600 mt-2">
        Strong team dynamics and complementary skills
      </div>
    </div>
  </div>
);

export default TeamEvaluation;