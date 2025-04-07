import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import authService from "@/services/authService";

const UserProfileDropdown = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState({
    name: "Loading...",
    email: "",
    role: "",
    profileImage: undefined
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authService.getCurrentUser();
        
        setUserData({
          name: response.data.name || "User",
          email: response.data.email || "",
          role: response.data.role || "Anganwadi Worker",
          profileImage: response.data.profileImage
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Fallback to default data if API call fails
        setUserData({
          name: "User",
          email: "user@example.com",
          role: "Anganwadi Worker",
          profileImage: undefined
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          {userData.profileImage ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src={userData.profileImage} alt={userData.name} />
              <AvatarFallback className="bg-primary/10">
                <UserCircle className="h-5 w-5 text-primary" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <UserCircle className="h-8 w-8 text-primary" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userData.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userData.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground mt-1">
              {userData.role}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
