import React, { useState } from 'react';

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock data for templates
  const templates = [
    {
      id: 1,
      name: 'Business Plan Template',
      category: 'Business',
      type: 'Document',
      format: 'DOCX',
      size: '1.2 MB',
      downloads: 1240,
      rating: 4.8,
      tags: ['Startup', 'Planning', 'Finance'],
      preview: '📄',
    },
    {
      id: 2,
      name: 'Pitch Deck Template',
      category: 'Presentation',
      type: 'Presentation',
      format: 'PPTX',
      size: '2.5 MB',
      downloads: 2100,
      rating: 4.9,
      tags: ['Investor', 'Pitch', 'Funding'],
      preview: '📊',
    },
    {
      id: 3,
      name: 'Financial Model Template',
      category: 'Finance',
      type: 'Spreadsheet',
      format: 'XLSX',
      size: '0.8 MB',
      downloads: 890,
      rating: 4.7,
      tags: ['Finance', 'Projection', 'Modeling'],
      preview: '💰',
    },
    {
      id: 4,
      name: 'User Research Template',
      category: 'Product',
      type: 'Document',
      format: 'DOCX',
      size: '0.9 MB',
      downloads: 750,
      rating: 4.6,
      tags: ['UX', 'Research', 'Design'],
      preview: '👥',
    },
    {
      id: 5,
      name: 'Marketing Plan Template',
      category: 'Marketing',
      type: 'Document',
      format: 'DOCX',
      size: '1.1 MB',
      downloads: 1420,
      rating: 4.7,
      tags: ['Marketing', 'Strategy', 'Campaign'],
      preview: '📈',
    },
    {
      id: 6,
      name: 'Legal Agreement Templates',
      category: 'Legal',
      type: 'Document',
      format: 'ZIP',
      size: '3.2 MB',
      downloads: 980,
      rating: 4.8,
      tags: ['Legal', 'Contract', 'Agreement'],
      preview: '⚖️',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'business', name: 'Business' },
    { id: 'presentation', name: 'Presentation' },
    { id: 'finance', name: 'Finance' },
    { id: 'product', name: 'Product' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'legal', name: 'Legal' },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Templates</h1>
        <p className="text-gray-600 mt-1">Downloadable business templates for startups</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Template Insight</h2>
            <p className="text-gray-700 mt-1">
              The Pitch Deck Template is our most popular resource with 2,100 downloads. 
              It follows the classic 10-slide structure and has a 4.9 rating from users.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search templates..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === category.id
                    ? 'bg-[#FF6A00] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="text-4xl">{template.preview}</div>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="font-bold text-gray-800">{template.rating}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">{template.name}</h3>
              <div className="flex items-center mt-1">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {template.category}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-xs text-gray-500">{template.format}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-xs text-gray-500">{template.size}</span>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                {template.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div>⬇️ {template.downloads.toLocaleString()} downloads</div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
                Download
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Template Library Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Template Library Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">42</div>
            <div className="text-sm text-gray-600">Total Templates</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">12.4K</div>
            <div className="text-sm text-gray-600">Total Downloads</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">4.8</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">85%</div>
            <div className="text-sm text-gray-600">User Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;