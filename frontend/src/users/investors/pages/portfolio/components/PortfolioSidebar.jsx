import React from 'react';

const PortfolioSidebar = ({ navigation, activeSection, setActiveSection }) => {
  // Navigation items for the Portfolio Management System
  const PORTFOLIO_NAVIGATION = [
    {
      id: 'overview',
      name: 'Portfolio Overview',
      icon: '📊',
    },
    {
      id: 'tracking',
      name: 'Startup Tracking',
      icon: '📈',
    },
    {
      id: 'metrics',
      name: 'Metrics Viewer',
      icon: '🔍',
    },
    {
      id: 'actions',
      name: 'Follow-up Actions',
      icon: '✅',
    },
    {
      id: 'alerts',
      name: 'Alerts Center',
      icon: '⚠️',
    },
    {
      id: 'documents',
      name: 'Investment Docs',
      icon: '📄',
    },
    {
      id: 'health',
      name: 'Portfolio Health',
      icon: '❤️',
    },
    {
      id: 'timeline',
      name: 'Capital Timeline',
      icon: '📅',
    },
  ];

  return (
    <div className="bg-white h-full border-r border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">Portfolio</h2>
        <p className="text-xs text-gray-500 mt-1">Management System</p>
      </div>
      <nav className="p-2 overflow-y-auto max-h-[calc(100vh-100px)]">
        <ul className="space-y-1">
          {PORTFOLIO_NAVIGATION.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center p-3 rounded-lg text-left transition-all ${
                  activeSection === item.id
                    ? 'bg-[#FF8C42]/20 text-[#FF6A00] border-r-2 border-[#FF6A00] shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PortfolioSidebar;