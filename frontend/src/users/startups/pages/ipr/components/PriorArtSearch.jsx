import React, { useState } from 'react';

const PriorArtSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    patentType: 'all',
    dateRange: 'all',
    jurisdiction: 'all',
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          title: 'Method for Distributed Data Processing',
          patentNumber: 'US1234567B2',
          publicationDate: '2023-05-15',
          assignee: 'TechCorp Inc.',
          similarity: 85,
        },
        {
          id: 2,
          title: 'System for Optimizing Network Traffic',
          patentNumber: 'US7654321B1',
          publicationDate: '2022-11-30',
          assignee: 'NetSolutions Ltd.',
          similarity: 72,
        },
        {
          id: 3,
          title: 'Machine Learning Based Data Analysis',
          patentNumber: 'US1122334C1',
          publicationDate: '2023-03-22',
          assignee: 'AI Innovations Corp.',
          similarity: 68,
        },
        {
          id: 4,
          title: 'Cloud Computing Resource Management',
          patentNumber: 'US9876543A2',
          publicationDate: '2021-08-10',
          assignee: 'CloudTech Systems',
          similarity: 61,
        },
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const getSimilarityColor = (similarity) => {
    if (similarity >= 80) return 'bg-red-100 text-red-800';
    if (similarity >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Prior Art Search</h1>
        <p className="text-gray-600 mt-1">Search for existing patents and publications to assess patentability</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter keywords, patent number, or technical description"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-3 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patent Type</label>
            <select
              value={filters.patentType}
              onChange={(e) => handleFilterChange('patentType', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
            >
              <option value="all">All Types</option>
              <option value="utility">Utility Patent</option>
              <option value="design">Design Patent</option>
              <option value="plant">Plant Patent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
            >
              <option value="all">All Dates</option>
              <option value="last5">Last 5 Years</option>
              <option value="last10">Last 10 Years</option>
              <option value="last20">Last 20 Years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jurisdiction</label>
            <select
              value={filters.jurisdiction}
              onChange={(e) => handleFilterChange('jurisdiction', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
            >
              <option value="all">All Jurisdictions</option>
              <option value="us">United States</option>
              <option value="eu">European Union</option>
              <option value="jp">Japan</option>
              <option value="cn">China</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Search Results</h2>
            <span className="text-sm text-gray-500">{searchResults.length} results found</span>
          </div>
          <div className="space-y-4">
            {searchResults.map((result) => (
              <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800">{result.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-600">{result.patentNumber}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-600">{result.assignee}</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    <span className={`text-xs px-2 py-1 rounded-full ${getSimilarityColor(result.similarity)}`}>
                      {result.similarity}% Similar
                    </span>
                    <span className="text-sm text-gray-500 ml-3">{result.publicationDate}</span>
                  </div>
                </div>
                <div className="mt-3 flex space-x-3">
                  <button className="text-[#FF6A00] text-sm font-medium hover:underline">
                    View Details
                  </button>
                  <button className="text-[#FF6A00] text-sm font-medium hover:underline">
                    Save to Library
                  </button>
                  <button className="text-[#FF6A00] text-sm font-medium hover:underline">
                    Cite Reference
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">AI Patentability Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-3xl font-bold text-[#FF6A00] mb-2">72%</div>
            <div className="text-sm text-gray-600">Novelty Score</div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-[#FF6A00] rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-3xl font-bold text-[#FF6A00] mb-2">68%</div>
            <div className="text-sm text-gray-600">Non-obviousness</div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-[#FF6A00] rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="text-3xl font-bold text-[#FF6A00] mb-2">85%</div>
            <div className="text-sm text-gray-600">Utility Score</div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-[#FF6A00] rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg">
            Generate Detailed Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriorArtSearch;