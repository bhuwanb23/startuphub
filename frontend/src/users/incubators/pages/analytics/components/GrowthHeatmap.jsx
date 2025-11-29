import React from 'react';

const GrowthHeatmap = () => {
  // Mock data for growth heatmap
  const heatmapData = [
    { startup: 'TechNova', traction: 85, revenue: 82, users: 78, product: 80, marketing: 75, team: 88 },
    { startup: 'MobileGenius', traction: 78, revenue: 75, users: 72, product: 74, marketing: 68, team: 82 },
    { startup: 'EcomPro', traction: 72, revenue: 68, users: 65, product: 67, marketing: 62, team: 75 },
    { startup: 'HealthTrack', traction: 92, revenue: 88, users: 85, product: 87, marketing: 82, team: 90 },
    { startup: 'AutoPilot', traction: 80, revenue: 78, users: 75, product: 76, marketing: 70, team: 85 },
    { startup: 'GreenEnergy', traction: 75, revenue: 72, users: 68, product: 70, marketing: 65, team: 78 }
  ];

  // KPI categories
  const kpiCategories = [
    { key: 'traction', name: 'Traction', description: 'User engagement & growth metrics' },
    { key: 'revenue', name: 'Revenue', description: 'Monthly recurring revenue' },
    { key: 'users', name: 'User Growth', description: 'Customer acquisition rate' },
    { key: 'product', name: 'Product Maturity', description: 'Feature completeness & quality' },
    { key: 'marketing', name: 'Marketing', description: 'Brand awareness & campaigns' },
    { key: 'team', name: 'Team Development', description: 'Hiring & skill development' }
  ];

  // Get color based on score
  const getColorClass = (score) => {
    if (score >= 90) return 'bg-green-600';
    if (score >= 80) return 'bg-green-500';
    if (score >= 70) return 'bg-green-400';
    if (score >= 60) return 'bg-yellow-400';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Get text color based on background
  const getTextColor = (score) => {
    return score >= 70 ? 'text-white' : 'text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Growth Heatmap</h1>
            <p className="text-gray-600">Performance visualization across key metrics</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]">
              <option>Current Cohort</option>
              <option>Previous Cohort</option>
              <option>All Time</option>
            </select>
            <button className="bg-[#FF6A00] text-white px-4 py-2 rounded-lg hover:bg-[#e05500] transition-colors">
              Export Heatmap
            </button>
          </div>
        </div>
        
        {/* Heatmap Legend */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Performance Scale</h2>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-600 rounded mr-2"></div>
              <span className="text-sm">90-100 (Excellent)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span className="text-sm">80-89 (Good)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
              <span className="text-sm">70-79 (Fair)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
              <span className="text-sm">60-69 (Needs Attention)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
              <span className="text-sm">50-59 (Poor)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
              <span className="text-sm">0-49 (Critical)</span>
            </div>
          </div>
        </div>
        
        {/* Heatmap Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700 font-medium">Startup</th>
                {kpiCategories.map((kpi, index) => (
                  <th key={index} className="text-center py-3 px-4 text-gray-700 font-medium">
                    <div className="flex flex-col items-center">
                      <span>{kpi.name}</span>
                      <span className="text-xs text-gray-500 mt-1">{kpi.description}</span>
                    </div>
                  </th>
                ))}
                <th className="text-center py-3 px-4 text-gray-700 font-medium">Average</th>
              </tr>
            </thead>
            <tbody>
              {heatmapData.map((startup, index) => {
                // Calculate average score
                const scores = kpiCategories.map(kpi => startup[kpi.key]);
                const average = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
                
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">{startup.startup}</td>
                    {kpiCategories.map((kpi, kpiIndex) => {
                      const score = startup[kpi.key];
                      return (
                        <td key={kpiIndex} className="py-4 px-4 text-center">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto ${getColorClass(score)} ${getTextColor(score)}`}>
                            {score}
                          </div>
                        </td>
                      );
                    })}
                    <td className="py-4 px-4 text-center">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto ${getColorClass(average)} ${getTextColor(average)}`}>
                        {average}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Strengths & Opportunities</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Top Performing Areas</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>HealthTrack's overall performance (92 avg)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>TechNova's team development (88)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>MobileGenius' traction metrics (78)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Areas for Improvement</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>EcomPro's marketing efforts (62)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span>GreenEnergy's user growth (68)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span>AutoPilot's marketing (70)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">KPI Distribution</h2>
            <div className="space-y-4">
              {kpiCategories.map((kpi, index) => {
                // Calculate average for this KPI across all startups
                const scores = heatmapData.map(startup => startup[kpi.key]);
                const average = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
                
                return (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-800">{kpi.name}</span>
                      <span className="font-medium text-[#FF6A00]">{average}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full bg-[#FF6A00]" 
                        style={{ width: `${average}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF2DC] rounded-2xl p-6 border border-[#FF6A00]">
          <h2 className="text-lg font-bold text-gray-800 mb-4">AI-Powered Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-2">Resource Allocation</h3>
              <p className="text-sm text-gray-600">Increase mentor support for EcomPro and GreenEnergy in marketing areas</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-2">Best Practices</h3>
              <p className="text-sm text-gray-600">Share HealthTrack's user acquisition strategies with other startups</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-2">Workshop Suggestions</h3>
              <p className="text-sm text-gray-600">Organize marketing bootcamp for startups scoring below 70</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthHeatmap;