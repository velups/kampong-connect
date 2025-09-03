import { AssistanceRequest } from '../types';

// Storage key for all assistance requests
const REQUESTS_STORAGE_KEY = 'kampong_connect_requests';

// Get all requests from localStorage
export const getAllRequests = (): AssistanceRequest[] => {
  try {
    const requests = localStorage.getItem(REQUESTS_STORAGE_KEY);
    return requests ? JSON.parse(requests, (key, value) => {
      // Convert date strings back to Date objects
      if (key === 'scheduledDate' || key === 'createdAt') {
        return new Date(value);
      }
      return value;
    }) : [];
  } catch (error) {
    console.error('Error loading requests:', error);
    return [];
  }
};

// Save all requests to localStorage
const saveRequests = (requests: AssistanceRequest[]): void => {
  try {
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
  } catch (error) {
    console.error('Error saving requests:', error);
  }
};

// Create a new request
export const createRequest = (requestData: {
  title: string;
  description: string;
  category: 'general' | 'household' | 'wellbeing' | 'shopping';
  scheduledDate: Date;
  duration: number;
  location: {
    address: string;
    postalCode: string;
  };
  urgency: 'low' | 'medium' | 'high';
  elderId: string;
}): { success: boolean; error?: string; request?: AssistanceRequest } => {
  try {
    const requests = getAllRequests();
    
    const newRequest: AssistanceRequest = {
      id: 'req_' + Math.random().toString(36).substr(2, 9),
      elderId: requestData.elderId,
      title: requestData.title,
      description: requestData.description,
      category: requestData.category,
      scheduledDate: requestData.scheduledDate,
      duration: requestData.duration,
      location: requestData.location,
      status: 'open',
      urgency: requestData.urgency,
      createdAt: new Date(),
    };

    requests.push(newRequest);
    saveRequests(requests);

    return { success: true, request: newRequest };
  } catch (error) {
    console.error('Error creating request:', error);
    return { success: false, error: 'Failed to create request' };
  }
};

// Get requests by elder ID
export const getRequestsByElder = (elderId: string): AssistanceRequest[] => {
  const requests = getAllRequests();
  return requests.filter(request => request.elderId === elderId);
};

// Get available requests for volunteers (open status only)
export const getAvailableRequests = (): AssistanceRequest[] => {
  const requests = getAllRequests();
  return requests.filter(request => request.status === 'open');
};

// Update request status
export const updateRequestStatus = (
  requestId: string, 
  status: AssistanceRequest['status'],
  volunteerId?: string
): { success: boolean; error?: string } => {
  try {
    const requests = getAllRequests();
    const requestIndex = requests.findIndex(r => r.id === requestId);
    
    if (requestIndex === -1) {
      return { success: false, error: 'Request not found' };
    }

    requests[requestIndex].status = status;
    if (volunteerId && (status === 'matched' || status === 'in_progress')) {
      requests[requestIndex].matchedVolunteerId = volunteerId;
    }

    saveRequests(requests);
    return { success: true };
  } catch (error) {
    console.error('Error updating request:', error);
    return { success: false, error: 'Failed to update request' };
  }
};

// Get request by ID
export const getRequestById = (requestId: string): AssistanceRequest | null => {
  const requests = getAllRequests();
  return requests.find(r => r.id === requestId) || null;
};

// Initialize with some default requests for testing
export const initializeDefaultRequests = (): void => {
  const existingRequests = getAllRequests();
  if (existingRequests.length > 0) {
    return; // Requests already exist, don't initialize
  }

  const defaultRequests: AssistanceRequest[] = [
    {
      id: 'req_grocery_help',
      elderId: 'user_elder1',
      title: 'Grocery Shopping Help',
      description: 'Need help with weekly grocery shopping at NTUC FairPrice. Looking for someone to accompany me and help carry items.',
      category: 'shopping',
      scheduledDate: new Date('2025-09-05T10:00:00'),
      duration: 120, // 2 hours in minutes
      location: {
        address: 'Toa Payoh Central',
        postalCode: '310184'
      },
      status: 'open',
      urgency: 'medium',
      createdAt: new Date('2025-09-01T08:00:00'),
    },
    {
      id: 'req_coffee_chat',
      elderId: 'user_elder2',
      title: 'Coffee Chat Companion',
      description: 'Looking for someone to have coffee and chat with at the void deck. Just need some company and conversation.',
      category: 'wellbeing',
      scheduledDate: new Date('2025-09-06T15:00:00'),
      duration: 60, // 1 hour
      location: {
        address: 'Ang Mo Kio Ave 3',
        postalCode: '560123'
      },
      status: 'open',
      urgency: 'low',
      createdAt: new Date('2025-09-02T10:30:00'),
    },
    {
      id: 'req_doctor_escort',
      elderId: 'user_elder3',
      title: 'Doctor Appointment Escort',
      description: 'Need someone to accompany me to my doctor appointment at the polyclinic. Help with transport and waiting.',
      category: 'general',
      scheduledDate: new Date('2025-09-07T09:00:00'),
      duration: 180, // 3 hours
      location: {
        address: 'Bedok Polyclinic',
        postalCode: '469662'
      },
      status: 'matched',
      urgency: 'high',
      createdAt: new Date('2025-08-30T14:15:00'),
      matchedVolunteerId: 'user_volunteer1'
    },
    {
      id: 'req_household_help',
      elderId: 'user_elder1',
      title: 'Light Household Cleaning',
      description: 'Need help with light cleaning tasks - sweeping, mopping, and organizing. My back has been giving me trouble.',
      category: 'household',
      scheduledDate: new Date('2025-09-08T14:00:00'),
      duration: 90, // 1.5 hours
      location: {
        address: 'Jurong West St 42',
        postalCode: '640123'
      },
      status: 'open',
      urgency: 'medium',
      createdAt: new Date('2025-09-03T11:20:00'),
    }
  ];

  saveRequests(defaultRequests);
  console.log('Default requests initialized');
};

// Get statistics for dashboard
export const getRequestStats = (userId: string, userRole: 'elder' | 'volunteer') => {
  const allRequests = getAllRequests();
  
  if (userRole === 'elder') {
    const myRequests = allRequests.filter(r => r.elderId === userId);
    return {
      activeRequests: myRequests.filter(r => r.status === 'open' || r.status === 'matched').length,
      completedTasks: myRequests.filter(r => r.status === 'completed').length,
      totalRequests: myRequests.length
    };
  } else {
    // Volunteer stats
    const myHelps = allRequests.filter(r => r.matchedVolunteerId === userId);
    return {
      availableRequests: allRequests.filter(r => r.status === 'open').length,
      myCommitments: myHelps.filter(r => r.status === 'matched' || r.status === 'in_progress').length,
      completedTasks: myHelps.filter(r => r.status === 'completed').length
    };
  }
};