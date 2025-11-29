// Utility functions for formatting data

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

export const formatPercentage = (value, total) => {
  return Math.round((value / total) * 100);
};

export const getStatusColor = (status) => {
  const statusColors = {
    'Active': 'bg-green-100 text-green-800',
    'Ending Soon': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-blue-100 text-blue-800',
    'Review': 'bg-yellow-100 text-yellow-800',
    'Interview': 'bg-blue-100 text-blue-800',
    'Accepted': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800'
  };
  
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

export const getEventTypeColor = (type) => {
  const typeColors = {
    'Presentation': 'bg-purple-100 text-purple-800',
    'Workshop': 'bg-indigo-100 text-indigo-800',
    'Pitch': 'bg-pink-100 text-pink-800',
    'Orientation': 'bg-blue-100 text-blue-800',
    'Meeting': 'bg-green-100 text-green-800'
  };
  
  return typeColors[type] || 'bg-gray-100 text-gray-800';
};

export const getResourceColor = (percentage) => {
  if (percentage >= 90) return 'bg-red-500';
  if (percentage >= 75) return 'bg-yellow-500';
  return 'bg-green-500';
};

export default {
  formatCurrency,
  formatDate,
  formatTime,
  formatPercentage,
  getStatusColor,
  getEventTypeColor,
  getResourceColor
};