import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function RoleRedirect() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const role = user?.publicMetadata?.role;
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "member") {
      navigate("/user");
    } else {
      navigate("/unauthorzied");
    }
  }, [user, navigate]);

  return null;
}
