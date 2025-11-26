import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import InvestorLogin from './pages/login/investor_login';
import Startup from './users/startups/startup';
import Dashboard from './users/startups/pages/Dashboard';
import Profile from './users/startups/pages/profile/Profile';
import Workflow from './users/startups/pages/workflow/Workflow';
import IPR from './users/startups/pages/ipr/IPR';
import Resources from './users/startups/pages/resources/Resources';
import Market from './users/startups/pages/market/Market';
import Growth from './users/startups/pages/growth/Growth';
import Collaboration from './users/startups/pages/collaboration/Collaboration';
import Funding from './users/startups/pages/funding/Funding';
import Tools from './users/startups/pages/tools/Tools';
import Investor from './users/investors/investor';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/investor" element={<InvestorLogin />} />
      <Route path="/startups/*" element={<Startup />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="workflow" element={<Workflow />} />
        <Route path="ipr" element={<IPR />} />
        <Route path="resources" element={<Resources />} />
        <Route path="market" element={<Market />} />
        <Route path="growth" element={<Growth />} />
        <Route path="collaboration" element={<Collaboration />} />
        <Route path="funding" element={<Funding />} />
        <Route path="tools" element={<Tools />} />
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/investors/*" element={<Investor />}>
        <Route path="dashboard" element={<Investor />} />
        <Route index element={<Investor />} />
      </Route>
    </Routes>
  );
}

export default App;