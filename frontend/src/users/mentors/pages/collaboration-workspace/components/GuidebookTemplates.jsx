import React, { useState } from 'react';

const GuidebookTemplates = () => {
  const [templates] = useState([
    {
      id: 1,
      name: 'SWOT Analysis',
      category: 'Strategic Planning',
      description: 'Comprehensive framework for evaluating strengths, weaknesses, opportunities, and threats',
      icon: '🔍',
      color: 'bg-blue-100'
    },
    {
      id: 2,
      name: 'OKRs Framework',
      category: 'Goal Setting',
      description: 'Objectives and Key Results methodology for goal alignment and tracking',
      icon: '🎯',
      color: 'bg-green-100'
    },
    {
      id: 3,
      name: 'Product Roadmap',
      category: 'Product Planning',
      description: 'Visual timeline for product development and feature prioritization',
      icon: '🛣️',
      color: 'bg-purple-100'
    },
    {
      id: 4,
      name: 'Pitch Structure',
      category: 'Fundraising',
      description: 'Proven template for creating compelling investor presentations',
      icon: '📋',
      color: 'bg-orange-100'
    },
    {
      id: 5,
      name: 'Business Model Canvas',
      category: 'Business Planning',
      description: 'Strategic management template for developing business models',
      icon: '📊',
      color: 'bg-yellow-100'
    },
    {
      id: 6,
      name: 'Customer Journey Map',
      category: 'Marketing',
      description: 'Visual representation of customer experience across touchpoints',
      icon: '👥',
      color: 'bg-pink-100'
    }
  ]);

  const [categories] = useState([
    'All', 'Strategic Planning', 'Goal Setting', 'Product Planning', 'Fundraising', 'Business Planning', 'Marketing'
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (template) => {
    alert(`Opening editor for ${template.name} template...`);
    // In a real implementation, this would open a document editor with the template
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Guidebook & Framework Templates</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 text-sm rounded-full ${
              selectedCategory === category
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <div className={`w-12 h-12 ${template.color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
              {template.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{template.name}</h3>
            <span className="inline-block px-2 py-1 bg-[#FFF9F0] text-[#FF6A00] rounded-full text-xs font-medium mb-3">
              {template.category}
            </span>
            <p className="text-gray-600 text-sm mb-4">{template.description}</p>
            <button
              onClick={() => handleUseTemplate(template)}
              className="w-full py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium"
            >
              Use Template
            </button>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No templates found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default GuidebookTemplates;