// Format large numbers with K (thousands) or M (millions) suffix
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Format currency values
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format percentage values
export const formatPercentage = (value) => {
  return `${value}%`;
};

// Format dates
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Get status color based on status
export const getStatusColor = (status) => {
  switch (status) {
    case 'Ongoing':
      return 'bg-blue-100 text-blue-800';
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Submitted':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Get notification type color
export const getNotificationTypeColor = (type) => {
  switch (type) {
    case 'alert':
      return 'bg-red-100 text-red-800';
    case 'reminder':
      return 'bg-yellow-100 text-yellow-800';
    case 'approval':
      return 'bg-blue-100 text-blue-800';
    case 'submission':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Calculate growth indicator
export const getGrowthIndicator = (value) => {
  if (value > 0) {
    return 'text-green-600';
  } else if (value < 0) {
    return 'text-red-600';
  } else {
    return 'text-gray-600';
  }
};