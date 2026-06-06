import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ClaimAdminRole from "./ClaimAdminRole";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, isAdmin, isLoading } = useAuth();

  const handleAdminClaimed = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <ClaimAdminRole onSuccess={handleAdminClaimed} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
