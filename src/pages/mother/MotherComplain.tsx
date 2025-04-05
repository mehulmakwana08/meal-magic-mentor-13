
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

// List of Indian cities for the dropdown
const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", 
  "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
  "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal",
  "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad", "Ludhiana"
];

// Schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  mobileNumber: z.string().regex(/^[0-9]{10}$/, { message: "Mobile number must be 10 digits" }),
  city: z.string().min(1, { message: "Please select a city" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(20, { message: "Message must be at least 20 characters" }),
});

const MotherComplain = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: localStorage.getItem('userName') || '',
      mobileNumber: localStorage.getItem('userMobile') || '',
      city: localStorage.getItem('userCity') || '',
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Store user details in localStorage for future use
      localStorage.setItem('userName', values.name);
      localStorage.setItem('userMobile', values.mobileNumber);
      localStorage.setItem('userCity', values.city);
      
      // In a real app, this would be an API call to send the complaint
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful submission
      // Store in localStorage for demo purposes
      const complaints = JSON.parse(localStorage.getItem('motherComplaints') || '[]');
      const newComplaint = {
        id: Date.now().toString(),
        subject: values.subject,
        message: values.message,
        motherName: values.name,
        mobileNumber: values.mobileNumber,
        city: values.city,
        date: new Date().toISOString(),
        status: 'pending',
        response: null,
      };
      
      complaints.push(newComplaint);
      localStorage.setItem('motherComplaints', JSON.stringify(complaints));
      
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been successfully submitted to the doctor.",
      });
      
      // Reset form
      form.reset({
        name: values.name,
        mobileNumber: values.mobileNumber,
        city: values.city,
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit complaint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Submit a Complaint</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Complaint</CardTitle>
          <CardDescription>
            Fill out the form below to send a complaint to your doctor. We'll review it and provide a response as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your 10-digit mobile number" 
                          maxLength={10}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {indianCities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief subject of your complaint" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a clear subject for your complaint
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Complaint</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe your issue in detail"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide detailed information about your complaint
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit Complaint"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <MotherComplaintHistory />
    </div>
  );
};

// Component to show the mother's past complaints and responses
const MotherComplaintHistory = () => {
  // Get complaints from localStorage
  const complaints = JSON.parse(localStorage.getItem('motherComplaints') || '[]');
  
  if (complaints.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Your Complaint History</h2>
      {complaints.map((complaint: any) => (
        <Card key={complaint.id} className="overflow-hidden">
          <CardHeader className={complaint.status === 'answered' ? "bg-green-50" : "bg-orange-50"}>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{complaint.subject}</CardTitle>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                complaint.status === 'answered' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
              }`}>
                {complaint.status === 'answered' ? 'Answered' : 'Pending'}
              </span>
            </div>
            <CardDescription>
              {new Date(complaint.date).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2 text-sm">
                <div>
                  <span className="font-medium">Name:</span> {complaint.motherName}
                </div>
                <div>
                  <span className="font-medium">Mobile:</span> {complaint.mobileNumber || 'Not provided'}
                </div>
                <div>
                  <span className="font-medium">City:</span> {complaint.city || 'Not provided'}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Your complaint:</h3>
                <p className="mt-1 text-gray-800">{complaint.message}</p>
              </div>
              
              {complaint.response && (
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-blue-800">Doctor's response:</h3>
                  <p className="mt-1 text-gray-800">{complaint.response}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MotherComplain;
