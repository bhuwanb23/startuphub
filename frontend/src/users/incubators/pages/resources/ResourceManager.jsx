import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';
import FacilityBooking from './components/FacilityBooking';
import AssetManagement from './components/AssetManagement';
import ResourceAllocation from './components/ResourceAllocation';

const ResourcesLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/4 lg:w-1/5">
        <SidebarNavigation />
      </div>
      <div className="md:w-3/4 lg:w-4/5">
        {children}
      </div>
    </div>
  );
};

const ResourceManager = () => {
  const location = useLocation();
  
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Resource & Facility Management</h1>
        <p className="text-gray-600">Centralized control panel for all lab, equipment, and facility operations</p>
      </div>
      
      <Routes>
        <Route index element={<Navigate to="/incubators/resources/booking" replace />} />
        <Route path="booking" element={
          <ResourcesLayout>
            <FacilityBooking />
          </ResourcesLayout>
        } />
        <Route path="assets" element={
          <ResourcesLayout>
            <AssetManagement />
          </ResourcesLayout>
        } />
        <Route path="allocation" element={
          <ResourcesLayout>
            <ResourceAllocation />
          </ResourcesLayout>
        } />
      </Routes>
    </div>
  );
};

export default ResourceManager;