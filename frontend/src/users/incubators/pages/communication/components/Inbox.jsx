import React, { useState } from 'react';

const Inbox = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for emails
  const emails = [
    { 
      id: 1, 
      sender: 'John Smith (Startup Alpha)', 
      subject: 'Weekly Progress Update', 
      preview: 'We\'ve completed the prototype testing phase...', 
      time: '10:30 AM', 
      read: true, 
      category: 'startup',
      attachments: 2
    },
    { 
      id: 2, 
      sender: 'Sarah Johnson (Mentor)', 
      subject: 'Mentorship Session Feedback', 
      preview: 'Great progress on your business model...', 
      time: 'Yesterday', 
      read: false, 
      category: 'mentor',
      attachments: 0
    },
    { 
      id: 3, 
      sender: 'TechIncubator Team', 
      subject: 'Upcoming Demo Day Information', 
      preview: 'Save the date for our quarterly demo day...', 
      time: 'Jun 12', 
      read: false, 
      category: 'incubator',
      attachments: 1
    },
    { 
      id: 4, 
      sender: 'Michael Chen (Startup Beta)', 
      subject: 'Partnership Opportunity', 
      preview: 'We\'d like to propose a collaboration...', 
      time: 'Jun 10', 
      read: true, 
      category: 'startup',
      attachments: 0
    },
    { 
      id: 5, 
      sender: 'Dr. Emily Wilson (Advisor)', 
      subject: 'Research Paper Review', 
      preview: 'I\'ve reviewed your technical documentation...', 
      time: 'Jun 8', 
      read: true, 
      category: 'mentor',
      attachments: 3
    }
  ];

  const filters = [
    { id: 'all', name: 'All Messages' },
    { id: 'incubator', name: 'From Incubator' },
    { id: 'startup', name: 'From Startups' },
    { id: 'mentor', name: 'From Mentors' }
  ];

  const filteredEmails = emails.filter(email => {
    const matchesFilter = activeFilter === 'all' || email.category === activeFilter;
    const matchesSearch = email.sender.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          email.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Inbox</h2>
        <p className="text-gray-600">Email-style communication center</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-3 text-gray-400">
            🔍
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>

      {/* Email List */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {filteredEmails.map((email) => (
          <div 
            key={email.id} 
            className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
              !email.read ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex justify-between">
              <div className="flex items-center">
                {!email.read && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                )}
                <h3 className={`font-medium ${!email.read ? 'text-gray-900' : 'text-gray-700'}`}>
                  {email.sender}
                </h3>
              </div>
              <span className="text-sm text-gray-500">{email.time}</span>
            </div>
            
            <h4 className={`font-medium mt-1 ${!email.read ? 'text-gray-900' : 'text-gray-700'}`}>
              {email.subject}
            </h4>
            
            <p className="text-gray-600 text-sm mt-1 truncate">{email.preview}</p>
            
            {email.attachments > 0 && (
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <span>📎</span>
                <span className="ml-1">{email.attachments} attachment{email.attachments > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;