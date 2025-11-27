import React from 'react';

const UpcomingSessionsWidget = () => {
  // Mock data
  const upcomingSessions = [
    {
      id: 1,
      title: "Business Model Validation",
      startup: "TechFlow Inc.",
      date: "Jun 15, 2023",
      time: "10:00 AM",
      duration: "1 hour"
    },
    {
      id: 2,
      title: "Pitch Deck Review",
      startup: "GreenEnergy Solutions",
      date: "Jun 18, 2023",
      time: "2:00 PM",
      duration: "1 hour"
    },
    {
      id: 3,
      title: "Product Roadmap Planning",
      startup: "HealthTrack",
      date: "Jun 20, 2023",
      time: "11:00 AM",
      duration: "1.5 hours"
    },
    {
      id: 4,
      title: "Funding Strategy Session",
      startup: "FinTech Pro",
      date: "Jun 22, 2023",
      time: "3:00 PM",
      duration: "1 hour"
    },
    {
      id: 5,
      title: "Market Entry Discussion",
      startup: "EduTech Innovations",
      date: "Jun 25, 2023",
      time: "9:00 AM",
      duration: "1 hour"
    }
  ];

  // Mini calendar data
  const currentDate = new Date();
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    days.push({
      day: date.getDate(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
      isToday: i === 0
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">Upcoming Sessions</h2>
        <button className="text-[#FF6A00] hover:text-[#FF8C42] font-medium text-sm">View Calendar</button>
      </div>

      {/* Mini Calendar */}
      <div className="flex justify-between mb-6">
        {days.map((day, index) => (
          <div key={index} className={`flex flex-col items-center p-2 rounded-lg ${day.isToday ? 'bg-[#FFF2DC]' : ''}`}>
            <span className="text-sm text-gray-600">{day.weekday}</span>
            <span className={`font-medium ${day.isToday ? 'text-[#FF6A00]' : 'text-gray-800'}`}>{day.day}</span>
          </div>
        ))}
      </div>

      {/* Sessions List */}
      <div className="space-y-4 mb-6">
        {upcomingSessions.map((session) => (
          <div key={session.id} className="flex items-center p-3 bg-[#FFF9F0] rounded-lg hover:bg-[#FFF2DC] transition-colors">
            <div className="mr-3">
              <div className="w-10 h-10 rounded-full bg-[#FF6A00] flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{session.title}</h3>
              <p className="text-sm text-gray-600">{session.startup}</p>
              <p className="text-xs text-gray-500">{session.date} at {session.time} ({session.duration})</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium">
        Start Next Session
      </button>
    </div>
  );
};

export default UpcomingSessionsWidget;