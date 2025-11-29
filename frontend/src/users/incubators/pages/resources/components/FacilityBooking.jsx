import React, { useState } from 'react';

const FacilityBooking = () => {
  const [activeTab, setActiveTab] = useState('labs');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Mock data for facilities
  const facilities = {
    labs: [
      { id: 1, name: 'BioLab A', image: '🔬', occupancy: 30, totalCapacity: 50, status: 'available' },
      { id: 2, name: 'ChemLab B', image: '🧪', occupancy: 45, totalCapacity: 50, status: 'busy' },
      { id: 3, name: 'Physics Lab C', image: '⚛️', occupancy: 10, totalCapacity: 30, status: 'available' }
    ],
    workstations: [
      { id: 4, name: 'Workstation 1', image: '💻', occupancy: 1, totalCapacity: 1, status: 'occupied' },
      { id: 5, name: 'Workstation 2', image: '💻', occupancy: 0, totalCapacity: 1, status: 'available' }
    ],
    meetingRooms: [
      { id: 6, name: 'Conference Room Alpha', image: '👥', occupancy: 0, totalCapacity: 12, status: 'available' },
      { id: 7, name: 'Meeting Room Beta', image: '👥', occupancy: 8, totalCapacity: 10, status: 'busy' }
    ],
    equipment: [
      { id: 8, name: '3D Printer Pro', image: '🖨️', occupancy: 1, totalCapacity: 1, status: 'in-use' },
      { id: 9, name: 'Spectrophotometer', image: '📊', occupancy: 0, totalCapacity: 1, status: 'available' }
    ]
  };

  // Mock calendar data
  const calendarDays = Array.from({ length: 30 }, (_, i) => ({
    date: i + 1,
    isBooked: Math.random() > 0.7,
    isToday: i === 5
  }));

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setShowBookingModal(true);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedSlot(null);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the booking
    alert('Booking submitted successfully!');
    handleCloseModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Facility Booking System</h2>
        <p className="text-gray-600">Book labs, workstations, meeting rooms, and equipment</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {Object.keys(facilities).map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 font-medium text-sm capitalize ${
              activeTab === tab
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.replace(/([A-Z])/g, ' $1')}
          </button>
        ))}
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {facilities[activeTab].map((facility) => (
          <div 
            key={facility.id} 
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleSlotClick(facility)}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-2xl mb-2">{facility.image}</div>
                <h3 className="font-semibold text-gray-800">{facility.name}</h3>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                facility.status === 'available' 
                  ? 'bg-green-100 text-green-800' 
                  : facility.status === 'busy' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {facility.status}
              </span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Occupancy</span>
                <span>{facility.occupancy}/{facility.totalCapacity}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full" 
                  style={{ width: `${(facility.occupancy / facility.totalCapacity) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Availability Calendar</h3>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <div 
              key={index}
              className={`h-12 flex items-center justify-center rounded cursor-pointer transition-colors ${
                day.isToday 
                  ? 'bg-orange-100 border border-orange-300' 
                  : day.isBooked 
                    ? 'bg-red-100 hover:bg-red-200' 
                    : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => handleSlotClick(day)}
            >
              {day.date}
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Book Facility</h3>
                <button 
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleBookingSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Startup</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Startup Alpha</option>
                    <option>Startup Beta</option>
                    <option>Startup Gamma</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                      type="date" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input 
                      type="time" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                  <textarea 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="3"
                    placeholder="Describe the purpose of booking..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilityBooking;