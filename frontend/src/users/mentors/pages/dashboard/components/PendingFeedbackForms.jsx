import React from 'react';

const PendingFeedbackForms = () => {
  // Mock data
  const pendingFeedback = [
    {
      id: 1,
      startup: "TechFlow Inc.",
      sessionDate: "Jun 10, 2023",
      sessionTopic: "Business Model Review"
    },
    {
      id: 2,
      startup: "GreenEnergy Solutions",
      sessionDate: "Jun 8, 2023",
      sessionTopic: "Technical Architecture Discussion"
    },
    {
      id: 3,
      startup: "HealthTrack",
      sessionDate: "Jun 5, 2023",
      sessionTopic: "Product Demo & Feedback"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">Pending Feedback Forms</h2>
        <button className="text-[#FF6A00] hover:text-[#FF8C42] font-medium text-sm">View All</button>
      </div>

      <div className="space-y-4">
        {pendingFeedback.map((feedback) => (
          <div key={feedback.id} className="flex items-center justify-between p-4 bg-[#FFF9F0] rounded-lg">
            <div>
              <h3 className="font-bold text-gray-800">{feedback.startup}</h3>
              <p className="text-sm text-gray-600">{feedback.sessionTopic}</p>
              <p className="text-xs text-gray-500">Session on {feedback.sessionDate}</p>
            </div>
            <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium">
              Complete Feedback
            </button>
          </div>
        ))}
      </div>

      {pendingFeedback.length === 0 && (
        <div className="text-center py-8">
          <div className="bg-[#FFF2DC] rounded-full p-3 inline-block mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF6A00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600">No pending feedback forms</p>
        </div>
      )}
    </div>
  );
};

export default PendingFeedbackForms;