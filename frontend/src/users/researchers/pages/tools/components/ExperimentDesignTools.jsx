import React from 'react';

const ExperimentDesignTools = () => {
  const tools = [
    {
      id: 1,
      name: 'Hypothesis Builder',
      description: 'Tool for formulating and validating research hypotheses',
      features: ['Statistical Power Analysis', 'Effect Size Calculator'],
      status: 'ready'
    },
    {
      id: 2,
      name: 'Experiment Planner',
      description: 'Comprehensive tool for designing experimental protocols',
      features: ['Randomization', 'Blinding Controls', 'Sample Size Calculator'],
      status: 'ready'
    },
    {
      id: 3,
      name: 'Variable Mapping Tool',
      description: 'Visual tool for identifying and mapping experimental variables',
      features: ['Causal Diagrams', 'Confounding Analysis', 'Variable Relationships'],
      status: 'ready'
    },
    {
      id: 4,
      name: 'Outcome Tracker',
      description: 'Tool for monitoring and recording experimental outcomes',
      features: ['Real-time Dashboard', 'Statistical Monitoring', 'Anomaly Detection'],
      status: 'beta'
    },
    {
      id: 5,
      name: 'Control Group Designer',
      description: 'Tool for creating effective control groups',
      features: ['Matching Algorithms', 'Stratification', 'Balance Metrics'],
      status: 'ready'
    },
    {
      id: 6,
      name: 'Experimental Bias Detector',
      description: 'AI-powered tool for identifying potential sources of bias',
      features: ['Selection Bias', 'Measurement Bias', 'Reporting Bias'],
      status: 'beta'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">🔬 Experiment Design Tools</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-lg shadow p-6 border border-orange-100 hover:border-orange-300 transition-all duration-200">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
              {tool.status === 'beta' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 ml-2">
                  Beta
                </span>
              )}
            </div>
            
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Features</h4>
              <ul className="space-y-1">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium">
              Launch {tool.name}
            </button>
          </div>
        ))}
      </div>
      
      {/* Experiment Design Guide */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">📘 Experiment Design Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <h4 className="font-medium text-gray-900 mb-2">1. Define Clear Objectives</h4>
            <p className="text-sm text-gray-600">Start with specific, measurable research questions that guide your experimental design.</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <h4 className="font-medium text-gray-900 mb-2">2. Control for Variables</h4>
            <p className="text-sm text-gray-600">Identify and control confounding variables to ensure valid results.</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <h4 className="font-medium text-gray-900 mb-2">3. Ensure Adequate Sample Size</h4>
            <p className="text-sm text-gray-600">Calculate sample size based on expected effect size and desired statistical power.</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <h4 className="font-medium text-gray-900 mb-2">4. Replicate Experiments</h4>
            <p className="text-sm text-gray-600">Plan for replication to verify results and increase confidence in findings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentDesignTools;