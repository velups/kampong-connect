import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, MessageCircle, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getRequestStats, getRequestsByElder, getAvailableRequests, initializeDefaultRequests } from '../utils/requestStorage';

const DashboardPage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const userRole = state.user?.role || 'elder';
  const [stats, setStats] = useState({
    activeRequests: 0,
    completedTasks: 0,
    messages: 3,
    rating: 4.8
  });
  const [recentRequests, setRecentRequests] = useState<any[]>([]);

  useEffect(() => {
    if (state.user) {
      // Initialize default data
      initializeDefaultRequests();
      
      // Load stats
      const requestStats = getRequestStats(state.user.id, state.user.role);
      setStats({
        activeRequests: requestStats.activeRequests || requestStats.availableRequests || 0,
        completedTasks: requestStats.completedTasks || 0,
        messages: 3, // Mock for now
        rating: 4.8 // Mock for now
      });

      // Load recent requests
      if (state.user.role === 'elder') {
        const myRequests = getRequestsByElder(state.user.id);
        setRecentRequests(myRequests.slice(0, 3)); // Show latest 3
      } else {
        const availableRequests = getAvailableRequests();
        setRecentRequests(availableRequests.slice(0, 3)); // Show latest 3
      }
    }
  }, [state.user]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {state.user?.name}! Here's {userRole === 'elder' ? 'your activity overview' : 'what\'s happening in your community'}.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {userRole === 'elder' ? 'My Requests' : 'Available Requests'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeRequests}</p>
            </div>
            <Clock className="w-8 h-8 text-primary-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {userRole === 'elder' ? 'Tasks Completed' : 'People Helped'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedTasks}</p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New Messages</p>
              <p className="text-2xl font-bold text-gray-900">{stats.messages}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Your Rating</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {userRole === 'elder' ? 'My Recent Requests' : 'Recent Community Requests'}
          </h3>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{request.title}</h4>
                  <p className="text-sm text-gray-600 capitalize">
                    {request.category} • {
                      request.scheduledDate ? 
                        new Date(request.scheduledDate).toLocaleDateString() :
                        request.date
                    }
                  </p>
                  {request.status === 'matched' && request.matchedVolunteerId && (
                    <p className="text-sm text-green-600">Matched with volunteer</p>
                  )}
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  request.status === 'matched' 
                    ? 'bg-green-100 text-green-800' 
                    : request.status === 'completed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {userRole === 'elder' ? (
              <>
                <button 
                  onClick={() => navigate('/requests')}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <h4 className="font-medium text-gray-900">Request Help</h4>
                  <p className="text-sm text-gray-600">Post a new assistance request</p>
                </button>
                <button 
                  onClick={() => navigate('/messages')}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <h4 className="font-medium text-gray-900">View Messages</h4>
                  <p className="text-sm text-gray-600">Chat with volunteers</p>
                </button>
                <button 
                  onClick={() => navigate('/profile')}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <h4 className="font-medium text-gray-900">Update Profile</h4>
                  <p className="text-sm text-gray-600">Manage your preferences</p>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/requests')}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <h4 className="font-medium text-gray-900">Browse Requests</h4>
                  <p className="text-sm text-gray-600">Find ways to help nearby</p>
                </button>
                <button 
                  onClick={() => navigate('/requests')}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <h4 className="font-medium text-gray-900">My Commitments</h4>
                  <p className="text-sm text-gray-600">View accepted requests</p>
                </button>
                <button 
                  onClick={() => navigate('/profile')}
                  className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <h4 className="font-medium text-gray-900">Update Availability</h4>
                  <p className="text-sm text-gray-600">Manage your schedule</p>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;