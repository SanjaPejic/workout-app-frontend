import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/constants/UserStore";

function NotFoundPage() {
  const navigate = useNavigate();
  const userId = useUserStore((state) => state.id);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    if (userId) {
      navigate("/create");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 min-h-screen">
      {/* Content */}
      <div className="w-full max-w-md text-center">
        {/* Logo and Title */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <div className="relative w-22 h-22">
            <img
              src="/logo.png"
              alt="Workout Blocks Logo"
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="font-bold text-white text-4xl tracking-tight">
              WORKOUT
            </h1>
            <p className="font-medium text-gray-200 text-xl tracking-widest">
              B L O C K S
            </p>
          </div>
        </div>

        {/* Error Card */}
        <div className="bg-white shadow-2xl p-8 rounded-3xl">
          <div className="space-y-6">
            {/* 404 Error */}
            <div className="text-center">
              <h2 className="mb-2 font-bold text-slate-800 text-6xl">404</h2>
              <h3 className="mb-4 font-semibold text-slate-700 text-2xl">
                Page Not Found
              </h3>
              <p className="mb-8 text-slate-600 text-lg">
                Oops! The page you're looking for doesn't exist or has been
                moved.
              </p>
            </div>

            {/* Buttons */}
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
              <Button
                onClick={handleGoBack}
                className="flex justify-center items-center gap-2 bg-slate-800 hover:bg-slate-700 rounded-2xl h-14 font-semibold text-white text-lg transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </Button>
              <Button
                onClick={handleGoHome}
                className="flex justify-center items-center gap-2 bg-cyan-500 hover:bg-cyan-600 rounded-2xl h-14 font-semibold text-white text-lg transition-all duration-200"
              >
                <Home className="w-5 h-5" />
                {userId ? "Home" : "Login"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
