import React, { useState } from 'react';

const ReadinessScore = () => {
  const [timeRange, setTimeRange] = useState('12months');
  
  // Overall readiness score
  const readinessScore = 78;
  
  // Mock data for readiness metrics
  const readinessMetrics = [
    {
      id: 1,
      category: 'Financial Readiness',
      score: 82,
      color: 'bg-green-500',
      metrics: [
        { name: 'Financial Projections', value: 'Complete', status: 'good' },
        { name: 'Cap Table', value: 'Up-to-date', status: 'good' },
        { name: 'Audit Trail', value: '85% Complete', status: 'average' },
      ],
    },
    {
      id: 2,
      category: 'Legal Compliance',
      score: 75,
      color: 'bg-yellow-500',
      metrics: [
        { name: 'Corporate Docs', value: 'Complete', status: 'good' },
        { name: 'IP Protection', value: '90% Complete', status: 'good' },
        { name: 'Contracts', value: '70% Complete', status: 'average' },
      ],
    },
    {
      id: 3,
      category: 'Team & Operations',
      score: 85,
      color: 'bg-green-500',
      metrics: [
        { name: 'Key Hires', value: 'Complete', status: 'excellent' },
        { name: 'Advisory Board', value: 'Strong', status: 'good' },
        { name: 'Processes', value: 'Well-documented', status: 'good' },
      ],
    },
    {
      id: 4,
      category: 'Market Position',
      score: 70,
      color: 'bg-yellow-500',
      metrics: [
        { name: 'Traction', value: 'Strong', status: 'good' },
        { name: 'Competition', value: 'Well-analyzed', status: 'good' },
        { name: 'Customer Base', value: 'Growing', status: 'average' },
      ],
    },
  ];

  // Mock data for readiness trends
  const readinessTrends = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 72 },
    { month: 'Apr', score: 74 },
    { month: 'May', score: 76 },
    { month: 'Jun', score: 78 },
  ];

  // Mock data for recommendations
  const recommendations = [
    {
      id: 1,
      priority: 'High',
      category: 'Legal Compliance',
      recommendation: 'Complete remaining contract documentation to reach 100% compliance',
      impact: 'Significant',
      effort: 'Medium',
    },
    {
      id: 2,
      priority: 'Medium',
      category: 'Financial Readiness',
      recommendation: 'Finalize audit trail documentation for full financial transparency',
      impact: 'Moderate',
      effort: 'Low',
    },
    {
      id: 3,
      priority: 'Low',
      category: 'Market Position',
      recommendation: 'Expand customer testimonials and case studies for stronger validation',
      impact: 'Moderate',
      effort: 'High',
    },
  ];

  // Get readiness score color
  const getReadinessColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Get readiness status
  const getReadinessStatus = (score) => {
    if (score >= 80) return 'Investment Ready';
    if (score >= 70) return 'Nearly Ready';
    if (score >= 60) return 'Moderately Prepared';
    return 'Needs Work';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Funding Readiness Score</h1>
        <p className="text-gray-600 mt-1">Assess your startup's preparedness for fundraising</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Readiness Insight</h2>
            <p className="text-gray-700 mt-1">
              Overall readiness score of 78 indicates strong preparation for fundraising. 
              Legal Compliance needs attention (75 score). Focus on completing contract documentation 
              to improve investor confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Overall Readiness Score */}
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
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - readinessScore / 100)}`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${getReadinessColor(readinessScore)}`}>{readinessScore}</span>
              <span className="text-gray-600 text-sm">Readiness Score</span>
              <span className={`text-sm font-medium ${getReadinessColor(readinessScore)}`}>
                {getReadinessStatus(readinessScore)}
              </span>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <h3 className="text-lg font-bold text-gray-800">Funding Readiness Assessment</h3>
            <p className="text-gray-600 mt-2 max-w-md">
              Your startup is well-prepared for fundraising with strong financials and team performance. 
              Focus on completing legal documentation to achieve investment-ready status.
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

      {/* Readiness Trends */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Readiness Score Trend</h2>
        <div className="h-64 relative">
          {/* Simplified line chart */}
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
            {readinessTrends.map((data, index) => (
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
                readinessTrends.map((data, index) => {
                  const x = (index / (readinessTrends.length - 1)) * 100;
                  const y = 100 - (data.score / 100) * 100;
                  return `${x}% ${y}%`;
                }).join(', ')
              }
            />
          </svg>
        </div>
      </div>

      {/* Readiness Metrics by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {readinessMetrics.map((category) => (
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

      {/* Readiness Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Readiness Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-800">Strengths</h3>
            <ul className="mt-2 space-y-1 text-sm text-green-700">
              <li>• Strong financial projections</li>
              <li>• Complete key hires</li>
              <li>• Solid traction metrics</li>
            </ul>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-yellow-800">Opportunities</h3>
            <ul className="mt-2 space-y-1 text-sm text-yellow-700">
              <li>• Complete contract documentation</li>
              <li>• Finalize audit trail</li>
              <li>• Expand customer testimonials</li>
            </ul>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-800">Next Steps</h3>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>• Address legal compliance gaps</li>
              <li>• Update readiness score monthly</li>
              <li>• Prepare investor presentation deck</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadinessScore;