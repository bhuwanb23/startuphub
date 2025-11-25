import React from 'react';

const CollaborationSidebar = ({ navigation, activeSection, setActiveSection }) => {
  return (
    <div className="bg-white h-full border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">Collaboration Hub</h2>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#FF8C42]/20 text-[#FF6A00] border-r-2 border-[#FF6A00]'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CollaborationSidebar;