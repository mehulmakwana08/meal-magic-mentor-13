
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  Share2,
  Link,
  Mail,
  Copy,
  QrCode,
  Facebook,
  Twitter,
  Linkedin,
  MessageSquare,
  Globe
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ShareApp = () => {
  const [copied, setCopied] = useState(false);
  const appUrl = 'https://anganwadi-nutrition.app';
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };
  
  const handleShare = (platform: string) => {
    toast.success(`Sharing to ${platform}`, {
      description: 'This would share the app to the selected platform.'
    });
  };
  
  const handleEmailShare = () => {
    const subject = 'Check out Anganwadi Nutrition App';
    const body = `I thought you might be interested in this app: ${appUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success('Email client opened');
  };
  
  const handleSMSShare = () => {
    const message = `Check out Anganwadi Nutrition App: ${appUrl}`;
    if (navigator.userAgent.match(/Android/i)) {
      window.location.href = `sms:?body=${encodeURIComponent(message)}`;
    } else {
      window.location.href = `sms:&body=${encodeURIComponent(message)}`;
    }
    toast.success('SMS client opened');
  };
  
  const renderQRCode = () => {
    // In a real app, this would generate an actual QR code
    return (
      <div className="flex flex-col items-center justify-center p-4 border border-border rounded-lg bg-gray-50 dark:bg-gray-800">
        <div className="w-48 h-48 bg-white dark:bg-gray-700 flex items-center justify-center">
          <QrCode className="w-32 h-32 text-primary" />
        </div>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Scan this QR code to download the app
        </p>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen pb-20 md:pb-0 dark:bg-[#1A1F2C] transition-colors duration-200">
      <Header title="Share App" showBackButton />
      
      <div className="px-4 py-4 md:px-6 md:py-6 max-w-4xl mx-auto">
        <Card className="dark:bg-[#222222] dark:border-gray-700 transition-colors duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Share2 className="w-5 h-5 text-primary" />
              Share Anganwadi Nutrition App
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Invite others to discover and use this application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Input 
                  value={appUrl} 
                  readOnly 
                  className="bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <Button 
                  variant="outline" 
                  onClick={handleCopyLink}
                  className="shrink-0 dark:border-gray-700 dark:text-white"
                >
                  {copied ? 'Copied!' : 'Copy'}
                  <Copy className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Share this link with your friends and colleagues
              </p>
            </div>
            
            <Separator className="dark:bg-gray-700" />
            
            <Tabs defaultValue="social" className="w-full">
              <TabsList className="grid grid-cols-3 w-full dark:bg-gray-800 dark:text-gray-400">
                <TabsTrigger value="social" className="dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                  Social Media
                </TabsTrigger>
                <TabsTrigger value="message" className="dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                  Message
                </TabsTrigger>
                <TabsTrigger value="qrcode" className="dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                  QR Code
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="social" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleShare('Facebook')}
                    className="flex items-center justify-center py-6 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <Facebook className="mr-2 h-5 w-5 text-blue-600" />
                    Facebook
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleShare('Twitter')}
                    className="flex items-center justify-center py-6 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <Twitter className="mr-2 h-5 w-5 text-blue-400" />
                    Twitter
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleShare('LinkedIn')}
                    className="flex items-center justify-center py-6 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <Linkedin className="mr-2 h-5 w-5 text-blue-700" />
                    LinkedIn
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleShare('WhatsApp')}
                    className="flex items-center justify-center py-6 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <MessageSquare className="mr-2 h-5 w-5 text-green-500" />
                    WhatsApp
                  </Button>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="dark:border-gray-700">
                    <Globe className="mr-1 h-3 w-3" />
                    More platforms coming soon
                  </Badge>
                </div>
              </TabsContent>
              
              <TabsContent value="message" className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    onClick={handleEmailShare}
                    className="flex items-center justify-center py-6 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <Mail className="mr-2 h-5 w-5 text-red-500" />
                    Email
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleSMSShare}
                    className="flex items-center justify-center py-6 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
                    SMS
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="qrcode" className="mt-4">
                <div className="flex justify-center">
                  {renderQRCode()}
                </div>
                <div className="mt-3 text-center">
                  <Button 
                    onClick={() => {
                      toast.success('QR Code would be saved', {
                        description: 'This would save the QR code to your device.'
                      });
                    }}
                    className="dark:bg-primary dark:text-white"
                  >
                    Download QR Code
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <Separator className="dark:bg-gray-700" />
            
            <div className="rounded-lg bg-muted p-4 dark:bg-gray-800">
              <h3 className="font-medium mb-2 dark:text-white">Why share this app?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-gray-400">
                <li>• Help improve nutrition awareness in your community</li>
                <li>• Connect more healthcare workers with mothers and children</li>
                <li>• Contribute to better health outcomes for families</li>
                <li>• Spread valuable nutritional knowledge and resources</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShareApp;
