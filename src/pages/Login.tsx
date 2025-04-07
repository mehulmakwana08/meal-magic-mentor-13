import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Key, LogIn, Send, KeyRound, Lock } from 'lucide-react';
import Header from '@/components/Header';
import AnimatedButton from '@/components/AnimatedButton';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import authService from '@/services/authService';
import { AxiosError } from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetEmail, setResetEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState<'email' | 'code' | 'newPassword'>('email');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the login API endpoint
      const response = await authService.login({
        email,
        password
      });
      
      console.log("Login response:", response);
      
      // Fixed: Correctly access the role from the API response
      const userRole = response?.user?.role || "doctor";
      console.log("User role:", userRole);
      
      // Store auth token or user info from response
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('isLoggedOut', 'false');
      localStorage.setItem('token', response.token);
      
      // Show success toast
      toast({
        title: "Login successful",
        description: `Welcome back to NutriTrack as a ${userRole}!`,
      });
      
      // Handle redirection based on role
      if (userRole === 'mother') {
        const surveyCompleted = localStorage.getItem('motherSurveyCompleted');
        if (!surveyCompleted) {
          // First time login as mother, redirect to survey
          navigate('/mother-survey');
        } else {
          // Already completed survey, go to mother home
          navigate('/');
        }
        return;
      } else if (userRole === 'admin') {
        // Redirect admin to nutritionist dashboard
        navigate('/');
        return;
      } else if (userRole === 'nutritionist') {
        // Redirect nutritionist to nutritionist dashboard
        navigate('/nutritionist');
        return;
      } else if (userRole === 'anganwadi') {

        navigate('/anganwadi-dashboard');
        return;
      }
      
      // Doctor role or any other case
      navigate('/');
    } catch (err) {
      // Handle error
      const error = err as AxiosError<{error?: string; message?: string}>;
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          'Invalid email or password. Please try again.';
      
      setError(errorMessage);
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setResetLoading(true);
    
    try {
      if (resetStep === 'email') {
        // Request forgot password OTP
        await authService.forgotPassword({ email: resetEmail });
        
        toast({
          title: "Reset email sent",
          description: `Check your inbox at ${resetEmail} for a reset code.`,
        });
        setResetStep('code');
      } else if (resetStep === 'code') {
        // Verify OTP
        await authService.verifyOTP({ 
          email: resetEmail,
          otp: resetCode 
        });
        
        setResetStep('newPassword');
      } else if (resetStep === 'newPassword') {
        // Reset password
        await authService.resetPassword({
          password: newPassword
        });
        
        toast({
          title: "Password reset successful",
          description: "You can now log in with your new password.",
        });
        
        // Close the dialog and reset the form
        setShowForgotPassword(false);
        setResetStep('email');
        setResetEmail('');
        setResetCode('');
        setNewPassword('');
      }
    } catch (err) {
      // Handle error
      const error = err as AxiosError<{error?: string; message?: string}>;
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          'Something went wrong. Please try again.';
      
      toast({
        title: "Reset failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setResetLoading(false);
    }
  };

  const resetPasswordContent = () => {
    switch (resetStep) {
      case 'email':
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Enter your email address and we'll send you a code to reset your password.
            </p>
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button 
              onClick={handleResetPassword} 
              disabled={resetLoading || !resetEmail} 
              className="w-full"
            >
              {resetLoading ? "Sending..." : "Send Reset Code"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      
      case 'code':
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Enter the 6-digit code sent to your email.
            </p>
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="6-digit code"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className="pl-10"
                  required
                  maxLength={6}
                />
              </div>
            </div>
            <Button 
              onClick={handleResetPassword} 
              disabled={resetLoading || resetCode.length < 6} 
              className="w-full"
            >
              {resetLoading ? "Verifying..." : "Verify Code"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setResetStep('email');
                  setResetCode('');
                }}
                className="text-primary text-sm hover:underline"
              >
                Back to email
              </button>
            </div>
          </div>
        );
      
      case 'newPassword':
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Create a new password for your account.
            </p>
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button 
              onClick={handleResetPassword} 
              disabled={resetLoading || newPassword.length < 6} 
              className="w-full"
            >
              {resetLoading ? "Updating..." : "Reset Password"}
              <Key className="ml-2 h-4 w-4" />
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setResetStep('code');
                  setNewPassword('');
                }}
                className="text-primary text-sm hover:underline"
              >
                Back to code verification
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 mx-auto max-w-7xl">
        <div className="w-full max-w-md space-y-8 animate-fade-in bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary md:text-3xl">Welcome Back</h1>
            <p className="mt-2 text-muted-foreground">Log in to access your nutrition journey</p>
          </div>
          
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button 
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <div>
              <AnimatedButton
                type="submit"
                fullWidth
                color="teal"
                size="lg"
                icon={LogIn}
                className="mt-6"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log in'}
              </AnimatedButton>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-primary hover:text-primary/80 inline-flex items-center">
                Create an account <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              Follow the steps to reset your password and regain access to your account.
            </DialogDescription>
          </DialogHeader>
          
          <Card className="border-0 shadow-none">
            <CardContent className="p-0 pt-4">
              {resetPasswordContent()}
            </CardContent>
          </Card>
          
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowForgotPassword(false);
                setResetStep('email');
                setResetEmail('');
                setResetCode('');
                setNewPassword('');
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;