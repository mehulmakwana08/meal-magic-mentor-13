
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import WebNavbar from "./components/WebNavbar";
import Home from "./pages/Home";
import Profiles from "./pages/Profiles";
import MealPlans from "./pages/MealPlans";
import Progress from "./pages/Progress";
import Tips from "./pages/Tips";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen bg-background">
          <WebNavbar className="hidden md:flex" />
          <main className="flex-1 pb-16 md:pb-0 md:pl-64">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/meal-plans" element={<MealPlans />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/tips" element={<Tips />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
