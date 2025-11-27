import React from 'react';
import OverviewSnapshotCard from './components/OverviewSnapshotCard';
import StartupsAssignedSection from './components/StartupsAssignedSection';
import UpcomingSessionsWidget from './components/UpcomingSessionsWidget';
import SessionPerformanceScore from './components/SessionPerformanceScore';
import AISuggestedStartupsPanel from './components/AISuggestedStartupsPanel';
import NotificationsUpdates from './components/NotificationsUpdates';
import PendingFeedbackForms from './components/PendingFeedbackForms';

const MentorDashboard = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Mentor Dashboard</h1>
        <p className="text-gray-600">Welcome to your mentoring hub</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Overview Snapshot Card - Spans 2 columns on large screens */}
        <div className="lg:col-span-2">
          <OverviewSnapshotCard />
        </div>

        {/* Session Performance Score - Takes 1 column on large screens */}
        <div>
          <SessionPerformanceScore />
        </div>
      </div>

      {/* Startups Assigned Section */}
      <div className="mb-4">
        <StartupsAssignedSection />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Upcoming Sessions Widget - Spans 2 columns on large screens */}
        <div className="lg:col-span-2">
          <UpcomingSessionsWidget />
        </div>

        {/* Pending Feedback Forms - Takes 1 column on large screens */}
        <div>
          <PendingFeedbackForms />
        </div>
      </div>

      {/* AI-Suggested Startups Panel */}
      <div className="mb-4">
        <AISuggestedStartupsPanel />
      </div>

      {/* Notifications & Updates */}
      <div>
        <NotificationsUpdates />
      </div>
    </div>
  );
};

export default MentorDashboard;