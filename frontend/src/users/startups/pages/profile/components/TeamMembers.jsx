import React, { useState } from 'react';

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      email: 'alex@innovatex.com',
      linkedin: 'https://linkedin.com/in/alexjohnson',
      photo: '',
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'CTO',
      email: 'sarah@innovatex.com',
      linkedin: 'https://linkedin.com/in/sarahwilliams',
      photo: '',
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Head of Product',
      email: 'michael@innovatex.com',
      linkedin: 'https://linkedin.com/in/michaelchen',
      photo: '',
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    email: '',
    linkedin: '',
  });

  const handleAddMember = (e) => {
    e.preventDefault();
    const member = {
      id: teamMembers.length + 1,
      ...newMember,
    };
    setTeamMembers([...teamMembers, member]);
    setNewMember({ name: '', role: '', email: '', linkedin: '' });
    setShowAddForm(false);
  };

  const handleRemoveMember = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
          <p className="text-gray-600 mt-1">Manage your startup's core team information</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mt-4 md:mt-0 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
        >
          {showAddForm ? 'Cancel' : 'Add Member'}
        </button>
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Team Member</h2>
          <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={newMember.name}
                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                id="role"
                value={newMember.role}
                onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={newMember.email}
                onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                required
              />
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn Profile
              </label>
              <input
                type="url"
                id="linkedin"
                value={newMember.linkedin}
                onChange={(e) => setNewMember({...newMember, linkedin: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
              >
                Add Member
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Team Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] flex items-center justify-center text-white font-bold text-xl">
                  {member.name.charAt(0)}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-bold text-gray-800">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                  <a href={`mailto:${member.email}`} className="text-[#FF6A00] text-sm hover:underline">
                    {member.email}
                  </a>
                </div>
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-gray-600 hover:text-[#FF6A00]"
                >
                  <span>LinkedIn Profile</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;