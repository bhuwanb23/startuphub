import React from 'react';

const RecommendedExternalTools = () => {
  const tools = [
    {
      id: 1,
      name: "Figma",
      description: "Collaborative interface design tool",
      category: "Design",
      icon: "🎨",
      url: "https://figma.com"
    },
    {
      id: 2,
      name: "Stripe Atlas",
      description: "Startup incorporation and banking",
      category: "Legal & Finance",
      icon: "💳",
      url: "https://stripe.com/atlas"
    },
    {
      id: 3,
      name: "HubSpot CRM",
      description: "Customer relationship management",
      category: "Sales & Marketing",
      icon: "👥",
      url: "https://hubspot.com"
    },
    {
      id: 4,
      name: "GitHub",
      description: "Code repository and version control",
      category: "Development",
      icon: "💻",
      url: "https://github.com"
    },
    {
      id: 5,
      name: "Miro",
      description: "Online collaborative whiteboarding platform",
      category: "Collaboration",
      icon: "📋",
      url: "https://miro.com"
    },
    {
      id: 6,
      name: "Notion",
      description: "All-in-one workspace for documentation",
      category: "Productivity",
      icon: "📝",
      url: "https://notion.so"
    },
    {
      id: 7,
      name: "AWS",
      description: "Cloud computing services",
      category: "Infrastructure",
      icon: "☁️",
      url: "https://aws.amazon.com"
    },
    {
      id: 8,
      name: "Slack",
      description: "Team communication platform",
      category: "Communication",
      icon: "💬",
      url: "https://slack.com"
    }
  ];

  const handleRedirect = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Recommended External Tools</h2>
        <p className="text-gray-600">Curated toolkit for startup growth and operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div key={tool.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{tool.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-800">{tool.name}</h3>
                  <span className="text-xs px-2 py-1 bg-[#FFF2DC] text-[#FF6A00] rounded-full">
                    {tool.category}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
            <button 
              onClick={() => handleRedirect(tool.url)}
              className="w-full py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium"
            >
              Visit Tool
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">AI-Powered Tool Recommendations</h3>
        <div className="bg-[#FFF9F0] rounded-xl p-4 border border-[#FFDAB9]">
          <div className="flex">
            <div className="mr-3 text-[#FF6A00]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                Based on your startup's stage and industry, we recommend adding Notion for documentation 
                and AWS for infrastructure scaling to your toolkit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedExternalTools;