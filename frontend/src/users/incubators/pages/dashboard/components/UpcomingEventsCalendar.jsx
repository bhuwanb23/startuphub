import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { getEventTypeColor } from '../utils/formatters.js';

const UpcomingEventsCalendar = () => {
  const { data } = useDashboardData();
  
  if (!data) return null;
  
  const { events } = data;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Upcoming Events</h2>
        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">View Calendar</button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-800">{event.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${getEventTypeColor(event.type)}`}>
                {event.type}
              </span>
            </div>
            
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>{event.date} at {event.time}</span>
            </div>
            
            <div className="flex items-center text-gray-600 text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span>{event.attendees} attendees</span>
            </div>
            
            <button className="w-full mt-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium">
              Add to Calendar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEventsCalendar;