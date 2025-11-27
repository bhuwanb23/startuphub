import React, { useState } from 'react';

const ResearchBriefs = () => {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');

  const topics = [
    { id: 'all', name: 'All Topics' },
    { id: 'ai', name: 'AI & Machine Learning' },
    { id: 'biotech', name: 'Biotechnology' },
    { id: 'energy', name: 'Energy & CleanTech' },
    { id: 'materials', name: 'Advanced Materials' },
    { id: 'quantum', name: 'Quantum Computing' }
  ];

  const years = [
    { id: 'all', name: 'All Years' },
    { id: '2025', name: '2025' },
    { id: '2024', name: '2024' },
    { id: '2023', name: '2023' },
    { id: '2022', name: '2022' }
  ];

  const methods = [
    { id: 'all', name: 'All Methods' },
    { id: 'experimental', name: 'Experimental' },
    { id: 'simulation', name: 'Simulation' },
    { id: 'analytical', name: 'Analytical' },
    { id: 'survey', name: 'Survey' },
    { id: 'case-study', name: 'Case Study' }
  ];

  // Mock research briefs
  const briefs = [
    {
      id: 1,
      title: 'Efficient Transformers for Edge AI Applications',
      topic: 'AI & Machine Learning',
      year: 2025,
      method: 'Experimental',
      authors: ['Dr. Sarah Johnson', 'Prof. Michael Chen'],
      pages: 12,
      thumbnail: 'ai-edge'
    },
    {
      id: 2,
      title: 'CRISPR-Based Gene Editing for Rare Diseases',
      topic: 'Biotechnology',
      year: 2025,
      method: 'Experimental',
      authors: ['Dr. Elena Rodriguez', 'Dr. James Wilson'],
      pages: 18,
      thumbnail: 'crispr'
    },
    {
      id: 3,
      title: 'Perovskite Solar Cells Stability Enhancement',
      topic: 'Energy & CleanTech',
      year: 2024,
      method: 'Simulation',
      authors: ['Dr. Priya Sharma', 'Dr. Robert Kim'],
      pages: 15,
      thumbnail: 'solar'
    },
    {
      id: 4,
      title: 'Graphene Composites for Aerospace Applications',
      topic: 'Advanced Materials',
      year: 2024,
      method: 'Analytical',
      authors: ['Dr. Sarah Johnson', 'Dr. Elena Rodriguez'],
      pages: 22,
      thumbnail: 'graphene'
    },
    {
      id: 5,
      title: 'Quantum Error Correction Algorithms',
      topic: 'Quantum Computing',
      year: 2025,
      method: 'Simulation',
      authors: ['Dr. James Wilson', 'Prof. Michael Chen'],
      pages: 25,
      thumbnail: 'quantum'
    },
    {
      id: 6,
      title: 'Federated Learning for Healthcare Data',
      topic: 'AI & Machine Learning',
      year: 2023,
      method: 'Survey',
      authors: ['Dr. Robert Kim', 'Dr. Priya Sharma'],
      pages: 14,
      thumbnail: 'federated'
    },
    {
      id: 7,
      title: 'Biodegradable Plastics from Agricultural Waste',
      topic: 'Advanced Materials',
      year: 2023,
      method: 'Experimental',
      authors: ['Dr. Elena Rodriguez', 'Dr. Sarah Johnson'],
      pages: 16,
      thumbnail: 'bioplastic'
    },
    {
      id: 8,
      title: 'Wind Turbine Blade Design Optimization',
      topic: 'Energy & CleanTech',
      year: 2022,
      method: 'Case Study',
      authors: ['Dr. Priya Sharma', 'Dr. James Wilson'],
      pages: 20,
      thumbnail: 'wind'
    }
  ];

  // Filter briefs based on selections
  const filteredBriefs = briefs.filter(brief => {
    const topicMatch = selectedTopic === 'all' || brief.topic.toLowerCase().includes(selectedTopic.toLowerCase());
    const yearMatch = selectedYear === 'all' || brief.year.toString() === selectedYear;
    const methodMatch = selectedMethod === 'all' || brief.method.toLowerCase().includes(selectedMethod.toLowerCase());
    return topicMatch && yearMatch && methodMatch;
  });

  // Get file type icon
  const getFileTypeIcon = (extension) => {
    switch (extension.toLowerCase()) {
      case 'pdf':
        return (
          <div className="w-10 h-10 rounded-md bg-red-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'ppt':
      case 'pptx':
        return (
          <div className="w-10 h-10 rounded-md bg-orange-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'doc':
      case 'docx':
        return (
          <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">📚 Downloadable Research Briefs</h1>
      
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            {topics.map(topic => (
              <option key={topic.id} value={topic.id}>{topic.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map(year => (
              <option key={year.id} value={year.id}>{year.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
          >
            {methods.map(method => (
              <option key={method.id} value={method.id}>{method.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Briefs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBriefs.map((brief) => (
          <div key={brief.id} className="bg-white rounded-lg shadow p-6 border border-orange-100 hover:border-orange-300 transition-colors duration-150">
            <div className="flex items-start mb-4">
              {getFileTypeIcon('pdf')}
              <div className="ml-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-900">{brief.title}</h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    {brief.topic}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    {brief.year}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                    {brief.method}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Authors:</span> {brief.authors.join(', ')}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Pages:</span> {brief.pages}
              </p>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-grow bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                PDF
              </button>
              <button className="bg-white hover:bg-gray-50 border border-orange-500 text-orange-600 py-2 px-3 rounded-md text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                PPT
              </button>
              <button className="bg-white hover:bg-gray-50 border border-orange-500 text-orange-600 py-2 px-3 rounded-md text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                DOC
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Library Statistics */}
      <div className="mt-8 bg-white rounded-lg shadow p-6 border border-orange-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Research Briefs Library</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">{briefs.length}</p>
            <p className="text-sm text-gray-600">Total Briefs</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">
              {new Set(briefs.map(b => b.topic)).size}
            </p>
            <p className="text-sm text-gray-600">Topics</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">
              {new Set(briefs.map(b => b.authors).flat()).size}
            </p>
            <p className="text-sm text-gray-600">Researchers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">
              {briefs.reduce((sum, b) => sum + b.pages, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Pages</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">
              {briefs.filter(b => b.year === 2025).length}
            </p>
            <p className="text-sm text-gray-600">This Year</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchBriefs;