import React, { useState } from 'react';

const FundingPrograms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'all',
    stage: 'all',
    deadline: 'all',
  });
  
  // Mock data for funding programs
  const programs = [
    {
      id: 1,
      name: 'SBIR Phase I Grant',
      organization: 'National Science Foundation',
      type: 'Grant',
      stage: 'Pre-Seed',
      deadline: '2024-07-15',
      amount: '$250K',
      duration: '12 months',
      focus: 'Early-stage research',
      matchScore: 88,
      tags: ['Research', 'Tech', 'Innovation'],
      status: 'Open',
    },
    {
      id: 2,
      name: 'Venture Capital Fund',
      organization: 'Tech Growth Partners',
      type: 'Venture Capital',
      stage: 'Series A',
      deadline: '2024-08-30',
      amount: '$5M',
      duration: 'Ongoing',
      focus: 'Scalable tech startups',
      matchScore: 92,
      tags: ['SaaS', 'AI', 'Enterprise'],
      status: 'Open',
    },
    {
      id: 3,
      name: 'Women-Owned Business Grant',
      organization: 'Department of Commerce',
      type: 'Grant',
      stage: 'Seed',
      deadline: '2024-06-30',
      amount: '$100K',
      duration: '18 months',
      focus: 'Women entrepreneurs',
      matchScore: 75,
      tags: ['Diversity', 'Inclusion', 'Small Business'],
      status: 'Closing Soon',
    },
    {
      id: 4,
      name: 'Clean Energy Initiative',
      organization: 'Environmental Protection Agency',
      type: 'Grant',
      stage: 'Series A',
      deadline: '2024-09-15',
      amount: '$2M',
      duration: '24 months',
      focus: 'Sustainable technologies',
      matchScore: 85,
      tags: ['Clean Energy', 'Sustainability', 'Climate'],
      status: 'Open',
    },
  ];

  const types = ['all', 'Grant', 'Venture Capital', 'Angel', 'Crowdfunding'];
  const stages = ['all', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+'];
  const deadlines = ['all', 'This Month', 'Next Month', 'Next 3 Months'];

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedFilters.type === 'all' || program.type === selectedFilters.type;
    const matchesStage = selectedFilters.stage === 'all' || program.stage === selectedFilters.stage;
    
    // Deadline filtering
    let matchesDeadline = true;
    if (selectedFilters.deadline !== 'all') {
      const programDate = new Date(program.deadline);
      const today = new Date();
      const nextMonth = new Date();
      nextMonth.setMonth(today.getMonth() + 1);
      const threeMonths = new Date();
      threeMonths.setMonth(today.getMonth() + 3);
      
      if (selectedFilters.deadline === 'This Month') {
        matchesDeadline = programDate.getMonth() === today.getMonth() && programDate.getFullYear() === today.getFullYear();
      } else if (selectedFilters.deadline === 'Next Month') {
        matchesDeadline = programDate.getMonth() === nextMonth.getMonth() && programDate.getFullYear() === nextMonth.getFullYear();
      } else if (selectedFilters.deadline === 'Next 3 Months') {
        matchesDeadline = programDate >= today && programDate <= threeMonths;
      }
    }
    
    return matchesSearch && matchesType && matchesStage && matchesDeadline;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Funding Programs Explorer</h1>
        <p className="text-gray-600 mt-1">Discover grants, investments, and funding opportunities</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Funding Insight</h2>
            <p className="text-gray-700 mt-1">
              SBIR Phase I Grant has an 88% match score with your research-focused startup. 
              Application deadline is July 15, 2024 with $250K available for 12 months.
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
                placeholder="Search funding programs, organizations, or keywords..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedFilters.type}
              onChange={(e) => setSelectedFilters({...selectedFilters, type: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
            
            <select
              value={selectedFilters.stage}
              onChange={(e) => setSelectedFilters({...selectedFilters, stage: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {stages.map(stage => (
                <option key={stage} value={stage}>
                  {stage === 'all' ? 'All Stages' : stage}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrograms.map((program) => (
          <div key={program.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{program.name}</h3>
                <p className="text-[#FF6A00] text-sm font-medium">{program.organization}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#FF6A00]">{program.amount}</div>
                <div className="text-sm text-gray-500">{program.duration}</div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {program.type}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {program.stage}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  program.status === 'Open' 
                    ? 'bg-green-100 text-green-800' 
                    : program.status === 'Closing Soon' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  {program.status}
                </span>
              </div>
            </div>
            
            <div className="mt-3">
              <h4 className="text-sm font-semibold text-gray-700">Focus Area</h4>
              <p className="text-gray-600 text-sm mt-1">{program.focus}</p>
            </div>
            
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                {program.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium text-gray-700">Deadline: </span>
                <span className="text-gray-600">{formatDate(program.deadline)}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-700">Match: </span>
                <span className="text-[#FF6A00] font-medium">{program.matchScore}%</span>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
                Apply Now
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Save
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Funding Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Funding Landscape</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">84</div>
            <div className="text-sm text-gray-600">Available Programs</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">$124M</div>
            <div className="text-sm text-gray-600">Total Funding Available</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">32</div>
            <div className="text-sm text-gray-600">Applications Submitted</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">8</div>
            <div className="text-sm text-gray-600">Awards Received</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingPrograms;