
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Download, Clipboard, Upload, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Sample AI responses for demo purposes
const sampleResponses = [
  "Based on the information provided, I recommend increasing your daily protein intake to 65g and ensuring you get at least 800mg of calcium daily, especially important during your second trimester.",
  "Your child's current diet seems low in iron. Consider adding more leafy greens like palak, beans, and jaggery to help meet the recommended 10mg daily iron intake for children 2-5 years.",
  "For lactation support, your diet should include at least 500 additional calories, focusing on galactagogues like fenugreek (methi), oats, and plenty of fluids. I notice your current intake is approximately 300 calories short of the recommendation.",
  "The traditional Gujarati dish 'Undhiyu' provides excellent nutrition with seasonal vegetables. Consider reducing oil content by 25% and increasing the proportion of purple yam and green beans for better vitamin balance."
];

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const AIScreen = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Nutrition Assistant. How can I help you today? You can ask me about meal planning, nutrition advice for pregnancy/lactation, or region-specific food recommendations.",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [analysisDialogOpen, setAnalysisDialogOpen] = useState(false);
  const [mealInput, setMealInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const responseIndex = Math.floor(Math.random() * sampleResponses.length);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: sampleResponses[responseIndex],
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard!');
  };

  const downloadChat = () => {
    const chatContent = messages
      .map((msg) => `[${msg.role}]: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutrition-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Chat history downloaded!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleStartAnalysis = () => {
    setAnalysisDialogOpen(true);
  };

  const handleAnalysisSubmit = () => {
    // Validation check
    if (!mealInput.trim() && !selectedFile) {
      toast.error("Please enter your meals or upload a food journal");
      return;
    }

    // Processing simulation
    toast.info("Processing your nutrition data...");
    setAnalysisDialogOpen(false);
    
    setTimeout(() => {
      // Add user's meal input as a message
      const content = mealInput.trim() 
        ? `Here are my daily meals:\n${mealInput}` 
        : "I've uploaded my food journal for analysis.";
      
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        role: 'user',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      
      // Simulate AI response after processing
      setTimeout(() => {
        const analysisResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "Based on your food journal, your diet is currently providing approximately 1800 calories daily with 45% carbohydrates, 25% protein, and 30% fats. I notice your calcium intake is below the recommended level for your profile. Consider adding more dairy products or calcium-rich vegetables like broccoli and spinach. Your iron levels also appear adequate but could be optimized with vitamin C-rich foods to improve absorption.",
          role: 'assistant',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, analysisResponse]);
        
        // Reset form
        setMealInput('');
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title="AI Nutrition Assistant" showBackButton />

      <div className="px-4 py-4 md:px-6 max-w-5xl mx-auto">
        <Tabs defaultValue="chat" className="mb-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="analysis">Nutrition Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <Card className="border-border">
              <CardContent className="p-0">
                {/* Chat messages container */}
                <div className="flex flex-col h-[60vh] md:h-[65vh]">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-xl px-4 py-3 ${
                            message.role === 'user'
                              ? 'bg-primary text-white rounded-tr-none'
                              : 'bg-muted rounded-tl-none'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {message.role === 'assistant' ? (
                              <Bot className="h-4 w-4" />
                            ) : (
                              <User className="h-4 w-4" />
                            )}
                            <span className="text-xs opacity-75">
                              {message.role === 'assistant' ? 'AI Assistant' : 'You'}
                            </span>
                          </div>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          {message.role === 'assistant' && (
                            <div className="flex justify-end mt-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 rounded-full"
                                onClick={() => copyToClipboard(message.content)}
                              >
                                <Clipboard className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input area */}
                  <div className="border-t border-border p-4">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about nutrition, meal plans, or regional foods..."
                        disabled={isProcessing}
                        className="flex-1"
                      />
                      <Button type="submit" disabled={isProcessing}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={downloadChat}>
                <Download className="h-4 w-4 mr-2" />
                Download Chat
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis">
            <Card>
              <CardContent className="py-6">
                <div className="text-center space-y-4">
                  <Bot className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="text-lg font-medium">Nutrition Analysis</h3>
                  <p className="text-muted-foreground">
                    Upload your food journal or input your daily meals to get a comprehensive 
                    nutritional analysis tailored to your specific health needs.
                  </p>
                  <Button className="mt-4" onClick={handleStartAnalysis}>
                    Start Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Analysis Dialog */}
      <Dialog open={analysisDialogOpen} onOpenChange={setAnalysisDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nutrition Analysis</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="meals">Enter your daily meals</Label>
              <Textarea
                id="meals"
                placeholder="Breakfast: 2 eggs, toast, orange juice&#10;Lunch: Chicken salad with olive oil&#10;Dinner: Brown rice, grilled fish, steamed vegetables"
                className="min-h-[120px]"
                value={mealInput}
                onChange={(e) => setMealInput(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Or upload your food journal</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="food-journal"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-muted/50"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, TXT, or image files
                    </p>
                  </div>
                  <input
                    id="food-journal"
                    type="file"
                    className="hidden"
                    accept=".pdf,.txt,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                </label>
              </div>
              {selectedFile && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <FileText className="h-4 w-4" />
                  <span className="truncate">{selectedFile.name}</span>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAnalysisDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAnalysisSubmit}>
              Analyze
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIScreen;
