import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { id: 1, name: 'Intake Portal', path: '/incubators/intake', icon: '📥' },
    { id: 2, name: 'Application Submissions', path: '/incubators/intake/submissions', icon: '📋' },
    { id: 3, name: 'Document Verification', path: '/incubators/intake/documents', icon: '📄' },
    { id: 4, name: 'Eligibility Checks', path: '/incubators/intake/eligibility', icon: '✅' },
    { id: 5, name: 'AI Screening System', path: '/incubators/intake/ai-screening', icon: '🤖' },
    { id: 6, name: 'Evaluation Workspace', path: '/incubators/intake/evaluation', icon: '🔍' },
    { id: 7, name: 'Expert Panel', path: '/incubators/intake/expert-panel', icon: '👨‍💼' },
    { id: 8, name: 'Shortlisting', path: '/incubators/intake/shortlisting', icon: '⭐' },
    { id: 9, name: 'Rejection Reasons', path: '/incubators/intake/rejections', icon: '❌' },
    { id: 10, name: 'Program Enrollment', path: '/incubators/intake/enrollment', icon: '🎓' }
  ];

  // Function to determine if a nav item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC] h-fit">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Intake & Screening</h2>
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