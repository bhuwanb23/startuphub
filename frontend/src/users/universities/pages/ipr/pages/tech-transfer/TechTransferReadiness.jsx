import React, { useState } from 'react';

const TechTransferReadiness = () => {
  const [readinessScores, setReadinessScores] = useState([
    { 
      id: 1, 
      title: 'AI-Powered Drug Discovery Platform', 
      department: 'Biotechnology',
      trl: 7,
      commercialViability: 85,
      teamCapability: 92,
      marketReadiness: 78,
      ipProtection: 88
    },
    { 
      id: 2, 
      title: 'Sustainable Energy Storage Solution', 
      department: 'Chemical Engineering',
      trl: 6,
      commercialViability: 78,
      teamCapability: 85,
      marketReadiness: 72,
      ipProtection: 82
    },
    { 
      id: 3, 
      title: 'Quantum Computing Algorithms', 
      department: 'Computer Science',
      trl: 5,
      commercialViability: 82,
      teamCapability: 90,
      marketReadiness: 65,
      ipProtection: 75
    },
  ]);

  const getTRLColor = (trl) => {
    if (trl >= 7) return 'bg-green-100 text-green-800';
    if (trl >= 5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const calculateOverallScore = (item) => {
    return Math.round((item.trl * 10 + item.commercialViability + item.teamCapability + item.marketReadiness + item.ipProtection) / 5);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Tech Transfer Readiness Score</h1>
        <p className="text-gray-600">Comprehensive assessment of technology transfer readiness</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {readinessScores.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
                  <p className="text-gray-600 text-sm">{item.department}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">{calculateOverallScore(item)}%</div>
                  <div className="text-sm text-gray-600">Overall Readiness</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTRLColor(item.trl)}`}>
                    TRL {item.trl}
                  </div>
                  <div className="text-xs text-gray-600 mt-2">Technology Readiness</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-gray-800">{item.commercialViability}%</div>
                  <div className="text-xs text-gray-600 mt-2">Commercial Viability</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-gray-800">{item.teamCapability}%</div>
                  <div className="text-xs text-gray-600 mt-2">Team Capability</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-gray-800">{item.marketReadiness}%</div>
                  <div className="text-xs text-gray-600 mt-2">Market Readiness</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-gray-800">{item.ipProtection}%</div>
                  <div className="text-xs text-gray-600 mt-2">IP Protection</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Readiness Progress</span>
                  <span className="font-medium text-gray-800">{calculateOverallScore(item)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#F4A300] h-2 rounded-full" 
                    style={{ width: `${calculateOverallScore(item)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  {calculateOverallScore(item) < 70 ? (
                    <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      Needs Improvement
                    </span>
                  ) : calculateOverallScore(item) < 85 ? (
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Good Potential
                    </span>
                  ) : (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Ready for Transfer
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button className="text-[#F4A300] hover:text-[#F26B1D] text-sm font-medium">
                    View Detailed Report
                  </button>
                  <button className="bg-[#F4A300] hover:bg-[#F26B1D] text-white px-3 py-1 rounded text-sm transition-colors">
                    Improve Readiness
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Readiness Insights */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Readiness Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800 mb-1">2</div>
            <div className="text-sm text-gray-600">Technologies Ready for Transfer</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800 mb-1">1</div>
            <div className="text-sm text-gray-600">Needs Improvement</div>
          </div>
          <div className="bg-[#FFF9F0] border border-[#F4A300]/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-800 mb-1">82%</div>
            <div className="text-sm text-gray-600">Average Readiness Score</div>
          </div>
        </div>
        
        <div className="mt-4">
          <button className="text-[#F4A300] hover:text-[#F26B1D] font-medium">
            Generate Readiness Improvement Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechTransferReadiness;