
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  BellRing,
  Languages,
  Moon,
  Lock,
  LogOut,
  Smartphone,
  UserCog,
  Trash2,
  HelpCircle,
  MessageCircle,
  Info,
  Share2,
  ChevronRight,
  Globe,
  Bell,
  Shield
} from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [dataSync, setDataSync] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  
  // Initialize darkMode state from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return true;
    }
    return false;
  });
  
  // Update theme when darkMode state changes
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);
  
  const handleLogout = () => {
    // Show loading toast
    toast.loading('Logging out...');
    
    // Simulate logout process
    setTimeout(() => {
      // Set logged out status in localStorage
      localStorage.setItem('isLoggedOut', 'true');
      localStorage.removeItem('userRole');
      
      // Show success toast
      toast.success('Logged out successfully');
      
      // Navigate to login page
      navigate('/login');
    }, 1000);
  };
  
  const handleDeleteAccount = () => {
    toast.error('This is just a demo. Account deletion is not implemented.', {
      description: 'In a real app, this would delete your account after confirmation.'
    });
  };
  
  return (
    <div className="min-h-screen pb-20 md:pb-0 dark:bg-[#1A1F2C] transition-colors duration-200">
      <Header title="Settings" showBackButton />
      
      <div className="px-4 py-4 md:px-6 md:py-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Account Settings */}
          <Card className="dark:bg-[#222222] dark:border-gray-700 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <UserCog className="w-5 h-5 text-primary" />
                Account Settings
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Manage your account preferences and personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingItem
                title="Profile Information"
                description="Update your name, email, and profile details"
                onClick={() => navigate('/profile')}
                icon={<ChevronRight className="w-5 h-5 text-muted-foreground dark:text-gray-400" />}
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Change Password"
                description="Update your password or security questions"
                onClick={() => {}}
                icon={<ChevronRight className="w-5 h-5 text-muted-foreground dark:text-gray-400" />}
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Privacy & Security"
                description="Control your privacy settings and account security"
                onClick={() => {}}
                icon={<ChevronRight className="w-5 h-5 text-muted-foreground dark:text-gray-400" />}
              />
            </CardContent>
          </Card>
          
          {/* App Settings */}
          <Card className="dark:bg-[#222222] dark:border-gray-700 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Smartphone className="w-5 h-5 text-primary" />
                App Settings
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Customize your app experience and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingItem
                title="Notifications"
                description="Manage your notification preferences"
                icon={
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                }
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Dark Mode"
                description="Toggle between light and dark theme"
                icon={
                  <Switch
                    checked={theme}
                    onCheckedChange={(checked) => {
                      setTheme(checked);
                      toast.success(`${checked ? 'Dark' : 'Light'} mode activated`, {
                        description: "Your theme preference has been saved."
                      });
                    }}
                  />
                }
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Language"
                description="Choose your preferred language"
                icon={<LanguageSelector className="w-full md:w-auto" />}
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Data Synchronization"
                description="Automatically sync your data across devices"
                icon={
                  <Switch
                    checked={dataSync}
                    onCheckedChange={setDataSync}
                  />
                }
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Offline Mode"
                description="Access content without internet connection"
                icon={
                  <Switch
                    checked={offlineMode}
                    onCheckedChange={(checked) => {
                      setOfflineMode(checked);
                      toast.success(`Offline mode ${checked ? 'enabled' : 'disabled'}`, {
                        description: checked 
                          ? "App will work without internet connection" 
                          : "Internet connection required for full functionality"
                      });
                    }}
                  />
                }
              />
            </CardContent>
          </Card>
          
          {/* Help & Support */}
          <Card className="dark:bg-[#222222] dark:border-gray-700 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <HelpCircle className="w-5 h-5 text-primary" />
                Help & Support
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Get assistance and learn more about the app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingItem
                title="Contact Support"
                description="Get help with any issues or questions"
                onClick={() => {}}
                icon={<MessageCircle className="w-5 h-5 text-muted-foreground dark:text-gray-400" />}
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="About This App"
                description="Version 1.0.0"
                onClick={() => {}}
                icon={<Info className="w-5 h-5 text-muted-foreground dark:text-gray-400" />}
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Share App"
                description="Invite others to use this application"
                onClick={() => {
                  toast.success("Sharing functionality would open here", {
                    description: "This is just a demo feature"
                  });
                }}
                icon={<Share2 className="w-5 h-5 text-muted-foreground dark:text-gray-400" />}
              />
            </CardContent>
          </Card>
          
          {/* Legal & Policies */}
          <Card className="dark:bg-[#222222] dark:border-gray-700 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Shield className="w-5 h-5 text-primary" />
                Legal & Policies
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Privacy, terms, and legal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingItem
                title="Privacy Policy"
                description="How we handle and protect your data"
                onClick={() => {}}
                icon={<ChevronRight className="w-5 h-5 text-muted-foreground dark:text-gray-400" />}
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Terms of Service"
                description="Conditions for using our application"
                onClick={() => {}}
                icon={<ChevronRight className="w-5 h-5 text-muted-foreground dark:text-gray-400" />}
              />
            </CardContent>
          </Card>
          
          {/* Danger Zone */}
          <Card className="border-destructive/20 dark:bg-[#222222] dark:border-red-900/50 transition-colors duration-200">
            <CardHeader className="text-destructive">
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="w-5 h-5" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-destructive/80">
                Irreversible account actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 dark:border-gray-700 dark:hover:bg-destructive/20"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 dark:border-gray-700 dark:hover:bg-destructive/20"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper component for settings items
const SettingItem = ({ 
  title, 
  description, 
  icon, 
  onClick,
  badge
}: { 
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  badge?: string;
}) => {
  return (
    <div 
      className={`flex items-center justify-between ${onClick ? 'cursor-pointer hover:bg-muted/50 dark:hover:bg-gray-800/50 -mx-2 px-2 py-1 rounded-lg transition-colors' : ''}`}
      onClick={onClick}
    >
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <Label className="text-base cursor-pointer dark:text-white">{title}</Label>
          {badge && (
            <Badge variant="outline" className="text-xs font-normal dark:border-gray-700">
              {badge}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground dark:text-gray-400">{description}</p>
      </div>
      <div className="flex-shrink-0">
        {icon}
      </div>
    </div>
  );
};

export default Settings;
