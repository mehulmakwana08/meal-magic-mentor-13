
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Bell, 
  Key, 
  Fingerprint, 
  Globe, 
  Info, 
  LogOut,
  AlertTriangle,
  History,
  FileText,
  UserX
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { SettingItem } from '@/components/SettingItem';
import { CollapsibleContent, Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';

const PrivacySecurity = () => {
  const navigate = useNavigate();
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [dataSharingConsent, setDataSharingConsent] = useState(true);
  const [trackingConsent, setTrackingConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [locationSharing, setLocationSharing] = useState(false);
  const [passwordProtection, setPasswordProtection] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [openDataSharing, setOpenDataSharing] = useState(false);

  const handleChangePassword = () => {
    toast.info("Change Password function", {
      description: "This would navigate to a password change form."
    });
  };

  const handleDeleteData = () => {
    toast.error("Data Deletion Request", {
      description: "This would initiate a process to delete all your personal data."
    });
  };

  const handle2FAToggle = (checked: boolean) => {
    setTwoFactorAuth(checked);
    toast.success(`Two-factor authentication ${checked ? 'enabled' : 'disabled'}`, {
      description: checked ? 
        "Your account is now more secure with 2FA" : 
        "Two-factor authentication has been turned off"
    });
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 dark:bg-[#1A1F2C] transition-colors duration-200">
      <Header title="Privacy & Security" showBackButton />
      
      <div className="px-4 py-4 md:px-6 md:py-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          <Card className="dark:bg-[#222222] dark:border-gray-700 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Lock className="w-5 h-5 text-primary" />
                Security Settings
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Manage your account security and authentication methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingItem
                title="Change Password"
                description="Update your password regularly for better security"
                onClick={handleChangePassword}
                icon={<Key className="w-5 h-5 text-muted-foreground dark:text-gray-400" />}
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
                icon={
                  <Switch
                    checked={twoFactorAuth}
                    onCheckedChange={handle2FAToggle}
                  />
                }
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Biometric Authentication"
                description="Use fingerprint or face recognition to login"
                icon={
                  <Switch
                    checked={biometricAuth}
                    onCheckedChange={(checked) => {
                      setBiometricAuth(checked);
                      toast.success(`Biometric authentication ${checked ? 'enabled' : 'disabled'}`);
                    }}
                  />
                }
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Password-Protected Content"
                description="Require password to view sensitive data"
                icon={
                  <Switch
                    checked={passwordProtection}
                    onCheckedChange={(checked) => {
                      setPasswordProtection(checked);
                      toast.success(`Password protection ${checked ? 'enabled' : 'disabled'}`);
                    }}
                  />
                }
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Security Alerts"
                description="Get notified about suspicious activities"
                icon={
                  <Switch
                    checked={securityAlerts}
                    onCheckedChange={(checked) => {
                      setSecurityAlerts(checked);
                      toast.success(`Security alerts ${checked ? 'enabled' : 'disabled'}`);
                    }}
                  />
                }
              />
            </CardContent>
          </Card>
          
          <Card className="dark:bg-[#222222] dark:border-gray-700 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Shield className="w-5 h-5 text-primary" />
                Privacy Controls
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Control how your data is used and shared
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Collapsible open={openDataSharing} onOpenChange={setOpenDataSharing}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between w-full cursor-pointer hover:bg-muted/50 dark:hover:bg-gray-800/50 -mx-2 px-2 py-1 rounded-lg transition-colors">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Label className="text-base cursor-pointer dark:text-white">Data Sharing Preferences</Label>
                        <Badge variant="outline" className="text-xs font-normal dark:border-gray-700">
                          Important
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">Manage how your data is shared with third parties</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Info className="w-5 h-5 text-muted-foreground dark:text-gray-400" />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2 pl-6 pr-2">
                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox 
                      id="data-sharing" 
                      checked={dataSharingConsent}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') setDataSharingConsent(checked);
                      }}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="data-sharing"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
                      >
                        Allow anonymous data sharing
                      </label>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Share anonymous usage data to help improve the app
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox 
                      id="tracking-consent" 
                      checked={trackingConsent}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') setTrackingConsent(checked);
                      }}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="tracking-consent"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
                      >
                        Allow analytics tracking
                      </label>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Track your interactions within the app for analytics purposes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox 
                      id="marketing-consent" 
                      checked={marketingConsent}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') setMarketingConsent(checked);
                      }}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="marketing-consent"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
                      >
                        Receive marketing communications
                      </label>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Get updates about new features and promotions
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Location Sharing"
                description="Control when your location is shared with the app"
                icon={
                  <Switch
                    checked={locationSharing}
                    onCheckedChange={(checked) => {
                      setLocationSharing(checked);
                      toast.success(`Location sharing ${checked ? 'enabled' : 'disabled'}`);
                    }}
                  />
                }
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="View Privacy Policy"
                description="Read our detailed privacy policy"
                onClick={() => {
                  toast.info("Privacy Policy", {
                    description: "This would display the full privacy policy."
                  });
                }}
                icon={<FileText className="w-5 h-5 text-muted-foreground dark:text-gray-400" />}
              />
              <Separator className="dark:bg-gray-700" />
              <SettingItem
                title="Activity Log"
                description="View and manage your account activity"
                onClick={() => {
                  toast.info("Activity Log", {
                    description: "This would show a history of your account activity."
                  });
                }}
                icon={<History className="w-5 h-5 text-muted-foreground dark:text-gray-400" />}
              />
            </CardContent>
          </Card>
          
          <Card className="border-destructive/20 dark:bg-[#222222] dark:border-red-900/50 transition-colors duration-200">
            <CardHeader className="text-destructive">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-destructive/80">
                Actions that cannot be undone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 dark:border-gray-700 dark:hover:bg-destructive/20"
                onClick={handleDeleteData}
              >
                <UserX className="mr-2 h-4 w-4" />
                Delete My Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacySecurity;
