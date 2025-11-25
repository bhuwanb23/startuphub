import React, { useState } from 'react';

const Regulatory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('all');
  
  // Mock data for regulatory guidelines
  const guidelines = [
    {
      id: 1,
      title: 'Data Privacy Compliance (GDPR)',
      category: 'Privacy',
      jurisdiction: 'EU',
      lastUpdated: '2024-06-15',
      readingTime: '8 min',
      complianceLevel: 'High',
      tags: ['GDPR', 'Privacy', 'Data Protection'],
      preview: '🔒',
      summary: 'Comprehensive guide to GDPR compliance for startups handling EU citizen data. Covers consent requirements, data subject rights, and breach notification procedures.',
    },
    {
      id: 2,
      title: 'Startup Incorporation Guide',
      category: 'Business',
      jurisdiction: 'US',
      lastUpdated: '2024-05-22',
      readingTime: '12 min',
      complianceLevel: 'Medium',
      tags: ['Incorporation', 'LLC', 'Corporation'],
      preview: '🏢',
      summary: 'Step-by-step guide to incorporating your startup in the US. Includes state-specific considerations, tax implications, and ongoing compliance requirements.',
    },
    {
      id: 3,
      title: 'Intellectual Property Protection',
      category: 'IP',
      jurisdiction: 'Global',
      lastUpdated: '2024-07-10',
      readingTime: '15 min',
      complianceLevel: 'High',
      tags: ['Patents', 'Trademarks', 'Copyrights'],
      preview: '🧠',
      summary: 'Essential strategies for protecting your startup\'s intellectual property. Covers patents, trademarks, copyrights, and trade secrets with filing strategies.',
    },
    {
      id: 4,
      title: 'Employment Law Basics',
      category: 'HR',
      jurisdiction: 'US',
      lastUpdated: '2024-04-18',
      readingTime: '10 min',
      complianceLevel: 'High',
      tags: ['Employment', 'Hiring', 'Compliance'],
      preview: '👥',
      summary: 'Key employment law requirements for US startups. Includes hiring practices, employee classification, benefits, and termination procedures.',
    },
    {
      id: 5,
      title: 'Financial Reporting Standards',
      category: 'Finance',
      jurisdiction: 'Global',
      lastUpdated: '2024-06-30',
      readingTime: '14 min',
      complianceLevel: 'Medium',
      tags: ['Accounting', 'Reporting', 'Compliance'],
      preview: '💰',
      summary: 'Overview of financial reporting standards for startups. Covers GAAP, IFRS, and other frameworks with implementation guidance.',
    },
    {
      id: 6,
      title: 'Securities Law Compliance',
      category: 'Finance',
      jurisdiction: 'US',
      lastUpdated: '2024-05-05',
      readingTime: '18 min',
      complianceLevel: 'High',
      tags: ['Securities', 'Fundraising', 'Compliance'],
      preview: '📈',
      summary: 'Guide to US securities laws for startup fundraising. Includes Regulation D, Regulation CF, and other exemptions with compliance checklists.',
    },
    {
      id: 7,
      title: 'Tax Obligations for Startups',
      category: 'Finance',
      jurisdiction: 'Global',
      lastUpdated: '2024-07-01',
      readingTime: '11 min',
      complianceLevel: 'Medium',
      tags: ['Tax', 'Compliance', 'Obligations'],
      preview: '🧾',
      summary: 'Comprehensive overview of tax obligations for startups. Covers income tax, payroll tax, sales tax, and international tax considerations.',
    },
    {
      id: 8,
      title: 'Healthcare Compliance (HIPAA)',
      category: 'Privacy',
      jurisdiction: 'US',
      lastUpdated: '2024-06-20',
      readingTime: '9 min',
      complianceLevel: 'High',
      tags: ['HIPAA', 'Healthcare', 'Privacy'],
      preview: '🏥',
      summary: 'HIPAA compliance guide for healthcare startups. Covers protected health information, business associate agreements, and breach response procedures.',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'privacy', name: 'Privacy' },
    { id: 'business', name: 'Business' },
    { id: 'ip', name: 'IP' },
    { id: 'hr', name: 'HR' },
    { id: 'finance', name: 'Finance' },
  ];

  const jurisdictions = [
    { id: 'all', name: 'All Jurisdictions' },
    { id: 'us', name: 'US' },
    { id: 'eu', name: 'EU' },
    { id: 'global', name: 'Global' },
  ];

  const filteredGuidelines = guidelines.filter(guideline => {
    const matchesSearch = guideline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guideline.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         guideline.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || guideline.category.toLowerCase() === selectedCategory;
    const matchesJurisdiction = selectedJurisdiction === 'all' || guideline.jurisdiction.toLowerCase() === selectedJurisdiction;
    
    return matchesSearch && matchesCategory && matchesJurisdiction;
  });

  const getComplianceColor = (level) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Regulatory Guidelines</h1>
        <p className="text-gray-600 mt-1">Essential compliance resources for your startup</p>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-[#FF8C42]/10 to-[#FF6A00]/10 rounded-xl border border-[#FF8C42]/30 p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-4">
            🤖
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">AI Compliance Insight</h2>
            <p className="text-gray-700 mt-1">
              Based on your startup profile, you should prioritize reviewing the Securities Law Compliance 
              and Data Privacy Compliance guidelines. These have high compliance levels and are critical for your industry.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search regulatory guidelines..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <select
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
            >
              {jurisdictions.map(jurisdiction => (
                <option key={jurisdiction.id} value={jurisdiction.id}>
                  {jurisdiction.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Regulatory Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGuidelines.map((guideline) => (
          <div key={guideline.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="text-4xl">{guideline.preview}</div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getComplianceColor(guideline.complianceLevel)}`}>
                {guideline.complianceLevel} Priority
              </span>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">{guideline.title}</h3>
              <div className="flex items-center mt-1">
                <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                  {guideline.category}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-xs text-gray-500">{guideline.jurisdiction}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-xs text-gray-500">{guideline.readingTime}</span>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-sm text-gray-600">{guideline.summary}</p>
            </div>
            
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                {guideline.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div>📅 Updated {guideline.lastUpdated}</div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
                Read Guide
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Regulatory Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Regulatory Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">32</div>
            <div className="text-sm text-gray-600">Guidelines Available</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">12</div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">8</div>
            <div className="text-sm text-gray-600">Recently Updated</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-[#FF6A00]">94%</div>
            <div className="text-sm text-gray-600">Compliance Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regulatory;