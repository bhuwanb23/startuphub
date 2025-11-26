import React from 'react';

const AISuggestions = () => {
  const aiSuggestions = [
    { title: 'Recommended collaborations', suggestion: '3 new potential collaborators in Quantum Computing', icon: '🤝' },
    { title: 'Potential commercialization domains', suggestion: 'AI in Healthcare showing strong market potential', icon: '💼' },
    { title: 'High-match startups', suggestion: '2 startups interested in your Neural Interface research', icon: '🚀' },
    { title: 'Recommended patents to review', suggestion: '5 new patents in your field filed this week', icon: '📄' },
  ];

  return (
    <div className="bg-gradient-to-br from-[#FFF5EB] to-white rounded-2xl border border-[#FF8C42]/30 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">🤖 AI Suggestions Panel</h2>
        <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
          Refresh
        </button>
      </div>
      
      <div className="space-y-4">
        {aiSuggestions.map((suggestion, index) => (
          <div key={index} className="flex items-start p-4 bg-white/50 rounded-xl border border-white hover:border-[#FF8C42]/30 transition-all">
            <div className="text-xl mr-4">{suggestion.icon}</div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">{suggestion.title}</div>
              <div className="text-sm text-gray-600 mt-1">{suggestion.suggestion}</div>
              <button className="text-xs text-[#FF6A00] hover:text-[#e05500] mt-2 font-medium flex items-center">
                Explore <span className="ml-1">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AISuggestions;