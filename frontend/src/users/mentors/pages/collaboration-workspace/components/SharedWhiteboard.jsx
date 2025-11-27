import React, { useState, useRef, useEffect } from 'react';

const SharedWhiteboard = () => {
  const [shapes, setShapes] = useState([]);
  const [selectedTool, setSelectedTool] = useState('select');
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);
  const [users] = useState([
    { id: 1, name: 'You', color: '#FF6A00', isOnline: true },
    { id: 2, name: 'Alex Morgan', color: '#4F46E5', isOnline: true },
    { id: 3, name: 'TechFlow Team', color: '#10B981', isOnline: false }
  ]);
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  const tools = [
    { id: 'select', name: 'Select', icon: '↖️' },
    { id: 'pen', name: 'Pen', icon: '✏️' },
    { id: 'rectangle', name: 'Rectangle', icon: '⬜' },
    { id: 'circle', name: 'Circle', icon: '⭕' },
    { id: 'text', name: 'Text', icon: 'T' },
    { id: 'sticky', name: 'Sticky Note', icon: '📝' }
  ];

  const handleMouseDown = (e) => {
    if (selectedTool === 'select') return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    
    const newShape = {
      id: Date.now(),
      type: selectedTool,
      x,
      y,
      width: 0,
      height: 0,
      color: '#FF6A00',
      text: selectedTool === 'text' ? 'Edit text' : '',
      author: 'You'
    };
    
    setCurrentShape(newShape);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !currentShape) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const updatedShape = {
      ...currentShape,
      width: x - currentShape.x,
      height: y - currentShape.y
    };
    
    setCurrentShape(updatedShape);
  };

  const handleMouseUp = () => {
    if (isDrawing && currentShape) {
      setShapes([...shapes, currentShape]);
      setCurrentShape(null);
    }
    setIsDrawing(false);
  };

  const handleExport = (format) => {
    alert(`Exporting whiteboard as ${format.toUpperCase()}...`);
    // In a real implementation, this would export the canvas
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#FFF2DC]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Shared Whiteboard</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => handleExport('png')}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            PNG
          </button>
          <button 
            onClick={() => handleExport('pdf')}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            PDF
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <div className="bg-[#FFF9F0] rounded-xl p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-3">Tools</h3>
            <div className="grid grid-cols-3 gap-2">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`p-3 rounded-lg flex flex-col items-center justify-center transition-colors ${
                    selectedTool === tool.id
                      ? 'bg-[#FF6A00] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl mb-1">{tool.icon}</span>
                  <span className="text-xs">{tool.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#FFF9F0] rounded-xl p-4">
            <h3 className="font-medium text-gray-800 mb-3">Online Users</h3>
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.id} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${user.isOnline ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className="flex items-center">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium mr-2"
                      style={{ backgroundColor: user.color }}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm">{user.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 p-3 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {selectedTool === 'select' ? 'Select objects' : `Drawing with ${tools.find(t => t.id === selectedTool)?.name}`}
              </div>
              <div className="flex space-x-2">
                <button className="px-2 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50">
                  Undo
                </button>
                <button className="px-2 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50">
                  Redo
                </button>
              </div>
            </div>
            <div 
              ref={canvasRef}
              className="relative bg-white min-h-[500px] cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Render existing shapes */}
              {shapes.map((shape) => (
                <div
                  key={shape.id}
                  className="absolute border-2 border-dashed"
                  style={{
                    left: shape.x,
                    top: shape.y,
                    width: Math.abs(shape.width),
                    height: Math.abs(shape.height),
                    borderColor: shape.color,
                    transform: `translate(${shape.width < 0 ? -Math.abs(shape.width) : 0}px, ${shape.height < 0 ? -Math.abs(shape.height) : 0}px)`
                  }}
                >
                  {shape.type === 'text' && (
                    <div className="p-2 text-sm">{shape.text}</div>
                  )}
                  {shape.type === 'sticky' && (
                    <div className="w-full h-full bg-yellow-100 p-2 text-sm">
                      {shape.text}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Render current shape being drawn */}
              {currentShape && (
                <div
                  className="absolute border-2 border-dashed"
                  style={{
                    left: currentShape.x,
                    top: currentShape.y,
                    width: Math.abs(currentShape.width),
                    height: Math.abs(currentShape.height),
                    borderColor: currentShape.color,
                    transform: `translate(${currentShape.width < 0 ? -Math.abs(currentShape.width) : 0}px, ${currentShape.height < 0 ? -Math.abs(currentShape.height) : 0}px)`
                  }}
                >
                  {currentShape.type === 'text' && (
                    <div className="p-2 text-sm">{currentShape.text}</div>
                  )}
                  {currentShape.type === 'sticky' && (
                    <div className="w-full h-full bg-yellow-100 p-2 text-sm">
                      {currentShape.text}
                    </div>
                  )}
                </div>
              )}
              
              {/* User cursors */}
              <div 
                className="absolute w-4 h-4 rounded-full"
                style={{
                  left: 100,
                  top: 100,
                  backgroundColor: '#4F46E5',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Alex Morgan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedWhiteboard;