import React, { useState } from 'react';

const AnnouncementsUpdates = () => {
  const [announcements] = useState([
    {
      id: 1,
      title: 'New Mentor Matching Algorithm Launched',
      content: 'We\'ve improved our AI-based mentor matching system to better pair mentors with startups based on domain expertise and startup needs. The new algorithm considers past mentoring success rates and startup growth metrics.',
      author: 'Admin Team',
      date: '2023-06-15',
      category: 'Platform Update',
      isPinned: true,
      read: true
    },
    {
      id: 2,
      title: 'Upcoming Webinar: Scaling Your Startup',
      content: 'Join us on June 20th for a webinar featuring successful entrepreneurs who have scaled their startups from seed to series B. Topics include fundraising strategies, team building, and market expansion.',
      author: 'Events Team',
      date: '2023-06-12',
      category: 'Event',
      isPinned: false,
      read: false
    },
    {
      id: 3,
      title: 'Summer Mentorship Program Applications Open',
      content: 'Applications are now open for our Summer Mentorship Program. This intensive 12-week program pairs experienced mentors with early-stage startups. Deadline for applications is July 1st.',
      author: 'Program Team',
      date: '2023-06-10',
      category: 'Program',
      isPinned: false,
      read: false
    },
    {
      id: 4,
      title: 'Platform Maintenance Scheduled',
      content: 'We will be performing scheduled maintenance on June 18th from 2:00 AM to 4:00 AM IST. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience.',
      author: 'Tech Team',
      date: '2023-06-08',
      category: 'Maintenance',
      isPinned: true,
      read: true
    }
  ]);

  const [updates] = useState([
    {
      id: 1,
      title: 'Session Completion Rate Increased',
      content: 'Your mentoring session completion rate has increased by 15% compared to last quarter. Keep up the great work!',
      date: '2023-06-14',
      type: 'achievement'
    },
    {
      id: 2,
      title: 'New Startup Match Recommendation',
      content: 'We\'ve identified a new startup match for you based on your expertise in AI and healthcare. Check out BioTech Innovations in the matching system.',
      date: '2023-06-13',
      type: 'recommendation'
    },
    {
      id: 3,
      title: 'Feedback Received',
      content: 'You have new feedback from TechFlow Inc. on your last mentoring session. View the feedback in your performance dashboard.',
      date: '2023-06-12',
      type: 'feedback'
    }
  ]);

  const [events] = useState([
    {
      id: 1,
      title: 'Mentor Networking Mixer',
      date: '2023-06-22',
      time: '6:00 PM - 9:00 PM',
      location: 'Innovation Hub, Bangalore',
      attendees: 42
    },
    {
      id: 2,
      title: 'Startup Pitch Competition Finals',
      date: '2023-06-25',
      time: '2:00 PM - 5:00 PM',
      location: 'Virtual Event',
      attendees: 120
    },
    {
      id: 3,
      title: 'Mentor Training Workshop',
      date: '2023-06-28',
      time: '10:00 AM - 1:00 PM',
      location: 'Tech Park Conference Center',
      attendees: 28
    }
  ]);

  const [activeTab, setActiveTab] = useState('announcements');

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Announcements & Updates</h2>
        <p className="text-gray-600">Global announcements, mentor-focused updates, and event alerts</p>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'announcements'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Announcements
        </button>
        <button
          onClick={() => setActiveTab('updates')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'updates'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Mentor Updates
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'events'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Events
        </button>
      </div>

      {activeTab === 'announcements' && (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className={`border border-gray-200 rounded-xl p-5 ${
                announcement.read ? 'bg-white' : 'bg-[#FFF9F0]'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  {announcement.isPinned && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                    </svg>
                  )}
                  <h3 className="font-bold text-gray-800">{announcement.title}</h3>
                </div>
                <span className="text-xs text-gray-500">{announcement.date}</span>
              </div>
              <p className="text-gray-600 mb-3">{announcement.content}</p>
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {announcement.category}
                </span>
                <span className="text-sm text-gray-500">by {announcement.author}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'updates' && (
        <div className="space-y-4">
          {updates.map((update) => (
            <div key={update.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className={`mr-3 mt-1 ${
                  update.type === 'achievement' ? 'text-green-500' :
                  update.type === 'recommendation' ? 'text-blue-500' :
                  update.type === 'feedback' ? 'text-yellow-500' : 'text-gray-500'
                }`}>
                  {update.type === 'achievement' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {update.type === 'recommendation' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {update.type === 'feedback' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{update.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{update.content}</p>
                  <span className="text-xs text-gray-500">{update.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-800">{event.title}</h3>
                <span className="px-2 py-1 bg-[#FFF2DC] text-[#FF6A00] text-xs rounded-full">
                  {event.attendees} attending
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{event.date} at {event.time}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{event.location}</span>
              </div>
              <button className="px-3 py-1.5 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors text-sm">
                Add to Calendar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsUpdates;