import React from 'react';

const DataAnalysisTools = () => {
  const tools = [
    {
      id: 1,
      name: 'Statistical Analysis Toolkit',
      description: 'Comprehensive suite for statistical modeling and hypothesis testing',
      category: 'Statistics',
      languages: ['Python', 'R'],
      sandbox: true
    },
    {
      id: 2,
      name: 'ML Model Evaluator',
      description: 'Tool for testing and validating machine learning models',
      category: 'Machine Learning',
      languages: ['Python', 'MATLAB'],
      sandbox: true
    },
    {
      id: 3,
      name: 'Data Cleaning Assistant',
      description: 'Automated tool for identifying and correcting data inconsistencies',
      category: 'Data Processing',
      languages: ['Python', 'SQL'],
      sandbox: true
    },
    {
      id: 4,
      name: 'Visualization Builder',
      description: 'Interactive tool for creating publication-ready charts and graphs',
      category: 'Visualization',
      languages: ['Python', 'JavaScript'],
      sandbox: false
    },
    {
      id: 5,
      name: 'Time Series Analyzer',
      description: 'Specialized tool for temporal data analysis and forecasting',
      category: 'Time Series',
      languages: ['Python', 'R'],
      sandbox: true
    },
    {
      id: 6,
      name: 'Regression Model Builder',
      description: 'Tool for constructing and validating regression models',
      category: 'Statistics',
      languages: ['Python', 'MATLAB'],
      sandbox: true
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">📊 Data Analysis Tools</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-lg shadow p-6 border border-orange-100 hover:border-orange-300 transition-all duration-200">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {tool.category}
              </span>
              {tool.languages.map((lang, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {lang}
                </span>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-grow bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium">
                Launch Tool
              </button>
              {tool.sandbox && (
                <button className="bg-white hover:bg-gray-50 border border-orange-500 text-orange-600 py-2 px-4 rounded-md text-sm font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
                  </svg>
                  Sandbox
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Sandbox Feature Explanation */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">🔒 Secure Sandbox Environment</h3>
        <p className="text-gray-700 mb-3">
          Our sandbox environment allows you to test tools with your data in a secure, isolated environment. 
          Your data never leaves your browser and all processing happens locally.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 font-bold text-lg mb-1">🛡️ Isolated</div>
            <p className="text-sm text-gray-600">Fully isolated environment with no external data access</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 font-bold text-lg mb-1">⚡ Fast</div>
            <p className="text-sm text-gray-600">Runs directly in your browser with no server delays</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 font-bold text-lg mb-1">🔄 Exportable</div>
            <p className="text-sm text-gray-600">Easily export results to your preferred format</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysisTools;