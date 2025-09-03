import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

type UserType = 'elder' | 'volunteer';

const RegisterPage: React.FC = () => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { state, register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [state.isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!userType) {
      setError('Please select a user type');
      return;
    }
    
    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: userType,
    });
    
    if (!success) {
      setError('Registration failed. Please try again.');
    }
    // Navigation will be handled by useEffect when state.isAuthenticated changes
  };

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Join Kampong Connect</h2>
            <p className="mt-2 text-gray-600">Choose how you'd like to participate</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => setUserType('elder')}
              className="card hover:shadow-lg transition-shadow duration-200 text-left p-8"
            >
              <div className="flex items-center mb-4">
                <User className="w-8 h-8 text-primary-600 mr-3" />
                <h3 className="text-xl font-semibold">I need help</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Register as an Elder to request assistance with daily tasks, errands, or companionship.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Post requests for help</li>
                <li>• Connect with volunteers</li>
                <li>• Safe and secure platform</li>
              </ul>
            </button>
            
            <button
              onClick={() => setUserType('volunteer')}
              className="card hover:shadow-lg transition-shadow duration-200 text-left p-8"
            >
              <div className="flex items-center mb-4">
                <User className="w-8 h-8 text-secondary-600 mr-3" />
                <h3 className="text-xl font-semibold">I want to help</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Register as a Volunteer to offer your time and skills to help elderly community members.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Browse help requests</li>
                <li>• Make a difference in your community</li>
                <li>• Build meaningful connections</li>
              </ul>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {t('auth.signUp')} as {userType === 'elder' ? 'Elder' : 'Volunteer'}
          </h2>
          <p className="mt-2 text-gray-600">{t('auth.createAccount')}</p>
        </div>
        
        <form className="card space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-700">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={state.isLoading}
            className="w-full btn-primary flex justify-center items-center"
          >
            {state.isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setUserType(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Go back to selection
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;