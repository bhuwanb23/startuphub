import React, { useState } from 'react';

const DocumentVerification = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Founders KYC',
      status: 'Verified',
      aiResult: '95% match',
      lastChecked: '2023-06-15'
    },
    {
      id: 2,
      name: 'Pitch Deck',
      status: 'Pending',
      aiResult: 'Processing...',
      lastChecked: '2023-06-15'
    },
    {
      id: 3,
      name: 'Financial Projections',
      status: 'Failed',
      aiResult: '45% match',
      lastChecked: '2023-06-14'
    },
    {
      id: 4,
      name: 'IPR Filings',
      status: 'Verified',
      aiResult: '98% match',
      lastChecked: '2023-06-14'
    },
    {
      id: 5,
      name: 'Product Demos',
      status: 'Pending',
      aiResult: 'Waiting...',
      lastChecked: '2023-06-13'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRecheck = (id) => {
    // In a real app, this would trigger a recheck
    console.log(`Rechecking document ${id}`);
    setDocuments(prev => prev.map(doc => 
      doc.id === id 
        ? { ...doc, status: 'Pending', aiResult: 'Rechecking...' } 
        : doc
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Document Verification</h2>
        <p className="text-gray-600">Verify startup documents with AI assistance</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="font-medium text-gray-800">Verification Status</h3>
          <p className="text-sm text-gray-600">3 of 5 documents verified</p>
        </div>
        <button className="px-4 py-2 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors">
          Verify All
        </button>
      </div>

      {/* Documents Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AI Result
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Checked
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{doc.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {doc.aiResult}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {doc.lastChecked}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => handleRecheck(doc.id)}
                    className="text-[#FF6A00] hover:text-[#e05500] mr-3"
                  >
                    Recheck
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Verification Summary */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4">Verification Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">2</div>
            <div className="text-gray-600">Verified</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-gray-600">Failed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerification;