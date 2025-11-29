import React, { useState } from 'react';

const SessionCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', 'day'
  
  // Mock session data
  const sessions = [
    {
      id: 1,
      title: "Business Model Workshop",
      date: new Date(2025, 5, 15),
      startTime: "10:00",
      endTime: "12:00",
      mentor: "Sarah Johnson",
      type: "workshop",
      attendees: 24
    },
    {
      id: 2,
      title: "Product Feedback Session",
      date: new Date(2025, 5, 16),
      startTime: "14:00",
      endTime: "15:30",
      mentor: "Michael Chen",
      type: "session",
      attendees: 18
    },
    {
      id: 3,
      title: "Investor Pitch Prep",
      date: new Date(2025, 5, 18),
      startTime: "09:00",
      endTime: "11:00",
      mentor: "David Wilson",
      type: "workshop",
      attendees: 20
    },
    {
      id: 4,
      title: "Market Analysis Review",
      date: new Date(2025, 5, 20),
      startTime: "13:00",
      endTime: "14:30",
      mentor: "Emma Rodriguez",
      type: "session",
      attendees: 22
    },
    {
      id: 5,
      title: "Demo Day Practice",
      date: new Date(2025, 5, 22),
      startTime: "10:00",
      endTime: "12:00",
      mentor: "Sarah Johnson",
      type: "workshop",
      attendees: 24
    }
  ];

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Format date as "Month YYYY"
  const formatMonthYear = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Navigate to previous month/week/day
  const prevPeriod = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else if (view === 'week') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1));
    }
  };

  // Navigate to next month/week/day
  const nextPeriod = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else if (view === 'week') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1));
    }
  };

  // Check if a date has sessions
  const hasSessions = (date) => {
    return sessions.some(session => 
      session.date.getDate() === date.getDate() &&
      session.date.getMonth() === date.getMonth() &&
      session.date.getFullYear() === date.getFullYear()
    );
  };

  // Get sessions for a specific date
  const getSessionsForDate = (date) => {
    return sessions.filter(session => 
      session.date.getDate() === date.getDate() &&
      session.date.getMonth() === date.getMonth() &&
      session.date.getFullYear() === date.getFullYear()
    );
  };

  // Render month view
  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Previous month's days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i);
      days.push(
        <div key={`prev-${i}`} className="p-2 text-gray-400 text-sm">
          {prevMonthDays - i}
        </div>
      );
    }
    
    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const today = new Date();
      const isToday = 
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
      
      const hasSession = hasSessions(date);
      
      days.push(
        <div 
          key={`curr-${i}`} 
          className={`p-2 border rounded-lg min-h-24 ${
            isToday 
              ? 'bg-[#FFF9F0] border-[#FF6A00]' 
              : 'border-gray-200'
          }`}
        >
          <div className={`text-sm font-medium ${
            isToday ? 'text-[#FF6A00]' : 'text-gray-800'
          }`}>
            {i}
          </div>
          {hasSession && (
            <div className="mt-1 space-y-1">
              <div className="text-xs bg-[#FF6A00] text-white px-1 py-0.5 rounded truncate">
                Workshop
              </div>
            </div>
          )}
        </div>
      );
    }
    
    // Next month's days
    const totalCells = 42; // 6 rows x 7 columns
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <div key={`next-${i}`} className="p-2 text-gray-400 text-sm">
          {i}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  // Render day view
  const renderDayView = () => {
    const daySessions = getSessionsForDate(currentDate);
    
    return (
      <div className="space-y-4">
        <div className="text-center py-4">
          <h2 className="text-xl font-bold text-gray-800">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h2>
        </div>
        
        {daySessions.length > 0 ? (
          <div className="space-y-4">
            {daySessions.map(session => (
              <div key={session.id} className="border border-gray-200 rounded-xl p-4 hover:border-[#FF6A00] transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{session.title}</h3>
                    <p className="text-gray-600 text-sm">{session.startTime} - {session.endTime}</p>
                    <p className="text-gray-500 text-sm mt-1">Mentor: {session.mentor}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    session.type === 'workshop' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {session.type}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-600">{session.attendees} attendees</span>
                  <div className="space-x-2">
                    <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No sessions scheduled for this day</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Session Calendar</h1>
            <p className="text-gray-600">Manage cohort sessions and workshops</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setView('month')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  view === 'month' 
                    ? 'bg-white text-[#FF6A00] shadow' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Month
              </button>
              <button 
                onClick={() => setView('week')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  view === 'week' 
                    ? 'bg-white text-[#FF6A00] shadow' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Week
              </button>
              <button 
                onClick={() => setView('day')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  view === 'day' 
                    ? 'bg-white text-[#FF6A00] shadow' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Day
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={prevPeriod}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                ←
              </button>
              <span className="font-medium">
                {view === 'day' 
                  ? currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                  : formatMonthYear(currentDate)}
              </span>
              <button 
                onClick={nextPeriod}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                →
              </button>
            </div>
            
            <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors text-sm">
              Add Session
            </button>
          </div>
        </div>
        
        {view === 'month' && renderMonthView()}
        {view === 'day' && renderDayView()}
        
        {view === 'week' && (
          <div className="text-center py-12 text-gray-500">
            <p>Week view coming soon</p>
          </div>
        )}
      </div>
      
      {/* Session Type Legend */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Session Types</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm">Workshop</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm">Session</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
            <span className="text-sm">Mentor Meeting</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
            <span className="text-sm">Review</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCalendar;