import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarNavigation = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    const basePath = '/university/ipr';
    const currentPath = location.pathname;
    
    if (path === '') {
      // For the root path, check if we're exactly at /university/ipr
      return currentPath === basePath;
    }
    
    // For other paths, check if the current path matches exactly or is a sub-path
    const fullPath = `${basePath}/${path}`;
    return currentPath === fullPath || currentPath.startsWith(`${fullPath}/`);
  };

  const menuSections = [
    {
      title: 'IPR Tools & Management',
      items: [
        { name: 'Patent Drafting Assistant', path: 'ipr-tools/patent-drafting' },
        { name: 'Prior Art Search', path: 'ipr-tools/prior-art-search' },
        { name: 'Claim Generation Tools', path: 'ipr-tools/claim-generation' },
        { name: 'IPR Filing Workflow', path: 'ipr-tools/filing-workflow' },
        { name: 'IP Status & Renewal Tracker', path: 'ipr-tools/status-renewal' },
        { name: 'Faculty Research IP Score', path: 'ipr-tools/faculty-ip-score' },
      ]
    },
    {
      title: 'Tech Transfer Office',
      items: [
        { name: 'Licensing Opportunities', path: 'tech-transfer/licensing' },
        { name: 'Tech Transfer Readiness Score', path: 'tech-transfer/readiness' },
        { name: 'Industry Fit Recommendations', path: 'tech-transfer/industry-fit' },
      ]
    },
    {
      title: 'Commercial Potential Reports',
      items: [
        { name: 'Automated Market Fit Report', path: 'reports/market-fit' },
        { name: 'Commercial Potential Score', path: 'reports/commercial-potential' },
      ]
    },
    {
      title: 'Research Repository',
      items: [
        { name: 'Research Paper Upload System', path: 'repository/papers' },
        { name: 'Prototype Submission', path: 'repository/prototypes' },
        { name: 'Experiment Logs', path: 'repository/experiments' },
        { name: 'Lab Note Archive', path: 'repository/lab-notes' },
        { name: 'Research Review System', path: 'repository/review-system' },
      ]
    }
  ];

  return (
    <div className="w-64 bg-white shadow-md h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-gray-800">IPR Hub</h2>
        <p className="text-sm text-gray-600">Research Commercialization</p>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        {menuSections.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {section.title}
            </h3>
            <ul>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link
                    to={item.path ? `/university/ipr/${item.path}` : '/university/ipr'}
                    className={`block px-4 py-2 text-sm ${
                      isActive(item.path)
                        ? 'text-[#F4A300] bg-[#FFF9F0] border-l-4 border-[#F4A300]'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarNavigation;