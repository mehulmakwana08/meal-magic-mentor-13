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
  Shield,
  Moon,
  Sun
} from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import { useNavigate } from 'react-router-dom';
import { useLanguage, languages } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
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
  
  const { currentLanguage, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
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
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title="Settings" showBackButton />
      
      <div className="px-4 py-4 md:px-6 md:py-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="w-5 h-5 text-primary" />
                Account Settings
              </CardTitle>
              <CardDescription>
                Manage your account preferences and personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingItem
                title="Profile Information"
                description="Update your name, email, and profile details"
                onClick={() => navigate('/profile')}
                icon={<ChevronRight className="w-5 h-5 text-muted-foreground" />}
              />
              <Separator />
              <SettingItem
                title="Privacy & Security"
                description="Control your privacy settings and account security"
                onClick={() => navigate('/privacy-security')}
                icon={<ChevronRight className="w-5 h-5 text-muted-foreground" />}
                badge="New"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-primary" />
                App Settings
              </CardTitle>
              <CardDescription>
                Customize your app experience and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingItem
                title="Theme"
                description={`Currently using ${theme} theme`}
                icon={
                  <div className="flex items-center gap-2">
                    {theme === 'dark' ? 
                      <Moon className="w-5 h-5 text-muted-foreground mr-2" /> : 
                      <Sun className="w-5 h-5 text-muted-foreground mr-2" />
                    }
                    <Switch
                      checked={theme === 'dark'}
                      onCheckedChange={toggleTheme}
                    />
                  </div>
                }
              />
              <Separator />
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
              <Separator />
              <SettingItem
                title="Language"
                description="Choose your preferred language and font"
                icon={
                  <Select 
                    defaultValue={currentLanguage.code}
                    onValueChange={handleLanguageChange}
                  >
                    <SelectTrigger className="w-36 bg-white dark:bg-muted">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem 
                          key={lang.code} 
                          value={lang.code}
                        >
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                }
              />
              <Separator />
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
              <Separator />
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
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Help & Support
              </CardTitle>
              <CardDescription>
                Get assistance and learn more about the app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingItem
                title="Contact Support"
                description="Get help with any issues or questions"
                onClick={() => {}}
                icon={<MessageCircle className="w-5 h-5 text-muted-foreground" />}
              />
              <Separator />
              <SettingItem
                title="About This App"
                description="Version 1.0.0"
                onClick={() => {}}
                icon={<Info className="w-5 h-5 text-muted-foreground" />}
              />
              <Separator />
              <SettingItem
                title="Share App"
                description="Invite others to use this application"
                onClick={() => navigate('/share-app')}
                icon={<Share2 className="w-5 h-5 text-muted-foreground" />}
                badge="New"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Legal & Policies
              </CardTitle>
              <CardDescription>
                Privacy, terms, and legal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingItem
                title="Privacy Policy"
                description="How we handle and protect your data"
                onClick={() => navigate('/privacy-security')}
                icon={<ChevronRight className="w-5 h-5 text-muted-foreground" />}
              />
              <Separator />
              <SettingItem
                title="Terms of Service"
                description="Conditions for using our application"
                onClick={() => navigate('/terms-of-service')}
                icon={<ChevronRight className="w-5 h-5 text-muted-foreground" />}
              />
            </CardContent>
          </Card>
          
          <Card className="border-destructive/20">
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
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
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
