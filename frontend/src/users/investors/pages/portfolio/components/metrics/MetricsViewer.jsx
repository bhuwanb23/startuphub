import React, { useState } from 'react';

const MetricsViewer = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Q2 2023');

  // Mock data
  const periods = ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'];
  
  const metricsData = {
    'Q2 2023': {
      revenue: [
        { month: 'Apr', value: 1200000 },
        { month: 'May', value: 1350000 },
        { month: 'Jun', value: 1480000 }
      ],
      burn: [
        { month: 'Apr', value: 450000 },
        { month: 'May', value: 420000 },
        { month: 'Jun', value: 480000 }
      ],
      growth: [
        { month: 'Apr', value: 12.5 },
        { month: 'May', value: 15.2 },
        { month: 'Jun', value: 18.7 }
      ]
    },
    'Q1 2023': {
      revenue: [
        { month: 'Jan', value: 980000 },
        { month: 'Feb', value: 1050000 },
        { month: 'Mar', value: 1200000 }
      ],
      burn: [
        { month: 'Jan', value: 400000 },
        { month: 'Feb', value: 380000 },
        { month: 'Mar', value: 450000 }
      ],
      growth: [
        { month: 'Jan', value: 8.2 },
        { month: 'Feb', value: 10.5 },
        { month: 'Mar', value: 12.5 }
      ]
    }
  };

  const benchmarkData = {
    revenue: { portfolio: 1480000, benchmark: 1350000, change: 9.6 },
    burn: { portfolio: 480000, benchmark: 420000, change: 14.3 },
    growth: { portfolio: 18.7, benchmark: 15.2, change: 23.0 }
  };

  const currentData = metricsData[selectedPeriod] || metricsData['Q2 2023'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Quarterly/Monthly Metrics Viewer</h2>
        <p className="text-gray-600">Performance metrics and benchmark comparisons</p>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-[#FF6A00] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Revenue</h3>
          <div className="h-48 flex items-end justify-between space-x-2">
            {currentData.revenue.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-[#FF8C42] to-[#FF6A00] rounded-t-lg"
                  style={{ height: `${(item.value / Math.max(...currentData.revenue.map(d => d.value))) * 100}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{item.month}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <div className="text-lg font-bold text-gray-800">
              ${currentData.revenue.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Total {selectedPeriod}</div>
          </div>
        </div>

        {/* Burn Rate Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Burn Rate</h3>
          <div className="h-48 flex items-end justify-between space-x-2">
            {currentData.burn.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-red-500 to-red-300 rounded-t-lg"
                  style={{ height: `${(item.value / Math.max(...currentData.burn.map(d => d.value))) * 100}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{item.month}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <div className="text-lg font-bold text-gray-800">
              ${currentData.burn.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Total {selectedPeriod}</div>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Growth Rate</h3>
          <div className="h-48 flex items-end justify-between space-x-2">
            {currentData.growth.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg"
                  style={{ height: `${(item.value / Math.max(...currentData.growth.map(d => d.value))) * 100}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{item.month}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <div className="text-lg font-bold text-gray-800">
              {Math.max(...currentData.growth.map(d => d.value)).toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500">Peak {selectedPeriod}</div>
          </div>
        </div>
      </div>

      {/* Benchmark Comparisons */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Benchmark Comparisons</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Revenue</span>
              <span className={`text-sm ${benchmarkData.revenue.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {benchmarkData.revenue.change >= 0 ? '↑' : '↓'} {Math.abs(benchmarkData.revenue.change)}%
              </span>
            </div>
            <div className="mt-2">
              <div className="text-lg font-bold text-gray-800">
                ${benchmarkData.revenue.portfolio.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">vs ${benchmarkData.revenue.benchmark.toLocaleString()} benchmark</div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Burn Rate</span>
              <span className={`text-sm ${benchmarkData.burn.change >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                {benchmarkData.burn.change >= 0 ? '↑' : '↓'} {Math.abs(benchmarkData.burn.change)}%
              </span>
            </div>
            <div className="mt-2">
              <div className="text-lg font-bold text-gray-800">
                ${benchmarkData.burn.portfolio.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">vs ${benchmarkData.burn.benchmark.toLocaleString()} benchmark</div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Growth Rate</span>
              <span className={`text-sm ${benchmarkData.growth.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {benchmarkData.growth.change >= 0 ? '↑' : '↓'} {Math.abs(benchmarkData.growth.change)}%
              </span>
            </div>
            <div className="mt-2">
              <div className="text-lg font-bold text-gray-800">
                {benchmarkData.growth.portfolio.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500">vs {benchmarkData.growth.benchmark.toFixed(1)}% benchmark</div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Notes</h3>
        <div className="bg-gray-50 rounded-lg p-4 min-h-[120px]">
          <p className="text-gray-600 text-sm">
            Q2 2023 showed strong revenue growth, particularly in June. Burn rate increased slightly 
            due to expanded team and marketing spend. Growth rate exceeded benchmarks across all metrics.
          </p>
        </div>
        <div className="mt-4">
          <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetricsViewer;