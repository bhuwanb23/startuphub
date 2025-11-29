import React from 'react';

const QuickActionsPanel = () => {
  const quickActions = [
    {
      id: 1,
      title: "New Application",
      description: "Review startup applications",
      icon: "📋",
      color: "indigo"
    },
    {
      id: 2,
      title: "Schedule Session",
      description: "Plan mentoring sessions",
      icon: "📅",
      color: "green"
    },
    {
      id: 3,
      title: "Funding Tracker",
      description: "Monitor funding progress",
      icon: "💰",
      color: "blue"
    },
    {
      id: 4,
      title: "Resource Booking",
      description: "Reserve facilities",
      icon: "🏢",
      color: "purple"
    },
    {
      id: 5,
      title: "Program Creation",
      description: "Set up new programs",
      icon: "🎯",
      color: "yellow"
    },
    {
      id: 6,
      title: "Analytics",
      description: "View performance metrics",
      icon: "📊",
      color: "pink"
    }
  ];

  // Function to get background color class
  const getBgColorClass = (color) => {
    const colorClasses = {
      indigo: 'bg-indigo-100',
      green: 'bg-green-100',
      blue: 'bg-blue-100',
      purple: 'bg-purple-100',
      yellow: 'bg-yellow-100',
      pink: 'bg-pink-100'
    };
    return colorClasses[color] || 'bg-gray-100';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <button 
            key={action.id}
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left hover:shadow-lg transition-all hover:border-indigo-200 flex flex-col items-center text-center group"
          >
            <div className={`w-12 h-12 rounded-full ${getBgColorClass(action.color)} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
              {action.icon}
            </div>
            <h3 className="font-semibold text-gray-800">{action.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;