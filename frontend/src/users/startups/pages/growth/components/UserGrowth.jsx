import React, { useState } from 'react';

const UserGrowth = () => {
  const [timeRange, setTimeRange] = useState('12months');
  
  // Mock data for user growth metrics
  const userMetrics = [
    {
      id: 1,
      title: 'Total Active Users',
      value: '12,480',
      change: '+18.3%',
      trend: 'up',
      icon: '👥',
    },
    {
      id: 2,
      title: 'New Signups',
      value: '1,240',
      change: '+12.7%',
      trend: 'up',
      icon: '🆕',
    },
    {
      id: 3,
      title: 'User Retention',
      value: '78.5%',
      change: '+3.2%',
      trend: 'up',
      icon: '🔒',
    },
    {
      id: 4,
      title: 'Daily Active Users',
      value: '8,920',
      change: '+15.6%',
      trend: 'up',
      icon: '📅',
    },
  ];

  // Mock data for user growth chart
  const growthData = [
    { month: 'Jan', users: 7500, new: 850, retention: 72 },
    { month: 'Feb', users: 8200, new: 920, retention: 74 },
    { month: 'Mar', users: 9100, new: 1100, retention: 75 },
    { month: 'Apr', users: 10200, new: 1250, retention: 76 },
    { month: 'May', users: 11500, new: 1380, retention: 77 },
    { month: 'Jun', users: 12480, new: 1240, retention: 78.5 },
  ];

  // Mock data for user demographics
  const demographics = [
    { segment: 'Age 18-25', percentage: 35, users: 4368 },
    { segment: 'Age 26-35', percentage: 42, users: 5242 },
    { segment: 'Age 36-45', percentage: 18, users: 2246 },
    { segment: 'Age 46+', percentage: 5, users: 624 },
  ];

  // Mock data for user acquisition channels
  const channels = [
    { channel: 'Organic Search', users: 4200, percentage: 34 },
    { channel: 'Social Media', users: 3100, percentage: 25 },
    { channel: 'Referral Program', users: 2100, percentage: 17 },
    { channel: 'Paid Advertising', users: 1800, percentage: 14 },
    { channel: 'Direct Traffic', users: 1280, percentage: 10 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">User Growth Metrics</h1>
        <p className="text-gray-600 mt-1">Track user acquisition, retention, and engagement metrics</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Growth Insight</h2>
            <p className="text-gray-700 mt-1">
              User retention has improved to 78.5%, indicating strong product-market fit. Social media channels driving 25% of new users. 
              Focus on referral program optimization to increase viral coefficient.
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

      {/* User Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userMetrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-2xl mb-2">{metric.icon}</div>
                <h3 className="text-gray-600 text-sm">{metric.title}</h3>
                <div className="mt-1">
                  <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                </div>
              </div>
              <div className={`flex items-center text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
                {metric.trend === 'up' ? ' ↑' : ' ↓'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Growth Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">User Growth Trend</h2>
        <div className="h-80 relative">
          {/* Simplified chart representation */}
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
            {growthData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1 mx-1">
                <div className="flex items-end justify-center h-64 w-full">
                  <div 
                    className="w-3/4 bg-[#FF6A00] mx-1 rounded-t hover:bg-[#e05500] transition-colors"
                    style={{ height: `${(data.users / 15000) * 256}px` }}
                    title={`Total Users: ${data.users.toLocaleString()}`}
                  ></div>
                  <div 
                    className="w-3/4 bg-blue-500 mx-1 rounded-t hover:bg-blue-600 transition-colors"
                    style={{ height: `${(data.new / 2000) * 256}px` }}
                    title={`New Users: ${data.new.toLocaleString()}`}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{data.month}</div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#FF6A00] rounded mr-2"></div>
                <span className="text-xs">Total Users</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span className="text-xs">New Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demographics and Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Demographics */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">User Demographics</h2>
          <div className="space-y-4">
            {demographics.map((demo, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{demo.segment}</span>
                  <span>{demo.percentage}% ({demo.users.toLocaleString()})</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-[#FF6A00]"
                    style={{ width: `${demo.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-[#FFF5EB] rounded-lg border border-[#FFD7B5]">
            <h3 className="font-bold text-[#FF6A00]">Demographic Insight</h3>
            <p className="text-sm mt-2">
              Core user base is ages 18-35 (77% of users). Consider targeted campaigns for the 36-45 age group to expand market reach.
            </p>
          </div>
        </div>

        {/* Acquisition Channels */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">User Acquisition Channels</h2>
          <div className="space-y-4">
            {channels.map((channel, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{channel.channel}</span>
                  <span>{channel.percentage}% ({channel.users.toLocaleString()})</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-[#FF6A00]"
                    style={{ width: `${channel.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-800">Channel Performance</h3>
            <p className="text-sm mt-2">
              Organic search and social media are top performers. Referral program shows strong potential with optimization.
            </p>
          </div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Engagement Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-bold text-gray-800">Session Duration</h3>
            <div className="mt-2 text-2xl font-bold text-[#FF6A00]">8m 42s</div>
            <div className="text-sm text-green-600 mt-1">↑ 12% from last period</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-bold text-gray-800">Pages per Session</h3>
            <div className="mt-2 text-2xl font-bold text-[#FF6A00]">4.2</div>
            <div className="text-sm text-green-600 mt-1">↑ 8% from last period</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-bold text-gray-800">Bounce Rate</h3>
            <div className="mt-2 text-2xl font-bold text-[#FF6A00]">32.4%</div>
            <div className="text-sm text-green-600 mt-1">↓ 5% from last period</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGrowth;