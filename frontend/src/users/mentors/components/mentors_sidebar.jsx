import React from 'react';
import { useNavigate } from 'react-router-dom';

const MentorSidebar = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 1, name: 'Mentor Dashboard', icon: '📊', path: '/mentors/dashboard' },
    { id: 2, name: 'AI-Based Startup Matching', icon: '🤖', path: '/mentors/startup-matching' },
    { id: 3, name: 'Session Planning Tools', icon: '📅', path: '/mentors/session-planning' },
    { id: 4, name: 'Performance Dashboard', icon: '📈', path: '/mentors/performance' },
    { id: 5, name: 'Collaborative Workspace', icon: '🤝', path: '/mentors/collaboration' },
    { id: 6, name: 'Mentor Tools Library', icon: '🛠️', path: '/mentors/tools' },
    { id: 7, name: 'Communication Center', icon: '💬', path: '/mentors/communication' },
  ];

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">Mentor Portal</h2>
      </div>
      
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => navigate(item.path)}
                className="w-full flex items-center p-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-100"
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button className="w-full py-2 px-4 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default MentorSidebar;