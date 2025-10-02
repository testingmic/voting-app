import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  User, 
  Election, 
  Candidate, 
  Vote, 
  Notification, 
  Analytics, 
  Organization,
  ApiResponse,
  LoginCredentials,
  SignupData,
  CreateElectionData,
  CreateCandidateData
} from '../types';
import toast from 'react-hot-toast';

class ApiService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  private handleError(error: any) {
    // let errorMessage = error.response.data.data;
    // for (const field in errorMessage) {
    //   const message = errorMessage[field];
    //   toast.error(message);
    // }
  }

  // Authentication
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response: AxiosResponse<ApiResponse<{ user: User; token: string }>> = await this.api.post('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Login failed');
    }
  }

  async signup(data: SignupData): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response: AxiosResponse<ApiResponse<{ user: User; token: string }>> = await this.api.post('/auth/signup', data);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Signup failed');
    }
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  // Elections
  async getElections(): Promise<ApiResponse<Election[]>> {
    try {
      const response: AxiosResponse<ApiResponse<Election[]>> = await this.api.get('/elections?token=' + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to fetch elections');
    }
  }

  async getElection(id: number): Promise<ApiResponse<Election>> {
    try {
      const response: AxiosResponse<ApiResponse<Election>> = await this.api.get(`/elections/${id}?token=` + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to fetch election');
    }
  }

  async createElection(data: CreateElectionData): Promise<ApiResponse<Election>> {
    try {
      const response: AxiosResponse<ApiResponse<Election>> = await this.api.post('/elections?token=' + localStorage.getItem('authToken'), data);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to create election');
    }
  }

  async updateElection(id: number, data: Partial<CreateElectionData>): Promise<ApiResponse<Election>> {
    try {
      const response: AxiosResponse<ApiResponse<Election>> = await this.api.put(`/elections/${id}?token=` + localStorage.getItem('authToken'), data);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to update election');
    }
  }

  async deleteElection(id: number): Promise<ApiResponse<void>> {
    try {
      const response: AxiosResponse<ApiResponse<void>> = await this.api.delete(`/elections/${id}?token=` + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to delete election');
    }
  }

  async pauseElection(id: number): Promise<ApiResponse<Election>> {
    try {
      const response: AxiosResponse<ApiResponse<Election>> = await this.api.post(`/elections/${id}/pause?token=` + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to pause election');
    }
  }

  async resumeElection(id: number): Promise<ApiResponse<Election>> {
    try {
      const response: AxiosResponse<ApiResponse<Election>> = await this.api.post(`/elections/${id}/resume?token=` + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to resume election');
    }
  }

  async closeElection(id: number): Promise<ApiResponse<Election>> {
    try {
      const response: AxiosResponse<ApiResponse<Election>> = await this.api.post(`/elections/${id}/close?token=` + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to close election');
    }
  }

  // Candidates
  async getCandidates(electionId?: number): Promise<ApiResponse<Candidate[]>> {
    try {
      const url = electionId ? `/candidates?electionId=${electionId}` : '/candidates';
      const response: AxiosResponse<ApiResponse<Candidate[]>> = await this.api.get(url + '?token=' + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to fetch candidates');
    }
  }

  async getCandidate(id: number): Promise<ApiResponse<Candidate>> {
    try {
      const response: AxiosResponse<ApiResponse<Candidate>> = await this.api.get(`/candidates/${id}?token=` + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.data || 'Failed to fetch candidate');
    }
  }

  async createCandidate(data: CreateCandidateData): Promise<ApiResponse<Candidate>> {
    try {
      const response: AxiosResponse<ApiResponse<Candidate>> = await this.api.post('/candidates?token=' + localStorage.getItem('authToken'), data);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.request.responseText || 'Failed to create candidate');
    }
  }

  async updateCandidate(id: number, data: Partial<CreateCandidateData>): Promise<ApiResponse<Candidate>> {
    try {
      const response: AxiosResponse<ApiResponse<Candidate>> = await this.api.put(`/candidates/${id}?token=` + localStorage.getItem('authToken'), data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.data || 'Failed to update candidate');
    }
  }

  async deleteCandidate(id: number): Promise<ApiResponse<void>> {
    try {
      const response: AxiosResponse<ApiResponse<void>> = await this.api.delete(`/candidates/${id}?token=` + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.data || 'Failed to delete candidate');
    }
  }

  // Voting
  async castVote(electionId: number, candidateId: number, deviceFingerprint: string): Promise<ApiResponse<Vote>> {
    try {
      const response: AxiosResponse<ApiResponse<Vote>> = await this.api.post('/votes', {
        token: localStorage.getItem('authToken'),
        electionId,
        candidateId,
        deviceFingerprint,
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to cast vote');
    }
  }

  async getVoteStatus(electionId: number): Promise<ApiResponse<{ hasVoted: boolean; votedFor?: number }>> {
    try {
      const response: AxiosResponse<ApiResponse<{ hasVoted: boolean; votedFor?: number }>> = await this.api.get(`/votes/status/${electionId}?token=` + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to get vote status');
    }
  }

  // Analytics
  async getAnalytics(electionId: number): Promise<ApiResponse<Analytics>> {
    try {
      const response: AxiosResponse<ApiResponse<Analytics>> = await this.api.get(`/analytics/${electionId}?token=` + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to fetch analytics');
    }
  }

  // Notifications
  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    try {
      const response: AxiosResponse<ApiResponse<Notification[]>> = await this.api.get('/notifications?token=' + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to fetch notifications');
    }
  }

  async markNotificationAsRead(id: number): Promise<ApiResponse<void>> {
    try {
      const response: AxiosResponse<ApiResponse<void>> = await this.api.put(`/notifications/${id}/read?token=` + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to mark notification as read');
    }
  }

  // Users
  async getUsers(): Promise<ApiResponse<any | []>> {
    try {
      const response: AxiosResponse<ApiResponse<any | []>> = await this.api.get('/users?token=' + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to fetch users');
    }
  }

  // User Profile
  async getUserProfile(): Promise<ApiResponse<any | []>> {
    try {
      const response: AxiosResponse<ApiResponse<any | []>> = await this.api.get('/users/profile?token=' + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to fetch user profile',
        data: []
      };
    }
  }

  async getUserActivities(): Promise<ApiResponse<any | []>> {
    try {
      const response: AxiosResponse<ApiResponse<any | []>> = await this.api.get('/users/activities?token=' + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: 'Failed to fetch user activities',
        data: []
      };
    }
  }

  async updateUserProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<ApiResponse<User>> = await this.api.put('/user/profile?token=' + localStorage.getItem('authToken'), data);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to update user profile');
    }
  }

  // Organization
  async getOrganization(): Promise<ApiResponse<Organization>> {
    try {
      const response: AxiosResponse<ApiResponse<Organization>> = await this.api.get('/organization?token=' + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to fetch organization');
    }
  }

  async updateOrganization(data: Partial<Organization>): Promise<ApiResponse<Organization>> {
    try {
      const response: AxiosResponse<ApiResponse<Organization>> = await this.api.put('/organization?token=' + localStorage.getItem('authToken'), data);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to update organization');
    }
  }

  // Password Reset
  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    try {
      const response: AxiosResponse<ApiResponse<void>> = await this.api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to send reset email');
    }
  }

  async validateResetToken(token: string): Promise<ApiResponse<{ valid: boolean; email?: string }>> {
    try {
      const response: AxiosResponse<ApiResponse<{ valid: boolean; email?: string }>> = await this.api.get(`/auth/reset-password/validate/${token}`);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Invalid or expired reset token');
    }
  }

  async resetPassword(token: string, email: string, password: string): Promise<ApiResponse<void>> {
    try {
      const response: AxiosResponse<ApiResponse<void>> = await this.api.post('/auth/reset-password', { token, email, password });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Failed to reset password');
    }
  }

  // Organization Logo Upload
  async uploadOrganizationLogo(logoFile: File): Promise<ApiResponse<{ logoUrl: string }>> {
    try {
      const formData = new FormData();
      formData.append('logo', logoFile);
      
      const response: AxiosResponse<ApiResponse<{ logoUrl: string }>> = await this.api.put('/organization?token=' + localStorage.getItem('authToken'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Logo upload failed');
    }
  }

  async removeOrganizationLogo(): Promise<ApiResponse<void>> {
    try {
      const response: AxiosResponse<ApiResponse<void>> = await this.api.delete('/organization/removelogo?token=' + localStorage.getItem('authToken'));
      return response.data;
    } catch (error: any) {
      this.handleError(error);
      throw new Error(error.response?.data?.data || 'Logo removal failed');
    }
  }
}

export const apiService = new ApiService();
export default apiService; 