
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import WebNavbar from "./components/WebNavbar";
import Home from "./pages/Home";
import Profiles from "./pages/Profiles";
import AddProfile from "./pages/AddProfile";
import MealPlans from "./pages/MealPlans";
import Progress from "./pages/Progress";
import Tips from "./pages/Tips";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Mother-side pages
import MotherHome from "./pages/mother/MotherHome";
import MotherMealPlans from "./pages/mother/MotherMealPlans";
import MotherProgress from "./pages/mother/MotherProgress";
import MotherTips from "./pages/mother/MotherTips";
import MotherProfile from "./pages/mother/MotherProfile";
import MotherNavbar from "./components/mother/MotherNavbar";
import MotherBottomNav from "./components/mother/MotherBottomNav";

const queryClient = new QueryClient();

const App = () => {
  // In a real app, this would come from your auth context
  const userRole = localStorage.getItem("userRole") || "doctor";
  const isLoggedIn = !["/login", "/signup"].includes(window.location.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {!isLoggedIn ? (
            // Login and signup routes without navbar
            <div className="flex min-h-screen bg-background">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </div>
          ) : userRole === "doctor" ? (
            <div className="flex min-h-screen bg-background">
              <WebNavbar className="hidden md:flex" />
              <main className="flex-1 pb-16 md:pb-0 md:pl-64">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profiles" element={<Profiles />} />
                  <Route path="/profiles/add" element={<AddProfile />} />
                  <Route path="/meal-plans" element={<MealPlans />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/tips" element={<Tips />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <BottomNav />
            </div>
          ) : userRole === "mother" ? (
            <div className="flex min-h-screen bg-background">
              <MotherNavbar className="hidden md:flex" />
              <main className="flex-1 pb-16 md:pb-0 md:pl-64">
                <Routes>
                  <Route path="/" element={<MotherHome />} />
                  <Route path="/meal-plans" element={<MotherMealPlans />} />
                  <Route path="/progress" element={<MotherProgress />} />
                  <Route path="/tips" element={<MotherTips />} />
                  <Route path="/profile" element={<MotherProfile />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <MotherBottomNav />
            </div>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
