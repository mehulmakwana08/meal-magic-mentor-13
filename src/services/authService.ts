import axios from 'axios';

// Base URL for API calls
const API_BASE_URL = 'http://localhost:5000/api/v1/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Important for CORS with credentials
});

// Interface for registration data
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

// Interface for login data
export interface LoginData {
  email: string;
  password: string;
}

// Interface for forgot password data
export interface ForgotPasswordData {
  email: string;
}

// Interface for verify OTP data
export interface VerifyOTPData {
  email: string;
  otp: string;
}

// Interface for reset password data
export interface ResetPasswordData {
  password: string;
  token?: string;
}

// Interface for update details data
export interface UpdateDetailsData {
  name?: string;
  email?: string;
}

// Interface for update password data
export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

// Authentication service functions
const authService = {
  // Register a new user
  register: async (userData: RegisterData) => {
    try {
      const response = await api.post('/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Login a user
  login: async (loginData: LoginData) => {
    try {
      const response = await api.post('/login', loginData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (data: ForgotPasswordData) => {
    try {
      const response = await api.post('/forgotpassword', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Verify OTP
  verifyOTP: async (data: VerifyOTPData) => {
    try {
      const response = await api.post('/verifyotp', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reset password
  resetPassword: async (data: ResetPasswordData) => {
    try {
      const response = await api.put('/resetpassword', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.get('/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user details
  updateDetails: async (data: UpdateDetailsData) => {
    try {
      const response = await api.put('/updatedetails', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update password
  updatePassword: async (data: UpdatePasswordData) => {
    try {
      const response = await api.put('/updatepassword', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Verify email
  verifyEmail: async (token: string) => {
    try {
      const response = await api.get(`/verify/${token}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Resend verification email
  resendVerificationEmail: async () => {
    try {
      const response = await api.post('/verify/resend');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;