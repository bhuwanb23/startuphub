import React from 'react';
import CircularGauge from '../shared/CircularGauge';

const PortfolioHealth = () => {
  // Mock data
  const healthScore = 87;
  const macroConditions = [
    { factor: 'Market Volatility', score: 75, impact: 'Medium' },
    { factor: 'Interest Rates', score: 68, impact: 'High' },
    { factor: 'Regulatory Environment', score: 92, impact: 'Low' },
    { factor: 'Economic Growth', score: 81, impact: 'Medium' },
    { factor: 'Technology Adoption', score: 88, impact: 'Low' }
  ];

  const strengthWeaknessData = [
    { category: 'Diversification', strength: 92, weakness: 8 },
    { category: 'Returns', strength: 78, weakness: 22 },
    { category: 'Risk Management', strength: 85, weakness: 15 },
    { category: 'Liquidity', strength: 70, weakness: 30 },
    { category: 'Sector Exposure', strength: 88, weakness: 12 }
  ];

  const aiStabilityIndex = [
    { month: 'Jan', score: 82 },
    { month: 'Feb', score: 85 },
    { month: 'Mar', score: 87 },
    { month: 'Apr', score: 84 },
    { month: 'May', score: 86 },
    { month: 'Jun', score: 87 }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Portfolio Health Score</h2>
        <p className="text-gray-600">Weighted scoring model and stability analysis</p>
      </div>

      {/* Portfolio Health Score */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-6">Overall Health Score</h3>
        <div className="flex flex-col items-center">
          <CircularGauge score={healthScore} maxScore={100} size={200} />
          <div className="mt-6 text-center">
            <div className="text-2xl font-bold text-gray-800">Strong Portfolio Health</div>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Your portfolio demonstrates robust performance with strong diversification and healthy returns. 
              Minor adjustments recommended in liquidity management.
            </p>
          </div>
        </div>
      </div>

      {/* Macro Conditions Overlay */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Macro Conditions Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {macroConditions.map((condition, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">{condition.factor}</h4>
                <span className={`text-xs ${getImpactColor(condition.impact)}`}>
                  {condition.impact}
                </span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Score</span>
                  <span className="font-medium text-gray-800">{condition.score}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FF6A00]"
                    style={{ width: `${condition.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strength vs Weakness Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Strength vs Weakness Analysis</h3>
        <div className="space-y-4">
          {strengthWeaknessData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-800">{item.category}</span>
                <span className="text-gray-600">{item.strength}% strength / {item.weakness}% weakness</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 flex">
                <div 
                  className="h-4 rounded-l-full bg-gradient-to-r from-green-500 to-green-400"
                  style={{ width: `${item.strength}%` }}
                ></div>
                <div 
                  className="h-4 rounded-r-full bg-gradient-to-r from-red-400 to-red-500"
                  style={{ width: `${item.weakness}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Stability Index */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">AI Stability Index</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {aiStabilityIndex.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-gradient-to-t from-[#FF8C42] to-[#FF6A00] rounded-t-lg"
                style={{ height: `${(item.score / 100) * 100}%` }}
              ></div>
              <div className="text-xs text-gray-500 mt-2">{item.month}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <div className="text-lg font-bold text-gray-800">
            Current Stability: {Math.max(...aiStabilityIndex.map(d => d.score))}/100
          </div>
          <div className="text-sm text-gray-600">Trend: Stable with minor fluctuations</div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">AI Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start p-3 bg-[#FFF5EB] border border-[#FF8C42] rounded-lg">
            <span className="text-[#FF6A00] mr-3 mt-0.5">💡</span>
            <div>
              <div className="font-medium text-gray-800">Improve Liquidity Position</div>
              <div className="text-sm text-gray-600">Consider increasing cash reserves by 5-10% to improve portfolio liquidity buffer.</div>
            </div>
          </div>
          <div className="flex items-start p-3 bg-[#FFF5EB] border border-[#FF8C42] rounded-lg">
            <span className="text-[#FF6A00] mr-3 mt-0.5">💡</span>
            <div>
              <div className="font-medium text-gray-800">Diversify Sector Exposure</div>
              <div className="text-sm text-gray-600">Explore opportunities in emerging sectors like quantum computing and biotech.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHealth;