import React, { useState } from 'react';

const FindCoFounders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    expertise: 'all',
    experience: 'all',
    location: 'all',
  });
  
  // Mock data for co-founders
  const coFounders = [
    {
      id: 1,
      name: 'Alex Thompson',
      avatar: '👨‍💼',
      expertise: 'Product Management',
      experience: '8 years',
      location: 'San Francisco, CA',
      previousStartups: 3,
      fundingRaised: '$12M',
      skills: ['Product Strategy', 'Go-to-Market', 'User Research'],
      availability: 'Immediate',
      matchScore: 94,
      tags: ['SaaS', 'B2B', 'Scale-up'],
    },
    {
      id: 2,
      name: 'Priya Sharma',
      avatar: '👩‍💼',
      expertise: 'Engineering',
      experience: '10 years',
      location: 'New York, NY',
      previousStartups: 2,
      fundingRaised: '$8M',
      skills: ['Full-stack Development', 'Cloud Architecture', 'DevOps'],
      availability: '2 weeks',
      matchScore: 89,
      tags: ['Tech Lead', 'CTO', 'Scalability'],
    },
    {
      id: 3,
      name: 'Marcus Johnson',
      avatar: '👨‍💼',
      expertise: 'Sales & Marketing',
      experience: '12 years',
      location: 'Austin, TX',
      previousStartups: 4,
      fundingRaised: '$25M',
      skills: ['Sales Strategy', 'Customer Success', 'Brand Building'],
      availability: '1 month',
      matchScore: 87,
      tags: ['Enterprise Sales', 'B2B', 'Growth'],
    },
    {
      id: 4,
      name: 'Sophie Chen',
      avatar: '👩‍💼',
      expertise: 'Finance & Operations',
      experience: '9 years',
      location: 'Boston, MA',
      previousStartups: 3,
      fundingRaised: '$18M',
      skills: ['Financial Planning', 'Fundraising', 'Operations'],
      availability: 'Immediate',
      matchScore: 85,
      tags: ['CFO', 'Fundraising', 'Scaling'],
    },
  ];

  const expertiseAreas = ['all', 'Product Management', 'Engineering', 'Sales & Marketing', 'Finance & Operations'];
  const experienceLevels = ['all', '0-5 years', '5-10 years', '10-15 years', '15+ years'];
  const locations = ['all', 'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Boston, MA'];

  const filteredCoFounders = coFounders.filter(cofounder => {
    const matchesSearch = cofounder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cofounder.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cofounder.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesExpertise = selectedFilters.expertise === 'all' || cofounder.expertise === selectedFilters.expertise;
    const matchesExperience = selectedFilters.experience === 'all' || cofounder.experience.includes(selectedFilters.experience);
    const matchesLocation = selectedFilters.location === 'all' || cofounder.location.includes(selectedFilters.location);
    
    return matchesSearch && matchesExpertise && matchesExperience && matchesLocation;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Find Co-Founders</h1>
        <p className="text-gray-600 mt-1">Discover potential co-founders with complementary skills</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Match Insight</h2>
            <p className="text-gray-700 mt-1">
              Alex Thompson has a 94% match score with your startup needs. He brings product management expertise 
              and has raised $12M across 3 previous startups. Immediate availability.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search co-founders, expertise, or skills..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedFilters.expertise}
              onChange={(e) => setSelectedFilters({...selectedFilters, expertise: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {expertiseAreas.map(area => (
                <option key={area} value={area}>
                  {area === 'all' ? 'All Expertise' : area}
                </option>
              ))}
            </select>
            
            <select
              value={selectedFilters.experience}
              onChange={(e) => setSelectedFilters({...selectedFilters, experience: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {experienceLevels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Experience' : level}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Co-Founders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCoFounders.map((cofounder) => (
          <div key={cofounder.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="text-4xl mr-4">{cofounder.avatar}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{cofounder.name}</h3>
                  <p className="text-[#FF6A00] text-sm font-medium">{cofounder.expertise}</p>
                  <p className="text-gray-600 text-sm">{cofounder.location}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#FF6A00]">{cofounder.matchScore}%</div>
                <div className="text-sm text-gray-500">Match Score</div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {cofounder.experience}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {cofounder.previousStartups} startups
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {cofounder.fundingRaised} raised
                </span>
              </div>
            </div>
            
            <div className="mt-3">
              <h4 className="text-sm font-semibold text-gray-700">Key Skills</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {cofounder.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-3">
              <h4 className="text-sm font-semibold text-gray-700">Startup Experience</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {cofounder.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium text-gray-700">Availability: </span>
                <span className="text-gray-600">{cofounder.availability}</span>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
                Connect
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Co-Founder Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Co-Founder Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">890+</div>
            <div className="text-sm text-gray-600">Active Co-Founders</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">72%</div>
            <div className="text-sm text-gray-600">Successful Matches</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">$124M</div>
            <div className="text-sm text-gray-600">Total Funding Raised</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">4.8</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindCoFounders;