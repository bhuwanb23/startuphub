import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InvestorLayout from './components/InvestorLayout';
import Dashboard from './pages/dashboard/Dashboard';
import DealFlow from './pages/dealflow/DealFlow';

const Investor = () => {
  return (
    <InvestorLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deal-flow" element={<DealFlow />} />
        <Route index element={<Dashboard />} />
      </Routes>
    </InvestorLayout>
  );
};

export default Investor;