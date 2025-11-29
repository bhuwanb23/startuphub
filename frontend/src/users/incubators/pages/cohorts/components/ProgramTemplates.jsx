import React from 'react';

const ProgramTemplates = () => {
  // Mock template data
  const templates = [
    {
      id: 1,
      name: "Accelerator Program",
      description: "12-week intensive accelerator program for growth-stage startups",
      duration: "12 weeks",
      startups: "10-15",
      focus: "Scaling & Funding",
      modules: 24,
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Pre-Incubation",
      description: "8-week program for early-stage ideas and concept validation",
      duration: "8 weeks",
      startups: "20-25",
      focus: "Idea Validation",
      modules: 16,
      color: "bg-green-500"
    },
    {
      id: 3,
      name: "Idea Stage",
      description: "6-week foundational program for raw startup concepts",
      duration: "6 weeks",
      startups: "30-40",
      focus: "Concept Development",
      modules: 12,
      color: "bg-yellow-500"
    },
    {
      id: 4,
      name: "Sector-Specific: FinTech",
      description: "10-week specialized program for financial technology startups",
      duration: "10 weeks",
      startups: "8-12",
      focus: "FinTech Innovation",
      modules: 20,
      color: "bg-purple-500"
    },
    {
      id: 5,
      name: "Sector-Specific: HealthTech",
      description: "10-week specialized program for healthcare technology startups",
      duration: "10 weeks",
      startups: "8-12",
      focus: "HealthTech Innovation",
      modules: 20,
      color: "bg-red-500"
    },
    {
      id: 6,
      name: "University Partnership",
      description: "16-week program for student-led startups and research projects",
      duration: "16 weeks",
      startups: "25-30",
      focus: "Academic Innovation",
      modules: 28,
      color: "bg-indigo-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Program Templates</h1>
            <p className="text-gray-600">Pre-built program templates for different startup stages</p>
          </div>
          <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors mt-4 md:mt-0">
            Create New Template
          </button>
        </div>
        
        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <div key={template.id} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`${template.color} h-2`}></div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-gray-800">{template.name}</h2>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {template.duration}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{template.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Startups</p>
                    <p className="font-medium">{template.startups}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Focus Area</p>
                    <p className="font-medium">{template.focus}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Modules</p>
                    <p className="font-medium">{template.modules}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <p className="font-medium text-green-600">Active</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-[#FF6A00] text-white py-2 rounded-lg text-sm font-medium hover:bg-[#e05500] transition-colors">
                    Use Template
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Customize
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Template Categories */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Template Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-xl p-4 text-center hover:border-[#FF6A00] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-500 text-xl">🚀</span>
            </div>
            <h3 className="font-medium text-gray-800">Accelerator</h3>
            <p className="text-sm text-gray-600 mt-1">Growth-focused programs</p>
          </div>
          
          <div className="border border-gray-200 rounded-xl p-4 text-center hover:border-[#FF6A00] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-500 text-xl">🌱</span>
            </div>
            <h3 className="font-medium text-gray-800">Incubation</h3>
            <p className="text-sm text-gray-600 mt-1">Early-stage programs</p>
          </div>
          
          <div className="border border-gray-200 rounded-xl p-4 text-center hover:border-[#FF6A00] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-500 text-xl">🏥</span>
            </div>
            <h3 className="font-medium text-gray-800">Sector-Specific</h3>
            <p className="text-sm text-gray-600 mt-1">Industry-focused programs</p>
          </div>
          
          <div className="border border-gray-200 rounded-xl p-4 text-center hover:border-[#FF6A00] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-yellow-500 text-xl">🎓</span>
            </div>
            <h3 className="font-medium text-gray-800">Academic</h3>
            <p className="text-sm text-gray-600 mt-1">University programs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramTemplates;