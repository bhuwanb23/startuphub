import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';

const EventsDeadlines = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Events & Deadlines</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-3 bg-gray-50 rounded-lg animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Events & Deadlines</h2>
        <div className="text-red-500">Error loading data: {error}</div>
      </div>
    );
  }

  if (!data) return null;

  const { eventsDeadlines } = data;

  // Get icon based on event type
  const getEventIcon = (type) => {
    switch (type) {
      case 'patent':
        return '📝';
      case 'grant':
        return '💰';
      case 'event':
        return '📅';
      case 'review':
        return '🔍';
      default:
        return '📌';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Events & Deadlines</h2>
      <div className="space-y-3">
        {eventsDeadlines.map((event) => (
          <div key={event.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-start">
              <span className="text-lg mr-2">{getEventIcon(event.type)}</span>
              <div className="flex-1">
                <div className="font-medium text-gray-800">{event.title}</div>
                <div className="text-sm text-gray-600">{event.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsDeadlines;