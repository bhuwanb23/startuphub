import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarNavigation = () => {
  const navItems = [
    { id: 1, name: 'Inbox', path: '/incubators/communication/inbox', icon: '📥' },
    { id: 2, name: 'Startup Chats', path: '/incubators/communication/startups', icon: '🚀' },
    { id: 3, name: 'Mentor Chats', path: '/incubators/communication/mentors', icon: '👨‍🏫' },
    { id: 4, name: 'Group Discussions', path: '/incubators/communication/groups', icon: '👥' },
    { id: 5, name: 'Announcements', path: '/incubators/communication/announcements', icon: '📢' },
    { id: 6, name: 'Notifications', path: '/incubators/communication/notifications', icon: '🔔' },
    { id: 7, name: 'Document Exchange', path: '/incubators/communication/documents', icon: '📁' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-fit">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Communication Hub</h2>
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