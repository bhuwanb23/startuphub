import React from 'react';
import { TOOLS_NAVIGATION } from '../constants/navigation';

const ToolsSidebar = ({ activeSection, setActiveSection, searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-white h-full border-r border-gray-200 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">Tools Library</h2>
        <p className="text-xs text-gray-500 mt-1">Investor Utilities</p>
      </div>
      
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00] transition-all"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            🔍
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-1">
          {TOOLS_NAVIGATION.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center p-3 rounded-lg text-left transition-all ${
                  activeSection === item.id
                    ? 'bg-[#FF8C42]/20 text-[#FF6A00] border-r-2 border-[#FF6A00] shadow-sm'
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

export default ToolsSidebar;