import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ResearcherLayout from './components/ResearcherLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Repository from './pages/repository/Repository';
import IPR from './pages/ipr/IPR';
import Grants from './pages/grants/Grants';
import Collaboration from './pages/collaboration/Collaboration';
import Insights from './pages/insights/Insights';
import Tools from './pages/tools/Tools';
import Communication from './pages/communication/Communication';

const Researcher = () => {
  return (
    <ResearcherLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/repository" element={<Repository />} />
        <Route path="/ipr" element={<IPR />} />
        <Route path="/grants" element={<Grants />} />
        <Route path="/collaboration" element={<Collaboration />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/communication" element={<Communication />} />
      </Routes>
    </ResearcherLayout>
  );
};

export default Researcher;