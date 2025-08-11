import { useUser } from "@clerk/clerk-react";
import { useInView } from "react-intersection-observer";
export function useMemberUtils() {
  const { user, isSignedIn } = useUser();
  const capitalizeStr = (str) => {
    if (typeof str !== "string" || str.length === 0) {
      return str;
    }
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  const userName = capitalizeStr(
    `${user.firstName || ""} ${user.lastName || ""}`
  );
  const [howItWorksRef, howItWorksInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const profileImage =
    user.publicMetadata?.profileImage || user.imageUrl || "/default.jpg";

  return {
    capitalizeStr,
    userName,
    howItWorksRef,
    howItWorksInView,
    profileImage,
    isSignedIn,
    user,
  };
}
