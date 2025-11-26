import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InvestorLayout from './components/InvestorLayout';
import Dashboard from './pages/dashboard/Dashboard';
import DealFlow from './pages/dealflow/DealFlow';
import DueDiligenceIndex from './pages/due-diligence/index';
import Portfolio from './pages/portfolio/Portfolio';
import Collaboration from './pages/collaboration/Collaboration';

const Investor = () => {
  return (
    <InvestorLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deal-flow" element={<DealFlow />} />
        <Route path="/due-diligence/*" element={<DueDiligenceIndex />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/collaboration" element={<Collaboration />} />
        <Route index element={<Dashboard />} />
      </Routes>
    </InvestorLayout>
  );
};

export default Investor;