import React from 'react';

const StartupPipeline = () => {
  const pipelineStages = [
    { name: 'Prospecting', count: 24, color: 'bg-gray-200' },
    { name: 'Initial Review', count: 18, color: 'bg-blue-200' },
    { name: 'Due Diligence', count: 12, color: 'bg-yellow-200' },
    { name: 'Term Negotiation', count: 8, color: 'bg-orange-200' },
    { name: 'Closing', count: 5, color: 'bg-green-200' },
  ];

  const companies = [
    { name: 'NeuroSync AI', stage: 'Due Diligence', progress: 75, investment: '$2.5M' },
    { name: 'EcoPack Solutions', stage: 'Term Negotiation', progress: 90, investment: '$1.8M' },
    { name: 'FinStream Analytics', stage: 'Initial Review', progress: 40, investment: '$800K' },
    { name: 'HealthPulse AI', stage: 'Prospecting', progress: 15, investment: '$1.2M' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Startup Pipeline Board</h2>
        <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
          View Pipeline
        </button>
      </div>
      
      {/* Pipeline Stages */}
      <div className="mb-6">
        <div className="flex justify-between">
          {pipelineStages.map((stage, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${stage.color}`}>
                <span className="text-lg font-bold text-gray-800">{stage.count}</span>
              </div>
              <div className="mt-2 text-sm font-medium text-gray-700">{stage.name}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Pipeline Companies */}
      <div className="space-y-4">
        {companies.map((company, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold text-gray-800">{company.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {company.stage}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-xs text-gray-600">Investment: {company.investment}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-bold text-gray-800">{company.progress}%</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-[#FF6A00]"
                  style={{ width: `${company.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
              📈
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">Pipeline Health</h3>
              <p className="text-xs text-gray-600">Conversion rate: 22% (Industry avg: 18%)</p>
            </div>
          </div>
          <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium">
            Optimize Pipeline
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartupPipeline;