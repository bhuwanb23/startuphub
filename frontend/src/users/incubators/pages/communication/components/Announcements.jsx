import React, { useState } from 'react';

const Announcements = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showNewAnnouncementForm, setShowNewAnnouncementForm] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    audience: 'all'
  });

  // Mock data for announcements
  const announcements = [
    { 
      id: 1, 
      title: 'Demo Day Registration Now Open', 
      content: 'Register your startup for the upcoming Demo Day on July 15th. Deadline is July 1st.', 
      author: 'Incubator Team', 
      date: 'Jun 15, 2023', 
      audience: 'all',
      priority: 'high'
    },
    { 
      id: 2, 
      title: 'New Mentor Joining Our Program', 
      content: 'We\'re excited to welcome Dr. Jennifer Lee, expert in AI and machine learning, to our mentor network.', 
      author: 'Mentorship Coordinator', 
      date: 'Jun 12, 2023', 
      audience: 'all',
      priority: 'medium'
    },
    { 
      id: 3, 
      title: 'Office Hours This Week', 
      content: 'Extended office hours will be available this Thursday from 9 AM to 7 PM for any questions.', 
      author: 'Operations Team', 
      date: 'Jun 10, 2023', 
      audience: 'all',
      priority: 'low'
    },
    { 
      id: 4, 
      title: 'Funding Workshop Reminder', 
      content: 'Don\'t forget the funding workshop tomorrow at 2 PM in Conference Room A.', 
      author: 'Funding Team', 
      date: 'Jun 8, 2023', 
      audience: 'startups',
      priority: 'high'
    }
  ];

  const filters = [
    { id: 'all', name: 'All Announcements' },
    { id: 'incubator', name: 'From Incubator' },
    { id: 'startups', name: 'For Startups' },
    { id: 'mentors', name: 'For Mentors' }
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    return activeFilter === 'all' || announcement.audience === activeFilter;
  });

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (newAnnouncement.title.trim() && newAnnouncement.content.trim()) {
      // In a real app, this would create a new announcement
      alert(`Announcement created: ${newAnnouncement.title}`);
      setNewAnnouncement({ title: '', content: '', audience: 'all' });
      setShowNewAnnouncementForm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Announcement Center</h2>
            <p className="text-gray-600">Stay updated with important program announcements</p>
          </div>
          <button
            onClick={() => setShowNewAnnouncementForm(!showNewAnnouncementForm)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            New Announcement
          </button>
        </div>
      </div>

      {showNewAnnouncementForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-orange-50">
          <h3 className="font-medium text-gray-800 mb-3">Create New Announcement</h3>
          <form onSubmit={handleCreateAnnouncement}>
            <div className="mb-3">
              <input
                type="text"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                placeholder="Announcement title"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-3">
              <textarea
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                placeholder="Announcement content"
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
              <select
                value={newAnnouncement.audience}
                onChange={(e) => setNewAnnouncement({...newAnnouncement, audience: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Users</option>
                <option value="startups">Startups Only</option>
                <option value="mentors">Mentors Only</option>
                <option value="incubator">Incubator Team</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Post Announcement
              </button>
              <button
                type="button"
                onClick={() => setShowNewAnnouncementForm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6">
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

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <div 
            key={announcement.id} 
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-800">{announcement.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                announcement.priority === 'high' 
                  ? 'bg-red-100 text-red-800' 
                  : announcement.priority === 'medium' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
              }`}>
                {announcement.priority}
              </span>
            </div>
            <p className="text-gray-700 mb-3">{announcement.content}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>By {announcement.author}</span>
              <span>{announcement.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;