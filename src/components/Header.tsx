import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Menu, User, LogOut, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { state, logout } = useAuth();
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'en' ? 'zh' : 'en');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">Kampong Connect</span>
          </Link>
          
          {state.isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 transition-colors">
                {t('nav.dashboard')}
              </Link>
              <Link to="/requests" className="text-gray-600 hover:text-primary-600 transition-colors">
                {t('nav.requests')}
              </Link>
              <Link to="/messages" className="text-gray-600 hover:text-primary-600 transition-colors">
                {t('nav.messages')}
              </Link>
              <Link to="/profile" className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors">
                <User className="w-4 h-4" />
                <span>{t('nav.profile')}</span>
              </Link>
            </nav>
          )}
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
              title="Switch Language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">{currentLanguage === 'en' ? '中文' : 'EN'}</span>
            </button>
            
            {state.isAuthenticated ? (
              <div className="relative">
                <button
                  data-testid="user-menu"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block">{state.user?.name}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {t('nav.profile')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="btn-primary">
                  {t('nav.signup')}
                </Link>
              </>
            )}
            
            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;