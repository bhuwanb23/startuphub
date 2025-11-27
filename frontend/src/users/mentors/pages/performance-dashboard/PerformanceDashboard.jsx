import React from 'react';

const PerformanceDashboard = () => {
  // Mock data for performance metrics
  const performanceMetrics = {
    totalMentees: 12,
    activeSessions: 8,
    completedPrograms: 5,
    avgRating: 4.7,
    hoursContributed: 42
  };

  const impactStats = [
    { label: 'Startups Funded', value: 3, icon: '💰' },
    { label: 'Patents Filed', value: 2, icon: '🧠' },
    { label: 'Jobs Created', value: 25, icon: '👥' },
    { label: 'Revenue Generated', value: '₹2.5Cr', icon: '📈' }
  ];

  const sessionFeedback = [
    { mentee: 'TechFlow Inc.', rating: 5, feedback: 'Extremely valuable insights on market positioning' },
    { mentee: 'GreenEnergy Solutions', rating: 4, feedback: 'Helpful guidance on investor pitch' },
    { mentee: 'HealthTrack', rating: 5, feedback: 'Perfect mentor for healthcare regulations' }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mentor Performance & Impact Dashboard</h1>
        <p className="text-gray-600">Track your mentoring effectiveness and startup impact</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-[#FF6A00]">{performanceMetrics.totalMentees}</div>
          <div className="text-gray-600 mt-1">Total Mentees</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-[#FF6A00]">{performanceMetrics.activeSessions}</div>
          <div className="text-gray-600 mt-1">Active Sessions</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-[#FF6A00]">{performanceMetrics.completedPrograms}</div>
          <div className="text-gray-600 mt-1">Completed Programs</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-[#FF6A00]">{performanceMetrics.avgRating}</div>
          <div className="text-gray-600 mt-1">Avg. Rating</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-[#FF6A00]">{performanceMetrics.hoursContributed}</div>
          <div className="text-gray-600 mt-1">Hours Contributed</div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Startup Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {impactStats.map((stat, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-[#FF6A00]">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Session Feedback */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Session Feedback</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {sessionFeedback.map((feedback, index) => (
              <div key={index} className="p-6">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-900">{feedback.mentee}</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-5 h-5 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{feedback.feedback}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Monthly Engagement</h2>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-end justify-between pt-8 border-t border-gray-200">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
                <div key={month} className="flex flex-col items-center flex-1">
                  <div className="text-gray-600 text-sm mb-2">{month}</div>
                  <div 
                    className="w-3/4 bg-[#FF6A00] rounded-t-md transition-all duration-300 hover:bg-[#e05500]"
                    style={{ height: `${20 + index * 15}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;