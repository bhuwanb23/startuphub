import React, { useState } from 'react';

const CoFoundersExperts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');

  const experts = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Senior Research Scientist',
      domain: 'Biotechnology',
      skills: ['Genomics', 'Bioinformatics', 'Machine Learning'],
      experience: '12 years',
      alignmentScore: 94,
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      title: 'AI Research Director',
      domain: 'Computer Science',
      skills: ['Deep Learning', 'Computer Vision', 'NLP'],
      experience: '18 years',
      alignmentScore: 89,
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Dr. Elena Rodriguez',
      title: 'Materials Engineer',
      domain: 'Materials Science',
      skills: ['Nanotechnology', 'Polymers', 'Sustainability'],
      experience: '10 years',
      alignmentScore: 92,
      avatar: 'ER'
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      title: 'Quantum Physicist',
      domain: 'Physics',
      skills: ['Quantum Computing', 'Algorithms', 'Cryptography'],
      experience: '15 years',
      alignmentScore: 87,
      avatar: 'JW'
    },
    {
      id: 5,
      name: 'Dr. Priya Sharma',
      title: 'Robotics Engineer',
      domain: 'Mechanical Engineering',
      skills: ['Control Systems', 'AI Integration', 'Prototyping'],
      experience: '9 years',
      alignmentScore: 91,
      avatar: 'PS'
    },
    {
      id: 6,
      name: 'Dr. Robert Kim',
      title: 'Data Scientist',
      domain: 'Statistics',
      skills: ['Predictive Modeling', 'Big Data', 'Visualization'],
      experience: '11 years',
      alignmentScore: 88,
      avatar: 'RK'
    }
  ];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         expert.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill === 'all' || expert.skills.includes(selectedSkill);
    const matchesDomain = selectedDomain === 'all' || expert.domain === selectedDomain;
    return matchesSearch && matchesSkill && matchesDomain;
  });

  const skills = ['all', ...new Set(experts.flatMap(e => e.skills))];
  const domains = ['all', ...new Set(experts.map(e => e.domain))];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">👥 Co-Founders & Technical Experts</h1>
      
      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search experts by name or title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              {domains.map(domain => (
                <option key={domain} value={domain}>
                  {domain === 'all' ? 'All Domains' : domain}
                </option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              {skills.map(skill => (
                <option key={skill} value={skill}>
                  {skill === 'all' ? 'All Skills' : skill}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperts.map((expert) => (
          <div key={expert.id} className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl">
                {expert.avatar}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
                <p className="text-orange-600 font-medium">{expert.title}</p>
                <p className="text-sm text-gray-500">{expert.domain}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">{expert.experience} of experience</p>
              <div className="flex flex-wrap gap-1">
                {expert.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Skill Alignment Score</span>
                <span className="font-medium">{expert.alignmentScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full" 
                  style={{ width: `${expert.alignmentScore}%` }}
                ></div>
              </div>
            </div>
            
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium transition duration-150 ease-in-out">
              Invite to Research Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoFoundersExperts;