// Utility functions for validation and error handling
import { useTranslation } from 'react-i18next';

export const validateReport = (report) => {
  // We can't use useTranslation here because this is not a React component
  // For now, we'll keep the English messages, but in a real app, we would pass
  // the t function as a parameter or use a different approach
  const errors = [];
  
  if (!report.description || !report.description.trim()) {
    errors.push('Description is required');
  }
  
  if (!report.category) {
    errors.push('Category is required');
  }
  
  if (report.location && report.location.length > 200) {
    errors.push('Location is too long (max 200 characters)');
  }
  
  if (report.description && report.description.length > 1000) {
    errors.push('Description is too long (max 1000 characters)');
  }
  
  if (report.name && report.name.length > 100) {
    errors.push('Name is too long (max 100 characters)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const formatErrorMessage = (error) => {
  if (error.message) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unknown error occurred';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return new Date(dateString).toLocaleDateString(undefined, options);
};