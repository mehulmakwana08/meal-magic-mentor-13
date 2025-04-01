
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Briefcase, Phone, Upload } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

// Define the form schema with validations
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  center: z.string().min(2, "Center must be at least 2 characters"),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface ProfileEditFormProps {
  userData: {
    name: string;
    email: string;
    role: string;
    phone: string;
    center: string;
    joinedDate: string;
    profileImage?: string;
  };
  onSubmit: (values: ProfileFormValues & { profileImage?: string }) => void;
  onCancel: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ 
  userData, 
  onSubmit, 
  onCancel 
}) => {
  const [profileImage, setProfileImage] = useState<string | undefined>(userData.profileImage);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      phone: userData.phone,
      center: userData.center,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = (values: ProfileFormValues) => {
    onSubmit({ ...values, profileImage });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              {profileImage ? (
                <AvatarImage src={profileImage} alt={userData.name} />
              ) : (
                <AvatarFallback className="bg-primary/10">
                  <User className="h-12 w-12 text-primary" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="absolute -bottom-2 -right-2">
              <label
                htmlFor="profile-image"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md hover:bg-primary/90"
              >
                <Upload className="h-4 w-4" />
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Click to upload profile picture</p>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <User className="h-5 w-5 text-muted-foreground mr-2" />
                  <Input {...field} placeholder="Your full name" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                  <Input {...field} placeholder="Your email" type="email" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-muted-foreground mr-2" />
                  <Input {...field} placeholder="Your role" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                  <Input {...field} placeholder="Your phone number" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="center"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Center</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-muted-foreground mr-2" />
                  <Input {...field} placeholder="Your center" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            variant="outline" 
            type="button" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileEditForm;
