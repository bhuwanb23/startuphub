import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Startup from './users/startups/startup';
import Dashboard from './users/startups/pages/Dashboard';
import Profile from './users/startups/pages/profile/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/startups/*" element={<Startup />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;