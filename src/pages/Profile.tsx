import React from 'react';
import { User, Mail, Briefcase, Phone, Edit, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import AnimatedButton from '@/components/AnimatedButton';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // In a real application, this would come from your auth context
  const userData = {
    name: "Ayushi Sharma",
    email: "ayushi@example.com",
    role: "Anganwadi Worker",
    phone: "+91 98765 43210",
    center: "Anganwadi Center #42, Jaipur",
    joinedDate: "March 2022"
  };

  const handleLogout = () => {
    // In a real application, this would call your auth logout method
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen pb-20">
      <Header title="Profile" showBackButton />

      <div className="px-4 py-6">
        <div className="flex flex-col items-center mb-8">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-xl font-bold">{userData.name}</h1>
          <p className="text-muted-foreground">{userData.role}</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-border p-4 space-y-4">
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
            </div>

            <div className="flex justify-end">
              <button className="text-primary text-sm flex items-center gap-1">
                <Edit className="h-4 w-4" /> Edit
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-4 space-y-4">
            <h2 className="font-semibold text-lg">Work Information</h2>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Center</p>
                  <p className="font-medium">{userData.center}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Joined Date</p>
                  <p className="font-medium">{userData.joinedDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <AnimatedButton
              onClick={handleLogout}
              icon={LogOut}
              color="rose"
              className="px-2 w-auto text-xs h-8 py-0"
            >
              Log Out
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
