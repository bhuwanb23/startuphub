import React, { useState } from 'react';

const RejectionReasons = () => {
  const [rejections, setRejections] = useState([
    {
      id: 1,
      startup: 'HealthTrack',
      reason: 'Lacks market traction',
      notes: 'No paying customers or significant user base',
      reviewer: 'Dr. Sarah Johnson',
      improvements: 'Focus on customer acquisition and MVP validation'
    },
    {
      id: 2,
      startup: 'BioTech Dynamics',
      reason: 'Team capability concerns',
      notes: 'Limited relevant experience in biotech sector',
      reviewer: 'Michael Chen',
      improvements: 'Bring on advisors with biotech experience'
    },
    {
      id: 3,
      startup: 'EcoSolutions',
      reason: 'IP ownership unclear',
      notes: 'Disputes over patent ownership with previous employer',
      reviewer: 'Priya Sharma',
      improvements: 'Resolve IP disputes and establish clear ownership'
    }
  ]);

  const [newRejection, setNewRejection] = useState({
    startup: '',
    reason: '',
    notes: '',
    reviewer: '',
    improvements: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRejection(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newRejection.startup && newRejection.reason) {
      setRejections(prev => [...prev, {
        id: prev.length + 1,
        ...newRejection
      }]);
      setNewRejection({
        startup: '',
        reason: '',
        notes: '',
        reviewer: '',
        improvements: ''
      });
    }
  };

  const commonReasons = [
    'Lacks market traction',
    'Team capability concerns',
    'IP ownership unclear',
    'Product not viable',
    'Business model weak',
    'Financial projections unrealistic',
    'Sector not aligned',
    'Too early stage'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Rejection Reasons Tracking</h2>
        <p className="text-gray-600">Track and analyze reasons for startup rejections</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rejection Table */}
        <div className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Startup
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reviewer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Improvements
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rejections.map((rejection) => (
                  <tr key={rejection.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {rejection.startup}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {rejection.reason}
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs">
                      <div className="truncate" title={rejection.notes}>
                        {rejection.notes}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {rejection.reviewer}
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs">
                      <div className="truncate" title={rejection.improvements}>
                        {rejection.improvements}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add New Rejection Form */}
        <div className="bg-gray-50 rounded-xl p-5">
          <h3 className="font-bold text-gray-800 mb-4">Add New Rejection</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Startup Name</label>
                <input
                  type="text"
                  name="startup"
                  value={newRejection.startup}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <select
                  name="reason"
                  value={newRejection.reason}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  required
                >
                  <option value="">Select a reason</option>
                  {commonReasons.map((reason, index) => (
                    <option key={index} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={newRejection.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reviewer</label>
                <input
                  type="text"
                  name="reviewer"
                  value={newRejection.reviewer}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Suggested Improvements</label>
                <textarea
                  name="improvements"
                  value={newRejection.improvements}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500]"
              >
                Add Rejection
              </button>
            </div>
          </form>
        </div>

        {/* Rejection Analytics */}
        <div className="bg-gray-50 rounded-xl p-5">
          <h3 className="font-bold text-gray-800 mb-4">Rejection Analytics</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Top Rejection Reasons</h4>
              <div className="space-y-2">
                {commonReasons.slice(0, 5).map((reason, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#FF6A00] h-2 rounded-full" 
                        style={{ width: `${Math.floor(Math.random() * 50) + 30}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-600 truncate">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Reviewer Activity</h4>
              <div className="space-y-2">
                {['Dr. Sarah Johnson', 'Michael Chen', 'Priya Sharma'].map((reviewer, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{reviewer}</span>
                    <span className="font-medium">{Math.floor(Math.random() * 10) + 5} rejections</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectionReasons;