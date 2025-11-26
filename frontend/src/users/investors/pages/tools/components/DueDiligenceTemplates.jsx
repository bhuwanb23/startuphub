import React, { useState } from 'react';

const DueDiligenceTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    { id: 'all', name: 'All Templates', count: 24 },
    { id: 'legal', name: 'Legal', count: 6 },
    { id: 'financial', name: 'Financial', count: 8 },
    { id: 'technical', name: 'Technical', count: 5 },
    { id: 'compliance', name: 'Compliance', count: 5 }
  ];
  
  const templates = [
    {
      id: 1,
      name: 'Cap Table Template',
      category: 'financial',
      description: 'Standard capitalization table format for tracking ownership',
      type: 'xlsx',
      downloads: 1240,
      preview: '📊'
    },
    {
      id: 2,
      name: 'Financial Model Template',
      category: 'financial',
      description: '5-year financial projection model with key assumptions',
      type: 'xlsx',
      downloads: 980,
      preview: '📈'
    },
    {
      id: 3,
      name: 'IP Audit Checklist',
      category: 'legal',
      description: 'Comprehensive checklist for intellectual property review',
      type: 'pdf',
      downloads: 750,
      preview: '📜'
    },
    {
      id: 4,
      name: 'Term Sheet Framework',
      category: 'legal',
      description: 'Standard term sheet with key negotiation points',
      type: 'docx',
      downloads: 1120,
      preview: '📝'
    },
    {
      id: 5,
      name: 'Technology Assessment',
      category: 'technical',
      description: 'Framework for evaluating technical architecture and scalability',
      type: 'pdf',
      downloads: 680,
      preview: '💻'
    },
    {
      id: 6,
      name: 'Regulatory Compliance Matrix',
      category: 'compliance',
      description: 'Industry-specific regulatory requirements checklist',
      type: 'xlsx',
      downloads: 540,
      preview: '📋'
    },
    {
      id: 7,
      name: 'Customer Due Diligence',
      category: 'financial',
      description: 'Template for verifying customer contracts and revenue',
      type: 'docx',
      downloads: 890,
      preview: '👥'
    },
    {
      id: 8,
      name: 'Board Meeting Agenda',
      category: 'legal',
      description: 'Standard agenda format for board meetings',
      type: 'docx',
      downloads: 420,
      preview: '📅'
    }
  ];
  
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const getCategoryColor = (category) => {
    switch (category) {
      case 'legal': return 'bg-blue-100 text-blue-800';
      case 'financial': return 'bg-green-100 text-green-800';
      case 'technical': return 'bg-purple-100 text-purple-800';
      case 'compliance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'docx': return '📝';
      case 'xlsx': return '📊';
      default: return '📎';
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Due Diligence Templates</h2>
        <p className="text-gray-600">Downloadable templates for streamlining your due diligence process</p>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
              <div className="absolute left-3 top-3.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all">
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div className="text-3xl">{template.preview}</div>
                <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(template.category)}`}>
                  {categories.find(c => c.id === template.category)?.name}
                </span>
              </div>
              
              <h3 className="font-bold text-gray-800 mt-3">{template.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{template.description}</p>
              
              <div className="flex items-center mt-4 text-sm text-gray-500">
                <span>{getTypeIcon(template.type)} .{template.type}</span>
                <span className="mx-2">•</span>
                <span>⬇️ {template.downloads} downloads</span>
              </div>
            </div>
            
            <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
              <button className="text-sm text-[#FF6A00] hover:text-[#e05500] font-medium">
                Preview
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Popular Templates Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Most Popular Templates</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates
            .sort((a, b) => b.downloads - a.downloads)
            .slice(0, 4)
            .map((template) => (
              <div key={`popular-${template.id}`} className="flex items-center p-3 border border-gray-200 rounded-lg">
                <div className="text-2xl mr-3">{template.preview}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{template.name}</h4>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span>{getTypeIcon(template.type)} .{template.type}</span>
                    <span className="mx-2">•</span>
                    <span>⬇️ {template.downloads} downloads</span>
                  </div>
                </div>
                <button className="px-3 py-1 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded text-sm">
                  Download
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DueDiligenceTemplates;