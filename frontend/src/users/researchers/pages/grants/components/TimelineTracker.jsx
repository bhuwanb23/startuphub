import React, { useState } from 'react';

const TimelineTracker = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Grant Application Deadline', date: '2025-12-15', type: 'deadline', completed: false },
    { id: 2, title: 'Proposal Review Period', date: '2025-12-16 to 2026-01-15', type: 'review', completed: false },
    { id: 3, title: 'Funding Decision Announcement', date: '2026-02-01', type: 'announcement', completed: false },
    { id: 4, title: 'Project Start Date', date: '2026-04-01', type: 'start', completed: false },
    { id: 5, title: 'Mid-term Report Submission', date: '2026-10-01', type: 'report', completed: false },
    { id: 6, title: 'Final Project Completion', date: '2027-03-31', type: 'completion', completed: false }
  ]);

  const toggleEventCompletion = (id) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };

  const addReminder = (id) => {
    // Implementation for adding calendar reminder
    alert(`Reminder for event ${id} would be added to calendar`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">⏰ Submission Timeline Tracker</h2>
      
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-800">Project Timeline</h3>
          <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm">
            Sync with Calendar
          </button>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {/* Timeline events */}
          <div className="space-y-6">
            {events.map((event, index) => (
              <div key={event.id} className="flex items-start">
                <div className="relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    event.completed ? 'bg-green-500 text-white' : 'bg-[#FF6A00] text-white'
                  }`}>
                    {event.completed ? '✓' : index + 1}
                  </div>
                </div>
                <div className="ml-4 flex-1 pb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#FF6A00]">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-800">{event.title}</h4>
                        <div className="text-sm text-gray-600 mt-1">{event.date}</div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toggleEventCompletion(event.id)}
                          className={`text-xs px-2 py-1 rounded ${
                            event.completed 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {event.completed ? 'Completed' : 'Mark Done'}
                        </button>
                        <button 
                          onClick={() => addReminder(event.id)}
                          className="text-xs px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded hover:bg-[#FF6A00] hover:text-white"
                        >
                          Remind
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        event.type === 'deadline' ? 'bg-red-100 text-red-800' :
                        event.type === 'review' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'announcement' ? 'bg-purple-100 text-purple-800' :
                        event.type === 'start' ? 'bg-green-100 text-green-800' :
                        event.type === 'report' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-[#FF6A00]">3</div>
          <div className="text-sm text-gray-600">Pending Milestones</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-green-500">2</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="text-2xl font-bold text-gray-800">6</div>
          <div className="text-sm text-gray-600">Total Events</div>
        </div>
      </div>
    </div>
  );
};

export default TimelineTracker;