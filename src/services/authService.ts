
const API_URL = 'YOUR_MONGODB_API_URL';

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export const authService = {
  // Send reset password email
  sendResetEmail: async (email: string): Promise<ResetPasswordResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: 'Failed to send reset email' };
    }
  },

  // Verify reset code
  verifyResetCode: async (email: string, code: string): Promise<ResetPasswordResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/verify-reset-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: 'Failed to verify code' };
    }
  },

  // Reset password
  resetPassword: async (email: string, code: string, newPassword: string): Promise<ResetPasswordResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code, newPassword }),
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: 'Failed to reset password' };
    }
  },
};
