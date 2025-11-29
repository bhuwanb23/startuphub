import { Routes, Route } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';

// Import all subpage components
import CohortDashboard from './components/CohortDashboard';
import BatchOverview from './components/BatchOverview';
import StartupList from './components/StartupList';
import MentorAssignments from './components/MentorAssignments';
import FundingAssigned from './components/FundingAssigned';
import ProgramPlanner from './components/ProgramPlanner';
import CurriculumBuilder from './components/CurriculumBuilder';
import SessionCalendar from './components/SessionCalendar';
import WeeklyTaskScheduler from './components/WeeklyTaskScheduler';
import ProgramTemplates from './components/ProgramTemplates';
import SessionManagement from './components/SessionManagement';
import AttendanceTracking from './components/AttendanceTracking';
import MentorSessionLogs from './components/MentorSessionLogs';
import LearningMaterials from './components/LearningMaterials';
import WorkflowAutomation from './components/WorkflowAutomation';
import ProgressReports from './components/ProgressReports';

// Create a component that includes the sidebar and renders the appropriate content
const CohortLayout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/5">
        <SidebarNavigation />
      </div>
      <div className="lg:w-4/5">
        {children}
      </div>
    </div>
  );
};

const CohortSuite = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cohort & Program Management System</h1>
        <p className="text-gray-600">Manage cohorts, programs, and startup progress</p>
      </div>
      
      {/* Using Routes directly without wrapping in Router since parent Router exists */}
      <Routes>
        <Route index element={
          <CohortLayout>
            <CohortDashboard />
          </CohortLayout>
        } />
        <Route path="dashboard" element={
          <CohortLayout>
            <CohortDashboard />
          </CohortLayout>
        } />
        <Route path="batch-overview" element={
          <CohortLayout>
            <BatchOverview />
          </CohortLayout>
        } />
        <Route path="startups" element={
          <CohortLayout>
            <StartupList />
          </CohortLayout>
        } />
        <Route path="mentors" element={
          <CohortLayout>
            <MentorAssignments />
          </CohortLayout>
        } />
        <Route path="funding" element={
          <CohortLayout>
            <FundingAssigned />
          </CohortLayout>
        } />
        <Route path="planner" element={
          <CohortLayout>
            <ProgramPlanner />
          </CohortLayout>
        } />
        <Route path="curriculum" element={
          <CohortLayout>
            <CurriculumBuilder />
          </CohortLayout>
        } />
        <Route path="calendar" element={
          <CohortLayout>
            <SessionCalendar />
          </CohortLayout>
        } />
        <Route path="tasks" element={
          <CohortLayout>
            <WeeklyTaskScheduler />
          </CohortLayout>
        } />
        <Route path="templates" element={
          <CohortLayout>
            <ProgramTemplates />
          </CohortLayout>
        } />
        <Route path="sessions" element={
          <CohortLayout>
            <SessionManagement />
          </CohortLayout>
        } />
        <Route path="attendance" element={
          <CohortLayout>
            <AttendanceTracking />
          </CohortLayout>
        } />
        <Route path="mentor-logs" element={
          <CohortLayout>
            <MentorSessionLogs />
          </CohortLayout>
        } />
        <Route path="materials" element={
          <CohortLayout>
            <LearningMaterials />
          </CohortLayout>
        } />
        <Route path="automation" element={
          <CohortLayout>
            <WorkflowAutomation />
          </CohortLayout>
        } />
        <Route path="reports" element={
          <CohortLayout>
            <ProgressReports />
          </CohortLayout>
        } />
      </Routes>
    </div>
  );
};

export default CohortSuite;