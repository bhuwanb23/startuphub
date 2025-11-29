import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { formatNumber, getGrowthIndicator } from '../utils/formatters';

const InstitutionSnapshot = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Overall Institution Snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Overall Institution Snapshot</h2>
        <div className="text-red-500">Error loading data: {error}</div>
      </div>
    );
  }

  if (!data) return null;

  const { institutionSnapshot } = data;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Overall Institution Snapshot</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Active Research Projects</div>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold text-gray-800">{formatNumber(institutionSnapshot.activeResearchProjects)}</div>
            <div className={`ml-2 text-sm flex items-center ${getGrowthIndicator(institutionSnapshot.activeResearchProjectsGrowth)}`}>
              {institutionSnapshot.activeResearchProjectsGrowth > 0 ? '↑' : '↓'} 
              {Math.abs(institutionSnapshot.activeResearchProjectsGrowth)}%
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Active Student Startups</div>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold text-gray-800">{formatNumber(institutionSnapshot.activeStudentStartups)}</div>
            <div className={`ml-2 text-sm flex items-center ${getGrowthIndicator(institutionSnapshot.activeStudentStartupsGrowth)}`}>
              {institutionSnapshot.activeStudentStartupsGrowth > 0 ? '↑' : '↓'} 
              {Math.abs(institutionSnapshot.activeStudentStartupsGrowth)}%
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Total Patents Filed</div>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold text-gray-800">{formatNumber(institutionSnapshot.totalPatentsFiled)}</div>
            <div className={`ml-2 text-sm flex items-center ${getGrowthIndicator(institutionSnapshot.totalPatentsFiledGrowth)}`}>
              {institutionSnapshot.totalPatentsFiledGrowth > 0 ? '↑' : '↓'} 
              {Math.abs(institutionSnapshot.totalPatentsFiledGrowth)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionSnapshot;