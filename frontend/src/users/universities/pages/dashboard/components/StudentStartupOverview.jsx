import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { formatNumber } from '../utils/formatters';

const StudentStartupOverview = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Student Startup Overview</h2>
        <div className="h-48 bg-gray-100 rounded-lg animate-pulse"></div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-3 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Student Startup Overview</h2>
        <div className="text-red-500">Error loading data: {error}</div>
      </div>
    );
  }

  if (!data) return null;

  const { studentStartups } = data;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Student Startup Overview</h2>
        <button className="text-[#F4A300] hover:text-[#F26B1D] text-sm font-medium">
          Open Startup Tracking Workspace →
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="text-center mb-2">
          <div className="text-3xl font-bold text-gray-800">{studentStartups.mentorEngagement}%</div>
          <div className="text-sm text-gray-600">Mentor Engagement Score</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-[#F4A300] h-2 rounded-full" 
            style={{ width: `${studentStartups.mentorEngagement}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">New Startups this Semester</div>
          <div className="text-xl font-bold text-gray-800">{formatNumber(studentStartups.newThisSemester)}</div>
        </div>
        
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Startups in Incubation</div>
          <div className="text-xl font-bold text-gray-800">{formatNumber(studentStartups.inIncubation)}</div>
        </div>
        
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Funded Startups</div>
          <div className="text-xl font-bold text-gray-800">{formatNumber(studentStartups.funded)}</div>
        </div>
        
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Mentor Engagement</div>
          <div className="text-xl font-bold text-gray-800">{studentStartups.mentorEngagement}%</div>
        </div>
      </div>
    </div>
  );
};

export default StudentStartupOverview;