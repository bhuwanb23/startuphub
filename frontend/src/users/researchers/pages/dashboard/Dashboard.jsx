import React from 'react';
import OverviewSnapshot from './components/OverviewSnapshot';
import QuickLinks from './components/QuickLinks';
import AISuggestions from './components/AISuggestions';
import CurrentProjects from './components/CurrentProjects';
import Notifications from './components/Notifications';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-white to-[#FFF5EB] min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Researcher Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, Dr. Smith. Here's your research overview for today.</p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Overview and Quick Links */}
        <div className="xl:col-span-2 space-y-6">
          {/* Overview Snapshot */}
          <OverviewSnapshot />
          
          {/* Research Workspace Quick Links */}
          <QuickLinks />
          
          {/* AI Suggestions Panel */}
          <AISuggestions />
        </div>
        
        {/* Right Column - Projects and Notifications */}
        <div className="space-y-6">
          {/* Current Projects Preview */}
          <CurrentProjects />
          
          {/* Notifications & Updates */}
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;