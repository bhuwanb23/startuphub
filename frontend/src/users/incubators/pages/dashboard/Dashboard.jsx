import React from 'react';
import OverviewStatsCard from './components/OverviewStatsCard';
import ActiveProgramsSection from './components/ActiveProgramsSection';
import StartupPipelineWidget from './components/StartupPipelineWidget';
import RecentActivityFeed from './components/RecentActivityFeed';
import QuickActionsPanel from './components/QuickActionsPanel';
import PerformanceMetricsChart from './components/PerformanceMetricsChart';
import UpcomingEventsCalendar from './components/UpcomingEventsCalendar';
import ResourceUtilizationCard from './components/ResourceUtilizationCard';
import { useDashboardData } from './hooks/useDashboardData';

const IncubatorDashboard = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-2">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Error loading dashboard</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Incubator Dashboard</h1>
        <p className="text-gray-600">Welcome to your incubator management hub</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Overview Stats Card - Spans 2 columns on large screens */}
        <div className="lg:col-span-2">
          <OverviewStatsCard />
        </div>

        {/* Resource Utilization Card - Takes 1 column on large screens */}
        <div>
          <ResourceUtilizationCard />
        </div>
      </div>

      {/* Active Programs Section */}
      <div className="mb-6">
        <ActiveProgramsSection />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Startup Pipeline Widget - Spans 2 columns on large screens */}
        <div className="lg:col-span-2">
          <StartupPipelineWidget />
        </div>

        {/* Performance Metrics Chart - Takes 1 column on large screens */}
        <div>
          <PerformanceMetricsChart />
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="mb-6">
        <QuickActionsPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Activity Feed */}
        <div>
          <RecentActivityFeed />
        </div>

        {/* Upcoming Events Calendar */}
        <div>
          <UpcomingEventsCalendar />
        </div>
      </div>
    </div>
  );
};

export default IncubatorDashboard;