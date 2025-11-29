import React, { useState } from 'react';

const VideoMeetingLinksManager = () => {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Weekly Mentorship Session',
      startup: 'TechFlow Inc.',
      date: '2023-06-15',
      time: '10:00 AM',
      platform: 'Zoom',
      link: 'https://zoom.us/j/1234567890',
      isRecurring: true,
      participants: 3
    },
    {
      id: 2,
      title: 'Product Demo Review',
      startup: 'GreenEnergy Solutions',
      date: '2023-06-18',
      time: '2:30 PM',
      platform: 'Google Meet',
      link: 'https://meet.google.com/abc-defg-hij',
      isRecurring: false,
      participants: 5
    },
    {
      id: 3,
      title: 'Investor Pitch Preparation',
      startup: 'HealthTrack',
      date: '2023-06-20',
      time: '11:00 AM',
      platform: 'Microsoft Teams',
      link: 'https://teams.microsoft.com/l/meetup-join/1234567890',
      isRecurring: false,
      participants: 4
    },
    {
      id: 4,
      title: 'Technical Architecture Review',
      startup: 'FinTech Pro',
      date: '2023-06-22',
      time: '4:00 PM',
      platform: 'Zoom',
      link: 'https://zoom.us/j/0987654321',
      isRecurring: true,
      participants: 6
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    startup: '',
    date: '',
    time: '',
    platform: 'Zoom',
    link: ''
  });

  const handleCreateMeeting = (e) => {
    e.preventDefault();
    if (!newMeeting.title || !newMeeting.startup || !newMeeting.date || !newMeeting.time || !newMeeting.link) {
      return;
    }

    const meeting = {
      id: meetings.length + 1,
      ...newMeeting,
      isRecurring: false,
      participants: 0
    };

    setMeetings([...meetings, meeting]);
    setNewMeeting({
      title: '',
      startup: '',
      date: '',
      time: '',
      platform: 'Zoom',
      link: ''
    });
    setShowCreateForm(false);
  };

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link);
    // In a real app, you might show a toast notification here
  };

  const joinMeeting = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-800">Video Meeting Links Manager</h2>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium"
          >
            + New Meeting
          </button>
        </div>
        <p className="text-gray-600">Store and sync meeting links with auto-join scheduler</p>
      </div>

      {showCreateForm && (
        <div className="mb-6 p-4 bg-[#FFF9F0] rounded-xl border border-[#FFDAB9]">
          <h3 className="font-bold text-gray-800 mb-3">Create New Meeting</h3>
          <form onSubmit={handleCreateMeeting} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
                <input
                  type="text"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                  placeholder="Enter meeting title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Startup</label>
                <input
                  type="text"
                  value={newMeeting.startup}
                  onChange={(e) => setNewMeeting({...newMeeting, startup: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                  placeholder="Enter startup name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newMeeting.date}
                  onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={newMeeting.time}
                  onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <select
                  value={newMeeting.platform}
                  onChange={(e) => setNewMeeting({...newMeeting, platform: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                >
                  <option value="Zoom">Zoom</option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
                <input
                  type="url"
                  value={newMeeting.link}
                  onChange={(e) => setNewMeeting({...newMeeting, link: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors"
              >
                Create Meeting
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-800">{meeting.title}</h3>
                <p className="text-sm text-gray-600">{meeting.startup}</p>
              </div>
              <div className="flex items-center">
                {meeting.isRecurring && (
                  <span className="mr-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Recurring
                  </span>
                )}
                <span className={`px-2 py-1 text-xs rounded-full ${
                  meeting.platform === 'Zoom' ? 'bg-blue-100 text-blue-800' :
                  meeting.platform === 'Google Meet' ? 'bg-green-100 text-green-800' :
                  meeting.platform === 'Microsoft Teams' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {meeting.platform}
                </span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{meeting.date} at {meeting.time}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{meeting.participants} participants</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-2">
                <input
                  type="text"
                  value={meeting.link}
                  readOnly
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <button
                onClick={() => copyToClipboard(meeting.link)}
                className="p-2 text-gray-500 hover:text-[#FF6A00] rounded-lg hover:bg-gray-100"
                title="Copy link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button
                onClick={() => joinMeeting(meeting.link)}
                className="ml-1 px-3 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors text-sm font-medium"
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>

      {meetings.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No meetings scheduled</h3>
          <p className="text-gray-500">Create your first meeting to get started</p>
        </div>
      )}
    </div>
  );
};

export default VideoMeetingLinksManager;