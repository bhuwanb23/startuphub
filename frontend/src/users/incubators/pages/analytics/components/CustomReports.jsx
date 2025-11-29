import React, { useState } from 'react';

const CustomReports = () => {
  const [reportConfig, setReportConfig] = useState({
    name: '',
    timeframe: 'last_month',
    startups: 'all',
    kpis: [],
    format: 'pdf'
  });

  const kpiOptions = [
    { id: 'traction', name: 'Traction Score', category: 'Growth' },
    { id: 'revenue', name: 'Revenue Metrics', category: 'Financial' },
    { id: 'users', name: 'User Growth', category: 'Growth' },
    { id: 'product', name: 'Product Maturity', category: 'Product' },
    { id: 'market', name: 'Market Validation', category: 'Market' },
    { id: 'mentors', name: 'Mentor Engagement', category: 'Support' },
    { id: 'investors', name: 'Investor Metrics', category: 'Funding' },
    { id: 'trl', name: 'TRL Score', category: 'Product' },
    { id: 'health', name: 'Startup Health', category: 'Overall' }
  ];

  const startupOptions = [
    'All Startups',
    'TechNova',
    'MobileGenius',
    'EcomPro',
    'HealthTrack',
    'AutoPilot',
    'GreenEnergy'
  ];

  const timeframeOptions = [
    { value: 'last_week', label: 'Last Week' },
    { value: 'last_month', label: 'Last Month' },
    { value: 'last_quarter', label: 'Last Quarter' },
    { value: 'last_year', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV File' },
    { value: 'json', label: 'JSON Data' }
  ];

  const handleKpiChange = (kpiId) => {
    setReportConfig(prev => {
      const newKpis = prev.kpis.includes(kpiId)
        ? prev.kpis.filter(id => id !== kpiId)
        : [...prev.kpis, kpiId];
      
      return { ...prev, kpis: newKpis };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would generate the report
    console.log('Generating report with config:', reportConfig);
    alert(`Report "${reportConfig.name}" generation started!`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Custom Report Generator</h1>
            <p className="text-gray-600">Create customized reports with selected KPIs and timeframes</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Report Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Name
            </label>
            <input
              type="text"
              value={reportConfig.name}
              onChange={(e) => setReportConfig({...reportConfig, name: e.target.value})}
              className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              placeholder="Enter report name"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Timeframe Selection */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Timeframe</h2>
              <div className="space-y-3">
                {timeframeOptions.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`timeframe-${option.value}`}
                      name="timeframe"
                      value={option.value}
                      checked={reportConfig.timeframe === option.value}
                      onChange={(e) => setReportConfig({...reportConfig, timeframe: e.target.value})}
                      className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF6A00]"
                    />
                    <label htmlFor={`timeframe-${option.value}`} className="ml-3 text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              
              {reportConfig.timeframe === 'custom' && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">End Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Startup Selection */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Startups</h2>
              <div className="space-y-3">
                {startupOptions.map((startup) => (
                  <div key={startup} className="flex items-center">
                    <input
                      type="radio"
                      id={`startup-${startup}`}
                      name="startups"
                      value={startup}
                      checked={reportConfig.startups === startup}
                      onChange={(e) => setReportConfig({...reportConfig, startups: e.target.value})}
                      className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF6A00]"
                    />
                    <label htmlFor={`startup-${startup}`} className="ml-3 text-gray-700">
                      {startup}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* KPI Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">KPI Selection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {kpiOptions.map((kpi) => (
                <div key={kpi.id} className="border border-gray-200 rounded-xl p-4 hover:border-[#FF6A00] transition-colors">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id={`kpi-${kpi.id}`}
                      checked={reportConfig.kpis.includes(kpi.id)}
                      onChange={() => handleKpiChange(kpi.id)}
                      className="h-4 w-4 text-[#FF6A00] rounded focus:ring-[#FF6A00] mt-1"
                    />
                    <div className="ml-3">
                      <label htmlFor={`kpi-${kpi.id}`} className="font-medium text-gray-800">
                        {kpi.name}
                      </label>
                      <div className="mt-1">
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {kpi.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Format Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Output Format</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {formatOptions.map((format) => (
                <div 
                  key={format.value}
                  onClick={() => setReportConfig({...reportConfig, format: format.value})}
                  className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                    reportConfig.format === format.value
                      ? 'border-[#FF6A00] bg-[#FFF9F0]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                      reportConfig.format === format.value
                        ? 'border-[#FF6A00] bg-[#FF6A00]'
                        : 'border-gray-300'
                    }`}>
                      {reportConfig.format === format.value && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{format.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Report Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="bg-[#FF6A00] text-white px-6 py-3 rounded-lg hover:bg-[#e05500] transition-colors"
            >
              Generate Report
            </button>
            <button
              type="button"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Save Template
            </button>
            <button
              type="button"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
      
      {/* Saved Templates */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Saved Report Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-xl p-4 hover:border-[#FF6A00] transition-colors cursor-pointer">
            <h3 className="font-bold text-gray-800 mb-2">Monthly Performance Report</h3>
            <p className="text-sm text-gray-600 mb-3">Comprehensive monthly overview with all KPIs</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">PDF • Last used: Jun 15</span>
              <button className="text-[#FF6A00] text-sm font-medium">Use Template</button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-xl p-4 hover:border-[#FF6A00] transition-colors cursor-pointer">
            <h3 className="font-bold text-gray-800 mb-2">Investor Briefing</h3>
            <p className="text-sm text-gray-600 mb-3">Financial and traction metrics for investors</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">PDF • Last used: Jun 10</span>
              <button className="text-[#FF6A00] text-sm font-medium">Use Template</button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-xl p-4 hover:border-[#FF6A00] transition-colors cursor-pointer">
            <h3 className="font-bold text-gray-800 mb-2">Mentor Feedback Report</h3>
            <p className="text-sm text-gray-600 mb-3">Mentor engagement and startup progress</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Excel • Last used: Jun 5</span>
              <button className="text-[#FF6A00] text-sm font-medium">Use Template</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomReports;