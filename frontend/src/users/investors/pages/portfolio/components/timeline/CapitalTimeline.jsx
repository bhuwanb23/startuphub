import React from 'react';

const CapitalTimeline = () => {
  // Mock data
  const timelineData = [
    {
      id: 1,
      date: '2021-03-15',
      event: 'Initial Investment',
      startup: 'NeuroSync AI',
      amount: '$2,000,000',
      round: 'Seed',
      type: 'investment',
      status: 'completed'
    },
    {
      id: 2,
      date: '2021-08-22',
      event: 'Follow-on Investment',
      startup: 'GreenTech Pro',
      amount: '$1,500,000',
      round: 'Series A',
      type: 'investment',
      status: 'completed'
    },
    {
      id: 3,
      date: '2022-01-10',
      event: 'Initial Investment',
      startup: 'FinStream Analytics',
      amount: '$3,200,000',
      round: 'Series A',
      type: 'investment',
      status: 'completed'
    },
    {
      id: 4,
      date: '2022-06-05',
      event: 'Additional Investment',
      startup: 'NeuroSync AI',
      amount: '$8,000,000',
      round: 'Series A',
      type: 'investment',
      status: 'completed'
    },
    {
      id: 5,
      date: '2023-06-15',
      event: 'Major Investment',
      startup: 'NeuroSync AI',
      amount: '$18,000,000',
      round: 'Series B',
      type: 'investment',
      status: 'completed'
    },
    {
      id: 6,
      date: '2023-09-01',
      event: 'Planned Investment',
      startup: 'HealthPulse AI',
      amount: '$5,000,000',
      round: 'Series B',
      type: 'planned',
      status: 'pending'
    },
    {
      id: 7,
      date: '2023-11-15',
      event: 'Planned Investment',
      startup: 'EcoPack Solutions',
      amount: '$4,500,000',
      round: 'Series C',
      type: 'planned',
      status: 'pending'
    }
  ];

  const futureInvestments = [
    { startup: 'AI Nexus Labs', amount: '$3.2M', round: 'Series A', timeframe: 'Q1 2024' },
    { startup: 'Quantum Secure', amount: '$6.5M', round: 'Series B', timeframe: 'Q2 2024' },
    { startup: 'BioSphere Innovations', amount: '$4.8M', round: 'Series A', timeframe: 'Q3 2024' }
  ];

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'investment': return 'bg-green-100 text-green-800 border-green-200';
      case 'planned': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'investment': return '💰';
      case 'planned': return '📅';
      default: return '🔹';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Capital Allocation Timeline</h2>
        <p className="text-gray-600">Historical investments and future allocation plans</p>
      </div>

      {/* Timeline Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-6">Investment Timeline</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#FF8C42]"></div>
          
          {/* Timeline events */}
          <div className="space-y-8 pl-12">
            {timelineData.map((event, index) => (
              <div key={event.id} className="relative">
                {/* Timeline node */}
                <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-[#FF6A00] flex items-center justify-center text-white">
                  {getEventIcon(event.type)}
                </div>
                
                {/* Event card */}
                <div className={`border rounded-lg p-4 ${getEventTypeColor(event.type)}`}>
                  <div className="flex justify-between">
                    <h4 className="font-bold text-gray-800">{event.event}</h4>
                    <span className="font-bold text-gray-800">{event.amount}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div>
                      <div className="text-gray-700">{event.startup}</div>
                      <div className="text-sm text-gray-600">{event.round} • {event.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs px-2 py-1 bg-white rounded-full inline-block">
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Future Planned Allocations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Future Planned Allocations</h3>
          <div className="space-y-4">
            {futureInvestments.map((investment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800">{investment.startup}</div>
                  <div className="text-sm text-gray-600">{investment.round} • {investment.timeframe}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">{investment.amount}</div>
                  <div className="text-xs text-[#FF6A00]">Planned</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capital Allocation Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Capital Allocation Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Invested</span>
              <span className="font-bold text-gray-800">$32.7M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Committed Capital</span>
              <span className="font-bold text-gray-800">$40.0M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Remaining Capacity</span>
              <span className="font-bold text-green-600">$7.3M</span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Utilization Rate</span>
                <span className="font-bold text-gray-800">81.75%</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FF6A00]"
                  style={{ width: '81.75%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drill-down Detail Cards */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Investment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <h4 className="font-medium text-gray-800">NeuroSync AI</h4>
              <span className="text-sm text-[#FF6A00]">3 Investments</span>
            </div>
            <div className="mt-2">
              <div className="text-lg font-bold text-gray-800">$28.0M</div>
              <div className="text-sm text-gray-600">Total investment</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">AI/ML</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Series B</span>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <h4 className="font-medium text-gray-800">GreenTech Pro</h4>
              <span className="text-sm text-[#FF6A00]">1 Investment</span>
            </div>
            <div className="mt-2">
              <div className="text-lg font-bold text-gray-800">$1.5M</div>
              <div className="text-sm text-gray-600">Total investment</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Clean Energy</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Series A</span>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <h4 className="font-medium text-gray-800">FinStream Analytics</h4>
              <span className="text-sm text-[#FF6A00]">1 Investment</span>
            </div>
            <div className="mt-2">
              <div className="text-lg font-bold text-gray-800">$3.2M</div>
              <div className="text-sm text-gray-600">Total investment</div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Fintech</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Series A</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapitalTimeline;