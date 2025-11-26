import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InvestorHeader from './components/investor_header';
import InvestorSidebar from './components/investor_sidebar';
import Dashboard from './pages/Dashboard';

const Investor = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <InvestorSidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <InvestorHeader />
        </div>
        
        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route index element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Investor;