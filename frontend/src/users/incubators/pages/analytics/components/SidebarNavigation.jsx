import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { id: 1, name: 'Performance Dashboard', path: '/incubators/analytics/performance', icon: '📊' },
    { id: 2, name: 'KPI Metrics', path: '/incubators/analytics/kpi', icon: '📈' },
    { id: 3, name: 'Product Readiness', path: '/incubators/analytics/readiness', icon: '✅' },
    { id: 4, name: 'TRL Score', path: '/incubators/analytics/trl', icon: '🔬' },
    { id: 5, name: 'Market Validation', path: '/incubators/analytics/validation', icon: '🔍' },
    { id: 6, name: 'Cohort Performance', path: '/incubators/analytics/cohort', icon: '👥' },
    { id: 7, name: 'Growth Heatmap', path: '/incubators/analytics/heatmap', icon: '🌡️' },
    { id: 8, name: 'Mentor Engagement', path: '/incubators/analytics/mentors', icon: '👨‍🏫' },
    { id: 9, name: 'Investor Metrics', path: '/incubators/analytics/investors', icon: '💼' },
    { id: 10, name: 'Monthly Reports', path: '/incubators/analytics/reports', icon: '📋' },
    { id: 11, name: 'Custom Reports', path: '/incubators/analytics/custom-reports', icon: '⚙️' },
    { id: 12, name: 'Export Options', path: '/incubators/analytics/export', icon: '📤' },
    { id: 13, name: 'Automated Alerts', path: '/incubators/analytics/alerts', icon: '🔔' }
  ];

  // Function to determine if a nav item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC] h-fit">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Analytics & Tracking</h2>
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