import React from 'react';
import { INSIGHTS_NAVIGATION } from '../constants/navigation';

const InsightsSidebar = ({ activeSection, setActiveSection, searchTerm, setSearchTerm }) => {
  return (
    <div className="bg-white h-full border-r border-gray-200 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">Insights Hub</h2>
        <p className="text-xs text-gray-500 mt-1">Research & Sector Intelligence</p>
      </div>
      
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search sector, trends, companies..."
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
          {INSIGHTS_NAVIGATION.map((item) => (
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
      
      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button className="w-full flex items-center justify-center p-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all">
          <span className="mr-2">⚙️</span> Filter
        </button>
        <button className="w-full flex items-center justify-center p-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all">
          <span className="mr-2">⬇️</span> Download
        </button>
        <button className="w-full flex items-center justify-center p-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all">
          <span className="mr-2">🔔</span> Alerts
        </button>
      </div>
    </div>
  );
};

export default InsightsSidebar;