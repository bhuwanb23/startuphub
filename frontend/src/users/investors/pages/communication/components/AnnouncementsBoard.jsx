import React, { useState } from 'react';

const AnnouncementsBoard = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'New Portfolio Company Added',
      content: 'We are excited to announce that GreenTech Solutions has been added to our portfolio. The company specializes in sustainable energy solutions and has shown exceptional growth potential.',
      author: 'Investment Team',
      date: '2025-11-20',
      priority: 'high',
      pinned: true,
      read: false
    },
    {
      id: 2,
      title: 'Q4 Investor Meeting Scheduled',
      content: 'Our quarterly investor meeting will be held on December 15th at 2:00 PM EST. Please check your calendars and confirm your attendance through the portal.',
      author: 'Investor Relations',
      date: '2025-11-18',
      priority: 'medium',
      pinned: true,
      read: true
    },
    {
      id: 3,
      title: 'System Maintenance Notice',
      content: 'Scheduled maintenance will take place on November 25th from 10:00 PM to 2:00 AM EST. During this time, the portal may be temporarily unavailable.',
      author: 'IT Department',
      date: '2025-11-15',
      priority: 'medium',
      pinned: false,
      read: true
    },
    {
      id: 4,
      title: 'New Due Diligence Features',
      content: 'We have added several new features to our due diligence tools including automated financial analysis and enhanced risk assessment capabilities.',
      author: 'Product Team',
      date: '2025-11-10',
      priority: 'low',
      pinned: false,
      read: false
    },
    {
      id: 5,
      title: 'Portfolio Performance Update',
      content: 'Our portfolio companies have collectively raised $150M in additional funding this quarter, representing a 25% increase from Q3.',
      author: 'Analytics Team',
      date: '2025-11-05',
      priority: 'high',
      pinned: false,
      read: true
    }
  ]);
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleRead = (id) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id ? { ...announcement, read: !announcement.read } : announcement
    ));
  };
  
  const togglePin = (id) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === id ? { ...announcement, pinned: !announcement.pinned } : announcement
    ));
  };
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !announcement.read) || 
                         (filter === 'pinned' && announcement.pinned);
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.pinned);
  const unpinnedAnnouncements = filteredAnnouncements.filter(a => !a.pinned);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Announcements Board</h2>
        <p className="text-gray-600">Stay updated with the latest news and important notices</p>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
              />
              <div className="absolute left-3 top-3.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Announcements
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === 'unread'
                  ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter('pinned')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === 'pinned'
                  ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pinned
            </button>
          </div>
        </div>
      </div>
      
      {/* Pinned Announcements */}
      {pinnedAnnouncements.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">📌</span> Pinned Announcements
          </h3>
          <div className="space-y-4">
            {pinnedAnnouncements.map((announcement) => (
              <div 
                key={announcement.id} 
                className={`bg-white rounded-xl border-l-4 ${announcement.priority === 'high' ? 'border-l-red-500' : announcement.priority === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500'} p-6 shadow-sm hover:shadow-md transition-all`}
              >
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold text-gray-800">{announcement.title}</h3>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority}
                    </span>
                    {announcement.pinned && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        Pinned
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span>{announcement.author}</span>
                  <span className="mx-2">•</span>
                  <span>{announcement.date}</span>
                </div>
                
                <p className="text-gray-700 mt-4">{announcement.content}</p>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleRead(announcement.id)}
                      className={`px-3 py-1 rounded text-sm ${
                        announcement.read 
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                          : 'bg-[#FF8C42] text-white hover:bg-[#FF6A00]'
                      }`}
                    >
                      {announcement.read ? 'Mark as Unread' : 'Mark as Read'}
                    </button>
                    <button
                      onClick={() => togglePin(announcement.id)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                    >
                      {announcement.pinned ? 'Unpin' : 'Pin'}
                    </button>
                  </div>
                  <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Regular Announcements */}
      {unpinnedAnnouncements.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-800 mb-3">Recent Announcements</h3>
          <div className="space-y-4">
            {unpinnedAnnouncements.map((announcement) => (
              <div 
                key={announcement.id} 
                className={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all ${
                  !announcement.read ? 'border-l-4 border-l-[#FF6A00]' : ''
                }`}
              >
                <div className="flex justify-between">
                  <h3 className={`text-lg font-bold ${announcement.read ? 'text-gray-700' : 'text-gray-900'}`}>
                    {announcement.title}
                  </h3>
                  <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(announcement.priority)}`}>
                    {announcement.priority}
                  </span>
                </div>
                
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span>{announcement.author}</span>
                  <span className="mx-2">•</span>
                  <span>{announcement.date}</span>
                </div>
                
                <p className={`mt-4 ${announcement.read ? 'text-gray-600' : 'text-gray-800'}`}>
                  {announcement.content}
                </p>
                
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={() => toggleRead(announcement.id)}
                    className={`px-3 py-1 rounded text-sm ${
                      announcement.read 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-[#FF8C42] text-white hover:bg-[#FF6A00]'
                    }`}
                  >
                    {announcement.read ? 'Mark as Unread' : 'Mark as Read'}
                  </button>
                  <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* No Results */}
      {filteredAnnouncements.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-4xl mb-3">📢</div>
          <h3 className="text-lg font-bold text-gray-800">No announcements found</h3>
          <p className="text-gray-600 mt-1">Try adjusting your search or filter criteria</p>
        </div>
      )}
      
      {/* Create Announcement */}
      <div className="bg-gradient-to-r from-[#FFF5EB] to-[#FFE9D7] border border-[#FF8C42] rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-gray-800">Create New Announcement</h3>
            <p className="text-gray-700 mt-1">
              Share important updates with your network
            </p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all">
            Create Announcement
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsBoard;