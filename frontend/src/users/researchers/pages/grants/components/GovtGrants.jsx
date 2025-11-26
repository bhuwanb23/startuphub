import React, { useState } from 'react';

const GovtGrants = () => {
  const [filters, setFilters] = useState({
    ministry: 'all',
    fundingSize: 'all',
    deadline: 'all',
    trl: 'all'
  });

  const grants = [
    {
      id: 1,
      title: 'Advanced Research Fellowship',
      ministry: 'DST',
      description: 'Fellowship for outstanding researchers to pursue advanced research in frontier areas',
      amount: '₹50 Lakhs',
      duration: '3 years',
      deadline: 'Dec 15, 2025',
      trl: 'TRL 1-3',
      eligibility: 'PhD holders with 5+ years research experience',
      link: '#'
    },
    {
      id: 2,
      title: 'Defense Technology Innovation',
      ministry: 'DRDO',
      description: 'Funding for cutting-edge defense technology research and development',
      amount: '₹2 Crores',
      duration: '2 years',
      deadline: 'Jan 30, 2026',
      trl: 'TRL 4-6',
      eligibility: 'Institutions with defense research experience',
      link: '#'
    },
    {
      id: 3,
      title: 'Space Research Grant',
      ministry: 'ISRO',
      description: 'Grant for space technology research and satellite applications',
      amount: '₹1.5 Crores',
      duration: '4 years',
      deadline: 'Feb 28, 2026',
      trl: 'TRL 2-5',
      eligibility: 'Aerospace engineering institutions',
      link: '#'
    },
    {
      id: 4,
      title: 'Biotechnology Research',
      ministry: 'DBT',
      description: 'Funding for biotechnology and life sciences research',
      amount: '₹75 Lakhs',
      duration: '3 years',
      deadline: 'Mar 15, 2026',
      trl: 'TRL 1-4',
      eligibility: 'Life sciences research institutions',
      link: '#'
    }
  ];

  const ministries = ['All', 'DST', 'DRDO', 'ISRO', 'DBT', 'MeitY'];
  const fundingSizes = ['All', '₹10L-50L', '₹50L-1Cr', '₹1Cr+'];
  const deadlines = ['All', 'This Week', 'This Month', 'Next 3 Months'];
  const trlLevels = ['All', 'TRL 1-3', 'TRL 4-6', 'TRL 7-9'];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">🏛️ Government Grants Explorer</h2>
      
      {/* Filters */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ministry</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              value={filters.ministry}
              onChange={(e) => setFilters({...filters, ministry: e.target.value})}
            >
              {ministries.map((ministry, index) => (
                <option key={index} value={ministry.toLowerCase()}>{ministry}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Funding Size</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              value={filters.fundingSize}
              onChange={(e) => setFilters({...filters, fundingSize: e.target.value})}
            >
              {fundingSizes.map((size, index) => (
                <option key={index} value={size.toLowerCase().replace('+', '')}>{size}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              value={filters.deadline}
              onChange={(e) => setFilters({...filters, deadline: e.target.value})}
            >
              {deadlines.map((deadline, index) => (
                <option key={index} value={deadline.toLowerCase().replace(' ', '')}>{deadline}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TRL Level</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              value={filters.trl}
              onChange={(e) => setFilters({...filters, trl: e.target.value})}
            >
              {trlLevels.map((trl, index) => (
                <option key={index} value={trl.toLowerCase().replace(' ', '')}>{trl}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Grant Cards */}
      <div className="grid grid-cols-1 gap-4">
        {grants.map((grant) => (
          <div key={grant.id} className="border border-[#FF8C42] rounded-xl p-5 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{grant.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">{grant.ministry}</span>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{grant.amount}</span>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{grant.duration}</span>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{grant.trl}</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-[#FF6A00]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{grant.description}</p>
            
            <div className="flex flex-wrap justify-between items-center">
              <div className="text-sm">
                <span className="text-gray-500">Eligibility: </span>
                <span className="text-gray-700">{grant.eligibility}</span>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button className="text-sm px-3 py-1 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors">
                  Check Eligibility
                </button>
                <button className="text-sm px-3 py-1 border border-[#FF6A00] text-[#FF6A00] rounded-lg hover:bg-[#FFF5EB] transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-gray-500">
              Deadline: {grant.deadline}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovtGrants;