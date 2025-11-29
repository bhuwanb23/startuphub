import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';

const FacultyContributions = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Faculty Contributions & Research Output</h2>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-10"></div>
              <div className="h-4 bg-gray-200 rounded w-10"></div>
              <div className="h-4 bg-gray-200 rounded w-10"></div>
              <div className="h-4 bg-gray-200 rounded w-10"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Faculty Contributions & Research Output</h2>
        <div className="text-red-500">Error loading data: {error}</div>
      </div>
    );
  }

  if (!data) return null;

  const { facultyContributions } = data;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Faculty Contributions & Research Output</h2>
        <button className="text-[#F4A300] hover:text-[#F26B1D] text-sm font-medium">
          View Faculty Profiles →
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publications</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patents</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grants Received</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students Mentored</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {facultyContributions.map((faculty) => (
              <tr key={faculty.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{faculty.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{faculty.publications}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{faculty.patents}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{faculty.grants}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{faculty.studentsMentored}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacultyContributions;