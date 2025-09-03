import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MapPin, Clock, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { 
  createRequest, 
  getAvailableRequests, 
  getRequestsByElder,
  updateRequestStatus,
  initializeDefaultRequests
} from '../utils/requestStorage';

const RequestsPage: React.FC = () => {
  const { state } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state for creating new request
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general' as 'general' | 'household' | 'wellbeing' | 'shopping',
    scheduledDate: '',
    scheduledTime: '',
    duration: '60',
    address: '',
    postalCode: '',
    urgency: 'medium' as 'low' | 'medium' | 'high'
  });

  // Load requests on component mount
  useEffect(() => {
    initializeDefaultRequests();
    loadRequests();
  }, [state.user]);

  const loadRequests = () => {
    if (!state.user) return;
    
    if (state.user.role === 'elder') {
      // Elders see only their own requests
      const myRequests = getRequestsByElder(state.user.id);
      setRequests(myRequests);
    } else {
      // Volunteers see all available requests (open status)
      const availableRequests = getAvailableRequests();
      setRequests(availableRequests);
    }
  };

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.user) return;

    setIsLoading(true);
    
    try {
      const scheduledDateTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`);
      
      const result = createRequest({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        scheduledDate: scheduledDateTime,
        duration: parseInt(formData.duration),
        location: {
          address: formData.address,
          postalCode: formData.postalCode
        },
        urgency: formData.urgency,
        elderId: state.user.id
      });

      if (result.success) {
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: 'general',
          scheduledDate: '',
          scheduledTime: '',
          duration: '60',
          address: '',
          postalCode: '',
          urgency: 'medium'
        });
        
        setShowCreateModal(false);
        loadRequests(); // Reload requests
      } else {
        alert(result.error || 'Failed to create request');
      }
    } catch (error) {
      console.error('Error creating request:', error);
      alert('Failed to create request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOfferHelp = async (requestId: string) => {
    if (!state.user) return;
    
    const result = updateRequestStatus(requestId, 'matched', state.user.id);
    if (result.success) {
      loadRequests(); // Reload to reflect changes
      alert('You have successfully offered to help with this request!');
    } else {
      alert(result.error || 'Failed to offer help');
    }
  };


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
          <h1 className="text-3xl font-bold text-gray-900">
            {state.user?.role === 'elder' ? 'My Requests' : 'Available Requests'}
          </h1>
          <p className="text-gray-600">
            {state.user?.role === 'elder' 
              ? 'Manage your assistance requests' 
              : 'Browse and help with community requests'
            }
          </p>
        </div>
        {state.user?.role === 'elder' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Request</span>
          </button>
        )}
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
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{request.location?.address || request.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>
                      {request.scheduledDate ? 
                        new Date(request.scheduledDate).toLocaleDateString() + ' at ' + 
                        new Date(request.scheduledDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) :
                        `${request.date} at ${request.time}`
                      } 
                      ({request.duration ? Math.floor(request.duration / 60) + 'h ' + (request.duration % 60) + 'm' : request.duration})
                    </span>
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
                
                {state.user?.role === 'volunteer' && request.status === 'open' && (
                  <button 
                    onClick={() => handleOfferHelp(request.id)}
                    className="btn-primary text-sm px-4 py-2"
                  >
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create New Request</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Request Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="What do you need help with?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select 
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="general">General Assistance</option>
                  <option value="household">Household Chores</option>
                  <option value="shopping">Shopping</option>
                  <option value="wellbeing">Wellbeing</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Please provide more details about what you need help with..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.scheduledTime}
                    onChange={(e) => setFormData({...formData, scheduledTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes) *
                </label>
                <select 
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                  <option value="180">3 hours</option>
                  <option value="240">4 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Where do you need help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  required
                  pattern="[0-9]{6}"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="123456"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Urgency
                </label>
                <select 
                  value={formData.urgency}
                  onChange={(e) => setFormData({...formData, urgency: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Request'}
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