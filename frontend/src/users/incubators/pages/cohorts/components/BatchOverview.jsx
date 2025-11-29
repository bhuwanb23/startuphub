import React from 'react';

const BatchOverview = () => {
  // Mock data for the batch overview
  const batchData = {
    title: "Batch Alpha 2025",
    startDate: "Jan 15, 2025",
    endDate: "Jul 15, 2025",
    startups: 24,
    mentors: 8,
    totalFunding: "$1.2M",
    progress: 65
  };

  const kpiData = [
    { name: "Revenue Growth", current: 120, target: 150, unit: "%" },
    { name: "Customer Acquisition", current: 450, target: 500, unit: "users" },
    { name: "Product Adoption", current: 78, target: 85, unit: "%" },
    { name: "Team Expansion", current: 6, target: 10, unit: "members" }
  ];

  const timelineEvents = [
    { date: "Jan 15", event: "Program Kickoff", status: "completed" },
    { date: "Feb 10", event: "Mentor Matching", status: "completed" },
    { date: "Mar 5", event: "Validation Workshop", status: "completed" },
    { date: "Apr 15", event: "MVP Presentation", status: "in-progress" },
    { date: "May 20", event: "Investor Demo Day", status: "upcoming" },
    { date: "Jun 30", event: "Mid-Term Evaluation", status: "upcoming" },
    { date: "Jul 15", event: "Program Graduation", status: "upcoming" }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{batchData.title}</h1>
        <p className="text-gray-600 mb-6">Program Duration: {batchData.startDate} - {batchData.endDate}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Startups</h3>
            <p className="text-2xl font-bold text-[#FF6A00]">{batchData.startups}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Mentors</h3>
            <p className="text-2xl font-bold text-[#FF6A00]">{batchData.mentors}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Total Funding</h3>
            <p className="text-2xl font-bold text-[#FF6A00]">{batchData.totalFunding}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Progress</h3>
            <p className="text-2xl font-bold text-[#FF6A00]">{batchData.progress}%</p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Program Timeline</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {/* Timeline events */}
            <div className="space-y-6 pl-12">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className={`absolute left-[-28px] w-6 h-6 rounded-full border-4 ${
                    event.status === 'completed' ? 'bg-[#FF6A00] border-[#FFF9F0]' :
                    event.status === 'in-progress' ? 'bg-white border-[#FF6A00]' :
                    'bg-white border-gray-300'
                  }`}></div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-800">{event.event}</h3>
                      <span className="text-sm text-gray-500">{event.date}</span>
                    </div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      event.status === 'completed' ? 'bg-green-100 text-green-800' :
                      event.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">KPI Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">{kpi.name}</h3>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Current: {kpi.current}{kpi.unit}</span>
                    <span>Target: {kpi.target}{kpi.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#FF6A00] h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (kpi.current / kpi.target) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {Math.round((kpi.current / kpi.target) * 100)}% of target achieved
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchOverview;