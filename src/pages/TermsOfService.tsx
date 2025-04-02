
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ExternalLink, FileText, Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const TermsOfService = () => {
  const lastUpdated = "September 15, 2023";
  
  const handlePrint = () => {
    window.print();
    toast.success("Printing Terms of Service", {
      description: "Your document is being prepared for printing."
    });
  };
  
  const handleDownload = () => {
    toast.success("Downloading Terms of Service", {
      description: "Document download started."
    });
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 dark:bg-[#1A1F2C] transition-colors duration-200">
      <Header title="Terms of Service" showBackButton />
      
      <div className="px-4 py-4 md:px-6 md:py-6 max-w-4xl mx-auto">
        <Card className="dark:bg-[#222222] dark:border-gray-700 transition-colors duration-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold flex items-center gap-2 dark:text-white">
                <FileText className="w-6 h-6 text-primary" />
                Terms of Service
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handlePrint} className="dark:border-gray-700 dark:text-gray-300">
                  Print
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload} className="dark:border-gray-700 dark:text-gray-300">
                  Download
                </Button>
              </div>
            </div>
            <CardDescription className="dark:text-gray-400">
              Last updated: {lastUpdated}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-left">
            <section className="space-y-2">
              <h2 className="text-xl font-semibold dark:text-white">1. Acceptance of Terms</h2>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                By accessing or using our maternal and child health application services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>
            
            <Separator className="dark:bg-gray-700" />
            
            <section className="space-y-2">
              <h2 className="text-xl font-semibold dark:text-white">2. Description of Service</h2>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Our application provides information and tools for maternal and child health management. The services may include meal planning, health tracking, tips, and other related features designed to support mothers and healthcare providers.
              </p>
            </section>
            
            <Separator className="dark:bg-gray-700" />
            
            <section className="space-y-2">
              <h2 className="text-xl font-semibold dark:text-white">3. User Accounts</h2>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                To access certain features of our service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
              </p>
            </section>
            
            <Separator className="dark:bg-gray-700" />
            
            <section className="space-y-2">
              <h2 className="text-xl font-semibold dark:text-white">4. User Content</h2>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                You retain all rights to any content you submit, post or display on or through our service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute that content for the purpose of providing our services.
              </p>
            </section>
            
            <Separator className="dark:bg-gray-700" />
            
            <section className="space-y-2">
              <h2 className="text-xl font-semibold dark:text-white">5. Privacy</h2>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms of Service, explains how we collect, use, and protect your personal information.
              </p>
              <div className="flex items-center">
                <Button variant="link" className="p-0 h-auto text-primary dark:text-blue-400" onClick={() => window.location.href = '/privacy-security'}>
                  View Privacy Policy
                  <ExternalLink className="ml-1 w-3 h-3" />
                </Button>
              </div>
            </section>
            
            <Separator className="dark:bg-gray-700" />
            
            <section className="space-y-2">
              <h2 className="text-xl font-semibold dark:text-white">6. Medical Disclaimer</h2>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                The content provided in our application is for informational purposes only and is not intended as medical advice. Always consult with qualified healthcare providers for medical advice, diagnosis, or treatment.
              </p>
            </section>
            
            <Separator className="dark:bg-gray-700" />
            
            <section className="space-y-2">
              <h2 className="text-xl font-semibold dark:text-white">7. Limitation of Liability</h2>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, our services.
              </p>
            </section>
            
            <Separator className="dark:bg-gray-700" />
            
            <section className="space-y-2">
              <h2 className="text-xl font-semibold dark:text-white">8. Changes to Terms</h2>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes by posting the new Terms on our website or through the application. Your continued use of our services after such modifications constitutes your acceptance of the revised Terms.
              </p>
            </section>
            
            <Separator className="dark:bg-gray-700" />
            
            <section className="space-y-2">
              <h2 className="text-xl font-semibold dark:text-white">9. Termination</h2>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                We may terminate or suspend your account and access to our services at our sole discretion, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
              </p>
            </section>
            
            <Separator className="dark:bg-gray-700" />
            
            <section className="space-y-2">
              <h2 className="text-xl font-semibold dark:text-white">10. Contact Information</h2>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                If you have any questions about these Terms of Service, please contact us at support@example.com.
              </p>
            </section>
            
            <div className="mt-8 pt-4 border-t dark:border-gray-700">
              <p className="text-sm text-center text-muted-foreground dark:text-gray-400">
                By using our application, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
