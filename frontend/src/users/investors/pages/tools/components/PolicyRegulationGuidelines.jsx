import React, { useState } from 'react';

const PolicyRegulationGuidelines = () => {
  const [activeCategory, setActiveCategory] = useState('securities');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    { id: 'securities', name: 'Securities Law', icon: '🏛️' },
    { id: 'tax', name: 'Tax Regulations', icon: '💰' },
    { id: 'compliance', name: 'Compliance', icon: '📋' },
    { id: 'international', name: 'International', icon: '🌍' },
    { id: 'esg', name: 'ESG Guidelines', icon: '🌱' }
  ];
  
  const documents = [
    {
      id: 1,
      title: 'JOBS Act Compliance Guidelines',
      category: 'securities',
      summary: 'Key provisions and compliance requirements for emerging growth companies under the JOBS Act',
      updated: '2025-10-15',
      readingTime: '8 min',
      tags: ['IPO', 'Regulation A+', 'Regulation CF']
    },
    {
      id: 2,
      title: 'Investment Tax Optimization Strategies',
      category: 'tax',
      summary: 'Legal tax strategies for venture capital investments and carried interest treatment',
      updated: '2025-11-01',
      readingTime: '12 min',
      tags: ['Carried Interest', 'Capital Gains', 'Depreciation']
    },
    {
      id: 3,
      title: 'GDPR Compliance for Portfolio Companies',
      category: 'compliance',
      summary: 'Data protection requirements and implementation guidelines for EU operations',
      updated: '2025-09-22',
      readingTime: '15 min',
      tags: ['Data Privacy', 'Consent', 'Breach Notification']
    },
    {
      id: 4,
      title: 'Cross-Border Investment Regulations',
      category: 'international',
      summary: 'Regulatory frameworks for investing in emerging markets and foreign jurisdictions',
      updated: '2025-10-30',
      readingTime: '10 min',
      tags: ['OFAC', 'CFIUS', 'FATCA']
    },
    {
      id: 5,
      title: 'ESG Due Diligence Framework',
      category: 'esg',
      summary: 'Environmental, Social, and Governance assessment criteria for investments',
      updated: '2025-11-10',
      readingTime: '14 min',
      tags: ['Sustainability', 'Impact Measurement', 'Stakeholder Engagement']
    },
    {
      id: 6,
      title: 'SEC Reporting Requirements',
      category: 'securities',
      summary: 'Periodic reporting obligations for registered investment advisers and public companies',
      updated: '2025-08-18',
      readingTime: '9 min',
      tags: ['Form 13F', 'Form 13D', 'Proxy Statements']
    }
  ];
  
  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Policy & Regulation Guidelines</h2>
        <p className="text-gray-600">Stay informed about regulatory requirements and compliance best practices</p>
      </div>
      
      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search policies and regulations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF6A00]"
          />
          <div className="absolute left-3 top-3.5 text-gray-400">
            🔍
          </div>
        </div>
      </div>
      
      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-lg transition-all flex items-center ${
            activeCategory === 'all'
              ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          📚 All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg transition-all flex items-center ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white shadow-md'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Document Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="px-2 py-1 bg-[#FFF5EB] text-[#FF6A00] rounded text-xs">
                    {categories.find(c => c.id === doc.category)?.name}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    Updated {doc.updated}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2">{doc.title}</h3>
                <p className="text-gray-600 mb-4">{doc.summary}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {doc.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="md:ml-6 md:w-32 flex flex-col items-start md:items-end">
                <div className="text-sm text-gray-500 mb-3">
                  ⏱️ {doc.readingTime} read
                </div>
                <button className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                  Read Document
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Reference Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Reference</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Key Deadlines</h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-800">SEC Form 13F</div>
                <div className="text-sm text-gray-600">Quarterly, due 45 days after quarter end</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-800">Annual Compliance Review</div>
                <div className="text-sm text-gray-600">December 31st</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Useful Resources</h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-800">Regulatory Updates</div>
                <div className="text-sm text-gray-600">Subscribe to receive alerts</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-800">Compliance Checklist</div>
                <div className="text-sm text-gray-600">Download quarterly review template</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyRegulationGuidelines;