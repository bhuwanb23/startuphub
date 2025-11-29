import React from 'react';

const UniversityHeader = () => {
  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800">University Portal</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <div className="relative">
            <button className="flex items-center space-x-2 focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                U
              </div>
              <span className="text-gray-700">University Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UniversityHeader;