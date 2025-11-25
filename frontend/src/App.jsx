import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Startup from './users/startups/startup';
import Dashboard from './users/startups/pages/Dashboard';
import Profile from './users/startups/pages/profile/Profile';
import Workflow from './users/startups/pages/workflow/Workflow';
import IPR from './users/startups/pages/ipr/IPR';
import Resources from './users/startups/pages/resources/Resources';
import Market from './users/startups/pages/market/Market';
import Growth from './users/startups/pages/growth/Growth';
import Collaboration from './users/startups/pages/collaboration/Collaboration';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/startups/*" element={<Startup />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="workflow" element={<Workflow />} />
        <Route path="ipr" element={<IPR />} />
        <Route path="resources" element={<Resources />} />
        <Route path="market" element={<Market />} />
        <Route path="growth" element={<Growth />} />
        <Route path="collaboration" element={<Collaboration />} />
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;