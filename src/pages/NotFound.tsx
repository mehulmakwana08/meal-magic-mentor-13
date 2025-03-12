
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary/5 px-4">
      <div className="text-center max-w-md w-full bg-white p-8 rounded-2xl card-shadow animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <AnimatedButton
          icon={Home}
          color="primary"
          fullWidth
          onClick={() => navigate("/")}
        >
          Return to Home
        </AnimatedButton>
      </div>
    </div>
  );
};

export default NotFound;
