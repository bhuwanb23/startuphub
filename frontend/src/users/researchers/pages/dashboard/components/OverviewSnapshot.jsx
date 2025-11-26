import React from 'react';

const OverviewSnapshot = () => {
  const overviewData = [
    { title: 'Total Research Projects', value: '12', change: '+2', icon: '🔬' },
    { title: 'Active Experiments', value: '8', change: '+1', icon: '🧪' },
    { title: 'Pending IPR Tasks', value: '3', change: '-1', icon: '🧠' },
    { title: 'Funding Applications', value: '5', change: '+1', status: '2 pending', icon: '💰' },
    { title: 'Collaboration Invites', value: '4', change: '+2', icon: '🤝' },
    { title: 'Active Alerts', value: '7', change: '+3', status: '3 urgent', icon: '⚠️' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">📊 Overview Snapshot</h2>
        <button className="text-[#FF6A00] hover:text-[#e05500] text-sm font-medium flex items-center">
          View All <span className="ml-1">→</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {overviewData.map((item, index) => (
          <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-100 hover:border-[#FF8C42]/30 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-2xl font-bold text-[#FF6A00]">{item.value}</div>
                <div className="text-sm text-gray-600 mt-1">{item.title}</div>
                {item.status && <div className="text-xs text-gray-500 mt-1">{item.status}</div>}
              </div>
              <div className="text-2xl">{item.icon}</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <span className={item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {item.change} from last week
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewSnapshot;