import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const SidebarNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { id: 1, name: 'Facility Booking', path: '/incubators/resources/booking', icon: '📅' },
    { id: 2, name: 'Asset Management', path: '/incubators/resources/assets', icon: '🛠️' },
    { id: 3, name: 'Resource Allocation', path: '/incubators/resources/allocation', icon: '📊' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-fit">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Resource Management</h2>
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