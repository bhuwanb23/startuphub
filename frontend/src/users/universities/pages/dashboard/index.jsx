import React from 'react';
import InstitutionSnapshot from './components/InstitutionSnapshot';
import ActiveResearchProjects from './components/ActiveResearchProjects';
import StudentStartupOverview from './components/StudentStartupOverview';
import PatentActivitySummary from './components/PatentActivitySummary';
import IncubationMetrics from './components/IncubationMetrics';
import FacultyContributions from './components/FacultyContributions';
import GrantsOverview from './components/GrantsOverview';
import EventsDeadlines from './components/EventsDeadlines';
import NotificationsAlerts from './components/NotificationsAlerts';

const UniversityDashboard = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">University Dashboard</h1>
        <p className="text-gray-600">Overview of research, innovation, and startup activities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Institution Snapshot - Full width on mobile, 2/3 width on large screens */}
        <div className="lg:col-span-2">
          <InstitutionSnapshot />
        </div>
        
        {/* Events & Deadlines - Full width on mobile, 1/3 width on large screens */}
        <div>
          <EventsDeadlines />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Active Research Projects - Full width on mobile, 2/3 width on large screens */}
        <div className="lg:col-span-2">
          <ActiveResearchProjects />
        </div>
        
        {/* Notifications & Alerts - Full width on mobile, 1/3 width on large screens */}
        <div>
          <NotificationsAlerts />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <StudentStartupOverview />
        <PatentActivitySummary />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <IncubationMetrics />
        <FacultyContributions />
      </div>

      <div className="mb-6">
        <GrantsOverview />
      </div>
    </div>
  );
};

export default UniversityDashboard;