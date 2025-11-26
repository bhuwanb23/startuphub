import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickLinks = () => {
  const navigate = useNavigate();
  
  const quickLinks = [
    { title: 'Open Research Repository', icon: '📚', path: '/researchers/repository' },
    { title: 'IPR Tools', icon: '🧠', path: '/researchers/ipr' },
    { title: 'Funding & Grants Matching', icon: '💰', path: '/researchers/grants' },
    { title: 'Innovation Analytics', icon: '📈', path: '/researchers/insights' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">🔗 Research Workspace Quick Links</h2>
        <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
          Customize
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickLinks.map((link, index) => (
          <button 
            key={index}
            onClick={() => handleNavigation(link.path)}
            className="flex items-center p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 hover:border-[#FF8C42]/30 hover:shadow-sm transition-all text-left"
          >
            <div className="text-2xl mr-4">{link.icon}</div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">{link.title}</div>
              <div className="text-sm text-[#FF6A00] mt-1 flex items-center">
                Open <span className="ml-1">→</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;