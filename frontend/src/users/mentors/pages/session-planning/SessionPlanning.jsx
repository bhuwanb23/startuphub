import React, { useState } from 'react';

const SessionPlanning = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: 'Business Model Validation',
      date: '2023-06-15',
      time: '10:00 AM',
      mentee: 'TechFlow Inc.',
      status: 'Scheduled',
      agenda: 'Review business model canvas and validate assumptions'
    },
    {
      id: 2,
      title: 'Pitch Deck Review',
      date: '2023-06-18',
      time: '2:00 PM',
      mentee: 'GreenEnergy Solutions',
      status: 'Completed',
      agenda: 'Review pitch deck structure and content'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    date: '',
    time: '',
    mentee: '',
    agenda: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSession(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const session = {
      id: sessions.length + 1,
      ...newSession,
      status: 'Scheduled'
    };
    setSessions([...sessions, session]);
    setNewSession({ title: '', date: '', time: '', mentee: '', agenda: '' });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Session Planning & Guidance Tools</h1>
          <p className="text-gray-600">Plan and manage your mentoring sessions</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#FF6A00] text-white rounded-md hover:bg-[#e05500] transition-colors"
        >
          {showForm ? 'Cancel' : 'Schedule New Session'}
        </button>
      </div>

      {/* Session Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Schedule New Session</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Title</label>
                <input
                  type="text"
                  name="title"
                  value={newSession.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mentee</label>
                <input
                  type="text"
                  name="mentee"
                  value={newSession.mentee}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newSession.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  value={newSession.time}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Agenda</label>
              <textarea
                name="agenda"
                value={newSession.agenda}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              ></textarea>
            </div>
            <button 
              type="submit"
              className="px-4 py-2 bg-[#FF6A00] text-white rounded-md hover:bg-[#e05500] transition-colors"
            >
              Schedule Session
            </button>
          </form>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {sessions.filter(session => session.status === 'Scheduled').map(session => (
            <div key={session.id} className="p-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{session.title}</h3>
                  <p className="text-gray-600 mt-1">{session.agenda}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span className="mr-4">📅 {session.date} at {session.time}</span>
                    <span>👥 {session.mentee}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {session.status}
                  </span>
                  <div className="mt-4 space-x-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                      Reschedule
                    </button>
                    <button className="px-3 py-1 text-sm bg-[#FF6A00] text-white rounded-md hover:bg-[#e05500]">
                      Join Session
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Sessions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Past Sessions</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {sessions.filter(session => session.status === 'Completed').map(session => (
            <div key={session.id} className="p-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{session.title}</h3>
                  <p className="text-gray-600 mt-1">{session.agenda}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span className="mr-4">📅 {session.date} at {session.time}</span>
                    <span>👥 {session.mentee}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {session.status}
                  </span>
                  <div className="mt-4">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                      View Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionPlanning;