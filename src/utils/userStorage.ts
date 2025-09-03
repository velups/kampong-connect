import { User } from '../types';

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  role: 'elder' | 'volunteer';
  passwordHash: string;
  createdAt: Date;
  isVerified: boolean;
}

// Simple hash function for demo purposes - in production use bcrypt or similar
const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
};

const verifyPassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash;
};

// Storage key for all registered users
const USERS_STORAGE_KEY = 'kampong_connect_registered_users';

// Get all registered users from localStorage
export const getAllUsers = (): StoredUser[] => {
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
};

// Save all users to localStorage
const saveUsers = (users: StoredUser[]): void => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

// Find user by email
export const findUserByEmail = (email: string): StoredUser | null => {
  const users = getAllUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
};

// Register a new user
export const registerUser = (userData: {
  name: string;
  email: string;
  password: string;
  role: 'elder' | 'volunteer';
}): { success: boolean; error?: string; user?: User } => {
  const users = getAllUsers();
  
  // Check if user already exists
  if (findUserByEmail(userData.email)) {
    return { success: false, error: 'User with this email already exists' };
  }

  // Create new user
  const newStoredUser: StoredUser = {
    id: 'user_' + Math.random().toString(36).substr(2, 9),
    email: userData.email,
    name: userData.name,
    role: userData.role,
    passwordHash: hashPassword(userData.password),
    createdAt: new Date(),
    isVerified: false,
  };

  // Add to users array and save
  users.push(newStoredUser);
  saveUsers(users);

  // Return public user data (without password hash)
  const publicUser: User = {
    id: newStoredUser.id,
    email: newStoredUser.email,
    name: newStoredUser.name,
    role: newStoredUser.role,
    createdAt: newStoredUser.createdAt,
    isVerified: newStoredUser.isVerified,
  };

  return { success: true, user: publicUser };
};

// Authenticate user login
export const authenticateUser = (email: string, password: string): { success: boolean; error?: string; user?: User } => {
  const storedUser = findUserByEmail(email);
  
  if (!storedUser) {
    return { success: false, error: 'User not found' };
  }

  if (!verifyPassword(password, storedUser.passwordHash)) {
    return { success: false, error: 'Invalid password' };
  }

  // Return public user data (without password hash)
  const publicUser: User = {
    id: storedUser.id,
    email: storedUser.email,
    name: storedUser.name,
    role: storedUser.role,
    createdAt: storedUser.createdAt,
    isVerified: storedUser.isVerified,
  };

  return { success: true, user: publicUser };
};

// Initialize with some default users for testing
export const initializeDefaultUsers = (): void => {
  const existingUsers = getAllUsers();
  if (existingUsers.length > 0) {
    return; // Users already exist, don't initialize
  }

  const defaultUsers = [
    {
      name: 'John Elder',
      email: 'elder@example.com',
      password: 'elder123',
      role: 'elder' as const,
    },
    {
      name: 'Mary Elder',
      email: 'mary.elder@kampong.sg',
      password: 'mary123',
      role: 'elder' as const,
    },
    {
      name: 'Jane Volunteer',
      email: 'volunteer@example.com',
      password: 'volunteer123',
      role: 'volunteer' as const,
    },
    {
      name: 'David Helper',
      email: 'david@kampong.sg',
      password: 'david123',
      role: 'volunteer' as const,
    },
  ];

  defaultUsers.forEach(userData => {
    registerUser(userData);
  });

  console.log('Default users initialized:', defaultUsers.map(u => ({ email: u.email, password: u.password, role: u.role })));
};

// Get user list for admin purposes (without password hashes)
export const getUserList = (): Array<{ id: string; email: string; name: string; role: string; createdAt: Date }> => {
  return getAllUsers().map(user => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
  }));
};