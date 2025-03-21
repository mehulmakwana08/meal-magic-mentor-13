
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, KeyRound, Lock, ArrowRight } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';

enum ResetStep {
  EMAIL = 0,
  VERIFICATION = 1,
  NEW_PASSWORD = 2,
  SUCCESS = 3
}

const ForgotPassword = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentStep, setCurrentStep] = useState<ResetStep>(ResetStep.EMAIL);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setEmail('');
    setVerificationCode('');
    setNewPassword('');
    setConfirmPassword('');
    setCurrentStep(ResetStep.EMAIL);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form after dialog is closed with animation
    setTimeout(resetForm, 300);
  };

  const sendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for demo
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(ResetStep.VERIFICATION);
      toast({
        title: "Reset email sent",
        description: "Please check your inbox for the verification code",
      });
    }, 1500);
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length < 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for demo
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(ResetStep.NEW_PASSWORD);
      toast({
        title: "Code verified",
        description: "Please set your new password",
      });
    }, 1500);
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      toast({
        title: "Invalid password",
        description: "Password should be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for demo
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(ResetStep.SUCCESS);
      toast({
        title: "Password reset successful",
        description: "You can now log in with your new password",
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="font-medium text-primary hover:text-primary/80">
          Forgot password?
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {currentStep === ResetStep.EMAIL && "Reset Your Password"}
            {currentStep === ResetStep.VERIFICATION && "Enter Verification Code"}
            {currentStep === ResetStep.NEW_PASSWORD && "Create New Password"}
            {currentStep === ResetStep.SUCCESS && "Password Reset Complete"}
          </DialogTitle>
          <DialogDescription>
            {currentStep === ResetStep.EMAIL && "Enter your email address to receive a verification code"}
            {currentStep === ResetStep.VERIFICATION && "Enter the code we sent to your email"}
            {currentStep === ResetStep.NEW_PASSWORD && "Your new password must be at least 8 characters long"}
            {currentStep === ResetStep.SUCCESS && "Your password has been reset successfully"}
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Email Form */}
        {currentStep === ResetStep.EMAIL && (
          <form onSubmit={sendResetEmail} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0 mt-4">
              <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
              <AnimatedButton
                type="submit"
                color="teal"
                icon={ArrowRight}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Code"}
              </AnimatedButton>
            </DialogFooter>
          </form>
        )}

        {/* Step 2: Verification Code Form */}
        {currentStep === ResetStep.VERIFICATION && (
          <form onSubmit={verifyCode} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="verification-code" className="text-sm font-medium">
                Verification Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="verification-code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="123456"
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-sm text-muted-foreground">
                We sent a code to {email}
              </p>
            </div>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0 mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setCurrentStep(ResetStep.EMAIL)}
              >
                Back
              </Button>
              <AnimatedButton
                type="submit"
                color="teal"
                icon={ArrowRight}
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </AnimatedButton>
            </DialogFooter>
          </form>
        )}

        {/* Step 3: New Password Form */}
        {currentStep === ResetStep.NEW_PASSWORD && (
          <form onSubmit={resetPassword} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="new-password" className="text-sm font-medium">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                  required
                  minLength={8}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0 mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setCurrentStep(ResetStep.VERIFICATION)}
              >
                Back
              </Button>
              <AnimatedButton
                type="submit"
                color="teal"
                icon={ArrowRight}
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </AnimatedButton>
            </DialogFooter>
          </form>
        )}

        {/* Step 4: Success */}
        {currentStep === ResetStep.SUCCESS && (
          <div className="py-4 flex flex-col items-center">
            <div className="mb-4 p-2 rounded-full bg-green-100">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-center text-muted-foreground mb-4">
              You can now log in with your new password
            </p>
            <Button className="w-full" onClick={handleClose}>
              Return to Login
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
