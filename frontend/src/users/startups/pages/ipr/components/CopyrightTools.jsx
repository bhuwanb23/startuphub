import React, { useState } from 'react';

const CopyrightTools = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [workData, setWorkData] = useState({
    title: '',
    author: '',
    type: 'literary',
    creationDate: '',
    publicationDate: '',
    description: '',
  });
  const [registeredWorks, setRegisteredWorks] = useState([
    {
      id: 1,
      title: 'InnovateX User Manual',
      author: 'Alex Johnson',
      type: 'Literary Work',
      registrationNumber: 'TX000123456',
      registrationDate: '2022-08-15',
      status: 'Registered',
    },
    {
      id: 2,
      title: 'InnovateX Software Code',
      author: 'Tech Team',
      type: 'Computer Program',
      registrationNumber: 'TX000789012',
      registrationDate: '2023-02-20',
      status: 'Registered',
    },
  ]);

  const handleRegisterWork = () => {
    // In a real app, this would initiate the registration process
    alert('Copyright registration process initiated!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Registered':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Copyright Tools</h1>
        <p className="text-gray-600 mt-1">Register, manage, and protect your creative works</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('register')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'register'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Register New Work
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'manage'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Manage Copyrights
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'search'
                ? 'border-[#FF6A00] text-[#FF6A00]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Copyright Search
          </button>
        </nav>
      </div>

      {/* Register New Work Tab */}
      {activeTab === 'register' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Register New Copyright</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={workData.title}
                  onChange={(e) => setWorkData({...workData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  placeholder="Enter the title of your work"
                />
              </div>
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                  Author/Creator
                </label>
                <input
                  type="text"
                  id="author"
                  value={workData.author}
                  onChange={(e) => setWorkData({...workData, author: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  placeholder="Author or creator name"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Type
                </label>
                <select
                  id="type"
                  value={workData.type}
                  onChange={(e) => setWorkData({...workData, type: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                >
                  <option value="literary">Literary Work</option>
                  <option value="musical">Musical Work</option>
                  <option value="dramatic">Dramatic Work</option>
                  <option value="choreographic">Choreographic Work</option>
                  <option value="pictorial">Pictorial Work</option>
                  <option value="graphic">Graphic Work</option>
                  <option value="sculptural">Sculptural Work</option>
                  <option value="motionPicture">Motion Picture</option>
                  <option value="soundRecording">Sound Recording</option>
                  <option value="computerProgram">Computer Program</option>
                  <option value="database">Database</option>
                </select>
              </div>
              <div>
                <label htmlFor="creationDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Creation Date
                </label>
                <input
                  type="date"
                  id="creationDate"
                  value={workData.creationDate}
                  onChange={(e) => setWorkData({...workData, creationDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                />
              </div>
              <div>
                <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Publication Date (if published)
                </label>
                <input
                  type="date"
                  id="publicationDate"
                  value={workData.publicationDate}
                  onChange={(e) => setWorkData({...workData, publicationDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={workData.description}
                  onChange={(e) => setWorkData({...workData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                  placeholder="Brief description of the work"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleRegisterWork}
                className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
              >
                Register Copyright
              </button>
            </div>
          </div>

          {/* Registration Checklist */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Registration Checklist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                  <span className="ml-2 text-gray-700">Work is original and fixed in tangible form</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                  <span className="ml-2 text-gray-700">Author/creator information verified</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                  <span className="ml-2 text-gray-700">Creation date documented</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                  <span className="ml-2 text-gray-700">Description accurately reflects the work</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                  <span className="ml-2 text-gray-700">Required fees calculated</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded" />
                  <span className="ml-2 text-gray-700">Deposit materials prepared</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Copyrights Tab */}
      {activeTab === 'manage' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">My Copyrights</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {registeredWorks.map((work) => (
                    <tr key={work.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{work.title}</div>
                        <div className="text-sm text-gray-500">{work.author}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {work.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {work.registrationNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {work.registrationDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(work.status)}`}>
                          {work.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-[#FF6A00] hover:text-[#FF8C42] mr-3">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Renew
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Renewal Reminders */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Renewal Reminders</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">InnovateX User Manual</h3>
                  <span className="text-sm text-gray-500">Literary Work</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-sm text-gray-600">Registration Date: August 15, 2022</span>
                  <span className="text-sm font-medium text-[#FF6A00]">Renewal due in 2047</span>
                </div>
                <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
                  Set Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copyright Search Tab */}
      {activeTab === 'search' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Copyright Search</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter keywords, title, author, or registration number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                />
              </div>
              <button className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-3 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg">
                Search
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Searches</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">Copyright Registration Process</h3>
                  <span className="text-sm text-gray-500">Guide</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Learn about the steps to register your work with the copyright office.
                </p>
                <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
                  View Guide
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">Fair Use Guidelines</h3>
                  <span className="text-sm text-gray-500">Legal Resource</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Understand when you can use copyrighted material without permission.
                </p>
                <button className="mt-3 text-[#FF6A00] text-sm font-medium hover:underline">
                  View Guidelines
                </button>
              </div>
            </div>
          </div>

          {/* AI Copyright Assistant */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">AI Copyright Assistant</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Work Protection Analysis</h3>
                    <p className="text-sm text-gray-600 mt-1">Determine if your work qualifies for copyright protection</p>
                  </div>
                </div>
                <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
                  Analyze Work
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                    🤖
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Infringement Risk Assessment</h3>
                    <p className="text-sm text-gray-600 mt-1">Check if your work might infringe on existing copyrights</p>
                  </div>
                </div>
                <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
                  Check Risk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopyrightTools;