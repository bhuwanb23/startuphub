import React, { useState } from 'react';

const SimilaritySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  
  const patents = [
    {
      id: 1,
      title: 'Quantum Encryption Method',
      similarity: 92,
      region: 'WIPO',
      filingDate: '2025-03-15',
      status: 'Published'
    },
    {
      id: 2,
      title: 'AI-Based Data Encryption System',
      similarity: 87,
      region: 'USPTO',
      filingDate: '2024-11-22',
      status: 'Granted'
    },
    {
      id: 3,
      title: 'Secure Communication Protocol',
      similarity: 84,
      region: 'EPO',
      filingDate: '2025-01-30',
      status: 'Pending'
    },
    {
      id: 4,
      title: 'Cryptographic Key Generation',
      similarity: 78,
      region: 'India',
      filingDate: '2024-08-17',
      status: 'Published'
    }
  ];

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'wipo', name: 'WIPO' },
    { id: 'uspto', name: 'USPTO' },
    { id: 'epo', name: 'EPO' },
    { id: 'india', name: 'India' }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">🔍 AI Patent Similarity Search</h2>
      
      {/* Search Section */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter keywords or patent number..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-6 py-3 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors font-medium">
              Search
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Upload PDF
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedRegion === region.id
                  ? 'bg-[#FF6A00] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Results Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Search Results</h3>
          <span className="text-sm text-gray-600">{patents.length} patents found</span>
        </div>
        
        <div className="space-y-4">
          {patents.map((patent) => (
            <div key={patent.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-800">{patent.title}</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-[#FFF5EB] text-[#FF6A00] text-xs px-2 py-1 rounded">
                      {patent.region}
                    </span>
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {patent.filingDate}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      patent.status === 'Granted' ? 'bg-green-100 text-green-800' :
                      patent.status === 'Published' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {patent.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#FF6A00]">{patent.similarity}%</div>
                  <div className="text-xs text-gray-500">Similarity</div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button className="text-sm px-3 py-1 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors">
                  View Details
                </button>
                <button className="text-sm px-3 py-1 border border-[#FF6A00] text-[#FF6A00] rounded-lg hover:bg-[#FFF5EB] transition-colors">
                  Compare Claims
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Comparison Viewer */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4">Patent Comparison Viewer</h3>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div className="text-center text-gray-500 py-8">
            Select two patents to compare their claims and highlight overlapping sections
          </div>
        </div>
        <div className="mt-4 text-center">
          <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors">
            Highlight Overlapping Claims
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilaritySearch;