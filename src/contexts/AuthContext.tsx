import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, Elder, Volunteer } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'elder' | 'volunteer';
  additionalData?: Partial<Elder | Volunteer>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('kampong_connect_user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch (error) {
          localStorage.removeItem('kampong_connect_user');
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Mock authentication - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email,
        name: email.includes('elder') ? 'John Elder' : 'Jane Volunteer',
        role: email.includes('elder') ? 'elder' : 'volunteer',
        createdAt: new Date(),
        isVerified: true,
      };

      localStorage.setItem('kampong_connect_user', JSON.stringify(mockUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
      return true;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Mock registration - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        createdAt: new Date(),
        isVerified: false,
      };

      localStorage.setItem('kampong_connect_user', JSON.stringify(newUser));
      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
      return true;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('kampong_connect_user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};