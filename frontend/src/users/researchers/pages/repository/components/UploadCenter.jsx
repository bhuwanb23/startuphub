import React from 'react';

const UploadCenter = () => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // Handle file drop logic here
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">📤 Upload Center</h2>
      
      {/* Drag and Drop Zone */}
      <div 
        className="border-2 border-dashed border-[#FF8C42] rounded-xl p-8 text-center bg-[#FFF5EB]/30 hover:bg-[#FFF5EB]/50 transition-colors cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="text-4xl mb-3">📁</div>
        <h3 className="font-medium text-gray-800 mb-2">Drag & Drop Files</h3>
        <p className="text-sm text-gray-600 mb-4">or click to browse your device</p>
        <button className="py-2 px-4 bg-[#FF6A00] text-white rounded-lg hover:bg-[#e05500] transition-colors text-sm font-medium">
          Select Files
        </button>
      </div>
      
      {/* Auto Classification */}
      <div className="mt-6">
        <h3 className="font-medium text-gray-800 mb-3">Auto Classification</h3>
        <div className="grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="text-2xl mb-1">📄</div>
            <span className="text-xs text-gray-600">Document</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="text-2xl mb-1">⚙️</div>
            <span className="text-xs text-gray-600">Prototype</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="text-2xl mb-1">📊</div>
            <span className="text-xs text-gray-600">Dataset</span>
          </button>
        </div>
      </div>
      
      {/* AI Auto-tagging */}
      <div className="mt-6">
        <h3 className="font-medium text-gray-800 mb-3">AI Auto-tagging Suggestions</h3>
        <div className="flex flex-wrap gap-2">
          {['AI', 'Biotech', 'Quantum', 'Healthcare', 'Robotics', 'Sustainability'].map((tag, index) => (
            <button 
              key={index}
              className="text-xs bg-[#FFF5EB] text-[#FF6A00] px-2 py-1 rounded hover:bg-[#FF6A00] hover:text-white transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadCenter;