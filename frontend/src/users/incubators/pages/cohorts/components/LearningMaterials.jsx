import React, { useState } from 'react';

const LearningMaterials = () => {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: "Business Model Canvas Template",
      description: "Complete template for mapping your business model",
      category: "Templates",
      fileType: "PDF",
      size: "2.4 MB",
      uploadedBy: "Sarah Johnson",
      uploadDate: "2025-06-10",
      downloads: 42
    },
    {
      id: 2,
      title: "Market Research Guide",
      description: "Step-by-step guide to conducting market research",
      category: "Guides",
      fileType: "DOCX",
      size: "1.8 MB",
      uploadedBy: "Michael Chen",
      uploadDate: "2025-06-12",
      downloads: 38
    },
    {
      id: 3,
      title: "Financial Projection Template",
      description: "Excel template for creating financial projections",
      category: "Templates",
      fileType: "XLSX",
      size: "3.1 MB",
      uploadedBy: "David Wilson",
      uploadDate: "2025-06-14",
      downloads: 56
    },
    {
      id: 4,
      title: "Pitch Deck Examples",
      description: "Successful pitch deck examples from previous cohorts",
      category: "Examples",
      fileType: "PPTX",
      size: "5.2 MB",
      uploadedBy: "Emma Rodriguez",
      uploadDate: "2025-06-15",
      downloads: 67
    },
    {
      id: 5,
      title: "Customer Interview Script",
      description: "Template script for conducting customer interviews",
      category: "Templates",
      fileType: "DOCX",
      size: "0.9 MB",
      uploadedBy: "James Miller",
      uploadDate: "2025-06-16",
      downloads: 29
    }
  ]);

  const [newMaterial, setNewMaterial] = useState({
    title: '',
    description: '',
    category: 'Templates',
    file: null
  });

  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories
  const categories = [...new Set(materials.map(material => material.category))];

  // Filter materials based on category and search query
  const filteredMaterials = materials.filter(material => {
    const matchesCategory = filterCategory === 'all' || material.category === filterCategory;
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          material.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMaterial({
        ...newMaterial,
        file: file
      });
    }
  };

  // Handle adding new material
  const handleAddMaterial = () => {
    if (newMaterial.title && newMaterial.file) {
      const material = {
        id: Date.now(),
        title: newMaterial.title,
        description: newMaterial.description,
        category: newMaterial.category,
        fileType: newMaterial.file.name.split('.').pop().toUpperCase(),
        size: `${(newMaterial.file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedBy: "Current User",
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0
      };
      
      setMaterials([...materials, material]);
      setNewMaterial({
        title: '',
        description: '',
        category: 'Templates',
        file: null
      });
    }
  };

  // Handle downloading a material
  const handleDownload = (materialId) => {
    // In a real app, this would trigger a file download
    console.log(`Downloading material ${materialId}`);
    
    // Update download count
    setMaterials(materials.map(material => {
      if (material.id === materialId) {
        return { ...material, downloads: material.downloads + 1 };
      }
      return material;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Learning Materials</h1>
            <p className="text-gray-600">Repository of resources for startups</p>
          </div>
          <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors mt-4 md:mt-0">
            Upload Material
          </button>
        </div>
        
        {/* Upload Form */}
        <div className="border border-gray-200 rounded-2xl p-5 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Upload New Material</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={newMaterial.title}
                onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                placeholder="Enter material title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={newMaterial.category}
                onChange={(e) => setNewMaterial({...newMaterial, category: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              >
                <option value="Templates">Templates</option>
                <option value="Guides">Guides</option>
                <option value="Examples">Examples</option>
                <option value="Research">Research</option>
                <option value="Tools">Tools</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newMaterial.description}
                onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                rows="2"
                placeholder="Enter material description"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
              <div className="flex items-center space-x-3">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                />
                {newMaterial.file && (
                  <span className="text-sm text-gray-600">
                    {newMaterial.file.name} ({(newMaterial.file.size / 1024).toFixed(1)} KB)
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleAddMaterial}
              disabled={!newMaterial.title || !newMaterial.file}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                !newMaterial.title || !newMaterial.file
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#FF6A00] text-white hover:bg-[#e05500]'
              }`}
            >
              Upload Material
            </button>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex flex-wrap gap-3 mb-4 md:mb-0">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              placeholder="Search materials..."
            />
          </div>
        </div>
        
        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map(material => (
            <div key={material.id} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-50 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{material.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{material.description}</p>
                  </div>
                  <span className="bg-[#FF6A00] text-white text-xs px-2 py-1 rounded-full">
                    {material.fileType}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {material.category}
                  </span>
                  <span className="text-xs text-gray-500">{material.size}</span>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                  <span>By {material.uploadedBy}</span>
                  <span>{material.uploadDate}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    ↓ {material.downloads} downloads
                  </span>
                  <button
                    onClick={() => handleDownload(material.id)}
                    className="bg-[#FF6A00] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#e05500] transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredMaterials.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No materials found matching your criteria</p>
          </div>
        )}
      </div>
      
      {/* Category Statistics */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Material Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map(category => {
            const count = materials.filter(m => m.category === category).length;
            return (
              <div key={category} className="border border-gray-200 rounded-xl p-4 text-center">
                <h3 className="font-medium text-gray-800">{category}</h3>
                <p className="text-2xl font-bold text-[#FF6A00] mt-1">{count}</p>
                <p className="text-xs text-gray-500">materials</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningMaterials;