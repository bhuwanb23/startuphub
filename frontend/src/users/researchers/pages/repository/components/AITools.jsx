import React from 'react';

const AITools = () => {
  const aiTools = [
    { id: 1, name: 'Extract Insights', icon: '🔍', description: 'Identify key findings from your research' },
    { id: 2, name: 'Summarize Drafts', icon: '📝', description: 'Create concise summaries of lengthy documents' },
    { id: 3, name: 'Generate Claims', icon: '💡', description: 'Formulate patent claims from your research' },
    { id: 4, name: 'Clarity Score', icon: '📊', description: 'Check readability and clarity of your writing' },
    { id: 5, name: 'Lab Notes Converter', icon: '🔄', description: 'Transform lab notes into structured documents' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">🤖 AI Tools</h2>
      
      <div className="space-y-3">
        {aiTools.map((tool) => (
          <button 
            key={tool.id}
            className="w-full flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
          >
            <div className="text-2xl mr-3">{tool.icon}</div>
            <div>
              <div className="font-medium text-gray-800">{tool.name}</div>
              <div className="text-xs text-gray-600">{tool.description}</div>
            </div>
          </button>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 border border-[#FF6A00] text-[#FF6A00] rounded-lg hover:bg-[#FFF5EB] transition-colors text-sm font-medium">
        View All AI Tools
      </button>
    </div>
  );
};

export default AITools;