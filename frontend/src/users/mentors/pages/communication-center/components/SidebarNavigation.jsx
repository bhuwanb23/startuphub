import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarNavigation = () => {
  const navItems = [
    { id: 1, name: 'Inbox', path: '/mentors/communication', icon: '📥' },
    { id: 2, name: 'Mentor–Startup Chat', path: '/mentors/communication/chat', icon: '💬' },
    { id: 3, name: 'Video Meeting Links', path: '/mentors/communication/video-meetings', icon: '📹' },
    { id: 4, name: 'Document Exchange', path: '/mentors/communication/documents', icon: '📂' },
    { id: 5, name: 'Group Discussions', path: '/mentors/communication/groups', icon: '👥' },
    { id: 6, name: 'Announcements', path: '/mentors/communication/announcements', icon: '📢' },
    { id: 7, name: 'Notification Center', path: '/mentors/communication/notifications', icon: '🔔' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC] h-fit">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Communication Center</h2>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                    isActive
                      ? 'bg-[#FFF9F0] text-[#FF6A00] border-l-4 border-[#FF6A00]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarNavigation;