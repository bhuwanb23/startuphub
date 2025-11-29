import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarNavigation = () => {
  const navItems = [
    { id: 1, name: 'Mentorship Templates', path: '/mentors/tools' },
    { id: 2, name: 'Strategic Frameworks', path: '/mentors/tools/strategic-frameworks' },
    { id: 3, name: 'Tech Evaluation Frameworks', path: '/mentors/tools/tech-evaluation' },
    { id: 4, name: 'Business Model Review Tools', path: '/mentors/tools/business-model' },
    { id: 5, name: 'Financial Checklist Evaluators', path: '/mentors/tools/financial-checklist' },
    { id: 6, name: 'Pitch Improvement Tools', path: '/mentors/tools/pitch-improvement' },
    { id: 7, name: 'Regulation & Compliance Guidelines', path: '/mentors/tools/regulation-compliance' },
    { id: 8, name: 'Recommended External Tools', path: '/mentors/tools/external-tools' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-[#FFF2DC] h-fit">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Mentor Tools Library</h2>
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