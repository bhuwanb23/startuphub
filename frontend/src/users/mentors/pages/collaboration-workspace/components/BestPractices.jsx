import React, { useState } from 'react';

const BestPractices = () => {
  const [practices, setPractices] = useState([
    { 
      id: 1, 
      title: 'Customer Discovery Playbook', 
      type: 'Playbook', 
      category: 'Product', 
      author: 'Alex Morgan', 
      downloads: 124, 
      rating: 4.8,
      tags: ['customer-interviews', 'validation', 'market-research']
    },
    { 
      id: 2, 
      title: 'Startup Funding Case Study', 
      type: 'Case Study', 
      category: 'Fundraising', 
      author: 'Sarah Johnson', 
      downloads: 89, 
      rating: 4.6,
      tags: ['funding', 'investors', 'pitch-deck']
    },
    { 
      id: 3, 
      title: 'Product Launch Checklist', 
      type: 'Checklist', 
      category: 'Product', 
      author: 'Michael Chen', 
      downloads: 156, 
      rating: 4.9,
      tags: ['launch', 'product-management', 'go-to-market']
    },
    { 
      id: 4, 
      title: 'Scaling Engineering Teams', 
      type: 'Framework', 
      category: 'Tech', 
      author: 'David Kim', 
      downloads: 78, 
      rating: 4.7,
      tags: ['engineering', 'scaling', 'team-structure']
    }
  ]);

  const [collections] = useState([
    { id: 1, name: 'Product Validation', count: 12, color: 'bg-blue-100' },
    { id: 2, name: 'Fundraising Essentials', count: 8, color: 'bg-green-100' },
    { id: 3, name: 'Team Building', count: 15, color: 'bg-purple-100' },
    { id: 4, name: 'Legal Compliance', count: 6, color: 'bg-red-100' }
  ]);

  const [types] = useState(['All', 'Playbook', 'Case Study', 'Checklist', 'Framework']);
  const [categories] = useState(['All', 'Product', 'Fundraising', 'Tech', 'Marketing', 'Legal']);
  
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newPractice, setNewPractice] = useState({
    title: '',
    type: 'Playbook',
    category: 'Product',
    file: null
  });

  const filteredPractices = practices.filter(practice => {
    const matchesType = selectedType === 'All' || practice.type === selectedType;
    const matchesCategory = selectedCategory === 'All' || practice.category === selectedCategory;
    const matchesSearch = practice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          practice.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesCategory && matchesSearch;
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPractice({...newPractice, file: file});
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (newPractice.title && newPractice.file) {
      const practice = {
        id: Date.now(),
        ...newPractice,
        author: 'You',
        downloads: 0,
        rating: 0,
        tags: ['new']
      };
      setPractices([practice, ...practices]);
      setNewPractice({ title: '', type: 'Playbook', category: 'Product', file: null });
      setShowUploadForm(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Playbook': return 'bg-blue-100 text-blue-800';
      case 'Case Study': return 'bg-green-100 text-green-800';
      case 'Checklist': return 'bg-purple-100 text-purple-800';
      case 'Framework': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Product': return 'bg-blue-500';
      case 'Fundraising': return 'bg-green-500';
      case 'Tech': return 'bg-purple-500';
      case 'Marketing': return 'bg-pink-500';
      case 'Legal': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Upload/Share Best Practices</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search best practices..."
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
          <button 
            onClick={() => setShowUploadForm(true)}
            className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Upload
          </button>
        </div>
      </div>

      {showUploadForm && (
        <div className="bg-[#FFF9F0] rounded-xl p-5 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Best Practice</h3>
          <form onSubmit={handleUpload}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newPractice.title}
                  onChange={(e) => setNewPractice({...newPractice, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newPractice.type}
                  onChange={(e) => setNewPractice({...newPractice, type: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                >
                  <option value="Playbook">Playbook</option>
                  <option value="Case Study">Case Study</option>
                  <option value="Checklist">Checklist</option>
                  <option value="Framework">Framework</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newPractice.category}
                  onChange={(e) => setNewPractice({...newPractice, category: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                >
                  <option value="Product">Product</option>
                  <option value="Fundraising">Fundraising</option>
                  <option value="Tech">Tech</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {newPractice.file ? newPractice.file.name : 'Choose file...'}
                  </span>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileUpload}
                    required
                  />
                </label>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors"
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 text-sm rounded-full ${
                selectedType === type
                  ? 'bg-[#FF6A00] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
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
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Curated Collections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((collection) => (
            <div key={collection.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
              <div className={`w-10 h-10 ${collection.color} rounded-lg flex items-center justify-center mb-3`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-800">{collection.name}</h4>
              <p className="text-sm text-gray-600">{collection.count} resources</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Practices Library</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPractices.map((practice) => (
            <div key={practice.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-800">{practice.title}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(practice.type)}`}>
                  {practice.type}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <div className={`w-3 h-3 ${getCategoryColor(practice.category)} rounded-full mr-2`}></div>
                <span className="text-sm text-gray-600">{practice.category}</span>
              </div>
              <div className="flex items-center mt-3 text-sm text-gray-600">
                <span>by {practice.author}</span>
                <span className="mx-2">•</span>
                <span>{practice.downloads} downloads</span>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{practice.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {practice.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors text-sm">
                  Download
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPractices.length === 0 && (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No best practices found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestPractices;