import React from 'react';
import { useNavigate } from 'react-router-dom';

const UniversitySidebar = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 1, name: 'University Dashboard', icon: '📊', path: '/universities/dashboard' },
    { id: 2, name: 'Research Commercialization', icon: '💡', path: '/universities/ipr' },
    { id: 3, name: 'Student Innovation Tracking', icon: '👨‍🎓', path: '/universities/students' },
    { id: 4, name: 'Industry Partnerships', icon: '🤝', path: '/universities/partnerships' },
    { id: 5, name: 'Grant & Funding Management', icon: '💰', path: '/universities/grants' },
    { id: 6, name: 'Facility & Lab Management', icon: '🔬', path: '/universities/facilities' },
    { id: 7, name: 'Research Analytics', icon: '📈', path: '/universities/analytics' },
    { id: 8, name: 'Curriculum Hub', icon: '📚', path: '/universities/curriculum' },
    { id: 9, name: 'University Tools', icon: '🧰', path: '/universities/tools' },
    { id: 10, name: 'Communication Center', icon: '💬', path: '/universities/communication' },
  ];

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">University Portal</h2>
      </div>
      
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => navigate(item.path)}
                className="w-full flex items-center p-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-100"
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button className="w-full py-2 px-4 bg-[#6366F1] text-white rounded-lg hover:bg-[#4F46E5] transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default UniversitySidebar;