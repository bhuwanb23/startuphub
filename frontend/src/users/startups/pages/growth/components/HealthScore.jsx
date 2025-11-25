import React, { useState } from 'react';

const HealthScore = () => {
  const [timeRange, setTimeRange] = useState('12months');
  
  // Overall health score
  const healthScore = 82;
  
  // Mock data for health metrics
  const healthMetrics = [
    {
      id: 1,
      category: 'Financial Health',
      score: 85,
      color: 'bg-green-500',
      metrics: [
        { name: 'Revenue Growth', value: '22.5%', status: 'good' },
        { name: 'Burn Rate', value: 'Optimal', status: 'good' },
        { name: 'Cash Runway', value: '18 months', status: 'good' },
      ],
    },
    {
      id: 2,
      category: 'Product Market Fit',
      score: 78,
      color: 'bg-yellow-500',
      metrics: [
        { name: 'User Retention', value: '78.5%', status: 'good' },
        { name: 'NPS Score', value: '42', status: 'good' },
        { name: 'Feature Adoption', value: '65%', status: 'average' },
      ],
    },
    {
      id: 3,
      category: 'Team & Operations',
      score: 90,
      color: 'bg-green-500',
      metrics: [
        { name: 'Employee Satisfaction', value: '4.2/5', status: 'excellent' },
        { name: 'Team Velocity', value: '85%', status: 'good' },
        { name: 'Process Efficiency', value: '78%', status: 'good' },
      ],
    },
    {
      id: 4,
      category: 'Market Position',
      score: 75,
      color: 'bg-yellow-500',
      metrics: [
        { name: 'Brand Awareness', value: '65%', status: 'average' },
        { name: 'Market Share', value: '2.1%', status: 'average' },
        { name: 'Competitive Edge', value: 'Strong', status: 'good' },
      ],
    },
  ];

  // Mock data for health trends
  const healthTrends = [
    { month: 'Jan', score: 72 },
    { month: 'Feb', score: 75 },
    { month: 'Mar', score: 78 },
    { month: 'Apr', score: 80 },
    { month: 'May', score: 81 },
    { month: 'Jun', score: 82 },
  ];

  // Mock data for recommendations
  const recommendations = [
    {
      id: 1,
      priority: 'High',
      category: 'Product Market Fit',
      recommendation: 'Improve feature adoption rate by 15% through user onboarding optimization',
      impact: 'Significant',
      effort: 'Medium',
    },
    {
      id: 2,
      priority: 'Medium',
      category: 'Market Position',
      recommendation: 'Increase brand awareness through targeted content marketing campaigns',
      impact: 'Moderate',
      effort: 'Low',
    },
    {
      id: 3,
      priority: 'Low',
      category: 'Financial Health',
      recommendation: 'Explore additional revenue streams to diversify income sources',
      impact: 'Moderate',
      effort: 'High',
    },
  ];

  // Get health score color
  const getHealthColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Get health status
  const getHealthStatus = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Attention';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Startup Health Score</h1>
        <p className="text-gray-600 mt-1">Comprehensive assessment of startup health across key dimensions</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Health Insight</h2>
            <p className="text-gray-700 mt-1">
              Overall health score of 82 indicates strong performance. Team & Operations category leads at 90. 
              Focus on improving Product Market Fit (78) and Market Position (75) for balanced growth.
            </p>
          </div>
        </div>
      </div>

      {/* Overall Health Score */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#FF6A00"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - healthScore / 100)}`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${getHealthColor(healthScore)}`}>{healthScore}</span>
              <span className="text-gray-600 text-sm">Health Score</span>
              <span className={`text-sm font-medium ${getHealthColor(healthScore)}`}>
                {getHealthStatus(healthScore)}
              </span>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <h3 className="text-lg font-bold text-gray-800">Overall Assessment</h3>
            <p className="text-gray-600 mt-2 max-w-md">
              Your startup is in good health with strong financials and team performance. 
              Focus on improving market position and product adoption for balanced growth.
            </p>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTimeRange('3months')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeRange === '3months'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            3 Months
          </button>
          <button
            onClick={() => setTimeRange('6months')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeRange === '6months'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            6 Months
          </button>
          <button
            onClick={() => setTimeRange('12months')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeRange === '12months'
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            12 Months
          </button>
        </div>
      </div>

      {/* Health Trends */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Health Score Trend</h2>
        <div className="h-64 relative">
          {/* Simplified line chart */}
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
            {healthTrends.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-4 h-4 rounded-full bg-[#FF6A00] mb-1"
                  style={{ 
                    marginBottom: `${(data.score / 100) * 200}px`,
                    transform: 'translateY(-50%)'
                  }}
                ></div>
                <div className="text-xs text-gray-500">{data.month}</div>
              </div>
            ))}
          </div>
          
          {/* Connect the dots with lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <polyline
              fill="none"
              stroke="#FF6A00"
              strokeWidth="2"
              points={
                healthTrends.map((data, index) => {
                  const x = (index / (healthTrends.length - 1)) * 100;
                  const y = 100 - (data.score / 100) * 100;
                  return `${x}% ${y}%`;
                }).join(', ')
              }
            />
          </svg>
        </div>
      </div>

      {/* Health Metrics by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {healthMetrics.map((category) => (
          <div key={category.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">{category.category}</h3>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-800 mr-2">{category.score}</span>
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className={`h-2 rounded-full ${category.color}`}
                style={{ width: `${category.score}%` }}
              ></div>
            </div>
            
            <div className="space-y-3">
              {category.metrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">{metric.name}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-800 mr-2">{metric.value}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      metric.status === 'excellent' ? 'bg-green-500' :
                      metric.status === 'good' ? 'bg-blue-500' :
                      metric.status === 'average' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Actionable Recommendations</h2>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between">
                <h3 className="font-bold text-gray-800">{rec.category}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  rec.priority === 'High' 
                    ? 'bg-red-100 text-red-800' 
                    : rec.priority === 'Medium' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-green-100 text-green-800'
                }`}>
                  {rec.priority} Priority
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-2">{rec.recommendation}</p>
              <div className="flex items-center mt-3 text-sm">
                <span className="text-gray-600">Impact: </span>
                <span className="font-medium text-gray-800 ml-1">{rec.impact}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-gray-600">Effort: </span>
                <span className="font-medium text-gray-800 ml-1">{rec.effort}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Score Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Health Score Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-800">Strengths</h3>
            <ul className="mt-2 space-y-1 text-sm text-green-700">
              <li>• Strong financial performance</li>
              <li>• Excellent team satisfaction</li>
              <li>• Optimal burn rate management</li>
            </ul>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-yellow-800">Opportunities</h3>
            <ul className="mt-2 space-y-1 text-sm text-yellow-700">
              <li>• Improve brand awareness</li>
              <li>• Increase feature adoption</li>
              <li>• Expand market share</li>
            </ul>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-800">Next Steps</h3>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>• Implement user onboarding improvements</li>
              <li>• Launch targeted marketing campaigns</li>
              <li>• Monitor health score monthly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthScore;