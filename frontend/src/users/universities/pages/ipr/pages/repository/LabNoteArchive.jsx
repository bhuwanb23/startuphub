import React, { useState } from 'react';

const LabNoteArchive = () => {
  const [notes, setNotes] = useState([
    { 
      id: 1, 
      title: 'Drug Synthesis Protocol v1.2', 
      date: '2023-07-15',
      author: 'Dr. Sarah Johnson',
      department: 'Biotechnology',
      version: '1.2',
      status: 'Approved'
    },
    { 
      id: 2, 
      title: 'Battery Composition Analysis', 
      date: '2023-07-10',
      author: 'Prof. Michael Chen',
      department: 'Chemical Engineering',
      version: '1.0',
      status: 'Draft'
    },
    { 
      id: 3, 
      title: 'Quantum Algorithm Optimization', 
      date: '2023-07-05',
      author: 'Dr. Emily Rodriguez',
      department: 'Computer Science',
      version: '2.1',
      status: 'Reviewed'
    }
  ]);

  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    department: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      id: notes.length + 1,
      ...newNote,
      date: new Date().toISOString().split('T')[0],
      author: 'Current User',
      version: '1.0',
      status: 'Draft'
    };
    setNotes([...notes, note]);
    setNewNote({
      title: '',
      content: '',
      department: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Reviewed': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Lab Note Archive</h1>
        <p className="text-gray-600">Notebook-style digital log with version control</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Note Form */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Create New Lab Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Note Title</label>
              <input
                type="text"
                name="title"
                value={newNote.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name="department"
                value={newNote.department}
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
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                name="content"
                value={newNote.content}
                onChange={handleInputChange}
                rows={6}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
                placeholder="Enter your lab notes here..."
                required
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-[#F4A300] hover:bg-[#F26B1D] text-white py-2 rounded-lg transition-colors"
            >
              Save Lab Note
            </button>
          </form>
        </div>

        {/* Notes List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Archived Lab Notes</h2>
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Search notes..."
                className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#F4A300] focus:border-transparent"
              />
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg transition-colors">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{note.title}</h3>
                  <div className="flex space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(note.status)}`}>
                      {note.status}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      v{note.version}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>{note.author}</span>
                  <span>{note.department}</span>
                  <span>{note.date}</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="text-[#F4A300] hover:text-[#F26B1D] text-sm font-medium">
                    View
                  </button>
                  <button className="text-[#F4A300] hover:text-[#F26B1D] text-sm font-medium">
                    Edit
                  </button>
                  <button className="text-[#F4A300] hover:text-[#F26B1D] text-sm font-medium">
                    Version History
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Version Control Panel */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Version Control</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800 mb-1">42</div>
            <div className="text-sm text-gray-600">Total Notes</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800 mb-1">18</div>
            <div className="text-sm text-gray-600">Active Versions</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800 mb-1">7</div>
            <div className="text-sm text-gray-600">Archived Versions</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800 mb-1">3</div>
            <div className="text-sm text-gray-600">Departments</div>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-3">
          <button className="bg-[#F4A300] hover:bg-[#F26B1D] text-white px-4 py-2 rounded-lg transition-colors">
            Export Archive
          </button>
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
            Compare Versions
          </button>
        </div>
      </div>
    </div>
  );
};

export default LabNoteArchive;