import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UniversityLayout from './components/UniversityLayout';

// Import page components
import UniversityDashboard from './pages/dashboard';
import ResearchCommercialization from './pages/ipr';
import StudentInnovation from './pages/students';
import IndustryPartnership from './pages/partnerships';
import GrantFunding from './pages/grants';
import FacilityManagement from './pages/facilities';
import ResearchAnalytics from './pages/analytics';
import CurriculumHub from './pages/curriculum';
import UniversityTools from './pages/tools';
import UniversityCommunication from './pages/communication';

const University = () => {
  return (
    <UniversityLayout>
      <Routes>
        <Route path="/dashboard" element={<UniversityDashboard />} />
        <Route path="/ipr/*" element={<ResearchCommercialization />} />
        <Route path="/students/*" element={<StudentInnovation />} />
        <Route path="/partnerships/*" element={<IndustryPartnership />} />
        <Route path="/grants/*" element={<GrantFunding />} />
        <Route path="/facilities/*" element={<FacilityManagement />} />
        <Route path="/analytics/*" element={<ResearchAnalytics />} />
        <Route path="/curriculum/*" element={<CurriculumHub />} />
        <Route path="/tools" element={<UniversityTools />} />
        <Route path="/communication/*" element={<UniversityCommunication />} />
        <Route path="/" element={<UniversityDashboard />} />
      </Routes>
    </UniversityLayout>
  );
};

export default University;