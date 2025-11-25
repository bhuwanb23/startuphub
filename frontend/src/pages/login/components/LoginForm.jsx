import React from 'react';
import { FORM_FIELDS, SOCIAL_LOGIN_OPTIONS } from '../constants';
import useAuthForm from '../hooks/useAuthForm';

const LoginForm = () => {
  const initialState = {
    email: '',
    password: '',
  };

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useAuthForm(initialState);

  const onSubmit = async (data) => {
    // Simulate API call
    console.log('Login data:', data);
    // In a real app, you would call your authentication API here
    // For now, we'll just show an alert
    alert('Login functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="space-y-4">
        {FORM_FIELDS.login.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id]}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors[field.id] 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-[#FF8C42] focus:border-[#FF8C42]'
              } focus:outline-none focus:ring-2 transition-colors`}
            />
            {errors[field.id] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.id]}</p>
            )}
          </div>
        ))}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-[#FF6A00] focus:ring-[#FF8C42] border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-[#FF6A00] hover:text-[#FF8C42]">
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#FF8C42] to-[#FF6A00] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#FF6A00] hover:to-[#F4A300] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF8C42] transition-all shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {SOCIAL_LOGIN_OPTIONS.map((option) => (
          <button
            key={option.id}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium" style={{ color: option.color }}>
              {option.icon}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LoginForm;