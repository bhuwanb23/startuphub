import React, { useState } from 'react';

const TrendForecasting = () => {
  const [timeHorizon, setTimeHorizon] = useState(3); // 1, 3, or 5 years

  // Mock trend data
  const trendData = {
    'AI & Machine Learning': {
      current: 85,
      forecast: [
        { year: 1, value: 88 },
        { year: 2, value: 92 },
        { year: 3, value: 95 },
        { year: 4, value: 97 },
        { year: 5, value: 98 }
      ]
    },
    'Biotechnology': {
      current: 78,
      forecast: [
        { year: 1, value: 82 },
        { year: 2, value: 85 },
        { year: 3, value: 88 },
        { year: 4, value: 90 },
        { year: 5, value: 92 }
      ]
    },
    'Clean Energy': {
      current: 72,
      forecast: [
        { year: 1, value: 76 },
        { year: 2, value: 80 },
        { year: 3, value: 84 },
        { year: 4, value: 87 },
        { year: 5, value: 89 }
      ]
    },
    'Quantum Computing': {
      current: 45,
      forecast: [
        { year: 1, value: 52 },
        { year: 2, value: 60 },
        { year: 3, value: 68 },
        { year: 4, value: 75 },
        { year: 5, value: 80 }
      ]
    },
    'Space Technology': {
      current: 65,
      forecast: [
        { year: 1, value: 68 },
        { year: 2, value: 72 },
        { year: 3, value: 76 },
        { year: 4, value: 79 },
        { year: 5, value: 82 }
      ]
    }
  };

  // Get forecast data for selected time horizon
  const getForecastData = () => {
    return Object.entries(trendData).map(([sector, data]) => ({
      sector,
      current: data.current,
      forecast: data.forecast.slice(0, timeHorizon)
    }));
  };

  // AI Insights
  const aiInsights = [
    "AI & ML showing exponential growth trajectory with 15% annual increase",
    "Biotech stabilizing after initial boom, steady long-term growth expected",
    "Clean Energy demand accelerating due to regulatory changes",
    "Quantum Computing transitioning from research to commercial phase",
    "Space Tech benefiting from increased private sector investment"
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">📈 Trend Forecasting</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Time Horizon Selector and Line Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Market Demand Forecast</h2>
              
              {/* Time Horizon Slider */}
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-3">Time Horizon:</span>
                <div className="flex bg-gray-100 rounded-md p-1">
                  {[1, 3, 5].map((years) => (
                    <button
                      key={years}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        timeHorizon === years
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setTimeHorizon(years)}
                    >
                      {years}Y
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Line Chart */}
            <div className="h-80">
              <div className="h-full flex flex-col">
                {/* Y-axis labels */}
                <div className="flex flex-col justify-between h-full pb-8 pl-8">
                  {[100, 80, 60, 40, 20, 0].map((value) => (
                    <div key={value} className="text-xs text-gray-500 -ml-8">{value}%</div>
                  ))}
                </div>
                
                {/* Chart area */}
                <div className="flex-1 relative pl-8 pb-8">
                  {/* Grid lines */}
                  <div className="absolute inset-0">
                    {[20, 40, 60, 80, 100].map((value) => (
                      <div 
                        key={value} 
                        className="absolute left-0 right-0 h-px bg-gray-100"
                        style={{ bottom: `${value}%` }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Data lines */}
                  {getForecastData().map((item, index) => {
                    const { sector, current, forecast } = item;
                    const points = [
                      { x: 0, y: current },
                      ...forecast.map((point, i) => ({
                        x: ((i + 1) / timeHorizon) * 100,
                        y: point.value
                      }))
                    ];
                    
                    const linePoints = points.map(point => 
                      `${(point.x / 100) * 100}%,${100 - point.y}%`
                    ).join(' ');
                    
                    const colors = [
                      '#f97316', // orange
                      '#22c55e', // green
                      '#3b82f6', // blue
                      '#8b5cf6', // purple
                      '#ec4899'  // pink
                    ];
                    
                    return (
                      <div key={sector} className="absolute inset-0">
                        <svg className="w-full h-full">
                          <polyline
                            points={linePoints}
                            fill="none"
                            stroke={colors[index % colors.length]}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {points.map((point, i) => (
                            <circle
                              key={i}
                              cx={`${(point.x / 100) * 100}%`}
                              cy={`${100 - point.y}%`}
                              r="4"
                              fill={colors[index % colors.length]}
                            />
                          ))}
                        </svg>
                      </div>
                    );
                  })}
                  
                  {/* X-axis */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
                    <span className="text-xs text-gray-500">Now</span>
                    {Array.from({ length: timeHorizon }, (_, i) => (
                      <span key={i} className="text-xs text-gray-500">Y{i + 1}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6">
              {Object.keys(trendData).map((sector, index) => {
                const colors = [
                  '#f97316', // orange
                  '#22c55e', // green
                  '#3b82f6', // blue
                  '#8b5cf6', // purple
                  '#ec4899'  // pink
                ];
                
                return (
                  <div key={sector} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: colors[index % colors.length] }}
                    ></div>
                    <span className="text-sm text-gray-700">{sector}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Right Column - AI Insights and Controls */}
        <div className="space-y-6">
          {/* AI Predictions Panel */}
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🤖 AI Predictions</h2>
            
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                    </div>
                    <p className="text-sm text-orange-800">{insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Market Demand Curves */}
          <div className="bg-white rounded-lg shadow p-6 border border-orange-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sector Growth Rates</h2>
            
            <div className="space-y-4">
              {Object.entries(trendData).map(([sector, data]) => {
                const growthRate = ((data.forecast[timeHorizon - 1].value - data.current) / timeHorizon).toFixed(1);
                return (
                  <div key={sector}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{sector}</span>
                      <span className="text-sm font-medium text-gray-700">{growthRate}%/yr</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, Math.abs(growthRate) * 10)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Forecast Summary */}
          <div className="bg-gradient-to-b from-orange-50 to-saffron-50 rounded-lg p-6 border border-orange-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Forecast Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Time Horizon</span>
                <span className="text-sm font-medium text-orange-600">{timeHorizon} Years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Highest Growth Sector</span>
                <span className="text-sm font-medium text-orange-600">Quantum Computing</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Most Stable Sector</span>
                <span className="text-sm font-medium text-orange-600">Biotechnology</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Market Saturation Risk</span>
                <span className="text-sm font-medium text-orange-600">Low</span>
              </div>
            </div>
            
            <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium">
              Export Full Forecast Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendForecasting;