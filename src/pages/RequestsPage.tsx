import React, { useState } from 'react';
import { Plus, Search, Filter, MapPin, Clock, User } from 'lucide-react';

const RequestsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Mock data - in real app, this would come from API
  const requests = [
    {
      id: '1',
      title: 'Grocery Shopping Help',
      description: 'Need help with weekly grocery shopping at NTUC FairPrice.',
      category: 'shopping',
      location: 'Toa Payoh Central',
      date: '2025-09-05',
      time: '10:00 AM',
      duration: '2 hours',
      elderId: 'elder1',
      elderName: 'Mrs. Lim',
      status: 'open',
      urgency: 'medium'
    },
    {
      id: '2',
      title: 'Coffee Chat Companion',
      description: 'Looking for someone to have coffee and chat with at the void deck.',
      category: 'wellbeing',
      location: 'Ang Mo Kio',
      date: '2025-09-06',
      time: '3:00 PM',
      duration: '1 hour',
      elderId: 'elder2',
      elderName: 'Mr. Tan',
      status: 'open',
      urgency: 'low'
    },
    {
      id: '3',
      title: 'Doctor Appointment Escort',
      description: 'Need someone to accompany me to my doctor appointment at the polyclinic.',
      category: 'general',
      location: 'Bedok Polyclinic',
      date: '2025-09-07',
      time: '9:00 AM',
      duration: '3 hours',
      elderId: 'elder3',
      elderName: 'Mrs. Wong',
      status: 'matched',
      urgency: 'high'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'general', label: 'General Assistance' },
    { value: 'household', label: 'Household Chores' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'wellbeing', label: 'Wellbeing' }
  ];

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || request.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assistance Requests</h1>
          <p className="text-gray-600">Browse and manage assistance requests in your community</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Request</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="card hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    request.urgency === 'high' ? 'bg-red-100 text-red-800' :
                    request.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {request.urgency} priority
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{request.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{request.elderName}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{request.date} at {request.time} ({request.duration})</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  request.status === 'open' ? 'bg-blue-100 text-blue-800' :
                  request.status === 'matched' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {request.status}
                </span>
                
                {request.status === 'open' && (
                  <button className="btn-primary text-sm px-4 py-2">
                    Offer Help
                  </button>
                )}
                
                {request.status === 'matched' && (
                  <button className="btn-secondary text-sm px-4 py-2">
                    View Details
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded capitalize">
                {request.category}
              </span>
            </div>
          </div>
        ))}
        
        {filteredRequests.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No requests found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Create Request Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Request</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Request Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="What do you need help with?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>General Assistance</option>
                  <option>Household Chores</option>
                  <option>Shopping</option>
                  <option>Wellbeing</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Please provide more details..."
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Create Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsPage;