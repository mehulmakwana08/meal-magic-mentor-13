
import React from 'react';
import { User, Mail, Calendar, Phone, MapPin, Edit, LogOut, Baby, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import AnimatedButton from '@/components/AnimatedButton';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const MotherProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real application, this would come from your auth context
  const userData = {
    name: "Meera Singh",
    email: "meera@example.com",
    phone: "+91 98765 12345",
    address: "123 Main Street, Delhi",
    type: "pregnant",
    stage: "28 weeks pregnant",
    dueDate: "August 15, 2023",
    bloodType: "B+",
    allergies: "None",
    emergencyContact: "Raj Singh (Husband): +91 98765 54321"
  };

  const handleLogout = () => {
    // In a real application, this would call your auth logout method
    localStorage.removeItem('userRole');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen pb-20">
      <Header title="My Profile" showBackButton />
      
      <div className="px-4 py-6">
        <div className="flex flex-col items-center mb-8">
          <div className="h-24 w-24 rounded-full bg-rose-100 flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-rose-600" />
          </div>
          <h1 className="text-xl font-bold">{userData.name}</h1>
          <p className="text-muted-foreground flex items-center">
            {userData.type === "pregnant" ? (
              <>
                <Baby className="h-4 w-4 mr-1" />
                {userData.stage}
              </>
            ) : (
              <>
                <Heart className="h-4 w-4 mr-1" />
                {userData.stage}
              </>
            )}
          </p>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-white rounded-xl border border-border p-4 space-y-4">
            <h2 className="font-semibold text-lg">Personal Information</h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{userData.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{userData.address}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="text-rose-600 text-sm flex items-center gap-1">
                <Edit className="h-4 w-4" /> Edit
              </button>
            </div>
          </Card>
          
          <Card className="bg-white rounded-xl border border-border p-4 space-y-4">
            <h2 className="font-semibold text-lg">Medical Information</h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">{userData.dueDate}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Blood Type</p>
                  <p className="font-medium">{userData.bloodType}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Emergency Contact</p>
                  <p className="font-medium">{userData.emergencyContact}</p>
                </div>
              </div>
            </div>
          </Card>
          
          <AnimatedButton
            onClick={handleLogout}
            icon={LogOut}
            color="rose"
            fullWidth
            size="md"
          >
            Log Out
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default MotherProfile;
