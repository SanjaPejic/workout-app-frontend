import { Button } from "../ui/button";
import { BookmarkIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-700 shadow-lg px-6 py-4">
      <div className="flex justify-between items-center mx-auto">
        {/*Left side: logo and app name*/}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <img
              src="/logo.png"
              alt="Workout Blocks Logo"
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="font-bold text-white text-2xl tracking-tight">
              WORKOUT
            </h1>
            <p className="font-medium text-gray-200 text-sm tracking-widest">
              B L O C K S
            </p>
          </div>
        </div>

        {/*Right side: the three buttons*/}
        <div className="flex items-center gap-3">
          <Button variant="header" onClick={() => navigate("/create")}>
            Create Workout
          </Button>
          <Button variant="header" onClick={() => navigate("/generate")}>
            Generate Workout
          </Button>
          <Button variant="header" onClick={() => navigate("/saved")}>
            <BookmarkIcon className="w-5 h-5" />
          </Button>
          {/* <UserMenu username={currentUser?.username || ""} onLogout={logout} /> */}
          {/* temp code: */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
