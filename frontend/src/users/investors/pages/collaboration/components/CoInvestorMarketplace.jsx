import React, { useState } from 'react';

const CoInvestorMarketplace = () => {
  const [filters, setFilters] = useState({
    geography: '',
    fundSize: '',
    interests: '',
    ticketSize: ''
  });

  const investors = [
    {
      id: 1,
      name: 'Alpha Ventures',
      logo: 'AV',
      sectorFocus: ['AI/ML', 'Fintech', 'Healthtech'],
      fundSize: '$250M',
      ticketSize: '$2M-$10M',
      geography: 'North America',
      investmentHistory: [
        { company: 'TechNova', round: 'Series B', amount: '$15M' },
        { company: 'MediScan', round: 'Series A', amount: '$8M' },
        { company: 'FinServe', round: 'Series C', amount: '$25M' }
      ],
      matchScore: 85
    },
    {
      id: 2,
      name: 'Beta Capital',
      logo: 'BC',
      sectorFocus: ['Clean Energy', 'Mobility', 'AgriTech'],
      fundSize: '$180M',
      ticketSize: '$1M-$5M',
      geography: 'Europe',
      investmentHistory: [
        { company: 'SolarEdge', round: 'Series B', amount: '$12M' },
        { company: 'EcoDrive', round: 'Series A', amount: '$6M' },
        { company: 'FarmTech', round: 'Series C', amount: '$18M' }
      ],
      matchScore: 78
    },
    {
      id: 3,
      name: 'Gamma Partners',
      logo: 'GP',
      sectorFocus: ['SaaS', 'Cybersecurity', 'EdTech'],
      fundSize: '$320M',
      ticketSize: '$5M-$20M',
      geography: 'Asia-Pacific',
      investmentHistory: [
        { company: 'CloudSecure', round: 'Series B', amount: '$20M' },
        { company: 'LearnSmart', round: 'Series A', amount: '$10M' },
        { company: 'DataShield', round: 'Series C', amount: '$30M' }
      ],
      matchScore: 92
    },
    {
      id: 4,
      name: 'Delta Investments',
      logo: 'DI',
      sectorFocus: ['Biotech', 'MedTech', 'Pharma'],
      fundSize: '$150M',
      ticketSize: '$3M-$12M',
      geography: 'Global',
      investmentHistory: [
        { company: 'BioGenix', round: 'Series B', amount: '$18M' },
        { company: 'MediCore', round: 'Series A', amount: '$7M' },
        { company: 'PharmaTech', round: 'Series C', amount: '$22M' }
      ],
      matchScore: 88
    },
    {
      id: 5,
      name: 'Epsilon Fund',
      logo: 'EF',
      sectorFocus: ['Retail Tech', 'Consumer Goods', 'Logistics'],
      fundSize: '$90M',
      ticketSize: '$1M-$4M',
      geography: 'North America',
      investmentHistory: [
        { company: 'ShopSmart', round: 'Series B', amount: '$8M' },
        { company: 'LogiFlow', round: 'Series A', amount: '$4M' },
        { company: 'ConsumePro', round: 'Series C', amount: '$12M' }
      ],
      matchScore: 75
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredInvestors = investors.filter(investor => {
    return (
      (filters.geography === '' || investor.geography.includes(filters.geography)) &&
      (filters.fundSize === '' || investor.fundSize.includes(filters.fundSize)) &&
      (filters.ticketSize === '' || investor.ticketSize.includes(filters.ticketSize))
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Co-Investor Marketplace</h2>
        <p className="text-gray-600">Discover and connect with compatible investors and funds</p>
      </div>

      {/* Filters Panel */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Geography</label>
            <select
              name="geography"
              value={filters.geography}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
            >
              <option value="">All Regions</option>
              <option value="North America">North America</option>
              <option value="Europe">Europe</option>
              <option value="Asia-Pacific">Asia-Pacific</option>
              <option value="Global">Global</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fund Size</label>
            <select
              name="fundSize"
              value={filters.fundSize}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
            >
              <option value="">Any Size</option>
              <option value="$50M">$50M+</option>
              <option value="$100M">$100M+</option>
              <option value="$200M">$200M+</option>
              <option value="$300M">$300M+</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Size</label>
            <select
              name="ticketSize"
              value={filters.ticketSize}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
            >
              <option value="">Any Ticket</option>
              <option value="$1M">$1M-$5M</option>
              <option value="$5M">$5M-$15M</option>
              <option value="$15M">$15M+</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={() => setFilters({ geography: '', fundSize: '', interests: '', ticketSize: '' })}
              className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Investor Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvestors.map((investor) => (
          <div key={investor.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#FF6A00] font-bold">
                {investor.logo}
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-800">{investor.name}</h3>
                <div className="flex items-center mt-1">
                  <div className="flex items-center bg-orange-100 px-2 py-1 rounded">
                    <span className="text-orange-500 mr-1">🎯</span>
                    <span className="text-xs font-bold text-gray-800">{investor.matchScore}% Match</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-1">Sector Focus</div>
              <div className="flex flex-wrap gap-1">
                {investor.sectorFocus.map((sector, index) => (
                  <span key={index} className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {sector}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-500">Fund Size</div>
                <div className="font-medium text-gray-800">{investor.fundSize}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Ticket Size</div>
                <div className="font-medium text-gray-800">{investor.ticketSize}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Geography</div>
                <div className="font-medium text-gray-800">{investor.geography}</div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">Recent Investments</div>
              <div className="space-y-2">
                {investor.investmentHistory.slice(0, 2).map((investment, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div className="text-gray-800">{investment.company}</div>
                    <div className="text-[#FF6A00]">{investment.amount}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Connect
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoInvestorMarketplace;