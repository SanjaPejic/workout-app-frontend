import { useUserStore } from "@/constants/UserStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const userId = useUserStore((state) => state.id);
  const location = useLocation();

  if (!userId) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
