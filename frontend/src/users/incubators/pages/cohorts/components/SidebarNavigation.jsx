import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { id: 1, name: 'Cohort Dashboard', path: '/incubators/cohorts/dashboard', icon: '📊' },
    { id: 2, name: 'Batch Overview', path: '/incubators/cohorts/batch-overview', icon: '📋' },
    { id: 3, name: 'Startup List', path: '/incubators/cohorts/startups', icon: '🏢' },
    { id: 4, name: 'Mentor Assignments', path: '/incubators/cohorts/mentors', icon: '👨‍🏫' },
    { id: 5, name: 'Funding Assigned', path: '/incubators/cohorts/funding', icon: '💰' },
    { id: 6, name: 'Program Planner', path: '/incubators/cohorts/planner', icon: '📅' },
    { id: 7, name: 'Curriculum Builder', path: '/incubators/cohorts/curriculum', icon: '📚' },
    { id: 8, name: 'Session Calendar', path: '/incubators/cohorts/calendar', icon: '📆' },
    { id: 9, name: 'Weekly Tasks', path: '/incubators/cohorts/tasks', icon: '✅' },
    { id: 10, name: 'Program Templates', path: '/incubators/cohorts/templates', icon: '📐' },
    { id: 11, name: 'Session Management', path: '/incubators/cohorts/sessions', icon: '👥' },
    { id: 12, name: 'Attendance Tracking', path: '/incubators/cohorts/attendance', icon: '📋' },
    { id: 13, name: 'Mentor Logs', path: '/incubators/cohorts/mentor-logs', icon: '📝' },
    { id: 14, name: 'Learning Materials', path: '/incubators/cohorts/materials', icon: '📂' },
    { id: 15, name: 'Workflow Automation', path: '/incubators/cohorts/automation', icon: '⚙️' },
    { id: 16, name: 'Progress Reports', path: '/incubators/cohorts/reports', icon: '📈' }
  ];

  // Function to determine if a nav item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC] h-fit">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Cohort Management</h2>
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