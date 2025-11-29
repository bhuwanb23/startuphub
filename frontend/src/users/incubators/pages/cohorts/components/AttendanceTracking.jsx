import React, { useState } from 'react';

const AttendanceTracking = () => {
  const [attendanceData, setAttendanceData] = useState([
    {
      id: 1,
      session: "Business Model Workshop",
      date: "2025-06-15",
      totalStartups: 24,
      present: 20,
      absent: 4,
      attendanceRate: 83.3,
      startups: [
        { id: 1, name: "TechNova", present: true },
        { id: 2, name: "MobileGenius", present: true },
        { id: 3, name: "EcomPro", present: false },
        { id: 4, name: "HealthTrack", present: true },
        { id: 5, name: "AutoPilot", present: true },
        { id: 6, name: "GreenEnergy", present: false }
      ]
    },
    {
      id: 2,
      session: "Product Feedback Session",
      date: "2025-06-16",
      totalStartups: 24,
      present: 18,
      absent: 6,
      attendanceRate: 75.0,
      startups: [
        { id: 1, name: "TechNova", present: true },
        { id: 2, name: "MobileGenius", present: false },
        { id: 3, name: "EcomPro", present: true },
        { id: 4, name: "HealthTrack", present: true },
        { id: 5, name: "AutoPilot", present: false },
        { id: 6, name: "GreenEnergy", present: true }
      ]
    }
  ]);

  const [selectedSession, setSelectedSession] = useState(attendanceData[0]);
  const [filter, setFilter] = useState('all'); // 'all', 'present', 'absent'

  // Toggle attendance status for a startup
  const toggleAttendance = (sessionId, startupId) => {
    setAttendanceData(attendanceData.map(session => {
      if (session.id === sessionId) {
        const updatedStartups = session.startups.map(startup => {
          if (startup.id === startupId) {
            return { ...startup, present: !startup.present };
          }
          return startup;
        });
        
        // Recalculate attendance stats
        const presentCount = updatedStartups.filter(s => s.present).length;
        const totalCount = updatedStartups.length;
        const attendanceRate = totalCount > 0 ? (presentCount / totalCount) * 100 : 0;
        
        return {
          ...session,
          startups: updatedStartups,
          present: presentCount,
          absent: totalCount - presentCount,
          attendanceRate: parseFloat(attendanceRate.toFixed(1))
        };
      }
      return session;
    }));
    
    // Update selected session if it's the one being modified
    if (selectedSession.id === sessionId) {
      const updatedSession = attendanceData.find(s => s.id === sessionId);
      if (updatedSession) {
        const updatedStartups = updatedSession.startups.map(startup => {
          if (startup.id === startupId) {
            return { ...startup, present: !startup.present };
          }
          return startup;
        });
        
        const presentCount = updatedStartups.filter(s => s.present).length;
        const totalCount = updatedStartups.length;
        const attendanceRate = totalCount > 0 ? (presentCount / totalCount) * 100 : 0;
        
        setSelectedSession({
          ...updatedSession,
          startups: updatedStartups,
          present: presentCount,
          absent: totalCount - presentCount,
          attendanceRate: parseFloat(attendanceRate.toFixed(1))
        });
      }
    }
  };

  // Filter startups based on attendance status
  const filteredStartups = selectedSession.startups.filter(startup => {
    if (filter === 'all') return true;
    if (filter === 'present') return startup.present;
    if (filter === 'absent') return !startup.present;
    return true;
  });

  // Get attendance trend data for chart
  const getAttendanceTrend = () => {
    return attendanceData.map(session => ({
      name: session.session,
      attendance: session.attendanceRate
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Attendance Tracking</h1>
            <p className="text-gray-600">Monitor startup attendance across sessions</p>
          </div>
          <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors mt-4 md:mt-0">
            Export Report
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Session List */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Sessions</h2>
            <div className="space-y-3">
              {attendanceData.map(session => (
                <div 
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                    selectedSession.id === session.id
                      ? 'border-[#FF6A00] bg-[#FFF9F0]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-bold text-gray-800">{session.session}</h3>
                  <p className="text-sm text-gray-600">{session.date}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">{session.present}/{session.totalStartups} present</span>
                    <span className="text-sm font-medium">{session.attendanceRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-[#FF6A00] h-1.5 rounded-full" 
                      style={{ width: `${session.attendanceRate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Attendance Details */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-800">{selectedSession.session}</h2>
                <p className="text-gray-600">{selectedSession.date}</p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#FF6A00] rounded-full mr-2"></div>
                  <span className="text-sm">{selectedSession.present} Present</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                  <span className="text-sm">{selectedSession.absent} Absent</span>
                </div>
                <div className="text-sm font-medium">{selectedSession.attendanceRate}%</div>
              </div>
            </div>
            
            {/* Attendance Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-r from-[#FF6A00] to-[#FFA500] rounded-2xl p-4 text-white">
                <h3 className="text-lg font-semibold mb-1">Attendance Rate</h3>
                <p className="text-2xl font-bold">{selectedSession.attendanceRate}%</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 text-white">
                <h3 className="text-lg font-semibold mb-1">Present</h3>
                <p className="text-2xl font-bold">{selectedSession.present}</p>
              </div>
              <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl p-4 text-white">
                <h3 className="text-lg font-semibold mb-1">Absent</h3>
                <p className="text-2xl font-bold">{selectedSession.absent}</p>
              </div>
            </div>
            
            {/* Filter and Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="flex space-x-2 mb-4 md:mb-0">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filter === 'all' 
                      ? 'bg-[#FF6A00] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({selectedSession.startups.length})
                </button>
                <button 
                  onClick={() => setFilter('present')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filter === 'present' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Present ({selectedSession.startups.filter(s => s.present).length})
                </button>
                <button 
                  onClick={() => setFilter('absent')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filter === 'absent' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Absent ({selectedSession.startups.filter(s => !s.present).length})
                </button>
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Search startups..."
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                />
              </div>
            </div>
            
            {/* Attendance Table */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-700 font-medium">Startup</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStartups.map(startup => (
                    <tr key={startup.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{startup.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          startup.present 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {startup.present ? 'Present' : 'Absent'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleAttendance(selectedSession.id, startup.id)}
                          className={`px-3 py-1 rounded-full text-xs ${
                            startup.present
                              ? 'bg-red-100 text-red-800 hover:bg-red-200'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          Mark {startup.present ? 'Absent' : 'Present'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Attendance Heatmap Legend */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Attendance Legend</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm">Present</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-sm">Absent</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
            <span className="text-sm">Late</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
            <span className="text-sm">Excused</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracking;