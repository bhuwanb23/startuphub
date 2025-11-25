import React, { useState } from 'react';

const DesignAssets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  
  // Mock data for design assets
  const assets = [
    {
      id: 1,
      name: 'Brand Logo Pack',
      category: 'Logos',
      format: 'SVG',
      size: '2.4 MB',
      downloads: 1540,
      likes: 280,
      tags: ['Logo', 'Branding', 'Vector'],
      preview: '🔷',
      colorPalette: ['#FF8C42', '#FF6A00', '#F4A300'],
    },
    {
      id: 2,
      name: 'UI Component Kit',
      category: 'UI Kits',
      format: 'Figma',
      size: '15.7 MB',
      downloads: 2100,
      likes: 320,
      tags: ['UI', 'Components', 'Figma'],
      preview: '📱',
      colorPalette: ['#3B82F6', '#10B981', '#8B5CF6'],
    },
    {
      id: 3,
      name: 'Social Media Templates',
      category: 'Templates',
      format: 'PSD',
      size: '8.2 MB',
      downloads: 980,
      likes: 190,
      tags: ['Social', 'Templates', 'Marketing'],
      preview: '📸',
      colorPalette: ['#EF4444', '#F59E0B', '#10B981'],
    },
    {
      id: 4,
      name: 'Icon Set - Business',
      category: 'Icons',
      format: 'PNG',
      size: '4.6 MB',
      downloads: 1870,
      likes: 240,
      tags: ['Icons', 'Business', 'Flat'],
      preview: '🖼️',
      colorPalette: ['#6B7280', '#4B5563', '#374151'],
    },
    {
      id: 5,
      name: 'Presentation Deck',
      category: 'Templates',
      format: 'PPTX',
      size: '3.8 MB',
      downloads: 1240,
      likes: 180,
      tags: ['Presentation', 'Deck', 'Slides'],
      preview: '📊',
      colorPalette: ['#FF8C42', '#3B82F6', '#10B981'],
    },
    {
      id: 6,
      name: 'Mobile App Wireframes',
      category: 'Wireframes',
      format: 'Sketch',
      size: '12.3 MB',
      downloads: 760,
      likes: 150,
      tags: ['Mobile', 'Wireframes', 'App'],
      preview: '📱',
      colorPalette: ['#8B5CF6', '#EC4899', '#F59E0B'],
    },
    {
      id: 7,
      name: 'Data Visualization Kit',
      category: 'Charts',
      format: 'AI',
      size: '6.9 MB',
      downloads: 890,
      likes: 170,
      tags: ['Charts', 'Data', 'Visualization'],
      preview: '📈',
      colorPalette: ['#10B981', '#3B82F6', '#8B5CF6'],
    },
    {
      id: 8,
      name: 'Typography Guide',
      category: 'Guides',
      format: 'PDF',
      size: '1.8 MB',
      downloads: 1420,
      likes: 210,
      tags: ['Typography', 'Guide', 'Fonts'],
      preview: '🔤',
      colorPalette: ['#000000', '#4B5563', '#9CA3AF'],
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'logos', name: 'Logos' },
    { id: 'ui kits', name: 'UI Kits' },
    { id: 'templates', name: 'Templates' },
    { id: 'icons', name: 'Icons' },
    { id: 'wireframes', name: 'Wireframes' },
    { id: 'charts', name: 'Charts' },
    { id: 'guides', name: 'Guides' },
  ];

  const formats = [
    { id: 'all', name: 'All Formats' },
    { id: 'svg', name: 'SVG' },
    { id: 'figma', name: 'Figma' },
    { id: 'psd', name: 'PSD' },
    { id: 'png', name: 'PNG' },
    { id: 'pptx', name: 'PPTX' },
    { id: 'sketch', name: 'Sketch' },
    { id: 'ai', name: 'AI' },
    { id: 'pdf', name: 'PDF' },
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || asset.category.toLowerCase() === selectedCategory;
    const matchesFormat = selectedFormat === 'all' || asset.format.toLowerCase() === selectedFormat;
    
    return matchesSearch && matchesCategory && matchesFormat;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Design Assets</h1>
        <p className="text-gray-600 mt-1">Downloadable design resources for your startup</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Design Insight</h2>
            <p className="text-gray-700 mt-1">
              The UI Component Kit is our most popular asset with 2,100 downloads. 
              It includes 120+ components built with our brand colors and follows modern design principles.
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
                placeholder="Search design assets..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {formats.map(format => (
                <option key={format.id} value={format.id}>
                  {format.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Design Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="text-4xl">{asset.preview}</div>
              <div className="flex items-center gap-1">
                <span className="text-red-500">❤️</span>
                <span className="text-sm text-gray-600">{asset.likes}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">{asset.name}</h3>
              <div className="flex items-center mt-1">
                <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                  {asset.category}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-xs text-gray-500">{asset.format}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-xs text-gray-500">{asset.size}</span>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                {asset.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Color Palette */}
            <div className="mt-4">
              <div className="text-xs text-gray-500 mb-1">Color Palette</div>
              <div className="flex gap-1">
                {asset.colorPalette.map((color, index) => (
                  <div 
                    key={index} 
                    className="w-6 h-6 rounded border border-gray-200"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div>⬇️ {asset.downloads.toLocaleString()} downloads</div>
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

      {/* Design Assets Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Design Assets Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">64</div>
            <div className="text-sm text-gray-600">Total Assets</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">18.4K</div>
            <div className="text-sm text-gray-600">Total Downloads</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">4.7</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">12</div>
            <div className="text-sm text-gray-600">Asset Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignAssets;