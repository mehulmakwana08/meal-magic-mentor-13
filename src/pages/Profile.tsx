import React, { useState, useEffect } from 'react';
import { User, Mail, Briefcase, Phone, Edit, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import AnimatedButton from '@/components/AnimatedButton';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import ProfileEditForm from '@/components/ProfileEditForm';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import authService from '@/services/authService';
import { AxiosError } from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // State for user data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    center: "",
    joinedDate: "",
    profileImage: undefined
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await authService.getCurrentUser();
        
        // Update state with fetched user data
        setUserData({
          name: response.data.name || "",
          email: response.data.email || "",
          role: response.data.role || "Anganwadi Worker",
          phone: response.data.phone || "",
          center: response.data.center || "Anganwadi Center #42, Jaipur",
          joinedDate: response.data.joinedDate || "March 2022",
          profileImage: response.data.profileImage
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        toast({
          title: "Failed to load profile",
          description: "Could not retrieve your profile information.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [toast]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      
      // Clear local storage
      localStorage.removeItem('userRole');
      localStorage.setItem('isLoggedOut', 'true');
      localStorage.removeItem('token');
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      
      navigate("/login");
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileUpdate = async (values) => {
    try {
      // Call the API to update user details
      await authService.updateDetails({
        name: values.name,
        email: values.email
      });
      
      // Update local state
      setUserData({
        ...userData,
        ...values,
      });
      
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully",
      });
    } catch (err) {
      // Handle error
      const error = err as AxiosError<{error?: string; message?: string}>;
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          'Failed to update profile. Please try again.';
      
      toast({
        title: "Update failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20">
        <Header title="Profile" showBackButton />
        <div className="px-4 py-6 flex justify-center items-center h-[80vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Header title="Profile" showBackButton />

      <div className="px-4 py-6">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-24 w-24 mb-4">
            {userData.profileImage ? (
              <AvatarImage src={userData.profileImage} alt={userData.name} />
            ) : (
              <AvatarFallback className="bg-primary/10">
                <User className="h-12 w-12 text-primary" />
              </AvatarFallback>
            )}
          </Avatar>
          <h1 className="text-xl font-bold">{userData.name}</h1>
          <p className="text-muted-foreground">{userData.role}</p>
        </div>

        {isEditing ? (
          <ProfileEditForm 
            userData={userData}
            onSubmit={handleProfileUpdate}
            onCancel={handleEditToggle}
          />
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-border p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">Personal Information</h2>
                <button 
                  className="text-primary text-sm flex items-center gap-1"
                  onClick={handleEditToggle}
                >
                  <Edit className="h-4 w-4" /> Edit
                </button>
              </div>
              
              <Separator />

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
            </div>

            <div className="bg-white rounded-xl border border-border p-4 space-y-4">
              <h2 className="font-semibold text-lg">Work Information</h2>
              
              <Separator />

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
        )}
      </div>
    </div>
  );
};

export default Profile;
