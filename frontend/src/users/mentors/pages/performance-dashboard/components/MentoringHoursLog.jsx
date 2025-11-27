import React, { useState } from 'react';

const MentoringHoursLog = () => {
  const [viewMode, setViewMode] = useState('calendar');
  const [timeFilter, setTimeFilter] = useState('last-month');

  // Mock data for hours log
  const hoursData = [
    { id: 1, date: '2023-06-01', startup: 'TechFlow Inc.', duration: 1.5, type: 'Business Review' },
    { id: 2, date: '2023-06-03', startup: 'GreenEnergy Solutions', duration: 2, type: 'Technical Guidance' },
    { id: 3, date: '2023-06-05', startup: 'HealthTrack', duration: 1, type: 'Product Demo' },
    { id: 4, date: '2023-06-08', startup: 'FinTech Startup', duration: 1.5, type: 'Strategy Session' },
    { id: 5, date: '2023-06-10', startup: 'EduTech Platform', duration: 2, type: 'Pitch Review' },
    { id: 6, date: '2023-06-12', startup: 'TechFlow Inc.', duration: 1, type: 'Follow-up' },
    { id: 7, date: '2023-06-15', startup: 'GreenEnergy Solutions', duration: 2.5, type: 'Investor Prep' },
    { id: 8, date: '2023-06-18', startup: 'HealthTrack', duration: 1.5, type: 'Regulatory Guidance' },
    { id: 9, date: '2023-06-20', startup: 'FinTech Startup', duration: 2, type: 'Market Analysis' },
    { id: 10, date: '2023-06-22', startup: 'EduTech Platform', duration: 1, type: 'Growth Strategy' }
  ];

  const totalHours = hoursData.reduce((sum, entry) => sum + entry.duration, 0);
  const averageHours = (totalHours / hoursData.length).toFixed(1);

  const handleExport = (format) => {
    alert(`Exporting data as ${format.toUpperCase()}...`);
    // In a real implementation, this would generate and download the file
  };

  // Calendar view data
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    
    const days = [];
    
    // Previous month's days
    const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);
    for (let i = prevMonthDays - firstDayOfMonth + 1; i <= prevMonthDays; i++) {
      days.push(
        <div key={`prev-${i}`} className="p-2 text-gray-400 text-sm">
          {i}
        </div>
      );
    }
    
    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const dayHours = hoursData.filter(entry => 
        new Date(entry.date).getDate() === i && 
        new Date(entry.date).getMonth() === currentMonth && 
        new Date(entry.date).getFullYear() === currentYear
      );
      
      const totalDayHours = dayHours.reduce((sum, entry) => sum + entry.duration, 0);
      
      days.push(
        <div key={`curr-${i}`} className="p-2 border border-gray-200 min-h-20">
          <div className="font-medium">{i}</div>
          {dayHours.length > 0 && (
            <div className="mt-1">
              <div className="text-xs text-[#FF6A00] font-medium">{totalDayHours} hrs</div>
              <div className="text-xs text-gray-600 truncate">{dayHours[0].startup}</div>
            </div>
          )}
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

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Mentoring Hours Log</h2>
        <div className="flex space-x-2">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00] text-sm"
          >
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="last-quarter">Last Quarter</option>
          </select>
          <div className="flex bg-white rounded-lg border border-gray-300">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-2 rounded-l-lg ${viewMode === 'calendar' ? 'bg-[#FF6A00] text-white' : 'text-gray-600'}`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-r-lg ${viewMode === 'list' ? 'bg-[#FF6A00] text-white' : 'text-gray-600'}`}
            >
              List
            </button>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleExport('pdf')}
              className="px-3 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium text-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              PDF
            </button>
            <button 
              onClick={() => handleExport('csv')}
              className="px-3 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium text-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              CSV
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#FFF9F0] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[#FF6A00]">{totalHours.toFixed(1)}</div>
          <div className="text-gray-600 text-sm">Total Hours</div>
        </div>
        <div className="bg-[#FFF9F0] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[#FF6A00]">{hoursData.length}</div>
          <div className="text-gray-600 text-sm">Total Sessions</div>
        </div>
        <div className="bg-[#FFF9F0] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[#FF6A00]">{averageHours}</div>
          <div className="text-gray-600 text-sm">Avg. Per Session</div>
        </div>
        <div className="bg-[#FFF9F0] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[#FF6A00]">5</div>
          <div className="text-gray-600 text-sm">Active Startups</div>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <div>
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
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Startup</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hoursData.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.startup}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#FF6A00]">{entry.duration} hrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MentoringHoursLog;