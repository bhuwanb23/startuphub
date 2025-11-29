import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { id: 1, name: 'Funding Explorer', path: '/incubators/funding/explorer', icon: '🔍' },
    { id: 2, name: 'Readiness Tools', path: '/incubators/funding/readiness', icon: '🛠️' },
    { id: 3, name: 'Pipeline Manager', path: '/incubators/funding/pipeline', icon: '📊' }
  ];

  // Function to determine if a nav item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC] h-fit">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Funding Hub</h2>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => navigate(item.path)}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                  isActive(item.path)
                    ? 'bg-[#FFF9F0] text-[#FF6A00] border-l-4 border-[#FF6A00]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarNavigation;