import React from 'react';
import { Link } from 'react-router-dom';

const IPRLanding = () => {
  const quickActions = [
    { name: 'Upload Research Paper', icon: '📄', path: '/university/ipr/repository/papers' },
    { name: 'Add Prototype', icon: '🔬', path: '/university/ipr/repository/prototypes' },
    { name: 'Start Patent Draft', icon: '✍️', path: '/university/ipr/ipr-tools/patent-drafting' },
    { name: 'Run Prior-Art Search', icon: '🔍', path: '/university/ipr/ipr-tools/prior-art-search' },
  ];

  const stats = [
    { name: 'Patents Filed', value: '42', change: '+12%' },
    { name: 'Licensing Deals', value: '18', change: '+8%' },
    { name: 'Research Papers', value: '127', change: '+22%' },
    { name: 'Prototypes', value: '35', change: '+15%' },
  ];

  return (
    <div className="p-6">
      {/* Hero Panel */}
      <div className="bg-gradient-to-r from-[#F4A300] to-[#F26B1D] rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Research Commercialization & IP Hub</h1>
        <p className="text-white/90 mb-4">Manage intellectual property, research commercialization, and technology transfer</p>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link 
              key={index} 
              to={action.path}
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all duration-200"
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="text-white font-medium">{action.name}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="text-gray-500 text-sm mb-1">{stat.name}</div>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="ml-2 text-sm font-medium text-green-600">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'Patent draft created', item: 'AI-Powered Drug Discovery', time: '2 hours ago' },
            { action: 'Research paper uploaded', item: 'Quantum Computing Algorithms', time: '5 hours ago' },
            { action: 'Prototype submitted', item: 'Sustainable Energy Storage', time: '1 day ago' },
            { action: 'Licensing opportunity added', item: 'Biodegradable Plastics', time: '2 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-800">{activity.action}</div>
                <div className="text-sm text-gray-600">{activity.item}</div>
              </div>
              <div className="text-sm text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IPRLanding;