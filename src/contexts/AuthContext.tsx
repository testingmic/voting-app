import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import apiService from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login for demo purposes
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: email,
        organization: 'Sample School',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        twoFactorEnabled: false,
        createdAt: new Date().toISOString()
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      
      // Uncomment the following lines when your backend is ready
      // const response = await apiService.login({ email, password, rememberMe });
      // if (response.success && response.data) {
      //   const { user: userData, token } = response.data;
      //   localStorage.setItem('authToken', token);
      //   localStorage.setItem('user', JSON.stringify(userData));
      //   setUser(userData);
      // } else {
      //   throw new Error(response.message || 'Login failed');
      // }
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: any) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful signup for demo purposes
      const mockUser: User = {
        id: 1,
        name: data.name,
        email: data.email,
        organization: data.organizationName,
        role: 'admin',
        avatar: `https://ui-avatars.com/api/?name=${data.name}&background=3b82f6&color=fff`,
        twoFactorEnabled: false,
        createdAt: new Date().toISOString()
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      
      // Uncomment the following lines when your backend is ready
      // const response = await apiService.signup(data);
      // if (response.success && response.data) {
      //   const { user: userData, token } = response.data;
      //   localStorage.setItem('authToken', token);
      //   localStorage.setItem('user', JSON.stringify(userData));
      //   setUser(userData);
      // } else {
      //   throw new Error(response.message || 'Signup failed');
      // }
    } catch (error: any) {
      throw new Error(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      const response = await apiService.updateUserProfile(data);
      
      if (response.success && response.data) {
        const updatedUser = { ...user, ...response.data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        throw new Error(response.message || 'Failed to update user');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update user');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 