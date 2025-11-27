import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarNavigation = () => {
  const navItems = [
    { id: 1, name: 'Shared Resource Library', path: '/mentors/collaboration' },
    { id: 2, name: 'Knowledge Sharing Board', path: '/mentors/collaboration/knowledge-sharing' },
    { id: 3, name: 'Guidebook & Framework Templates', path: '/mentors/collaboration/guidebook-templates' },
    { id: 4, name: 'Co-author Documents', path: '/mentors/collaboration/co-author-docs' },
    { id: 5, name: 'Shared Whiteboard', path: '/mentors/collaboration/whiteboard' },
    { id: 6, name: 'Discussion Channels', path: '/mentors/collaboration/discussion-channels' },
    { id: 7, name: 'Mentor–Startup Workspace Rooms', path: '/mentors/collaboration/workspace-rooms' },
    { id: 8, name: 'Upload/Share Best Practices', path: '/mentors/collaboration/best-practices' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC] h-fit">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Collaborative Workspace</h2>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#FFF9F0] text-[#FF6A00] border-l-4 border-[#FF6A00]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
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