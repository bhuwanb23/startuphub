import React, { useState } from 'react';

const RegulationComplianceGuidelines = () => {
  const [activeCategory, setActiveCategory] = useState('dpiit');

  const categories = [
    { id: 'dpiit', name: 'DPIIT Startup Rules', icon: '🏢' },
    { id: 'sebi', name: 'SEBI Compliance', icon: '⚖️' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒' },
    { id: 'datagov', name: 'Data Governance', icon: '📊' }
  ];

  const guidelines = {
    dpiit: [
      {
        title: "Startup Recognition Criteria",
        description: "Minimum turnover of INR 100 crores or 10 years of existence",
        status: "completed"
      },
      {
        title: "Tax Exemptions",
        description: "Exemption from income tax for 3 consecutive years out of 10 years",
        status: "in-progress"
      },
      {
        title: "Patent Facilitation",
        description: "Fast-track patent examination process",
        status: "not-started"
      },
      {
        title: "Self-Certification",
        description: "Self-certification under 6 labour and 3 environment laws",
        status: "completed"
      }
    ],
    sebi: [
      {
        title: "Disclosure Requirements",
        description: "Detailed financial and operational disclosures for fundraising",
        status: "in-progress"
      },
      {
        title: "Investor Protection",
        description: "Compliance with investor rights and grievance redressal mechanisms",
        status: "not-started"
      },
      {
        title: "Fund Raising Norms",
        description: "Regulations for private placement and public issues",
        status: "completed"
      }
    ],
    cybersecurity: [
      {
        title: "Data Encryption",
        description: "End-to-end encryption for sensitive customer data",
        status: "in-progress"
      },
      {
        title: "Access Controls",
        description: "Role-based access control and authentication mechanisms",
        status: "completed"
      },
      {
        title: "Incident Response",
        description: "Establishment of cybersecurity incident response team",
        status: "not-started"
      },
      {
        title: "Regular Audits",
        description: "Quarterly security audits and penetration testing",
        status: "in-progress"
      }
    ],
    datagov: [
      {
        title: "Data Privacy Policy",
        description: "Clear privacy policy compliant with data protection laws",
        status: "completed"
      },
      {
        title: "Consent Management",
        description: "Explicit user consent for data collection and processing",
        status: "in-progress"
      },
      {
        title: "Data Retention",
        description: "Defined data retention and deletion policies",
        status: "not-started"
      },
      {
        title: "Cross-Border Transfer",
        description: "Compliance with international data transfer regulations",
        status: "not-started"
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'not-started': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'not-started': return 'Not Started';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Regulation & Compliance Guidelines</h2>
        <p className="text-gray-600">Mini knowledge base for startup compliance requirements</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeCategory === category.id
                ? 'bg-[#FF6A00] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      <div className="border border-gray-200 rounded-xl p-5 mb-6">
        <h3 className="font-bold text-gray-800 mb-4">
          {categories.find(cat => cat.id === activeCategory)?.name} Guidelines
        </h3>
        
        <div className="space-y-4">
          {guidelines[activeCategory].map((guideline, index) => (
            <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{guideline.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{guideline.description}</p>
              </div>
              <span className={`ml-4 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(guideline.status)}`}>
                {getStatusText(guideline.status)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#FFF9F0] rounded-xl p-5 border border-[#FFDAB9]">
        <h3 className="font-bold text-gray-800 mb-3">Compliance Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-green-600">5</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-yellow-600">4</p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-red-600">3</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex">
          <div className="mr-3 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-blue-800 mb-1">AI Compliance Assistant</h4>
            <p className="text-sm text-blue-700">
              Based on your industry and stage, we recommend prioritizing SEBI compliance and data governance requirements.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#FF8C42] transition-colors">
          Generate Compliance Report
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Export Guidelines
        </button>
      </div>
    </div>
  );
};

export default RegulationComplianceGuidelines;