export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  timezone?: string;
  bio?: string;
  organization?: string;
  role: 'admin' | 'voter' | 'user';
  avatar?: string;
  twoFactorEnabled?: boolean;
  createdAt?: string;
}

export interface Election {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'paused' | 'completed';
  totalVoters: number;
  totalVotes: number;
  candidates: Candidate[];
  eligibilityRules?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Candidate {
  id: number;
  name: string;
  position: string;
  bio: string;
  manifesto?: string;
  photoUrl?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  electionId: number;
  voteCount: number;
  createdAt: string;
}

export interface Vote {
  id: number;
  electionId: number;
  candidateId: number;
  voterId: number;
  deviceFingerprint: string;
  ipAddress: string;
  createdAt: string;
}

export interface Notification {
  id: number;
  userId: number;
  type: 'email' | 'sms' | 'in-app';
  title: string;
  message: string;
  status: 'sent' | 'pending' | 'failed';
  sentAt?: string;
  createdAt: string;
}

export interface Analytics {
  totalVoters: number;
  totalVotes: number;
  turnoutRate: number;
  deviceTypes: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  browserStats: {
    chrome: number;
    firefox: number;
    safari: number;
    edge: number;
  };
  votingTimeline: {
    hour: number;
    votes: number;
  }[];
  results: {
    candidateId: number;
    candidateName: string;
    votes: number;
    percentage: number;
  }[];
}

export interface Organization {
  id: number;
  name: string;
  type: 'school' | 'church' | 'organization';
  logo?: string;
  primaryColor?: string;
  subscriptionPlan: 'free' | 'premium';
  settings: {
    enableTwoFactor: boolean;
    enableDeviceFingerprinting: boolean;
    enableNotifications: boolean;
    customBranding: boolean;
  };
  createdAt: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  status?: string;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  organizationName: string;
  organizationType: 'school' | 'church' | 'organization';
}

export interface CreateElectionData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  eligibilityRules?: string[];
}

export interface CreateCandidateData {
  name: string;
  position: string;
  bio: string;
  manifesto?: string;
  photoUrl?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  electionId: number;
} 