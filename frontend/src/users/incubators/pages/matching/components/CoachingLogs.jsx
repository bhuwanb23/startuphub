import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const CoachingLogs = () => {
  const [activeTab, setActiveTab] = useState('sessions');

  // Mock data for session notes timeline
  const sessionNotes = [
    {
      id: 1,
      date: '2023-06-01',
      mentor: 'Sarah Johnson',
      startup: 'TechFlow Inc.',
      duration: '60 min',
      topics: ['Product Development', 'Scaling Operations'],
      progressTags: ['Strategy', 'Execution'],
      notes: 'Discussed roadmap for next quarter. Focused on scaling challenges and team expansion plans.'
    },
    {
      id: 2,
      date: '2023-06-03',
      mentor: 'Michael Chen',
      startup: 'EcoPack Solutions',
      duration: '45 min',
      topics: ['Sustainability', 'Supply Chain'],
      progressTags: ['Operations', 'Compliance'],
      notes: 'Reviewed supply chain optimizations. Discussed sustainability certifications and regulatory requirements.'
    },
    {
      id: 3,
      date: '2023-06-05',
      mentor: 'Dr. Emily Rodriguez',
      startup: 'HealthTrack Pro',
      duration: '90 min',
      topics: ['Healthcare Regulations', 'Clinical Trials'],
      progressTags: ['Compliance', 'Validation'],
      notes: 'Deep dive into FDA approval process. Reviewed clinical trial documentation and timelines.'
    },
    {
      id: 4,
      date: '2023-06-07',
      mentor: 'Robert Kim',
      startup: 'TechFlow Inc.',
      duration: '60 min',
      topics: ['Fundraising', 'Investor Pitch'],
      progressTags: 'Finance',
      notes: 'Prepared for Series A pitch. Refined financial projections and investor messaging.'
    }
  ];

  // Mock data for feedback scores
  const feedbackScores = [
    { id: 1, session: 'Product Development', rating: 4.5, kpi: 8.2 },
    { id: 2, session: 'Scaling Operations', rating: 4.2, kpi: 7.8 },
    { id: 3, session: 'Sustainability', rating: 4.8, kpi: 9.1 },
    { id: 4, session: 'Supply Chain', rating: 4.0, kpi: 7.5 },
    { id: 5, session: 'Healthcare Regs', rating: 4.9, kpi: 9.3 },
    { id: 6, session: 'Clinical Trials', rating: 4.7, kpi: 8.9 }
  ];

  // Mock data for mentor effectiveness
  const mentorEffectiveness = [
    { month: 'Jan', sarah: 4.2, michael: 4.5, emily: 4.8 },
    { month: 'Feb', sarah: 4.5, michael: 4.3, emily: 4.7 },
    { month: 'Mar', sarah: 4.7, michael: 4.6, emily: 4.9 },
    { month: 'Apr', sarah: 4.6, michael: 4.8, emily: 4.8 },
    { month: 'May', sarah: 4.8, michael: 4.7, emily: 4.9 },
    { month: 'Jun', sarah: 4.9, michael: 4.8, emily: 5.0 }
  ];

  return (
    <div className="space-y-6">
      {/* Header with export buttons */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Coaching & Mentoring Logs</h1>
            <p className="text-gray-600">Session notes, feedback, and effectiveness reports</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <span className="mr-2">📄</span> Export PDF
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <span className="mr-2">📊</span> Export Excel
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <span className="mr-2">🔗</span> Share Link
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'sessions'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('sessions')}
        >
          Session Notes
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'feedback'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('feedback')}
        >
          Feedback Scores
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'effectiveness'
              ? 'text-[#FF6A00] border-b-2 border-[#FF6A00]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('effectiveness')}
        >
          Mentor Effectiveness
        </button>
      </div>

      {/* Session Notes Timeline */}
      {activeTab === 'sessions' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Session Notes Timeline</h2>
          <div className="space-y-6">
            {sessionNotes.map((session) => (
              <div key={session.id} className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800">{session.startup}</h3>
                    <p className="text-gray-600">Mentor: {session.mentor}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <p className="font-medium text-gray-800">{session.date}</p>
                    <p className="text-sm text-gray-600">{session.duration}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {session.topics.map((topic, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {Array.isArray(session.progressTags) ? (
                    session.progressTags.map((tag, index) => (
                      <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {session.progressTags}
                    </span>
                  )}
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700">{session.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Scores */}
      {activeTab === 'feedback' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Feedback Scores</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Star Ratings Table */}
            <div className="border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-4">Session Ratings</h3>
              <div className="space-y-4">
                {feedbackScores.map((score) => (
                  <div key={score.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{score.session}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(score.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-gray-600 text-sm">{score.rating}/5.0</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#FF6A00]">{score.kpi}</p>
                      <p className="text-xs text-gray-500">KPI Score</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Chart */}
            <div className="border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-4">Feedback Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={feedbackScores}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="session" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="rating" name="Session Rating" fill="#FF6A00" />
                    <Bar dataKey="kpi" name="KPI Score" fill="#4A90E2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mentor Effectiveness Reports */}
      {activeTab === 'effectiveness' && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Mentor Effectiveness Reports</h2>
          
          {/* AI Generated Insights */}
          <div className="bg-gradient-to-r from-[#FFF9F0] to-[#FFF2DC] rounded-2xl p-6 border border-[#FF6A00] mb-6">
            <div className="flex items-start">
              <div className="bg-[#FF6A00] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                ⚡
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">AI-Generated Insights</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Sarah Johnson's mentoring sessions show consistent improvement in startup KPIs (+12% avg. monthly)</li>
                  <li>Michael Chen excels in operational guidance, particularly in supply chain optimization</li>
                  <li>Dr. Emily Rodriguez's expertise in healthcare regulations has accelerated FDA approval timelines by 30%</li>
                  <li>Overall mentor satisfaction score increased by 15% compared to last quarter</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Effectiveness Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rating Trends */}
            <div className="border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-4">Mentor Rating Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mentorEffectiveness}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sarah" name="Sarah Johnson" stroke="#FF6A00" strokeWidth={2} />
                    <Line type="monotone" dataKey="michael" name="Michael Chen" stroke="#4A90E2" strokeWidth={2} />
                    <Line type="monotone" dataKey="emily" name="Dr. Emily Rodriguez" stroke="#50C878" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Session Volume */}
            <div className="border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-4">Session Volume Comparison</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Sarah Johnson', sessions: 24, startups: 8 },
                      { name: 'Michael Chen', sessions: 18, startups: 6 },
                      { name: 'Dr. Emily Rodriguez', sessions: 15, startups: 5 }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sessions" name="Sessions" fill="#FF6A00" />
                    <Bar dataKey="startups" name="Startups" fill="#4A90E2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Effectiveness Metrics */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-2xl p-5 text-center">
              <div className="text-3xl font-bold text-[#FF6A00] mb-1">4.8</div>
              <div className="text-gray-600">Avg. Rating</div>
              <div className="text-sm text-green-600 mt-1">↑ 0.3 from last month</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 text-center">
              <div className="text-3xl font-bold text-[#FF6A00] mb-1">92%</div>
              <div className="text-gray-600">Completion Rate</div>
              <div className="text-sm text-green-600 mt-1">↑ 5% from last month</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 text-center">
              <div className="text-3xl font-bold text-[#FF6A00] mb-1">18.5h</div>
              <div className="text-gray-600">Avg. Monthly Hours</div>
              <div className="text-sm text-green-600 mt-1">↑ 2.1h from last month</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoachingLogs;