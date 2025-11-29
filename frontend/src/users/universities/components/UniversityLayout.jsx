import React from 'react';
import UniversityHeader from './university_header';
import UniversitySidebar from './university_sidebar';

const UniversityLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <UniversitySidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <UniversityHeader />
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UniversityLayout;