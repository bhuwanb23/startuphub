import React from 'react';

const SimulationTools = () => {
  const tools = [
    {
      id: 1,
      name: 'Physics Simulator',
      description: 'Advanced physics engine for mechanical and electromagnetic simulations',
      category: 'Physics',
      complexity: 'High',
      launch: true
    },
    {
      id: 2,
      name: 'Chemical Reaction Simulator',
      description: 'Molecular dynamics tool for simulating chemical reactions',
      category: 'Chemistry',
      complexity: 'High',
      launch: true
    },
    {
      id: 3,
      name: 'Neural Network Simulator',
      description: 'Tool for simulating artificial neural networks and brain models',
      category: 'Neuroscience',
      complexity: 'Medium',
      launch: true
    },
    {
      id: 4,
      name: 'System Modeling Tool',
      description: 'Comprehensive tool for modeling complex systems and processes',
      category: 'Systems',
      complexity: 'High',
      launch: true
    },
    {
      id: 5,
      name: 'Fluid Dynamics Simulator',
      description: 'Computational fluid dynamics tool for liquid and gas simulations',
      category: 'Physics',
      complexity: 'High',
      launch: false
    },
    {
      id: 6,
      name: 'Population Dynamics Modeler',
      description: 'Tool for simulating biological and social population changes',
      category: 'Biology',
      complexity: 'Medium',
      launch: true
    }
  ];

  // Get complexity color
  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">💻 Simulation Tools</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-lg shadow p-6 border border-orange-100 hover:border-orange-300 transition-all duration-200">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
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
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getComplexityColor(tool.complexity)}`}>
                {tool.complexity} Complexity
              </span>
            </div>
            
            {tool.launch ? (
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Launch Simulation
              </button>
            ) : (
              <button className="w-full bg-gray-200 text-gray-500 py-2 px-4 rounded-md text-sm font-medium cursor-not-allowed" disabled>
                Coming Soon
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* Simulation Best Practices */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-6 border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">📘 Simulation Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 font-bold text-lg mb-2">1. Validate Inputs</div>
            <p className="text-sm text-gray-600">Ensure all input parameters are accurate and based on empirical data.</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 font-bold text-lg mb-2">2. Verify Outputs</div>
            <p className="text-sm text-gray-600">Cross-check simulation results with known benchmarks or analytical solutions.</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="text-orange-600 font-bold text-lg mb-2">3. Document Assumptions</div>
            <p className="text-sm text-gray-600">Clearly document all assumptions and simplifications made in the model.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationTools;