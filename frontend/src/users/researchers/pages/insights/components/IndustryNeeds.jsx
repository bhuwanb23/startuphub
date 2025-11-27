import React, { useState } from 'react';

const IndustryNeeds = () => {
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [selectedSector, setSelectedSector] = useState('all');

  const regions = [
    { id: 'global', name: 'Global' },
    { id: 'north-america', name: 'North America' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia-pacific', name: 'Asia Pacific' },
    { id: 'india', name: 'India' },
  ];

  const sectors = [
    { id: 'all', name: 'All Sectors' },
    { id: 'ai', name: 'AI & Machine Learning' },
    { id: 'biotech', name: 'Biotechnology' },
    { id: 'energy', name: 'Energy & CleanTech' },
    { id: 'spacetech', name: 'Space Technology' },
    { id: 'materials', name: 'Advanced Materials' },
  ];

  // Mock heatmap data
  const heatmapData = [
    { region: 'North America', sector: 'AI', demand: 95, trend: 'increasing' },
    { region: 'North America', sector: 'Biotech', demand: 87, trend: 'stable' },
    { region: 'North America', sector: 'Energy', demand: 78, trend: 'increasing' },
    { region: 'Europe', sector: 'AI', demand: 92, trend: 'increasing' },
    { region: 'Europe', sector: 'Biotech', demand: 85, trend: 'stable' },
    { region: 'Europe', sector: 'Energy', demand: 80, trend: 'increasing' },
    { region: 'Asia Pacific', sector: 'AI', demand: 88, trend: 'rapid' },
    { region: 'Asia Pacific', sector: 'Biotech', demand: 82, trend: 'increasing' },
    { region: 'Asia Pacific', sector: 'Energy', demand: 85, trend: 'stable' },
    { region: 'India', sector: 'AI', demand: 80, trend: 'rapid' },
    { region: 'India', sector: 'Biotech', demand: 75, trend: 'increasing' },
    { region: 'India', sector: 'Energy', demand: 90, trend: 'rapid' },
  ];

  // Filter data based on selections
  const filteredData = heatmapData.filter(item => {
    const regionMatch = selectedRegion === 'global' || item.region.toLowerCase().includes(selectedRegion.toLowerCase());
    const sectorMatch = selectedSector === 'all' || item.sector.toLowerCase().includes(selectedSector.toLowerCase());
    return regionMatch && sectorMatch;
  });

  // Get demand level class
  const getDemandLevelClass = (demand) => {
    if (demand >= 90) return 'bg-red-500';
    if (demand >= 80) return 'bg-orange-500';
    if (demand >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Get trend icon
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'rapid':
        return <span className="text-red-500 font-bold">↑↑</span>;
      case 'increasing':
        return <span className="text-orange-500 font-bold">↑</span>;
      case 'stable':
        return <span className="text-green-500 font-bold">→</span>;
      default:
        return <span className="text-gray-500 font-bold">→</span>;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">🏭 Industry Needs Mapping</h1>
      
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regions.map(region => (
              <option key={region.id} value={region.id}>{region.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
          >
            {sectors.map(sector => (
              <option key={sector.id} value={sector.id}>{sector.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Heatmap Visualization */}
      <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Industry Demand Heatmap</h2>
        
        {/* Legend */}
        <div className="flex flex-wrap items-center mb-6">
          <div className="flex items-center mr-4 mb-2">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-sm">High Demand (90-100)</span>
          </div>
          <div className="flex items-center mr-4 mb-2">
            <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
            <span className="text-sm">Medium-High (80-89)</span>
          </div>
          <div className="flex items-center mr-4 mb-2">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
            <span className="text-sm">Medium (70-79)</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm">Low-Medium (&lt;70)</span>
          </div>
        </div>
        
        {/* Heatmap Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header Row */}
            <div className="flex">
              <div className="w-32 flex-shrink-0"></div>
              {sectors.filter(s => s.id !== 'all').map(sector => (
                <div key={sector.id} className="flex-1 min-w-[120px] text-center py-2 font-medium text-gray-700 border-b">
                  {sector.name}
                </div>
              ))}
            </div>
            
            {/* Data Rows */}
            {regions.filter(r => r.id !== 'global').map(region => (
              <div key={region.id} className="flex border-b">
                <div className="w-32 flex-shrink-0 py-3 font-medium text-gray-700 border-r">
                  {region.name}
                </div>
                {sectors.filter(s => s.id !== 'all').map(sector => {
                  const dataPoint = filteredData.find(
                    d => d.region === region.name && d.sector === sector.name
                  );
                  
                  return (
                    <div 
                      key={`${region.id}-${sector.id}`} 
                      className="flex-1 min-w-[120px] py-3 text-center border-r last:border-r-0"
                    >
                      {dataPoint ? (
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full ${getDemandLevelClass(dataPoint.demand)} flex items-center justify-center text-white text-xs`}>
                            {dataPoint.demand}
                          </div>
                          <div className="mt-1">{getTrendIcon(dataPoint.trend)}</div>
                        </div>
                      ) : (
                        <div className="text-gray-300">-</div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        {/* Highlight Overlay Explanation */}
        <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <h3 className="font-medium text-orange-800 mb-2">🔍 Where Your Research Fits</h3>
          <p className="text-sm text-orange-700">
            Areas marked with high demand and positive trends indicate strong commercialization opportunities for your research.
            Focus on sectors with red (high demand) and upward trending arrows for maximum impact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndustryNeeds;