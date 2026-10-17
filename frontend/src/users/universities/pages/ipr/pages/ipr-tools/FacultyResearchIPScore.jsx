import React, { useState } from 'react';

const FacultyResearchIPScore = () => {
  const [facultyData, setFacultyData] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', department: 'Biotechnology', novelty: 85, citations: 78, commercialPotential: 92 },
    { id: 2, name: 'Prof. Michael Chen', department: 'Chemical Engineering', novelty: 72, citations: 85, commercialPotential: 78 },
    { id: 3, name: 'Dr. Emily Rodriguez', department: 'Computer Science', novelty: 90, citations: 82, commercialPotential: 88 },
    { id: 4, name: 'Prof. James Wilson', department: 'Materials Science', novelty: 78, citations: 70, commercialPotential: 75 },
  ]);

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Faculty Research IP Score</h1>
        <p className="text-gray-600">Radar charts for research innovation potential</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Faculty Rankings Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Faculty IP Performance</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Novelty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Citations</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commercial Potential</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {facultyData.map((faculty) => (
                  <tr key={faculty.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{faculty.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{faculty.department}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getScoreColor(faculty.novelty)}`}>
                      {faculty.novelty}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getScoreColor(faculty.citations)}`}>
                      {faculty.citations}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getScoreColor(faculty.commercialPotential)}`}>
                      {faculty.commercialPotential}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Radar Charts Visualization */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6">IP Score Visualization</h2>
          
          <div className="grid grid-cols-2 gap-6">
            {facultyData.slice(0, 2).map((faculty) => (
              <div key={faculty.id} className="text-center">
                <h3 className="font-medium text-gray-800 mb-3">{faculty.name}</h3>
                <div className="relative w-40 h-40 mx-auto">
                  {/* Radar chart background */}
                  <div className="absolute inset-0 rounded-full border border-gray-200"></div>
                  <div className="absolute inset-4 rounded-full border border-gray-200"></div>
                  <div className="absolute inset-8 rounded-full border border-gray-200"></div>
                  
                  {/* Radar chart data */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      clipPath: `polygon(50% 50%, 
                        ${50 + 40 * Math.cos(Math.PI/2)}% ${50 - 40 * Math.sin(Math.PI/2)}%, 
                        ${50 + 35 * Math.cos(Math.PI/2 - 2*Math.PI/3)}% ${50 - 35 * Math.sin(Math.PI/2 - 2*Math.PI/3)}%, 
                        ${50 + 30 * Math.cos(Math.PI/2 - 4*Math.PI/3)}% ${50 - 30 * Math.sin(Math.PI/2 - 4*Math.PI/3)}%)`,
                      backgroundColor: 'rgba(244, 163, 0, 0.2)',
                      border: '2px solid #F4A300'
                    }}
                  ></div>
                  
                  {/* Axis labels */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">Novelty</div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">Citations</div>
                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-xs text-gray-500">Commercial</div>
                </div>
                <div className="mt-2 text-sm text-gray-600">Avg. Score: {Math.round((faculty.novelty + faculty.citations + faculty.commercialPotential) / 3)}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-medium text-gray-800 mb-3">Department Comparison</h3>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">82</div>
                <div className="text-sm text-gray-600">Biotech Avg</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">75</div>
                <div className="text-sm text-gray-600">Chem Eng Avg</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">87</div>
                <div className="text-sm text-gray-600">Comp Sci Avg</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">74</div>
                <div className="text-sm text-gray-600">Mat Sci Avg</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Panel */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="text-lg font-bold text-gray-800 mb-1">Top Performer</div>
            <div className="text-sm text-gray-600">Dr. Emily Rodriguez (87 avg)</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="text-lg font-bold text-gray-800 mb-1">Improvement Needed</div>
            <div className="text-sm text-gray-600">Prof. James Wilson (-5%</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="text-lg font-bold text-gray-800 mb-1">Department Leader</div>
            <div className="text-sm text-gray-600">Computer Science (87 avg)</div>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-3">
          <button className="bg-[#F4A300] hover:bg-[#F26B1D] text-white px-4 py-2 rounded-lg transition-colors">
            Generate Detailed Report
          </button>
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
            Compare with Peers
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyResearchIPScore;