import React, { useState } from 'react';

const TrademarkTools = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [trademarkData, setTrademarkData] = useState({
    mark: '',
    class: '',
    owner: '',
    description: '',
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          mark: 'INNOVATEX',
          status: 'Registered',
          class: 'Class 9',
          owner: 'InnovateX Solutions Inc.',
          registrationDate: '2022-03-15',
        },
        {
          id: 2,
          mark: 'INNOVATE',
          status: 'Pending',
          class: 'Class 42',
          owner: 'Tech Innovations Ltd.',
          registrationDate: '2023-01-22',
        },
        {
          id: 3,
          mark: 'INNOVEX',
          status: 'Available',
          class: 'Class 9',
          owner: 'None',
          registrationDate: 'N/A',
        },
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const handleFileTrademark = () => {
    // In a real app, this would initiate the filing process
    alert('Trademark filing process initiated!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Registered':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Available':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Trademark Tools</h1>
        <p className="text-gray-600 mt-1">Search, register, and manage your trademarks</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('search')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'search'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Trademark Search
          </button>
          <button
            onClick={() => setActiveTab('file')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'file'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            File New Trademark
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'manage'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Manage Trademarks
          </button>
        </nav>
      </div>

      {/* Search Tab */}
      {activeTab === 'search' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter trademark name or keyword"
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

          {searchResults.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Search Results</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trademark
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Owner
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registration Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchResults.map((result) => (
                      <tr key={result.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{result.mark}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(result.status)}`}>
                            {result.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {result.class}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {result.owner}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {result.registrationDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-[#FF6A00] hover:text-[#FF8C42]">
                            {result.status === 'Available' ? 'File Now' : 'View Details'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* AI Trademark Suggestions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">AI Trademark Suggestions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">INNOVATEPRO</h3>
                    <p className="text-sm text-gray-600 mt-1">Based on your brand name with a professional suffix</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">Available</span>
                    </div>
                  </div>
                </div>
                <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
                  Check Availability
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">INNOVATEX+</h3>
                    <p className="text-sm text-gray-600 mt-1">Variation with a modern symbol</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">Available</span>
                    </div>
                  </div>
                </div>
                <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
                  Check Availability
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">INNOVATECORE</h3>
                    <p className="text-sm text-gray-600 mt-1">Emphasizing your core technology</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                    </div>
                  </div>
                </div>
                <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
                  View Similar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* File New Trademark Tab */}
      {activeTab === 'file' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">File New Trademark</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mark" className="block text-sm font-medium text-gray-700 mb-1">
                  Trademark Name
                </label>
                <input
                  type="text"
                  id="mark"
                  value={trademarkData.mark}
                  onChange={(e) => setTrademarkData({...trademarkData, mark: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  placeholder="Enter trademark name"
                />
              </div>
              <div>
                <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
                  International Class
                </label>
                <select
                  id="class"
                  value={trademarkData.class}
                  onChange={(e) => setTrademarkData({...trademarkData, class: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                >
                  <option value="">Select a class</option>
                  <option value="Class 9">Class 9 - Scientific and technological services</option>
                  <option value="Class 35">Class 35 - Advertising and business management</option>
                  <option value="Class 42">Class 42 - Computer software and technology services</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
                  Owner Name
                </label>
                <input
                  type="text"
                  id="owner"
                  value={trademarkData.owner}
                  onChange={(e) => setTrademarkData({...trademarkData, owner: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  placeholder="Legal name of trademark owner"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description of Goods/Services
                </label>
                <textarea
                  id="description"
                  value={trademarkData.description}
                  onChange={(e) => setTrademarkData({...trademarkData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  placeholder="Describe the goods or services associated with this trademark"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleFileTrademark}
                className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
              >
                File Trademark
              </button>
            </div>
          </div>

          {/* Filing Checklist */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Filing Checklist</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                <span className="ml-2 text-gray-700">Trademark search completed</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                <span className="ml-2 text-gray-700">Owner information verified</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                <span className="ml-2 text-gray-700">Description of goods/services prepared</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                <span className="ml-2 text-gray-700">Filing fees calculated</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Trademarks Tab */}
      {activeTab === 'manage' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">My Trademarks</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trademark
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Filing Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Deadline
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">INNOVATEX</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Registered
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Class 9
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2022-03-15
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2032-03-15
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#FF6A00] hover:text-[#FF8C42] mr-3">
                        Renew
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        View
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">INNOVATELOGO</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Class 42
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2023-06-10
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2024-06-10
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-600 hover:text-gray-900">
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Renewal Reminders */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Upcoming Renewals</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">INNOVATEX Trademark</h3>
                  <span className="text-sm text-gray-500">Class 9</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-sm text-gray-600">Renewal Date: March 15, 2032</span>
                  <span className="text-sm font-medium text-[#FF6A00]">9 years remaining</span>
                </div>
                <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
                  Set Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrademarkTools;