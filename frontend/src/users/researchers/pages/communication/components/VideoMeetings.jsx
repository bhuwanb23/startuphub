import React, { useState } from 'react';

const VideoMeetings = () => {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [participants, setParticipants] = useState('');
  
  // Mock meeting data
  const meetings = [
    {
      id: 1,
      title: 'Quantum Computing Research Review',
      date: '2025-11-28',
      time: '14:00',
      duration: '60 min',
      participants: ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Elena Rodriguez'],
      platform: 'Google Meet',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Grant Application Discussion',
      date: '2025-11-29',
      time: '10:30',
      duration: '45 min',
      participants: ['Dr. James Wilson', 'Funding Board Rep'],
      platform: 'Zoom',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Prototype Testing Session',
      date: '2025-12-01',
      time: '15:00',
      duration: '90 min',
      participants: ['Dr. Priya Sharma', 'BioTech Innovations Team'],
      platform: 'MS Teams',
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'Weekly Research Sync',
      date: '2025-11-27',
      time: '09:00',
      duration: '30 min',
      participants: ['Research Team'],
      platform: 'Google Meet',
      status: 'completed'
    }
  ];

  const upcomingMeetings = meetings.filter(meeting => meeting.status === 'upcoming');
  const pastMeetings = meetings.filter(meeting => meeting.status === 'completed');

  const handleCreateMeeting = (e) => {
    e.preventDefault();
    // In a real app, this would create a new meeting
    console.log('Creating meeting:', { meetingTitle, meetingDate, meetingTime, participants });
    // Reset form
    setMeetingTitle('');
    setMeetingDate('');
    setMeetingTime('');
    setParticipants('');
  };

  // Get platform icon
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Google Meet':
        return (
          <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xs">G</span>
          </div>
        );
      case 'Zoom':
        return (
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">Z</span>
          </div>
        );
      case 'MS Teams':
        return (
          <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">T</span>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">📹 Video Meeting Links Manager</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Create Meeting Form */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4 border border-orange-100">
            <h2 className="font-semibold text-gray-900 mb-4">Create New Meeting</h2>
            <form onSubmit={handleCreateMeeting}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    placeholder="Enter meeting title"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={meetingDate}
                      onChange={(e) => setMeetingDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={meetingTime}
                      onChange={(e) => setMeetingTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Participants</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={participants}
                    onChange={(e) => setParticipants(e.target.value)}
                    placeholder="Enter participant emails or names (comma separated)"
                    rows="3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option>Google Meet</option>
                    <option>Zoom</option>
                    <option>MS Teams</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium"
                >
                  Create Meeting
                </button>
              </div>
            </form>
          </div>
          
          {/* Integration Info */}
          <div className="mt-6 bg-gradient-to-r from-orange-50 to-saffron-50 rounded-lg p-4 border border-orange-200">
            <h3 className="font-medium text-gray-900 mb-2">🔌 Integration Information</h3>
            <p className="text-sm text-gray-700 mb-3">
              Connect your preferred video platforms for seamless meeting creation and management.
            </p>
            <div className="flex space-x-3">
              <button className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50">
                <span className="mr-1">G</span> Google
              </button>
              <button className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50">
                <span className="mr-1">Z</span> Zoom
              </button>
              <button className="flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50">
                <span className="mr-1">T</span> Teams
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Meetings List */}
        <div className="lg:col-span-2">
          {/* Upcoming Meetings */}
          <div className="bg-gray-50 rounded-lg p-4 border border-orange-100 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Upcoming Meetings</h2>
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                    {getPlatformIcon(meeting.platform)}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{meeting.date} at {meeting.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{meeting.duration}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Participants</p>
                    <div className="flex -space-x-2">
                      {meeting.participants.map((participant, index) => (
                        <div 
                          key={index} 
                          className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-orange-800 text-xs font-bold"
                          title={participant}
                        >
                          {participant.charAt(0)}
                        </div>
                      ))}
                      {meeting.participants.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs">
                          +{meeting.participants.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <button className="flex-grow bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium">
                      Join Meeting
                    </button>
                    <button className="bg-white hover:bg-gray-50 border border-orange-500 text-orange-600 py-2 px-4 rounded-md text-sm font-medium">
                      Copy Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Past Meetings */}
          <div className="bg-gray-50 rounded-lg p-4 border border-orange-100">
            <h2 className="font-semibold text-gray-900 mb-4">Past Meetings</h2>
            <div className="space-y-4">
              {pastMeetings.map((meeting) => (
                <div key={meeting.id} className="bg-white rounded-lg p-4 border border-gray-200 opacity-75">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                    {getPlatformIcon(meeting.platform)}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{meeting.date} at {meeting.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{meeting.duration}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <button className="flex-grow bg-gray-200 text-gray-600 py-2 px-4 rounded-md text-sm font-medium cursor-not-allowed" disabled>
                      Meeting Ended
                    </button>
                    <button className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-600 py-2 px-4 rounded-md text-sm font-medium">
                      View Recording
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoMeetings;