import { Routes, Route } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';
import MentorshipTemplates from './components/MentorshipTemplates';
import StrategicFrameworks from './components/StrategicFrameworks';
import TechEvaluationFrameworks from './components/TechEvaluationFrameworks';
import BusinessModelReviewTools from './components/BusinessModelReviewTools';
import FinancialChecklistEvaluators from './components/FinancialChecklistEvaluators';
import PitchImprovementTools from './components/PitchImprovementTools';
import RegulationComplianceGuidelines from './components/RegulationComplianceGuidelines';
import RecommendedExternalTools from './components/RecommendedExternalTools';

// Create a component that includes the sidebar and renders the appropriate content
const ToolsLayout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/4">
        <SidebarNavigation />
      </div>
      <div className="lg:w-3/4">
        {children}
      </div>
    </div>
  );
};

const MentorTools = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mentor Tools Library</h1>
        <p className="text-gray-600">Expert tools and frameworks to enhance your mentoring effectiveness</p>
      </div>
      
      {/* Using Routes directly without wrapping in Router since parent Router exists */}
      <Routes>
        <Route path="/" element={
          <ToolsLayout>
            <MentorshipTemplates />
          </ToolsLayout>
        } />
        <Route path="/mentorship-templates" element={
          <ToolsLayout>
            <MentorshipTemplates />
          </ToolsLayout>
        } />
        <Route path="/strategic-frameworks" element={
          <ToolsLayout>
            <StrategicFrameworks />
          </ToolsLayout>
        } />
        <Route path="/tech-evaluation" element={
          <ToolsLayout>
            <TechEvaluationFrameworks />
          </ToolsLayout>
        } />
        <Route path="/business-model" element={
          <ToolsLayout>
            <BusinessModelReviewTools />
          </ToolsLayout>
        } />
        <Route path="/financial-checklist" element={
          <ToolsLayout>
            <FinancialChecklistEvaluators />
          </ToolsLayout>
        } />
        <Route path="/pitch-improvement" element={
          <ToolsLayout>
            <PitchImprovementTools />
          </ToolsLayout>
        } />
        <Route path="/regulation-compliance" element={
          <ToolsLayout>
            <RegulationComplianceGuidelines />
          </ToolsLayout>
        } />
        <Route path="/external-tools" element={
          <ToolsLayout>
            <RecommendedExternalTools />
          </ToolsLayout>
        } />
      </Routes>
    </div>
  );
};

export default MentorTools;