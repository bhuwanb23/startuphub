import React, { useState } from 'react';

const PrototypeSubmission = () => {
  const [prototypes, setPrototypes] = useState([
    { 
      id: 1, 
      title: 'AI-Powered Drug Discovery Platform', 
      description: 'Machine learning algorithms for accelerating drug discovery process', 
      department: 'Biotechnology',
      trl: 7,
      images: 3,
      videos: 1
    },
    { 
      id: 2, 
      title: 'Sustainable Energy Storage System', 
      description: 'Advanced battery technology with 3x longer lifespan', 
      department: 'Chemical Engineering',
      trl: 6,
      images: 5,
      videos: 2
    },
    { 
      id: 3, 
      title: 'Quantum Computing Algorithms', 
      description: 'Breakthrough algorithms for optimization problems', 
      department: 'Computer Science',
      trl: 5,
      images: 2,
      videos: 0
    }
  ]);

  const [newPrototype, setNewPrototype] = useState({
    title: '',
    description: '',
    department: '',
    trl: 1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrototype({
      ...newPrototype,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prototype = {
      id: prototypes.length + 1,
      ...newPrototype,
      images: 0,
      videos: 0
    };
    setPrototypes([...prototypes, prototype]);
    setNewPrototype({
      title: '',
      description: '',
      department: '',
      trl: 1
    });
  };

  const getTRLColor = (trl) => {
    if (trl >= 7) return 'bg-green-100 text-green-800';
    if (trl >= 5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Prototype Submission</h1>
        <p className="text-gray-600">Submit and manage research prototypes with TRL assignment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submission Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Submit New Prototype</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Prototype Title</label>
              <input
                type="text"
                name="title"
                value={newPrototype.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={newPrototype.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
                required
              ></textarea>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  name="department"
                  value={newPrototype.department}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="Chemical Engineering">Chemical Engineering</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Materials Science">Materials Science</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">TRL Level</label>
                <select
                  name="trl"
                  value={newPrototype.trl}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
                  required
                >
                  <option value={1}>TRL 1 - Basic Principles</option>
                  <option value={2}>TRL 2 - Technology Concept</option>
                  <option value={3}>TRL 3 - Experimental Proof</option>
                  <option value={4}>TRL 4 - Technology Validation</option>
                  <option value={5}>TRL 5 - Technology Prototype</option>
                  <option value={6}>TRL 6 - System Prototype</option>
                  <option value={7}>TRL 7 - System Prototype Demo</option>
                  <option value={8}>TRL 8 - Actual System Completed</option>
                  <option value={9}>TRL 9 - Actual System Proven</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Media</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex justify-center space-x-4">
                  <button type="button" className="text-[#F4A300] hover:text-[#F26B1D] font-medium">
                    Upload Images
                  </button>
                  <span className="text-gray-400">|</span>
                  <button type="button" className="text-[#F4A300] hover:text-[#F26B1D] font-medium">
                    Upload Videos
                  </button>
                </div>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-[#F4A300] hover:bg-[#F26B1D] text-white py-2 rounded-lg transition-colors"
            >
              Submit Prototype
            </button>
          </form>
        </div>

        {/* Prototype List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Submitted Prototypes</h2>
          <div className="space-y-4">
            {prototypes.map((prototype) => (
              <div key={prototype.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{prototype.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getTRLColor(prototype.trl)}`}>
                    TRL {prototype.trl}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{prototype.description}</p>
                
                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                  <span>{prototype.department}</span>
                  <div className="flex space-x-3">
                    <span>{prototype.images} images</span>
                    <span>{prototype.videos} videos</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="text-[#F4A300] hover:text-[#F26B1D] text-sm font-medium">
                    View Details
                  </button>
                  <button className="text-[#F4A300] hover:text-[#F26B1D] text-sm font-medium">
                    Edit
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrototypeSubmission;