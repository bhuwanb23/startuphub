import React, { useState } from 'react';

const FindResearchers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    domain: 'all',
    experience: 'all',
    location: 'all',
  });
  
  // Mock data for researchers
  const researchers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      avatar: '👩‍🔬',
      domain: 'Biotechnology',
      experience: '12 years',
      location: 'San Francisco, CA',
      institution: 'Stanford University',
      specialization: 'Genetic Engineering',
      projects: 24,
      collaborations: 8,
      rating: 4.8,
      matchScore: 92,
      tags: ['CRISPR', 'Gene Therapy', 'Molecular Biology'],
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      avatar: '👨‍🔬',
      domain: 'Artificial Intelligence',
      experience: '15 years',
      location: 'Boston, MA',
      institution: 'MIT',
      specialization: 'Machine Learning',
      projects: 32,
      collaborations: 15,
      rating: 4.9,
      matchScore: 88,
      tags: ['Deep Learning', 'Neural Networks', 'Computer Vision'],
    },
    {
      id: 3,
      name: 'Dr. Elena Rodriguez',
      avatar: '👩‍🔬',
      domain: 'Renewable Energy',
      experience: '10 years',
      location: 'Austin, TX',
      institution: 'University of Texas',
      specialization: 'Solar Technology',
      projects: 18,
      collaborations: 6,
      rating: 4.7,
      matchScore: 85,
      tags: ['Photovoltaics', 'Energy Storage', 'Sustainability'],
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      avatar: '👨‍🔬',
      domain: 'Materials Science',
      experience: '8 years',
      location: 'Seattle, WA',
      institution: 'University of Washington',
      specialization: 'Nanomaterials',
      projects: 15,
      collaborations: 5,
      rating: 4.6,
      matchScore: 82,
      tags: ['Graphene', 'Composites', '3D Printing'],
    },
  ];

  const domains = ['all', 'Biotechnology', 'Artificial Intelligence', 'Renewable Energy', 'Materials Science'];
  const experienceLevels = ['all', '0-5 years', '5-10 years', '10-15 years', '15+ years'];
  const locations = ['all', 'San Francisco, CA', 'Boston, MA', 'Austin, TX', 'Seattle, WA'];

  const filteredResearchers = researchers.filter(researcher => {
    const matchesSearch = researcher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         researcher.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         researcher.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDomain = selectedFilters.domain === 'all' || researcher.domain === selectedFilters.domain;
    const matchesExperience = selectedFilters.experience === 'all' || researcher.experience.includes(selectedFilters.experience);
    const matchesLocation = selectedFilters.location === 'all' || researcher.location.includes(selectedFilters.location);
    
    return matchesSearch && matchesDomain && matchesExperience && matchesLocation;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Find Researchers</h1>
        <p className="text-gray-600 mt-1">Discover and connect with top researchers in your field</p>
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
              Dr. Sarah Johnson specializes in genetic engineering and has a 92% match score with your project needs. 
              She has collaborated on 8 similar projects with a 4.8 rating.
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
                placeholder="Search researchers, specializations, or keywords..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedFilters.domain}
              onChange={(e) => setSelectedFilters({...selectedFilters, domain: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {domains.map(domain => (
                <option key={domain} value={domain}>
                  {domain === 'all' ? 'All Domains' : domain}
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

      {/* Researchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResearchers.map((researcher) => (
          <div key={researcher.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="text-4xl mr-4">{researcher.avatar}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{researcher.name}</h3>
                  <p className="text-gray-600 text-sm">{researcher.institution}</p>
                  <p className="text-[#FF6A00] text-sm font-medium">{researcher.specialization}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-bold text-gray-800">{researcher.rating}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">Match: {researcher.matchScore}%</div>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {researcher.domain}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {researcher.experience}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {researcher.location}
              </span>
            </div>
            
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                {researcher.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <span>📁 {researcher.projects} projects</span>
                <span className="mx-2">•</span>
                <span>🤝 {researcher.collaborations} collaborations</span>
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

      {/* Researcher Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Researcher Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">1,240+</div>
            <div className="text-sm text-gray-600">Researchers in Network</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">85%</div>
            <div className="text-sm text-gray-600">Response Rate</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">4.7</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindResearchers;