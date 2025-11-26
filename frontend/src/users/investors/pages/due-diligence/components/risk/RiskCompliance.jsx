import React from 'react';

const RiskCompliance = ({ data }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Risk & Compliance Checks</h2>
      <p className="text-gray-600">Legal risks, document verification, and compliance assessment</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Legal Risk Indicators</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">⚖️</div>
          <div className="text-2xl font-bold text-[#FF6A00]">{data.legalRisks}</div>
          <div className="text-gray-600 mt-2">Active Legal Issues</div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Compliance Status</h3>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
              <span className="mr-2">✓</span> {data.compliance}% Compliant
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-800 mb-4">Compliance Checklist</h3>
      <div className="space-y-3">
        {[
          'Corporate Registration',
          'Tax Compliance',
          'Employment Law',
          'Data Protection',
          'Intellectual Property',
          'Financial Reporting'
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <span className="text-gray-700">{item}</span>
            <span className="text-green-600">✓ Compliant</span>
          </div>
        ))}
      </div>
    </div>
    
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-gray-800 mb-4">AI-Generated Red Flags</h3>
      <div className="space-y-3">
        {data.redFlags.map((flag, index) => (
          <div key={index} className="flex items-start p-4 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-red-500 mr-3 mt-0.5">⚠️</span>
            <span className="text-gray-800">{flag}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default RiskCompliance;