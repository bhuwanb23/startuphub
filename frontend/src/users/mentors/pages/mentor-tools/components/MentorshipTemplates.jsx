import React from 'react';

const MentorshipTemplates = () => {
  const templates = [
    {
      id: 1,
      title: "Feedback Forms",
      description: "Standardized feedback forms for mentorship sessions",
      icon: "📝",
      category: "Session Tools"
    },
    {
      id: 2,
      title: "Session Agendas",
      description: "Pre-structured agendas for different mentorship stages",
      icon: "📅",
      category: "Planning"
    },
    {
      id: 3,
      title: "Gap Analysis Sheets",
      description: "Comprehensive sheets to identify startup gaps",
      icon: "🔍",
      category: "Analysis"
    },
    {
      id: 4,
      title: "Evaluation Rubrics",
      description: "Standardized rubrics for startup progress evaluation",
      icon: "📊",
      category: "Assessment"
    }
  ];

  const handleUseTemplate = (templateName) => {
    alert(`Using template: ${templateName}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Mentorship Templates</h2>
        <p className="text-gray-600">Ready-to-use templates for effective mentoring sessions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{template.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-800">{template.title}</h3>
                  <span className="text-xs px-2 py-1 bg-[#FFF2DC] text-[#FF6A00] rounded-full">
                    {template.category}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">{template.description}</p>
            <button 
              onClick={() => handleUseTemplate(template.title)}
              className="w-full py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium"
            >
              Use Template
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">AI-Powered Template Suggestions</h3>
        <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFDAB9]">
          <div className="flex">
            <div className="mr-3 text-[#FF6A00]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Based on your mentoring history, we suggest using the "Gap Analysis Sheets" template for your upcoming sessions with HealthTech startups.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipTemplates;