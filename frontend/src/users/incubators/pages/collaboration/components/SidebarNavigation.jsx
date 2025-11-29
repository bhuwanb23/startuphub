import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarNavigation = () => {
  const navItems = [
    { id: 1, name: 'Corporate Partnerships', path: '/incubators/collaboration/corporate', icon: '🏢' },
    { id: 2, name: 'Academic Collaboration', path: '/incubators/collaboration/academic', icon: '🎓' },
    { id: 3, name: 'Startup Collaboration', path: '/incubators/collaboration/startup', icon: '🚀' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-fit">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Collaboration Hub</h2>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-orange-100 text-orange-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarNavigation;