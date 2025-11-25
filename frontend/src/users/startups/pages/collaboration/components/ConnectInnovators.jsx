import React, { useState } from 'react';

const ConnectInnovators = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    industry: 'all',
    role: 'all',
    location: 'all',
  });
  
  // Mock data for innovators
  const innovators = [
    {
      id: 1,
      name: 'Jennifer Park',
      avatar: '👩‍🚀',
      role: 'Innovation Director',
      industry: 'Healthcare',
      location: 'Chicago, IL',
      company: 'MedTech Innovations',
      innovations: 12,
      patents: 5,
      collaborations: 8,
      rating: 4.9,
      matchScore: 91,
      tags: ['Digital Health', 'AI Diagnostics', 'Telemedicine'],
    },
    {
      id: 2,
      name: 'David Rodriguez',
      avatar: '👨‍🚀',
      role: 'Chief Innovation Officer',
      industry: 'Automotive',
      location: 'Detroit, MI',
      company: 'Future Mobility Inc',
      innovations: 18,
      patents: 9,
      collaborations: 12,
      rating: 4.8,
      matchScore: 87,
      tags: ['Autonomous Vehicles', 'EV Technology', 'Smart Cities'],
    },
    {
      id: 3,
      name: 'Lisa Wang',
      avatar: '👩‍🚀',
      role: 'R&D Lead',
      industry: 'Consumer Electronics',
      location: 'San Jose, CA',
      company: 'TechVision Labs',
      innovations: 15,
      patents: 7,
      collaborations: 6,
      rating: 4.7,
      matchScore: 85,
      tags: ['IoT', 'Wearable Tech', 'Smart Home'],
    },
    {
      id: 4,
      name: 'Robert Kim',
      avatar: '👨‍🚀',
      role: 'Innovation Manager',
      industry: 'Financial Services',
      location: 'New York, NY',
      company: 'FinTech Dynamics',
      innovations: 10,
      patents: 4,
      collaborations: 7,
      rating: 4.6,
      matchScore: 83,
      tags: ['Blockchain', 'Digital Payments', 'RegTech'],
    },
  ];

  const industries = ['all', 'Healthcare', 'Automotive', 'Consumer Electronics', 'Financial Services'];
  const roles = ['all', 'Innovation Director', 'Chief Innovation Officer', 'R&D Lead', 'Innovation Manager'];
  const locations = ['all', 'Chicago, IL', 'Detroit, MI', 'San Jose, CA', 'New York, NY'];

  const filteredInnovators = innovators.filter(innovator => {
    const matchesSearch = innovator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         innovator.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         innovator.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesIndustry = selectedFilters.industry === 'all' || innovator.industry === selectedFilters.industry;
    const matchesRole = selectedFilters.role === 'all' || innovator.role === selectedFilters.role;
    const matchesLocation = selectedFilters.location === 'all' || innovator.location.includes(selectedFilters.location);
    
    return matchesSearch && matchesIndustry && matchesRole && matchesLocation;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Connect with Innovators</h1>
        <p className="text-gray-600 mt-1">Discover and collaborate with industry innovators</p>
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
              Jennifer Park from MedTech Innovations has a 91% match score with your innovation goals. 
              She specializes in digital health and has 5 patents in AI diagnostics.
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
                placeholder="Search innovators, companies, or keywords..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedFilters.industry}
              onChange={(e) => setSelectedFilters({...selectedFilters, industry: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>
                  {industry === 'all' ? 'All Industries' : industry}
                </option>
              ))}
            </select>
            
            <select
              value={selectedFilters.role}
              onChange={(e) => setSelectedFilters({...selectedFilters, role: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {roles.map(role => (
                <option key={role} value={role}>
                  {role === 'all' ? 'All Roles' : role}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Innovators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInnovators.map((innovator) => (
          <div key={innovator.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="text-4xl mr-4">{innovator.avatar}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{innovator.name}</h3>
                  <p className="text-[#FF6A00] text-sm font-medium">{innovator.role}</p>
                  <p className="text-gray-600 text-sm">{innovator.company}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-bold text-gray-800">{innovator.rating}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">Match: {innovator.matchScore}%</div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {innovator.industry}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {innovator.location}
                </span>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                {innovator.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="p-2 border border-gray-200 rounded-lg">
                <div className="text-lg font-bold text-[#FF6A00]">{innovator.innovations}</div>
                <div className="text-xs text-gray-600">Innovations</div>
              </div>
              <div className="p-2 border border-gray-200 rounded-lg">
                <div className="text-lg font-bold text-[#FF6A00]">{innovator.patents}</div>
                <div className="text-xs text-gray-600">Patents</div>
              </div>
              <div className="p-2 border border-gray-200 rounded-lg">
                <div className="text-lg font-bold text-[#FF6A00]">{innovator.collaborations}</div>
                <div className="text-xs text-gray-600">Collaborations</div>
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

      {/* Innovation Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Innovation Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">2,150+</div>
            <div className="text-sm text-gray-600">Innovators in Network</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">420+</div>
            <div className="text-sm text-gray-600">Active Collaborations</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">1,280+</div>
            <div className="text-sm text-gray-600">Patents Filed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectInnovators;