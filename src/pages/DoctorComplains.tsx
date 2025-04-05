
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

const DoctorComplains = () => {
  const [complaints, setComplaints] = useState<any[]>(() => {
    return JSON.parse(localStorage.getItem('motherComplaints') || '[]');
  });
  const [currentComplaint, setCurrentComplaint] = useState<any>(null);
  const [responseText, setResponseText] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleRespond = (complaint: any) => {
    setCurrentComplaint(complaint);
    setResponseText('');
    setIsDialogOpen(true);
  };

  const submitResponse = () => {
    if (!responseText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a response",
        variant: "destructive",
      });
      return;
    }

    // Update the complaint with the response
    const updatedComplaints = complaints.map(c => {
      if (c.id === currentComplaint.id) {
        return {
          ...c,
          status: 'answered',
          response: responseText,
          responseDate: new Date().toISOString()
        };
      }
      return c;
    });

    // Update localStorage
    localStorage.setItem('motherComplaints', JSON.stringify(updatedComplaints));
    
    // Update local state
    setComplaints(updatedComplaints);
    
    toast({
      title: "Response Sent",
      description: "Your response has been sent to the mother",
    });
    
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Mother Complaints</h1>
      
      {complaints.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No complaints have been submitted yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <Card key={complaint.id}>
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
                  From: {complaint.motherName} • {new Date(complaint.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-800">{complaint.message}</p>
                
                {complaint.response && (
                  <div className="mt-4 bg-blue-50 p-4 rounded-md">
                    <h3 className="text-sm font-medium text-blue-800">Your response:</h3>
                    <p className="mt-1 text-gray-800">{complaint.response}</p>
                    <p className="mt-2 text-xs text-gray-500">
                      Replied on {new Date(complaint.responseDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                {complaint.status === 'pending' && (
                  <Button onClick={() => handleRespond(complaint)}>
                    Respond
                  </Button>
                )}
                {complaint.status === 'answered' && (
                  <Button variant="outline" onClick={() => handleRespond(complaint)}>
                    Update Response
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Response Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Respond to Complaint</DialogTitle>
            <DialogDescription>
              Responding to: {currentComplaint?.subject}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-500">Original complaint:</h3>
              <p className="mt-1 text-gray-800">{currentComplaint?.message}</p>
            </div>
            
            <div>
              <label htmlFor="response" className="block text-sm font-medium mb-2">
                Your Response
              </label>
              <Textarea
                id="response"
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Enter your response to this complaint..."
                className="min-h-[120px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={submitResponse}>
              Send Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorComplains;
