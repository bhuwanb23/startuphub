import React from 'react';

const Announcements = () => {
  // Mock announcement data
  const announcements = [
    {
      id: 1,
      title: 'New Funding Opportunity: Quantum Research Grant',
      summary: 'The National Science Foundation has announced a new grant program for quantum computing research with up to $500,000 available.',
      category: 'Funding',
      date: '2025-11-25',
      priority: 'high',
      read: false
    },
    {
      id: 2,
      title: 'TRL Update for Gene Therapy Project',
      summary: 'Your gene therapy research project has been upgraded to TRL 6: System Prototype Demonstration in Relevant Environment.',
      category: 'TRL Update',
      date: '2025-11-24',
      priority: 'medium',
      read: true
    },
    {
      id: 3,
      title: 'Collaboration Request from BioTech Innovations',
      summary: 'BioTech Innovations has requested to collaborate on your published research regarding CRISPR applications.',
      category: 'Collaboration',
      date: '2025-11-23',
      priority: 'high',
      read: false
    },
    {
      id: 4,
      title: 'International Conference Registration Deadline',
      summary: 'Registration for the International Materials Science Conference closes on December 1st. Early bird pricing available.',
      category: 'Conference',
      date: '2025-11-22',
      priority: 'medium',
      read: true
    },
    {
      id: 5,
      title: 'New Lab Safety Protocols',
      summary: 'Updated safety protocols for the materials lab are now in effect. All researchers must complete the new training module.',
      category: 'Policy',
      date: '2025-11-20',
      priority: 'low',
      read: true
    },
    {
      id: 6,
      title: 'Patent Application Approved',
      summary: 'Your patent application for the novel battery technology has been approved by the patent office.',
      category: 'IPR',
      date: '2025-11-18',
      priority: 'high',
      read: false
    }
  ];

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Funding':
        return '💰';
      case 'TRL Update':
        return '⚙️';
      case 'Collaboration':
        return '🤝';
      case 'Conference':
        return '📅';
      case 'Policy':
        return '📜';
      case 'IPR':
        return '🔍';
      default:
        return '📢';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">📢 Announcements & Updates</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {announcements.map((announcement) => (
          <div 
            key={announcement.id} 
            className={`bg-white rounded-lg shadow p-6 border-l-4 ${
              announcement.priority === 'high' 
                ? 'border-l-red-500' 
                : announcement.priority === 'medium' 
                  ? 'border-l-yellow-500' 
                  : 'border-l-green-500'
            } hover:shadow-md transition-shadow`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <span className="text-xl mr-2">{getCategoryIcon(announcement.category)}</span>
                  <h3 className={`text-lg font-semibold ${announcement.read ? 'text-gray-900' : 'text-gray-900 font-bold'}`}>
                    {announcement.title}
                  </h3>
                </div>
                <p className="text-gray-600 mt-2">{announcement.summary}</p>
              </div>
              {!announcement.read && (
                <span className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-orange-500"></span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {announcement.category}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {announcement.date}
              </span>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium">
                Read More
              </button>
              <button className="bg-white hover:bg-gray-50 border border-orange-500 text-orange-600 py-2 px-4 rounded-md text-sm font-medium">
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Stats */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-6 border border-orange-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Announcement Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">{announcements.length}</div>
            <div className="text-sm text-gray-600">Total Announcements</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">
              {announcements.filter(a => !a.read).length}
            </div>
            <div className="text-sm text-gray-600">Unread</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">
              {announcements.filter(a => a.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-orange-100">
            <div className="text-2xl font-bold text-orange-600">
              {new Set(announcements.map(a => a.category)).size}
            </div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;