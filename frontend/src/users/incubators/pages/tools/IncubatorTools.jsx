import React, { useState } from 'react';

const IncubatorTools = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for tools
  const tools = [
    { 
      id: 1, 
      name: 'Accelerator Program Template', 
      category: 'templates', 
      fileType: 'DOCX', 
      icon: '📋',
      description: 'Comprehensive 12-week accelerator program framework',
      preview: 'Includes milestone tracking, mentor scheduling, and evaluation criteria'
    },
    { 
      id: 2, 
      name: 'Startup Evaluation Matrix', 
      category: 'templates', 
      fileType: 'XLSX', 
      icon: '📊',
      description: 'Scoring matrix for assessing startup potential',
      preview: 'Evaluates market potential, team strength, and financial projections'
    },
    { 
      id: 3, 
      name: 'Mentor Feedback Form', 
      category: 'templates', 
      fileType: 'DOCX', 
      icon: '📝',
      description: 'Structured feedback form for mentor sessions',
      preview: 'Covers progress assessment, recommendations, and action items'
    },
    { 
      id: 4, 
      name: 'Regulatory Compliance Checklist', 
      category: 'compliance', 
      fileType: 'PDF', 
      icon: '✅',
      description: 'Complete checklist for regulatory requirements',
      preview: 'Covers FDA, SEC, and industry-specific compliance areas'
    },
    { 
      id: 5, 
      name: 'Financial Projection Model', 
      category: 'financial', 
      fileType: 'XLSX', 
      icon: '💰',
      description: '5-year financial forecasting spreadsheet',
      preview: 'Includes revenue forecasts, expense tracking, and break-even analysis'
    },
    { 
      id: 6, 
      name: 'Investor Pitch Deck', 
      category: 'templates', 
      fileType: 'PPTX', 
      icon: '📺',
      description: 'Professional pitch deck template',
      preview: '10-slide structure for investor presentations'
    },
    { 
      id: 7, 
      name: 'NDAs and Legal Forms', 
      category: 'legal', 
      fileType: 'PDF', 
      icon: '⚖️',
      description: 'Standard legal documents for startup engagement',
      preview: 'Includes IP agreements, partnership contracts, and employment docs'
    },
    { 
      id: 8, 
      name: 'Industry Policy Guidelines', 
      category: 'legal', 
      fileType: 'PDF', 
      icon: '📚',
      description: 'Regulatory policies by industry sector',
      preview: 'Healthcare, fintech, and cleantech policy summaries'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tools', count: tools.length },
    { id: 'templates', name: 'Templates', count: tools.filter(tool => tool.category === 'templates').length },
    { id: 'documents', name: 'Documents', count: tools.filter(tool => tool.category === 'documents').length },
    { id: 'legal', name: 'Legal', count: tools.filter(tool => tool.category === 'legal').length },
    { id: 'compliance', name: 'Compliance', count: tools.filter(tool => tool.category === 'compliance').length },
    { id: 'financial', name: 'Financial', count: tools.filter(tool => tool.category === 'financial').length }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeFilter === 'all' || tool.category === activeFilter;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToWorkspace = (toolId) => {
    // In a real app, this would add the tool to the startup's workspace
    alert(`Added ${tools.find(t => t.id === toolId).name} to workspace!`);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Incubator Tools Library</h1>
        <p className="text-gray-600">Access templates, documents, and resources for your program</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tools..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-3 text-gray-400">
            🔍
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === category.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="text-3xl">{tool.icon}</div>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded">
                {tool.fileType}
              </span>
            </div>
            
            <h3 className="font-bold text-gray-800 mb-2">{tool.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
            
            <div className="bg-gray-50 p-3 rounded mb-4">
              <p className="text-xs text-gray-500 mb-1">PREVIEW</p>
              <p className="text-sm text-gray-700">{tool.preview}</p>
            </div>
            
            <button
              onClick={() => handleAddToWorkspace(tool.id)}
              className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium"
            >
              Add to Startup Workspace
            </button>
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No tools found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default IncubatorTools;