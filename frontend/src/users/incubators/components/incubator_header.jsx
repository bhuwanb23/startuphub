import React from 'react';

const IncubatorHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-800">Incubator Portal</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center text-white font-bold">
            ID
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700">Incubator Name</span>
        </div>
      </div>
    </header>
  );
};

export default IncubatorHeader;