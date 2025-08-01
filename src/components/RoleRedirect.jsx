import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function RoleRedirect() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchRole = async () => {
      setLoading(true);
      await user.reload();
      const role = user?.publicMetadata?.role;

      console.log("Role after reload:", role);

      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (role === "member") {
        navigate("/user", { replace: true });
      } else {
        navigate("/404", { replace: true });
      }

      setLoading(false);
    };

    fetchRole();
  }, [isLoaded, user, navigate]);

  // if (loading) {
  //   return <div>Loading...</div>; // Optional: Show spinner or skeleton
  // }

  return null;
}
