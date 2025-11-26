import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DueDiligence from './DueDiligence';

const DueDiligenceIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<DueDiligence />} />
      <Route index element={<DueDiligence />} />
    </Routes>
  );
};

export default DueDiligenceIndex;