import React, { useState } from 'react';

const PriorArtSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [similarPatents, setSimilarPatents] = useState([
    { id: 1, title: 'Method for AI-assisted drug discovery', similarity: 85, date: '2022-05-15' },
    { id: 2, title: 'Machine learning algorithms for pharmaceutical research', similarity: 78, date: '2021-11-30' },
    { id: 3, title: 'Computational methods for molecular modeling', similarity: 72, date: '2023-01-10' },
    { id: 4, title: 'Drug target identification using neural networks', similarity: 68, date: '2022-08-22' },
  ]);

  const handleSearch = () => {
    // In a real app, this would call an API
    console.log('Searching for:', searchInput);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Prior Art Search</h1>
        <p className="text-gray-600">Find similar patents and existing technologies</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Search Prior Art</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
            placeholder="Enter research abstract or upload document..."
          />
          <button 
            onClick={handleSearch}
            className="bg-[#F4A300] hover:bg-[#F26B1D] text-white px-6 py-3 rounded-lg transition-colors"
          >
            Search
          </button>
        </div>
        <div className="mt-4">
          <button className="text-[#F4A300] hover:text-[#F26B1D] font-medium">
            Upload Document
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Similar Patents Found</h2>
          <button className="text-[#F4A300] hover:text-[#F26B1D] font-medium">
            Export Prior Art Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patent Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publication Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AI Similarity Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {similarPatents.map((patent) => (
                <tr key={patent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patent.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patent.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-[#F4A300] h-2 rounded-full" 
                          style={{ width: `${patent.similarity}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{patent.similarity}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-[#F4A300] hover:text-[#F26B1D] mr-3">View</button>
                    <button className="text-[#F4A300] hover:text-[#F26B1D]">Save</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PriorArtSearch;