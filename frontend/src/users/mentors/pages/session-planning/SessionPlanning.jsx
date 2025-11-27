import React, { useState } from 'react';
import SessionPlannerDashboard from './components/SessionPlannerDashboard';
import AutomatedAgendaGenerator from './components/AutomatedAgendaGenerator';
import MentorshipRoadmapBuilder from './components/MentorshipRoadmapBuilder';
import SessionNotesRecorder from './components/SessionNotesRecorder';
import ResourceSuggestionsPanel from './components/ResourceSuggestionsPanel';
import StartupProgressEvaluation from './components/StartupProgressEvaluation';
import SessionOutcomeReports from './components/SessionOutcomeReports';
import ScheduleCalendar from './components/ScheduleCalendar';

const SessionPlanning = () => {
  const [sessions] = useState([
    { id: 1, startup: 'TechFlow Inc.', date: '2023-06-15', type: 'Business Model Review', agendaCreated: true, notesAdded: false, status: 'Scheduled' },
    { id: 2, startup: 'GreenEnergy Solutions', date: '2023-06-18', type: 'Technical Architecture', agendaCreated: true, notesAdded: true, status: 'Completed' },
    { id: 3, startup: 'HealthTrack', date: '2023-06-20', type: 'Product Demo', agendaCreated: false, notesAdded: false, status: 'Scheduled' },
    { id: 4, startup: 'FinTech Startup', date: '2023-06-22', type: 'Funding Strategy', agendaCreated: false, notesAdded: false, status: 'Scheduled' },
    { id: 5, startup: 'EduTech Platform', date: '2023-06-10', type: 'Market Validation', agendaCreated: true, notesAdded: true, status: 'Completed' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [resourcePanelOpen, setResourcePanelOpen] = useState(false);

  const handleOpenPlanner = (session) => {
    alert(`Opening planner for session: ${session ? session.startup : 'New Session'}`);
  };

  const handleAgendaUpdate = (agendaItems) => {
    alert('Agenda saved successfully!');
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mentor Session Tools</h1>
            <p className="text-gray-600">Plan and manage your mentoring sessions</p>
          </div>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search session history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6A00] focus:border-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <button 
              onClick={() => setResourcePanelOpen(true)}
              className="px-3 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors font-medium text-sm"
            >
              Resources
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SessionPlannerDashboard sessions={sessions} onOpenPlanner={handleOpenPlanner} />
        <AutomatedAgendaGenerator startup="TechFlow Inc." onAgendaUpdate={handleAgendaUpdate} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <MentorshipRoadmapBuilder />
        <SessionNotesRecorder />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <StartupProgressEvaluation />
        <SessionOutcomeReports />
      </div>

      <div className="mb-6">
        <ScheduleCalendar />
      </div>

      <ResourceSuggestionsPanel 
        isOpen={resourcePanelOpen} 
        onClose={() => setResourcePanelOpen(false)} 
      />
    </div>
  );
};

export default SessionPlanning;