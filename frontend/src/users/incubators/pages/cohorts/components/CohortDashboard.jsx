import React from 'react';

const CohortDashboard = () => {
  // Mock data for the dashboard
  const batchOverview = {
    title: "Batch Alpha 2025",
    startups: 24,
    mentors: 8,
    totalFunding: "$1.2M",
    progress: 65
  };

  const startups = [
    { id: 1, logo: "🚀", name: "TechNova", stage: "Validation", score: 8.2, mentor: "Sarah Johnson" },
    { id: 2, logo: "📱", name: "MobileGenius", stage: "Growth", score: 7.5, mentor: "Michael Chen" },
    { id: 3, logo: "🛍️", name: "EcomPro", stage: "Validation", score: 6.8, mentor: "David Wilson" },
    { id: 4, logo: "🏥", name: "HealthTrack", stage: "Growth", score: 9.1, mentor: "Emma Rodriguez" }
  ];

  const fundingSnapshot = {
    grants: "$450K",
    investments: "$750K",
    stipends: "$300K"
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Startups</h3>
          <p className="text-3xl font-bold text-[#FF6A00]">{batchOverview.startups}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Mentors</h3>
          <p className="text-3xl font-bold text-[#FF6A00]">{batchOverview.mentors}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Funding</h3>
          <p className="text-3xl font-bold text-[#FF6A00]">{batchOverview.totalFunding}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Progress</h3>
          <p className="text-3xl font-bold text-[#FF6A00]">{batchOverview.progress}%</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Batch Overview</h2>
          <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
            View Details
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{batchOverview.title}</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-[#FF6A00] h-2.5 rounded-full" 
              style={{ width: `${batchOverview.progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{batchOverview.progress}% Complete</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Startup List</h2>
            <button className="text-[#FF6A00] hover:text-[#e05500] font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-600 font-medium">Startup</th>
                  <th className="text-left py-2 text-gray-600 font-medium">Stage</th>
                  <th className="text-left py-2 text-gray-600 font-medium">Score</th>
                  <th className="text-left py-2 text-gray-600 font-medium">Mentor</th>
                  <th className="text-left py-2 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {startups.map((startup) => (
                  <tr key={startup.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{startup.logo}</span>
                        <span className="font-medium">{startup.name}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {startup.stage}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="font-medium">{startup.score}/10</span>
                    </td>
                    <td className="py-3 text-gray-600">{startup.mentor}</td>
                    <td className="py-3">
                      <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Mentor Assignments</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#FF6A00] rounded-full flex items-center justify-center text-white font-bold mr-3">
                    SJ
                  </div>
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">4 startups assigned</p>
                  </div>
                </div>
                <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                  Manage
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#FF6A00] rounded-full flex items-center justify-center text-white font-bold mr-3">
                    MC
                  </div>
                  <div>
                    <p className="font-medium">Michael Chen</p>
                    <p className="text-sm text-gray-600">3 startups assigned</p>
                  </div>
                </div>
                <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
                  Manage
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Funding Assigned</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Grants</span>
                <span className="font-medium">{fundingSnapshot.grants}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Investments</span>
                <span className="font-medium">{fundingSnapshot.investments}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Stipends</span>
                <span className="font-medium">{fundingSnapshot.stipends}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center font-bold">
                <span>Total</span>
                <span className="text-[#FF6A00]">{batchOverview.totalFunding}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Program Planner Preview</h2>
          <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
            Manage Program
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">Week 1-2</h3>
            <p className="text-sm text-gray-600">Business Model Canvas</p>
            <div className="mt-2 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-xs text-gray-500">Completed</span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">Week 3-4</h3>
            <p className="text-sm text-gray-600">Customer Discovery</p>
            <div className="mt-2 flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              <span className="text-xs text-gray-500">In Progress</span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">Week 5-6</h3>
            <p className="text-sm text-gray-600">MVP Development</p>
            <div className="mt-2 flex items-center">
              <span className="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
              <span className="text-xs text-gray-500">Not Started</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CohortDashboard;