import React, { useState } from 'react';

const Inbox = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const messages = [
    {
      id: 1,
      sender: 'TechFlow Inc.',
      subject: 'Session Follow-up Notes',
      preview: 'Here are the key takeaways from our last session...',
      time: '2 hours ago',
      isImportant: true,
      category: 'mentorship',
      isRead: false
    },
    {
      id: 2,
      sender: 'Sarah Johnson',
      subject: 'Upcoming Product Demo',
      preview: 'We would like to schedule a demo for our new feature...',
      time: '5 hours ago',
      isImportant: false,
      category: 'sessions',
      isRead: true
    },
    {
      id: 3,
      sender: 'GreenEnergy Solutions',
      subject: 'Funding Round Update',
      preview: 'We have secured Series A funding and would like...',
      time: '1 day ago',
      isImportant: true,
      category: 'alerts',
      isRead: false
    },
    {
      id: 4,
      sender: 'HealthTrack',
      subject: 'Milestone Achievement',
      preview: 'We have successfully completed our clinical trials...',
      time: '2 days ago',
      isImportant: false,
      category: 'alerts',
      isRead: true
    },
    {
      id: 5,
      sender: 'FinTech Pro',
      subject: 'Technical Question',
      preview: 'We need guidance on implementing our payment gateway...',
      time: '3 days ago',
      isImportant: false,
      category: 'mentorship',
      isRead: true
    }
  ];

  const filters = [
    { id: 'all', name: 'All Messages', count: messages.length },
    { id: 'mentorship', name: 'Mentorship', count: messages.filter(m => m.category === 'mentorship').length },
    { id: 'sessions', name: 'Sessions', count: messages.filter(m => m.category === 'sessions').length },
    { id: 'alerts', name: 'Startup Alerts', count: messages.filter(m => m.category === 'alerts').length }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesFilter = activeFilter === 'all' || message.category === activeFilter;
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleImportant = (messageId) => {
    // In a real app, this would update the message status
    console.log(`Toggled importance for message ${messageId}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Inbox</h2>
        <p className="text-gray-600">Email-like interface for all communications</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="px-3 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium text-sm">
            New Message
          </button>
          <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
            Smart Sort
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.name} ({filter.count})
          </button>
        ))}
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {filteredMessages.map((message) => (
          <div 
            key={message.id} 
            className={`border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
              message.isRead ? 'bg-white' : 'bg-[#FFF9F0]'
            }`}
          >
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <h3 className={`font-medium ${message.isRead ? 'text-gray-800' : 'text-[#FF6A00]'}`}>
                      {message.sender}
                    </h3>
                    {message.isImportant && (
                      <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Important
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-1">{message.subject}</h4>
                <p className="text-sm text-gray-600 truncate max-w-2xl">{message.preview}</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleImportant(message.id);
                }}
                className="ml-2 p-1 text-gray-400 hover:text-yellow-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={message.isImportant ? "currentColor" : "none"} stroke="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No messages found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Inbox;