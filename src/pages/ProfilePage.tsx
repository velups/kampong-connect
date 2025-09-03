import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Languages, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const ProfilePage: React.FC = () => {
  const { state } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize profile from authenticated user or default values
  const [profile, setProfile] = useState(() => {
    if (state.user?.role === 'elder') {
      return {
        name: state.user.name || 'Elder User',
        email: state.user.email || '',
        phone: '+65 9123 4567',
        address: 'Toa Payoh Central, Singapore',
        bio: 'Retired teacher who loves reading and gardening. Looking forward to connecting with volunteers for occasional help with errands.',
        languages: ['English', 'Mandarin'],
        age: 68 as number | undefined,
        emergencyContact: {
          name: 'Family Member',
          relationship: 'Daughter',
          phone: '+65 9876 5432'
        },
        servicesOffered: undefined as string[] | undefined,
        availability: undefined as string | undefined
      };
    } else {
      return {
        name: state.user?.name || 'Volunteer User',
        email: state.user?.email || '',
        phone: '+65 8765 4321',
        address: 'Ang Mo Kio, Singapore',
        bio: 'Community volunteer passionate about helping elders. Available for various assistance tasks.',
        languages: ['English', 'Mandarin', 'Malay'],
        servicesOffered: ['Shopping', 'Transportation', 'Technology Help'],
        availability: 'Weekends and evenings',
        age: undefined as number | undefined,
        emergencyContact: undefined as { name: string; relationship: string; phone: string; } | undefined
      };
    }
  });

  const handleSave = () => {
    // TODO: Save profile changes
    setIsEditing(false);
  };

  const handleCancel = () => {
    // TODO: Reset changes
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="btn-secondary flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Picture and Basic Info */}
        <div className="lg:col-span-1">
          <div className="card text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            {isEditing ? (
              <button className="text-primary-600 hover:text-primary-700 text-sm mb-4">
                Change Photo
              </button>
            ) : null}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{profile.name}</h3>
            <p className="text-gray-600 mb-4">
              {state.user?.role === 'elder' ? t('profile.elderMember') : t('profile.volunteerMember')}
            </p>
            <div className="text-left space-y-2">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">{profile.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">{profile.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{profile.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.name}</p>
                )}
              </div>

              {state.user?.role === 'elder' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={profile.age || ''}
                      onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.age}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.phone}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-900">{profile.address}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ) : (
                <p className="text-gray-900">{profile.bio}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Languages className="w-4 h-4 inline mr-1" />
                Languages
              </label>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Volunteer-specific fields */}
            {state.user?.role === 'volunteer' && (
              <>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Services Offered
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profile.servicesOffered?.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.availability || ''}
                      onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Weekends and evenings"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.availability}</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Emergency Contact - only for Elders */}
          {state.user?.role === 'elder' && profile.emergencyContact && (
            <div className="card">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.emergencyContact?.name || ''}
                      onChange={(e) => setProfile({
                        ...profile,
                        emergencyContact: profile.emergencyContact ? { ...profile.emergencyContact, name: e.target.value } : { name: e.target.value, relationship: '', phone: '' }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.emergencyContact?.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relationship
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.emergencyContact?.relationship || ''}
                      onChange={(e) => setProfile({
                        ...profile,
                        emergencyContact: profile.emergencyContact ? { ...profile.emergencyContact, relationship: e.target.value } : { name: '', relationship: e.target.value, phone: '' }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.emergencyContact?.relationship}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.emergencyContact?.phone || ''}
                      onChange={(e) => setProfile({
                        ...profile,
                        emergencyContact: profile.emergencyContact ? { ...profile.emergencyContact, phone: e.target.value } : { name: '', relationship: '', phone: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.emergencyContact?.phone}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;