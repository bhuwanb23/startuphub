import React, { useState } from 'react';

const ScheduleCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sessions] = useState([
    { id: 1, title: 'TechFlow Inc. - Business Model Review', date: new Date(2023, 5, 15, 10, 0), duration: 60, type: 'planned' },
    { id: 2, title: 'GreenEnergy Solutions - Technical Architecture', date: new Date(2023, 5, 18, 14, 30), duration: 90, type: 'completed' },
    { id: 3, title: 'HealthTrack - Product Demo', date: new Date(2023, 5, 20, 11, 0), duration: 120, type: 'planned' },
    { id: 4, title: 'FinTech Startup - Funding Strategy', date: new Date(2023, 5, 22, 9, 0), duration: 60, type: 'planned' }
  ]);

  const getTypeColor = (type) => {
    switch (type) {
      case 'planned': return 'bg-yellow-100 border-yellow-300';
      case 'completed': return 'bg-green-100 border-green-300';
      case 'cancelled': return 'bg-red-100 border-red-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const getTypeTextColor = (type) => {
    switch (type) {
      case 'planned': return 'text-yellow-800';
      case 'completed': return 'text-green-800';
      case 'cancelled': return 'text-red-800';
      default: return 'text-gray-800';
    }
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Previous month's days
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = prevMonthDays - firstDayOfMonth + 1; i <= prevMonthDays; i++) {
      days.push(
        <div key={`prev-${i}`} className="p-2 text-gray-400 text-sm">
          {i}
        </div>
      );
    }
    
    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const daySessions = sessions.filter(session => 
        session.date.getDate() === i && 
        session.date.getMonth() === month && 
        session.date.getFullYear() === year
      );
      
      days.push(
        <div key={`curr-${i}`} className="p-2 border border-gray-200 min-h-24">
          <div className="font-medium">{i}</div>
          <div className="mt-1 space-y-1">
            {daySessions.map(session => (
              <div 
                key={session.id} 
                className={`text-xs p-1 rounded border ${getTypeColor(session.type)} ${getTypeTextColor(session.type)}`}
              >
                <div className="font-medium truncate">{session.title}</div>
                <div>
                  {session.date.getHours().toString().padStart(2, '0')}:
                  {session.date.getMinutes().toString().padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Next month's days
    const totalCells = 42; // 6 rows x 7 days
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <div key={`next-${i}`} className="p-2 text-gray-400 text-sm">
          {i}
        </div>
      );
    }
    
    return days;
  };

  const handleSyncCalendar = () => {
    alert('Sync with Google Calendar feature would be implemented here.');
  };

  const handleReschedule = (sessionId) => {
    alert(`Reschedule session ${sessionId} - drag functionality would be implemented here.`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Schedule Calendar</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            onClick={handleSyncCalendar}
            className="px-3 py-1 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium text-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Sync Calendar
          </button>
        </div>
      </div>

      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {renderCalendar()}
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Planned</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-100 border border-green-300 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Completed</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-100 border border-red-300 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Cancelled</span>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCalendar;