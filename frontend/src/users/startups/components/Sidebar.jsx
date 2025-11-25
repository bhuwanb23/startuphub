import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SIDEBAR_NAVIGATION } from '../constants/navigation';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">StartupHub</h1>
            </div>
            <button 
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={toggleSidebar}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {SIDEBAR_NAVIGATION.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-[#FF8C42]/20 text-[#FF6A00] border-r-2 border-[#FF6A00]'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => window.innerWidth < 768 && toggleSidebar()}
                  >
                    <span className="text-xl mr-3">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] flex items-center justify-center text-white font-bold">
                ST
              </div>
              <div>
                <p className="font-medium text-gray-800">Startup Name</p>
                <p className="text-sm text-gray-500">Founder</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;