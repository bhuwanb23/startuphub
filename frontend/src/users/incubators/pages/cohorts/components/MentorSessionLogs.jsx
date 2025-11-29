import React, { useState } from 'react';

const MentorSessionLogs = () => {
  const [sessionLogs, setSessionLogs] = useState([
    {
      id: 1,
      mentor: "Sarah Johnson",
      startup: "TechNova",
      date: "2025-06-15",
      duration: "60 minutes",
      sessionType: "Business Strategy",
      rating: 4.5,
      feedback: "Great progress on business model. Need to focus more on customer segments.",
      notes: "Discussed revenue streams and cost structure. Startup showed good understanding.",
      actionItems: [
        "Refine customer segments",
        "Validate pricing assumptions",
        "Prepare for investor pitch"
      ]
    },
    {
      id: 2,
      mentor: "Michael Chen",
      startup: "HealthTrack",
      date: "2025-06-16",
      duration: "90 minutes",
      sessionType: "Product Development",
      rating: 4.8,
      feedback: "Excellent technical progress. MVP is well-structured.",
      notes: "Reviewed product architecture and discussed scalability options.",
      actionItems: [
        "Implement user authentication",
        "Add analytics dashboard",
        "Prepare for beta testing"
      ]
    },
    {
      id: 3,
      mentor: "David Wilson",
      startup: "EcomPro",
      date: "2025-06-17",
      duration: "45 minutes",
      sessionType: "Market Analysis",
      rating: 4.2,
      feedback: "Good market research but need to validate assumptions with real data.",
      notes: "Discussed target market size and competitive landscape.",
      actionItems: [
        "Conduct customer interviews",
        "Analyze competitor pricing",
        "Update market size estimates"
      ]
    }
  ]);

  const [selectedLog, setSelectedLog] = useState(sessionLogs[0]);
  const [filterMentor, setFilterMentor] = useState('all');
  const [filterStartup, setFilterStartup] = useState('all');

  // Get unique mentors and startups for filters
  const mentors = [...new Set(sessionLogs.map(log => log.mentor))];
  const startups = [...new Set(sessionLogs.map(log => log.startup))];

  // Filter logs based on selected filters
  const filteredLogs = sessionLogs.filter(log => {
    if (filterMentor !== 'all' && log.mentor !== filterMentor) return false;
    if (filterStartup !== 'all' && log.startup !== filterStartup) return false;
    return true;
  });

  // Add a new action item
  const addActionItem = () => {
    setSelectedLog({
      ...selectedLog,
      actionItems: [...selectedLog.actionItems, '']
    });
  };

  // Update action item
  const updateActionItem = (index, value) => {
    const updatedActionItems = [...selectedLog.actionItems];
    updatedActionItems[index] = value;
    setSelectedLog({
      ...selectedLog,
      actionItems: updatedActionItems
    });
  };

  // Remove action item
  const removeActionItem = (index) => {
    const updatedActionItems = [...selectedLog.actionItems];
    updatedActionItems.splice(index, 1);
    setSelectedLog({
      ...selectedLog,
      actionItems: updatedActionItems
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mentor Session Logs</h1>
            <p className="text-gray-600">Track mentor sessions, feedback, and action items</p>
          </div>
          <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors mt-4 md:mt-0">
            Add New Log
          </button>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Mentor</label>
            <select
              value={filterMentor}
              onChange={(e) => setFilterMentor(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              <option value="all">All Mentors</option>
              {mentors.map(mentor => (
                <option key={mentor} value={mentor}>{mentor}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Startup</label>
            <select
              value={filterStartup}
              onChange={(e) => setFilterStartup(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              <option value="all">All Startups</option>
              {startups.map(startup => (
                <option key={startup} value={startup}>{startup}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Export Logs
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Session Logs List */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Session Logs</h2>
            <div className="space-y-3">
              {filteredLogs.map(log => (
                <div 
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                    selectedLog.id === log.id
                      ? 'border-[#FF6A00] bg-[#FFF9F0]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{log.mentor}</h3>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm font-medium">{log.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{log.startup} • {log.date}</p>
                  <p className="text-sm text-gray-500 mt-1">{log.sessionType}</p>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">{log.feedback}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Session Log Details */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Session Details</h2>
            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mentor</label>
                  <input
                    type="text"
                    value={selectedLog.mentor}
                    onChange={(e) => setSelectedLog({...selectedLog, mentor: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Startup</label>
                  <input
                    type="text"
                    value={selectedLog.startup}
                    onChange={(e) => setSelectedLog({...selectedLog, startup: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={selectedLog.date}
                    onChange={(e) => setSelectedLog({...selectedLog, date: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
                  <input
                    type="text"
                    value={selectedLog.sessionType}
                    onChange={(e) => setSelectedLog({...selectedLog, sessionType: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={selectedLog.duration}
                    onChange={(e) => setSelectedLog({...selectedLog, duration: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={selectedLog.rating}
                      onChange={(e) => setSelectedLog({...selectedLog, rating: parseFloat(e.target.value)})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    />
                    <span className="ml-2 text-yellow-500">★</span>
                  </div>
                </div>
              </div>
              
              {/* Feedback */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                <textarea
                  value={selectedLog.feedback}
                  onChange={(e) => setSelectedLog({...selectedLog, feedback: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  rows="3"
                  placeholder="Enter feedback..."
                />
              </div>
              
              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={selectedLog.notes}
                  onChange={(e) => setSelectedLog({...selectedLog, notes: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  rows="3"
                  placeholder="Enter session notes..."
                />
              </div>
              
              {/* Action Items */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Action Items</label>
                  <button 
                    onClick={addActionItem}
                    className="text-[#FF6A00] text-sm font-medium"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedLog.actionItems.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateActionItem(index, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                        placeholder="Action item..."
                      />
                      <button 
                        onClick={() => removeActionItem(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
                  Save Changes
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Generate Report
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Send to Startup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Session Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-[#FFF2DC]">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Total Sessions</h3>
          <p className="text-2xl font-bold text-[#FF6A00]">{sessionLogs.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-[#FFF2DC]">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Avg. Rating</h3>
          <p className="text-2xl font-bold text-[#FF6A00]">
            {(sessionLogs.reduce((sum, log) => sum + log.rating, 0) / sessionLogs.length).toFixed(1)}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-[#FFF2DC]">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Mentors</h3>
          <p className="text-2xl font-bold text-[#FF6A00]">{mentors.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5 border border-[#FFF2DC]">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Startups</h3>
          <p className="text-2xl font-bold text-[#FF6A00]">{startups.length}</p>
        </div>
      </div>
    </div>
  );
};

export default MentorSessionLogs;