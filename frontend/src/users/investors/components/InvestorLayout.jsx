import React from 'react';
import InvestorHeader from '../pages/dashboard/components/DashboardHeader';
import InvestorSidebar from '../pages/dashboard/components/DashboardSidebar';

const InvestorLayout = ({ children }) => {
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
        
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InvestorLayout;