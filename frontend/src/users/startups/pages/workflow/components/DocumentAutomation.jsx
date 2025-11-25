import React, { useState } from 'react';

const DocumentAutomation = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'NDA Template',
      category: 'Legal',
      lastUsed: '2023-10-15',
      usageCount: 24,
    },
    {
      id: 2,
      name: 'Investor Pitch Deck',
      category: 'Fundraising',
      lastUsed: '2023-11-01',
      usageCount: 12,
    },
    {
      id: 3,
      name: 'Employment Agreement',
      category: 'HR',
      lastUsed: '2023-09-22',
      usageCount: 8,
    },
    {
      id: 4,
      name: 'Monthly Report Template',
      category: 'Reporting',
      lastUsed: '2023-11-05',
      usageCount: 36,
    },
  ]);

  const [generatedDocs, setGeneratedDocs] = useState([
    {
      id: 1,
      name: 'NDA - TechCorp Partnership',
      template: 'NDA Template',
      generatedDate: '2023-11-10',
      status: 'Completed',
    },
    {
      id: 2,
      name: 'Q3 Investor Report',
      template: 'Monthly Report Template',
      generatedDate: '2023-11-05',
      status: 'Completed',
    },
    {
      id: 3,
      name: 'New Hire Agreement - John Smith',
      template: 'Employment Agreement',
      generatedDate: '2023-11-01',
      status: 'Completed',
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'Legal',
  });

  const handleCreateTemplate = (e) => {
    e.preventDefault();
    const template = {
      id: templates.length + 1,
      ...newTemplate,
      lastUsed: 'Never',
      usageCount: 0,
    };
    setTemplates([template, ...templates]);
    setNewTemplate({ name: '', category: 'Legal' });
    setShowCreateForm(false);
  };

  const handleGenerateDocument = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const newDoc = {
        id: generatedDocs.length + 1,
        name: `${template.name} - ${new Date().toISOString().split('T')[0]}`,
        template: template.name,
        generatedDate: new Date().toISOString().split('T')[0],
        status: 'Generating',
      };
      setGeneratedDocs([newDoc, ...generatedDocs]);
      
      // Simulate document generation
      setTimeout(() => {
        setGeneratedDocs(prev => prev.map(doc => 
          doc.id === newDoc.id ? { ...doc, status: 'Completed' } : doc
        ));
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Document Automation</h1>
          <p className="text-gray-600 mt-1">Automate document creation and management</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="mt-4 md:mt-0 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-4 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
        >
          {showCreateForm ? 'Cancel' : 'Create Template'}
        </button>
      </div>

      {/* Create Template Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Create New Document Template</h2>
          <form onSubmit={handleCreateTemplate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="templateName" className="block text-sm font-medium text-gray-700 mb-1">
                Template Name
              </label>
              <input
                type="text"
                id="templateName"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
                placeholder="e.g., NDA Template"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={newTemplate.category}
                onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FF8C42] focus:border-[#FF8C42]"
              >
                <option value="Legal">Legal</option>
                <option value="Fundraising">Fundraising</option>
                <option value="HR">HR</option>
                <option value="Reporting">Reporting</option>
                <option value="Contracts">Contracts</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white px-6 py-2 rounded-lg font-medium hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-md hover:shadow-lg"
              >
                Create Template
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Document Templates */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Document Templates</h2>
          <button className="text-[#FF6A00] text-sm font-medium hover:underline">
            View All Templates
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                  📄
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{template.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                      {template.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600">
                <div>Last used: {template.lastUsed}</div>
                <div>Used {template.usageCount} times</div>
              </div>
              <button
                onClick={() => handleGenerateDocument(template.id)}
                className="mt-3 w-full py-2 bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white text-sm font-medium rounded-lg hover:from-[#FF6A00] hover:to-[#F4A300] transition-all shadow-sm hover:shadow-md"
              >
                Generate Document
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* AI Template Suggestions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">AI Template Suggestions</h2>
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
                <h3 className="font-medium text-gray-800">Patent Application Template</h3>
                <p className="text-sm text-gray-600 mt-1">Based on your IPR activities, you may need patent application templates</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">Legal</span>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
              Add Template
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Grant Application Template</h3>
                <p className="text-sm text-gray-600 mt-1">Suggested based on your sector and funding stage</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">Fundraising</span>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
              Add Template
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-[#FF8C42]/30 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FF8C42]/20 flex items-center justify-center text-[#FF6A00] mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Board Meeting Minutes</h3>
                <p className="text-sm text-gray-600 mt-1">Template for recording board meeting discussions and decisions</p>
                <div className="flex items-center mt-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Reporting</span>
                </div>
              </div>
            </div>
            <button className="mt-3 w-full py-2 text-[#FF6A00] text-sm font-medium rounded-lg border border-[#FF8C42]/30 hover:bg-[#FF8C42]/10 transition-colors">
              Add Template
            </button>
          </div>
        </div>
      </div>

      {/* Generated Documents */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recently Generated Documents</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Template
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {generatedDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.template}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.generatedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      doc.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#FF6A00] hover:text-[#FF8C42] mr-3">
                      Download
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
      </div>
    </div>
  );
};

export default DocumentAutomation;