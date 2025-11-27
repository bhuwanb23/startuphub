import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarNavigation = () => {
  const navItems = [
    { id: 1, name: 'Startup Progress Score', path: '/mentor/dashboard/performance-dashboard' },
    { id: 2, name: 'Session Impact Metrics', path: '/mentor/dashboard/performance-dashboard/performance/session-impact' },
    { id: 3, name: 'Mentor Contribution Analytics', path: '/mentor/dashboard/performance-dashboard/performance/contribution-analytics' },
    { id: 4, name: 'Feedback Received', path: '/mentor/dashboard/performance-dashboard/performance/feedback' },
    { id: 5, name: 'Domain Impact Heatmap', path: '/mentor/dashboard/performance-dashboard/performance/domain-heatmap' },
    { id: 6, name: 'Mentoring Hours Log', path: '/mentor/dashboard/performance-dashboard/performance/hours-log' },
    { id: 7, name: 'Recognition & Badges', path: '/mentor/dashboard/performance-dashboard/performance/recognition' },
    { id: 8, name: 'Mentor Leaderboard', path: '/mentor/dashboard/performance-dashboard/performance/leaderboard' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC] h-fit">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Performance Dashboard</h2>
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