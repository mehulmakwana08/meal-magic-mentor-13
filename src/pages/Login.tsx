
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Key, LogIn } from 'lucide-react';
import Header from '@/components/Header';
import AnimatedButton from '@/components/AnimatedButton';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState<'doctor' | 'mother'>('doctor');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login for demo purposes
    setTimeout(() => {
      setIsLoading(false);
      
      // Store user role in localStorage
      localStorage.setItem('userRole', userRole);
      
      toast({
        title: "Login successful",
        description: `Welcome back to NutriTrack as a ${userRole}!`,
      });
      
      navigate('/');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Login" className="md:top-0" />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">Welcome Back</h1>
            <p className="mt-2 text-muted-foreground">Log in to access your nutrition journey</p>
          </div>
          
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
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  I am a:
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setUserRole('doctor')}
                    className={`flex-1 py-2 px-4 rounded-lg border border-border transition-colors ${
                      userRole === 'doctor'
                        ? 'bg-primary text-white'
                        : 'bg-background hover:bg-muted'
                    }`}
                  >
                    Doctor/Worker
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserRole('mother')}
                    className={`flex-1 py-2 px-4 rounded-lg border border-border transition-colors ${
                      userRole === 'mother'
                        ? 'bg-primary text-white'
                        : 'bg-background hover:bg-muted'
                    }`}
                  >
                    Mother/Patient
                  </button>
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
                <a href="#" className="font-medium text-primary hover:text-primary/80">
                  Forgot password?
                </a>
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
    </div>
  );
};

export default Login;
