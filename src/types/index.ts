export interface User {
  id: string;
  email: string;
  name: string;
  role: 'elder' | 'volunteer';
  profilePicture?: string;
  createdAt: Date;
  isVerified: boolean;
}

export interface Elder extends User {
  role: 'elder';
  age: number;
  nric: string;
  needs: string[];
  preferredCommunication: 'text' | 'voice' | 'video';
  languages: Language[];
  emergencyContact?: EmergencyContact;
  disabilities?: string[];
}

export interface Volunteer extends User {
  role: 'volunteer';
  nric: string;
  address: string;
  servicesOffered: string[];
  availability: TimeSlot[];
  location: Location;
  languages: Language[];
  rating: number;
  completedTasks: number;
}

export interface AssistanceRequest {
  id: string;
  elderId: string;
  title: string;
  description: string;
  category: 'general' | 'household' | 'wellbeing' | 'shopping';
  scheduledDate: Date;
  duration: number;
  location: Location;
  status: 'open' | 'matched' | 'in_progress' | 'completed' | 'cancelled';
  matchedVolunteerId?: string;
  createdAt: Date;
  urgency: 'low' | 'medium' | 'high';
}

export interface Location {
  address: string;
  postalCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Language {
  code: 'en' | 'zh' | 'ms' | 'ta';
  name: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  elderId: string;
  volunteerId: string;
  assistanceRequestId: string;
  messages: Message[];
  lastMessageAt: Date;
}

export interface Review {
  id: string;
  reviewerId: string;
  revieweeId: string;
  assistanceRequestId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}