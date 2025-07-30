import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FadeLoader } from "react-spinners";

export default function PrivateRoute({ children, allowedRoles = [] }) {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded)
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader className="text-gray-400" />
      </div>
    );
  if (!isSignedIn) return <Navigate to="/SignInForm" replace />;
  const role = user?.publicMetadata?.role;
  console.log("Role Of User", role);
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/404" replace />;
  }
  return children;
}
