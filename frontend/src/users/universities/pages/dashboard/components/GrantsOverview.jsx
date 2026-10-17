import React from 'react';
import { useDashboardData } from '../hooks';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const GrantsOverview = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Grants Utilization Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
        <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Grants Utilization Overview</h2>
        <div className="text-red-500">Error loading data: {error}</div>
      </div>
    );
  }

  if (!data) return null;

  const { grantsOverview } = data;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Grants Utilization Overview</h2>
        <button className="text-[#F4A300] hover:text-[#F26B1D] text-sm font-medium">
          Open Grant Monitoring System →
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Total Grants Received</div>
          <div className="text-xl font-bold text-gray-800">{formatCurrency(grantsOverview.totalReceived)}</div>
        </div>
        
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Utilized Amount</div>
          <div className="text-xl font-bold text-gray-800">{formatCurrency(grantsOverview.utilized)}</div>
        </div>
        
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Utilization Percentage</div>
          <div className="text-xl font-bold text-gray-800">{formatPercentage(grantsOverview.utilizationPercentage)}</div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-2">Projects Under Each Grant</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-gray-800 text-center">{grantsOverview.projects}</div>
          <div className="text-sm text-gray-600 text-center">Active Projects</div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-gray-800 mb-2">Expiring Grants Timeline</h3>
        <div className="space-y-3">
          {grantsOverview.expiringSoon.map((grant) => (
            <div key={grant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-800">{grant.name}</div>
                <div className="text-sm text-gray-600">{formatCurrency(grant.amount)}</div>
              </div>
              <div className="text-sm text-gray-600">{grant.expiry}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrantsOverview;