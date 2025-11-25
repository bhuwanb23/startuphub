import { useState } from 'react';

const useAuthForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e, onSubmit) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simple validation
      const newErrors = {};
      Object.keys(formData).forEach(key => {
        if (!formData[key] && key !== 'confirmPassword') {
          newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        }
      });

      // Password confirmation check
      if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
      }

      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setErrors
  };
};

export default useAuthForm;