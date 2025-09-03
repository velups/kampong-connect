import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, MessageCircle, Shield, Globe, Accessibility } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('home.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-8 py-3">
              {t('home.getStarted')}
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-3">
              {t('home.signIn')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How Kampong Connect Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to request help or offer assistance in your community
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-gray-600">
              Elders can easily post requests for help with daily tasks, errands, or companionship
            </p>
          </div>
          
          <div className="card text-center">
            <Heart className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Match</h3>
            <p className="text-gray-600">
              Our system matches requests with nearby volunteers based on availability and services
            </p>
          </div>
          
          <div className="card text-center">
            <MessageCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Support</h3>
            <p className="text-gray-600">
              Secure messaging, ratings, and safety features ensure positive experiences for all
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-100 -mx-4 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Singapore</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Designed with Singapore's diverse community and elderly population in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Globe className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multilingual</h3>
              <p className="text-gray-600">
                Support for English, Mandarin, Malay, and Tamil languages
              </p>
            </div>
            
            <div className="text-center">
              <Accessibility className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Accessible</h3>
              <p className="text-gray-600">
                Large fonts, high contrast, and voice input for elderly-friendly usage
              </p>
            </div>
            
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">
                Identity verification, secure messaging, and emergency contact features
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of Singaporeans building stronger, more caring communities
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-3">
            Join Kampong Connect
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;