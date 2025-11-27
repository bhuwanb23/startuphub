import React, { useState } from 'react';

const CompetitorTracking = () => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Mock competitor data
  const competitors = [
    {
      id: 1,
      name: 'TechInnovate Inc.',
      country: 'USA',
      sector: 'AI & Machine Learning',
      founded: 2018,
      employees: 250,
      funding: '₹150 Cr',
      patentCount: 42,
      marketShare: 12,
      strength: 85,
      weakness: 30,
      features: {
        scalability: 90,
        usability: 75,
        integration: 80,
        support: 85,
        security: 95
      }
    },
    {
      id: 2,
      name: 'BioTech Dynamics',
      country: 'Germany',
      sector: 'Biotechnology',
      founded: 2015,
      employees: 420,
      funding: '₹280 Cr',
      patentCount: 68,
      marketShare: 18,
      strength: 92,
      weakness: 25,
      features: {
        scalability: 85,
        usability: 80,
        integration: 75,
        support: 90,
        security: 88
      }
    },
    {
      id: 3,
      name: 'Quantum Solutions Ltd.',
      country: 'India',
      sector: 'Quantum Computing',
      founded: 2020,
      employees: 180,
      funding: '₹95 Cr',
      patentCount: 28,
      marketShare: 8,
      strength: 78,
      weakness: 45,
      features: {
        scalability: 70,
        usability: 85,
        integration: 70,
        support: 75,
        security: 80
      }
    },
    {
      id: 4,
      name: 'GreenEnergy Systems',
      country: 'Canada',
      sector: 'Clean Energy',
      founded: 2017,
      employees: 310,
      funding: '₹210 Cr',
      patentCount: 55,
      marketShare: 15,
      strength: 88,
      weakness: 35,
      features: {
        scalability: 95,
        usability: 70,
        integration: 85,
        support: 80,
        security: 90
      }
    },
    {
      id: 5,
      name: 'SpaceTech Ventures',
      country: 'Japan',
      sector: 'Space Technology',
      founded: 2019,
      employees: 150,
      funding: '₹120 Cr',
      patentCount: 36,
      marketShare: 10,
      strength: 82,
      weakness: 40,
      features: {
        scalability: 80,
        usability: 75,
        integration: 80,
        support: 70,
        security: 85
      }
    }
  ];

  // Sort competitors
  const sortedCompetitors = [...competitors].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Handle sort
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Get sort indicator
  const getSortIndicator = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">🆚 Competitor Technology Tracking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Competitor Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Global Competitor Matrix</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        Company {getSortIndicator('name')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('sector')}
                    >
                      <div className="flex items-center">
                        Sector {getSortIndicator('sector')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('patentCount')}
                    >
                      <div className="flex items-center">
                        Patents {getSortIndicator('patentCount')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('marketShare')}
                    >
                      <div className="flex items-center">
                        Market Share {getSortIndicator('marketShare')}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('strength')}
                    >
                      <div className="flex items-center">
                        Strength {getSortIndicator('strength')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedCompetitors.map((competitor) => (
                    <tr key={competitor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-800 font-medium">
                              {competitor.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{competitor.name}</div>
                            <div className="text-sm text-gray-500">{competitor.country}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{competitor.sector}</div>
                        <div className="text-sm text-gray-500">Est. {competitor.founded}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{competitor.patentCount}</div>
                        <div className="text-sm text-gray-500">{competitor.funding}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900 mr-2">{competitor.marketShare}%</div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full" 
                              style={{ width: `${competitor.marketShare}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900 mr-2">{competitor.strength}/100</div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${competitor.strength}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Right Column - Radar Chart and Details */}
        <div className="space-y-6">
          {/* Radar Chart */}
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Feature Comparison Radar</h2>
            
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* Grid circles */}
                  {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                    <circle
                      key={i}
                      cx="100"
                      cy="100"
                      r={80 * scale}
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="0.5"
                    />
                  ))}
                  
                  {/* Axes */}
                  {Object.keys(competitors[0].features).map((feature, i, arr) => {
                    const angle = (i / arr.length) * 2 * Math.PI - Math.PI / 2;
                    const x = 100 + 80 * Math.cos(angle);
                    const y = 100 + 80 * Math.sin(angle);
                    return (
                      <line
                        key={feature}
                        x1="100"
                        y1="100"
                        x2={x}
                        y2={y}
                        stroke="#e5e7eb"
                        strokeWidth="0.5"
                      />
                    );
                  })}
                  
                  {/* Your Research Polygon */}
                  <polygon
                    points={
                      Object.values(competitors[0].features).map((value, i, arr) => {
                        const angle = (i / arr.length) * 2 * Math.PI - Math.PI / 2;
                        const x = 100 + (value / 100) * 80 * Math.cos(angle);
                        const y = 100 + (value / 100) * 80 * Math.sin(angle);
                        return `${x},${y}`;
                      }).join(' ')
                    }
                    fill="rgba(249, 115, 22, 0.2)"
                    stroke="#f97316"
                    strokeWidth="2"
                  />
                  
                  {/* Competitor Average Polygon */}
                  <polygon
                    points={
                      Object.keys(competitors[0].features).map((feature, i, arr) => {
                        const avg = competitors.reduce((sum, comp) => sum + comp.features[feature], 0) / competitors.length;
                        const angle = (i / arr.length) * 2 * Math.PI - Math.PI / 2;
                        const x = 100 + (avg / 100) * 80 * Math.cos(angle);
                        const y = 100 + (avg / 100) * 80 * Math.sin(angle);
                        return `${x},${y}`;
                      }).join(' ')
                    }
                    fill="rgba(34, 197, 94, 0.2)"
                    stroke="#22c55e"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">Your Research</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-700">Competitor Avg</span>
              </div>
            </div>
          </div>
          
          {/* Patent Activity Chart */}
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Patent Activity</h2>
            
            <div className="space-y-4">
              {competitors.slice(0, 3).map(competitor => (
                <div key={competitor.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{competitor.name}</span>
                    <span className="text-sm font-medium text-gray-700">{competitor.patentCount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ width: `${(competitor.patentCount / 70) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Strength-Weakness Analysis */}
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Strength-Weakness Analysis</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Overall Strength</span>
                  <span className="text-sm font-medium text-gray-700">85/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Key Weaknesses</span>
                  <span className="text-sm font-medium text-gray-700">30/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">AI Recommendations</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Improve integration capabilities to match competitors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Enhance customer support features</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Leverage superior security as a competitive advantage</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorTracking;