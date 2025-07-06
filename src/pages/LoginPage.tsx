import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {};

  const handleLogin = () => {};

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 min-h-screen">
      {/*Content*/}
      <div className="w-full max-w-md">
        {/*Logo and Title*/}
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
        {/*Login Card*/}
        <div className="bg-white shadow-2xl p-8 rounded-3xl">
          <div className="space-y-6">
            {/*Username Input*/}
            <div>
              <Input
                type="text"
                placeholder="Enter username"
                value={username}
                className="bg-gray-50 px-6 border-2 border-gray-200 focus:border-cyan-400 rounded-2xl focus:ring-0 w-full h-14 text-lg"
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
              />
            </div>
            {/*Buttons*/}
            <div className="gap-4 grid grid-cols-2">
              <Button
                onClick={handleSignUp}
                disabled={!username.trim() || isLoading}
                className="bg-slate-800 hover:bg-slate-700 rounded-2xl h-14 font-semibold text-white text-lg transition-all duration-200"
              >
                {isLoading ? "..." : "Sign Up"}
              </Button>
              <Button
                onClick={handleLogin}
                disabled={!username.trim() || isLoading}
                className="bg-cyan-500 hover:bg-cyan-600 rounded-2xl h-14 font-semibold text-white text-lg transition-all duration-200"
              >
                {isLoading ? "..." : "Login"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
