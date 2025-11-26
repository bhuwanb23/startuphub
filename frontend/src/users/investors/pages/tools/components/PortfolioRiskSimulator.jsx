import React, { useState, useEffect } from 'react';

const PortfolioRiskSimulator = () => {
  const [scenarios, setScenarios] = useState([
    { id: 1, name: 'Market Downturn', value: -15, active: true },
    { id: 2, name: 'Burn Rate Increase', value: 25, active: true },
    { id: 3, name: 'Funding Delay', value: 6, active: true },
    { id: 4, name: 'Competitive Pressure', value: -10, active: true },
    { id: 5, name: 'Regulatory Changes', value: -8, active: false },
    { id: 6, name: 'Technology Obsolescence', value: -20, active: false }
  ]);
  
  const [portfolioData, setPortfolioData] = useState({
    currentValue: 10000000,
    sectors: [
      { name: 'AI/ML', value: 3000000, risk: 7 },
      { name: 'Fintech', value: 2500000, risk: 6 },
      { name: 'Healthtech', value: 2000000, risk: 5 },
      { name: 'Clean Energy', value: 1500000, risk: 8 },
      { name: 'EdTech', value: 1000000, risk: 4 }
    ]
  });
  
  const [simulationResults, setSimulationResults] = useState(null);
  
  const toggleScenario = (id) => {
    setScenarios(scenarios.map(scenario => 
      scenario.id === id ? { ...scenario, active: !scenario.active } : scenario
    ));
  };
  
  const updateScenarioValue = (id, value) => {
    setScenarios(scenarios.map(scenario => 
      scenario.id === id ? { ...scenario, value: Number(value) } : scenario
    ));
  };
  
  const runSimulation = () => {
    const activeScenarios = scenarios.filter(s => s.active);
    const totalImpact = activeScenarios.reduce((sum, scenario) => sum + scenario.value, 0);
    const impactedValue = portfolioData.currentValue * (1 + totalImpact / 100);
    
    // Calculate sector impacts
    const sectorImpacts = portfolioData.sectors.map(sector => {
      // Simple model: higher risk sectors are more affected
      const sectorImpact = totalImpact * (sector.risk / 10);
      return {
        ...sector,
        impactedValue: sector.value * (1 + sectorImpact / 100),
        impact: sectorImpact
      };
    });
    
    setSimulationResults({
      currentValue: portfolioData.currentValue,
      impactedValue,
      totalImpact,
      sectors: sectorImpacts
    });
  };
  
  useEffect(() => {
    runSimulation();
  }, [scenarios]);
  
  const getImpactColor = (impact) => {
    if (impact < -15) return 'bg-red-500';
    if (impact < -5) return 'bg-orange-500';
    if (impact < 5) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Portfolio Risk Simulator</h2>
        <p className="text-gray-600">Model potential impacts of various market scenarios on your portfolio</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Controls */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Scenario Controls</h3>
          
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={scenario.active}
                      onChange={() => toggleScenario(scenario.id)}
                      className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">{scenario.name}</span>
                  </label>
                  <input
                    type="number"
                    value={scenario.value}
                    onChange={(e) => updateScenarioValue(scenario.id, e.target.value)}
                    className="w-16 p-1 border border-gray-300 rounded text-center text-sm"
                    disabled={!scenario.active}
                  />
                  <span className="text-sm text-gray-500 ml-1">%</span>
                </div>
                
                {scenario.active && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getImpactColor(scenario.value)}`}
                        style={{ width: `${Math.min(Math.abs(scenario.value) * 5, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button 
              onClick={runSimulation}
              className="w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all font-medium"
            >
              Run Simulation
            </button>
          </div>
        </div>
        
        {/* Results Visualization */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Cards */}
          {simulationResults && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="text-sm text-gray-600">Current Portfolio Value</div>
                <div className="text-xl font-bold text-gray-800">
                  ${simulationResults.currentValue.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="text-sm text-gray-600">Impacted Value</div>
                <div className={`text-xl font-bold ${
                  simulationResults.totalImpact < 0 ? 'text-red-500' : 'text-green-500'
                }`}>
                  ${Math.round(simulationResults.impactedValue).toLocaleString()}
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="text-sm text-gray-600">Total Impact</div>
                <div className={`text-xl font-bold ${
                  simulationResults.totalImpact < 0 ? 'text-red-500' : 'text-green-500'
                }`}>
                  {simulationResults.totalImpact.toFixed(1)}%
                </div>
              </div>
            </div>
          )}
          
          {/* Sector Impact Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Sector Impact Analysis</h3>
            
            {simulationResults ? (
              <div className="space-y-4">
                {simulationResults.sectors.map((sector) => (
                  <div key={sector.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-800">{sector.name}</span>
                      <span className={sector.impact < 0 ? 'text-red-500' : 'text-green-500'}>
                        {sector.impact.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 text-xs text-gray-600">
                        ${sector.value.toLocaleString()} →
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div 
                            className={`h-4 rounded-full ${
                              sector.impact < -10 ? 'bg-red-500' : 
                              sector.impact < -5 ? 'bg-orange-500' : 
                              sector.impact < 0 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(100, Math.abs(sector.impact) * 10)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-32 text-right text-xs text-gray-600">
                        ← ${Math.round(sector.impactedValue).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Run a simulation to see sector impact analysis
              </div>
            )}
          </div>
          
          {/* Risk Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Risk Distribution</h3>
            
            <div className="flex items-end h-32 gap-2 mt-6">
              {portfolioData.sectors.map((sector) => (
                <div key={sector.name} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-[#FF8C42] rounded-t"
                    style={{ height: `${sector.risk * 10}%` }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-2 text-center">{sector.name}</div>
                  <div className="text-xs font-bold text-[#FF6A00]">{sector.risk}/10</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioRiskSimulator;