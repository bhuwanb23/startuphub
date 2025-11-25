import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import StartupDashboard from './users/startups/StartupDashboard';
import Dashboard from './users/startups/pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/startups/*" element={<StartupDashboard />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;