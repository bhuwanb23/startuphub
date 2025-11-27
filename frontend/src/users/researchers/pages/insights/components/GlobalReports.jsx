import React, { useState } from 'react';

const GlobalReports = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'us', name: 'United States' },
    { id: 'eu', name: 'European Union' },
    { id: 'india', name: 'India' },
    { id: 'asia', name: 'Asia Pacific' }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'biotech', name: 'Biotechnology' },
    { id: 'ai', name: 'AI & Machine Learning' },
    { id: 'renewable', name: 'Renewable Energy' },
    { id: 'materials', name: 'Advanced Materials' }
  ];

  // Mock report data
  const reports = [
    {
      id: 1,
      title: 'Global AI Research Landscape 2025',
      region: 'Global',
      category: 'AI & Machine Learning',
      date: '2025-11-15',
      pages: 142,
      downloads: 1240,
      thumbnail: 'ai-report'
    },
    {
      id: 2,
      title: 'Biotech Innovation Trends in Europe',
      region: 'European Union',
      category: 'Biotechnology',
      date: '2025-10-22',
      pages: 98,
      downloads: 876,
      thumbnail: 'biotech-report'
    },
    {
      id: 3,
      title: 'India\'s Renewable Energy Transition',
      region: 'India',
      category: 'Renewable Energy',
      date: '2025-11-05',
      pages: 115,
      downloads: 1532,
      thumbnail: 'renewable-report'
    },
    {
      id: 4,
      title: 'Advanced Materials Market Analysis',
      region: 'Global',
      category: 'Advanced Materials',
      date: '2025-09-18',
      pages: 127,
      downloads: 924,
      thumbnail: 'materials-report'
    },
    {
      id: 5,
      title: 'Quantum Computing Commercialization Pathways',
      region: 'United States',
      category: 'AI & Machine Learning',
      date: '2025-08-30',
      pages: 89,
      downloads: 1105,
      thumbnail: 'quantum-report'
    },
    {
      id: 6,
      title: 'Asia-Pacific CleanTech Investment Outlook',
      region: 'Asia Pacific',
      category: 'Renewable Energy',
      date: '2025-10-12',
      pages: 103,
      downloads: 789,
      thumbnail: 'cleantech-report'
    }
  ];

  // Filter reports based on selections
  const filteredReports = reports.filter(report => {
    const regionMatch = selectedRegion === 'all' || report.region.toLowerCase().includes(selectedRegion.toLowerCase());
    const categoryMatch = selectedCategory === 'all' || report.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return regionMatch && categoryMatch;
  });

  // Get report icon based on category
  const getReportIcon = (category) => {
    switch (category) {
      case 'AI & Machine Learning':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case 'Biotechnology':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'Renewable Energy':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'Advanced Materials':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">🌍 Global Innovation Reports</h1>
      
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regions.map(region => (
              <option key={region.id} value={region.id}>{region.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow p-6 border border-orange-100 hover:border-orange-300 transition-colors duration-150">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 mr-4">
                {getReportIcon(report.category)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {report.region}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {report.category}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{report.date}</span>
              <span className="mx-2">•</span>
              <span>{report.pages} pages</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{report.downloads.toLocaleString()} downloads</span>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-grow bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </button>
              <button className="bg-white hover:bg-gray-50 border border-orange-500 text-orange-600 py-2 px-3 rounded-md text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Categories Overview */}
      <div className="mt-8 bg-white rounded-lg shadow p-6 border border-orange-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Report Categories Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.filter(cat => cat.id !== 'all').map((category, index) => {
            const count = reports.filter(report => report.category === category.name).length;
            const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100'];
            const textColors = ['text-blue-800', 'text-green-800', 'text-yellow-800', 'text-purple-800'];
            
            return (
              <div key={category.id} className={`p-4 rounded-lg ${colors[index]} border border-${textColors[index].split('-')[1]}-200`}>
                <h3 className={`font-medium ${textColors[index]} mb-2`}>{category.name}</h3>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-sm text-gray-600">Reports Available</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GlobalReports;