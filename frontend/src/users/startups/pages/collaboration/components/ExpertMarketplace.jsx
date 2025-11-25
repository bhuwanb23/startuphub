import React, { useState } from 'react';

const ExpertMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    availability: 'all',
    rate: 'all',
  });
  
  // Mock data for experts
  const experts = [
    {
      id: 1,
      name: 'Dr. Amanda Foster',
      avatar: '👩‍🏫',
      category: 'Legal & IP',
      expertise: 'Patent Law, IP Strategy',
      rate: '$300/hr',
      availability: 'Immediate',
      rating: 4.9,
      reviews: 42,
      experience: '15 years',
      location: 'San Francisco, CA',
      matchScore: 93,
      tags: ['Patent Filing', 'IP Protection', 'Licensing'],
    },
    {
      id: 2,
      name: 'Michael Torres',
      avatar: '👨‍🏫',
      category: 'Finance & Investment',
      expertise: 'Venture Capital, Financial Modeling',
      rate: '$250/hr',
      availability: '1 week',
      rating: 4.8,
      reviews: 38,
      experience: '12 years',
      location: 'New York, NY',
      matchScore: 89,
      tags: ['Fundraising', 'Valuation', 'Due Diligence'],
    },
    {
      id: 3,
      name: 'Dr. Sarah Kim',
      avatar: '👩‍🏫',
      category: 'Technology',
      expertise: 'AI/ML, Data Science',
      rate: '$350/hr',
      availability: '2 weeks',
      rating: 4.9,
      reviews: 56,
      experience: '10 years',
      location: 'Seattle, WA',
      matchScore: 87,
      tags: ['Machine Learning', 'Predictive Analytics', 'Big Data'],
    },
    {
      id: 4,
      name: 'Robert Johnson',
      avatar: '👨‍🏫',
      category: 'Marketing & Growth',
      expertise: 'Growth Strategy, Brand Building',
      rate: '$200/hr',
      availability: 'Immediate',
      rating: 4.7,
      reviews: 31,
      experience: '14 years',
      location: 'Austin, TX',
      matchScore: 85,
      tags: ['Go-to-Market', 'User Acquisition', 'Brand Strategy'],
    },
  ];

  const categories = ['all', 'Legal & IP', 'Finance & Investment', 'Technology', 'Marketing & Growth'];
  const availabilityOptions = ['all', 'Immediate', '1 week', '2 weeks', '1 month'];
  const rateRanges = ['all', '<$150/hr', '$150-250/hr', '$250-350/hr', '>$350/hr'];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedFilters.category === 'all' || expert.category === selectedFilters.category;
    const matchesAvailability = selectedFilters.availability === 'all' || expert.availability === selectedFilters.availability;
    
    // Rate filtering
    let matchesRate = true;
    if (selectedFilters.rate !== 'all') {
      const rateValue = parseInt(expert.rate.replace(/[^0-9]/g, ''));
      if (selectedFilters.rate === '<$150/hr') matchesRate = rateValue < 150;
      else if (selectedFilters.rate === '$150-250/hr') matchesRate = rateValue >= 150 && rateValue <= 250;
      else if (selectedFilters.rate === '$250-350/hr') matchesRate = rateValue >= 250 && rateValue <= 350;
      else if (selectedFilters.rate === '>$350/hr') matchesRate = rateValue > 350;
    }
    
    return matchesSearch && matchesCategory && matchesAvailability && matchesRate;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Expert Marketplace</h1>
        <p className="text-gray-600 mt-1">Hire top experts for short-term projects or ongoing advisory</p>
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
              Dr. Amanda Foster specializes in patent law with a 93% match score for your IP needs. 
              She has 15 years of experience and 42 positive reviews. Immediate availability.
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
                placeholder="Search experts, expertise, or keywords..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedFilters.category}
              onChange={(e) => setSelectedFilters({...selectedFilters, category: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            <select
              value={selectedFilters.availability}
              onChange={(e) => setSelectedFilters({...selectedFilters, availability: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {availabilityOptions.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'Any Availability' : option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExperts.map((expert) => (
          <div key={expert.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="text-4xl mr-4">{expert.avatar}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{expert.name}</h3>
                  <p className="text-[#FF6A00] text-sm font-medium">{expert.expertise}</p>
                  <p className="text-gray-600 text-sm">{expert.category}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-bold text-gray-800">{expert.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({expert.reviews})</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">Match: {expert.matchScore}%</div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {expert.rate}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {expert.availability}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {expert.experience}
                </span>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                {expert.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div>{expert.location}</div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
                Book Consultation
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Expert Marketplace Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Marketplace Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">1,850+</div>
            <div className="text-sm text-gray-600">Experts Available</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">92%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">$2.4M</div>
            <div className="text-sm text-gray-600">Total Value Created</div>
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

export default ExpertMarketplace;