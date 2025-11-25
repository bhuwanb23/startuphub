// Login page constants

export const SOCIAL_LOGIN_OPTIONS = [
  {
    id: 'google',
    name: 'Google',
    icon: 'G',
    color: '#DB4437',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'GH',
    color: '#333333',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'in',
    color: '#0077B5',
  },
];

export const FORM_FIELDS = {
  login: [
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true,
    },
  ],
  register: [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      required: true,
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Create a password',
      required: true,
    },
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
      required: true,
    },
  ],
};