import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardSidebar = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 1, name: 'Dashboard', icon: '📊', path: '/investors/dashboard' },
    { id: 2, name: 'Smart Deal Flow', icon: '💡', path: '/investors/deal-flow' },
    { id: 3, name: 'Due Diligence', icon: '🔍', path: '/investors/due-diligence' },
    { id: 4, name: 'Portfolio', icon: '💼', path: '/investors/portfolio' },
    { id: 5, name: 'Sector Insights', icon: '📈', path: '/investors/insights' },
    { id: 6, name: 'Collaboration', icon: '🤝', path: '/investors/collaboration' },
    { id: 7, name: 'Tools', icon: '🛠️', path: '/investors/tools' },
    { id: 8, name: 'Communication', icon: '💬', path: '/investors/communication' },
  ];

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">Investor Portal</h2>
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

export default DashboardSidebar;