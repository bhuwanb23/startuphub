import React, { useState } from 'react';

const StatusReports = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'Weekly Team Status Report',
      frequency: 'Weekly',
      lastGenerated: '2023-11-12',
      nextGeneration: '2023-11-19',
      recipients: ['team@innovatex.com', 'management@innovatex.com'],
    },
    {
      id: 2,
      title: 'Monthly Investor Report',
      frequency: 'Monthly',
      lastGenerated: '2023-10-31',
      nextGeneration: '2023-11-30',
      recipients: ['investors@innovatex.com', 'board@innovatex.com'],
    },
    {
      id: 3,
      title: 'Quarterly Financial Summary',
      frequency: 'Quarterly',
      lastGenerated: '2023-09-30',
      nextGeneration: '2023-12-31',
      recipients: ['cfo@innovatex.com', 'ceo@innovatex.com'],
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newReport, setNewReport] = useState({
    title: '',
    frequency: 'Weekly',
    recipients: '',
  });

  const handleCreateReport = (e) => {
    e.preventDefault();
    const report = {
      id: reports.length + 1,
      ...newReport,
      lastGenerated: 'Never',
      nextGeneration: 'Pending Setup',
      recipients: newReport.recipients.split(',').map(email => email.trim()).filter(email => email),
    };
    setReports([report, ...reports]);
    setNewReport({ title: '', frequency: 'Weekly', recipients: '' });
    setShowCreateForm(false);
  };

  const handleGenerateReport = (id) => {
    setReports(reports.map(report => {
      if (report.id === id) {
        return {
          ...report,
          lastGenerated: new Date().toISOString().split('T')[0],
          nextGeneration: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week from now
        };
      }
      return report;
    }));
    alert('Report generation started! It will be available shortly.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Automated Status Reports</h1>
          <p className="text-gray-600 mt-1">Configure and manage automated reporting</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="mt-4 md:mt-0 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
        >
          {showCreateForm ? 'Cancel' : 'Create Report'}
        </button>
      </div>

      {/* Create Report Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Create Automated Report</h2>
          <form onSubmit={handleCreateReport} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Report Title
              </label>
              <input
                type="text"
                id="title"
                value={newReport.title}
                onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                placeholder="e.g., Weekly Team Status Report"
                required
              />
            </div>
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <select
                id="frequency"
                value={newReport.frequency}
                onChange={(e) => setNewReport({...newReport, frequency: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Bi-Weekly">Bi-Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="recipients" className="block text-sm font-medium text-gray-700 mb-1">
                Recipients (comma separated emails)
              </label>
              <input
                type="text"
                id="recipients"
                value={newReport.recipients}
                onChange={(e) => setNewReport({...newReport, recipients: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                placeholder="e.g., team@innovatex.com, management@innovatex.com"
                required
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
              >
                Create Report
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Scheduled Reports */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Scheduled Reports</h2>
          <button className="text-[#FF6A00] text-sm font-medium hover:underline">
            View Report History
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                  📊
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{report.title}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                      {report.frequency}
                    </span>
                  </div>
                  <div className="mt-3 text-xs text-gray-600">
                    <div>Last generated: {report.lastGenerated}</div>
                    <div>Next: {report.nextGeneration}</div>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs text-gray-500">Recipients:</div>
                    <div className="text-xs text-gray-600 truncate">
                      {report.recipients.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleGenerateReport(report.id)}
                className="mt-4 w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white text-sm font-medium rounded-lg hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-sm hover:shadow-md"
              >
                Generate Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* AI Report Suggestions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">AI Report Suggestions</h2>
          <button className="text-[#FF6A00] text-sm font-medium hover:underline">
            Refresh
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">KPI Dashboard Report</h3>
                <p className="text-sm text-gray-600 mt-1">Automated report with key performance indicators</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">Weekly</span>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
              Add to Reports
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Competitor Analysis Report</h3>
                <p className="text-sm text-gray-600 mt-1">Weekly summary of competitor activities and market trends</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">Weekly</span>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
              Add to Reports
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Resource Utilization Report</h3>
                <p className="text-sm text-gray-600 mt-1">Track team productivity and resource allocation</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Monthly</span>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
              Add to Reports
            </button>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Latest Report Preview</h2>
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Weekly Team Status Report - Nov 12, 2023</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Generated</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Project Progress</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Product Launch: 75% complete</li>
                <li>• Marketing Campaign: 90% complete</li>
                <li>• Beta Testing: 100% complete</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Key Metrics</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Revenue: $125K (+15%)</li>
                <li>• New Users: 1,240 (+22%)</li>
                <li>• Churn Rate: 2.1% (-0.3%)</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Upcoming Milestones</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Product Launch - Nov 15</li>
                <li>• Investor Meeting - Nov 20</li>
                <li>• Team Expansion - Nov 30</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="text-[#FF6A00] text-sm font-medium hover:underline">
              View Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusReports;