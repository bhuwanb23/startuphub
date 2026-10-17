import React from 'react';
import { useDashboardData } from '../hooks';
import { formatNumber } from '../utils/formatters';

const PatentActivitySummary = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">IP & Patent Activity Summary</h2>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
        <div className="h-48 bg-gray-100 rounded-lg animate-pulse mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
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
        <h2 className="text-lg font-bold text-gray-800 mb-4">IP & Patent Activity Summary</h2>
        <div className="text-red-500">Error loading data: {error}</div>
      </div>
    );
  }

  if (!data) return null;

  const { patentActivity } = data;

  // Calculate total for percentage calculations
  const total = patentActivity.filed + patentActivity.published + patentActivity.granted + patentActivity.drafts;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">IP & Patent Activity Summary</h2>
        <button className="text-[#F4A300] hover:text-[#F26B1D] text-sm font-medium">
          Go to IPR Hub →
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center mb-3">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              {/* Filed - Blue */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeDasharray="40, 100"
              />
              {/* Published - Green */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeDasharray="25, 100"
                strokeDashoffset="-40"
              />
              {/* Granted - Orange */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="3"
                strokeDasharray="15, 100"
                strokeDashoffset="-65"
              />
              {/* Drafts - Gray */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="3"
                strokeDasharray="20, 100"
                strokeDashoffset="-80"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">{formatNumber(total)}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600">Filed</span>
          </div>
          <div className="text-right text-sm font-medium text-gray-800">{formatNumber(patentActivity.filed)}</div>
          
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600">Published</span>
          </div>
          <div className="text-right text-sm font-medium text-gray-800">{formatNumber(patentActivity.published)}</div>
          
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600">Granted</span>
          </div>
          <div className="text-right text-sm font-medium text-gray-800">{formatNumber(patentActivity.granted)}</div>
          
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600">Drafts</span>
          </div>
          <div className="text-right text-sm font-medium text-gray-800">{formatNumber(patentActivity.drafts)}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Patents Filed</div>
          <div className="text-xl font-bold text-gray-800">{formatNumber(patentActivity.filed)}</div>
        </div>
        
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Patents Published</div>
          <div className="text-xl font-bold text-gray-800">{formatNumber(patentActivity.published)}</div>
        </div>
        
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Patents Granted</div>
          <div className="text-xl font-bold text-gray-800">{formatNumber(patentActivity.granted)}</div>
        </div>
        
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF5E6] border border-[#F4A300]/20 rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Drafts in Progress</div>
          <div className="text-xl font-bold text-gray-800">{formatNumber(patentActivity.drafts)}</div>
        </div>
      </div>
    </div>
  );
};

export default PatentActivitySummary;