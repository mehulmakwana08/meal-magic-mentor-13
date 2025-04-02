import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
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
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage, languages } from '@/contexts/LanguageContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { SettingItem } from '@/components/SettingItem';

const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [dataSync, setDataSync] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  
  const { theme, setTheme } = useTheme();
  const { currentLanguage, setLanguage } = useLanguage();
  
  const handleLogout = () => {
    toast.loading('Logging out...');
    setTimeout(() => {
      localStorage.setItem('isLoggedOut', 'true');
      localStorage.removeItem('userRole');
      toast.success('Logged out successfully');
      navigate('/login');
    }, 1000);
  };
  
  const handleDeleteAccount = () => {
    toast.error('This is just a demo. Account deletion is not implemented.', {
      description: 'In a real app, this would delete your account after confirmation.'
    });
  };

  const handleLanguageChange = (code: string) => {
    const selected = languages.find(lang => lang.code === code);
    if (selected) {
      setLanguage(selected);
      toast.success(`Language changed to ${selected.name}`, {
        description: "Your language preference has been saved."
      });
    }
  };
  
  return (
    <div className="min-h-screen pb-20 md:pb-0 dark:bg-[#1A1F2C] transition-colors duration-200">
      <Header title="Settings" showBackButton />
      
      <div className="px-4 py-4 md:px-6 md:py-6 max-w-4xl mx-auto">
        <div className="space-y-6">
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
                title="Privacy & Security"
                description="Control your privacy settings and account security"
                onClick={() => navigate('/privacy-security')}
                icon={<ChevronRight className="w-5 h-5 text-muted-foreground dark:text-gray-400" />}
                badge="New"
              />
            </CardContent>
          </Card>
          
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
                      toast.success(`${checked ? 'Dark' : 'Light'}` + ' mode activated', {
                        description: "Your theme preference has been saved."
                      });
                    }}
                  />
                }
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Language"
                description="Choose your preferred language and font"
                icon={
                  <Select 
                    defaultValue={currentLanguage.code}
                    onValueChange={handleLanguageChange}
                  >
                    <SelectTrigger className="w-36 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      {languages.map((lang) => (
                        <SelectItem 
                          key={lang.code} 
                          value={lang.code}
                          className="dark:text-white dark:focus:bg-gray-700"
                        >
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                }
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
                onClick={() => navigate('/share-app')}
                icon={<Share2 className="w-5 h-5 text-muted-foreground dark:text-gray-400" />}
                badge="New"
              />
            </CardContent>
          </Card>
          
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
                onClick={() => navigate('/privacy-security')}
                icon={<ChevronRight className="w-5 h-5 text-muted-foreground dark:text-gray-400" />}
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Terms of Service"
                description="Conditions for using our application"
                onClick={() => navigate('/terms-of-service')}
                icon={<ChevronRight className="w-5 h-5 text-muted-foreground dark:text-gray-400" />}
              />
            </CardContent>
          </Card>
          
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

export default Settings;
