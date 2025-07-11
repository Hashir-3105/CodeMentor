import React, { useEffect } from "react";
import MemberProfile from "./MemberProfile";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import { useMemberUtils } from "@/custome-hooks/useMemberUtils";
import { Link } from "react-router-dom";

function LandingPage() {
  const { user, isSignedIn } = useUser();
  const { capitalizeStr } = useMemberUtils();

  const userName = capitalizeStr(
    `${user.firstName || ""} ${user.lastName || ""}`
  );
  const profileImage =
    user.publicMetadata?.profileImage || user.imageUrl || "/default.jpg";

  return (
    <div className="p-6 mt-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-gradient-to-r from-[#8ECAE6] via-[#219EBC] to-[#023047] w-full min-h-[60vh] flex flex-col lg:flex-row items-center justify-between px-6 py-16 rounded-3xl mb-12 text-white shadow-xl"
      >
        <div className="w-full lg:w-1/2 px-4 flex flex-col justify-center text-center lg:text-left">
          {isSignedIn ? (
            <h1 className="text-xl ml-1">Hi, {userName}</h1>
          ) : (
            <h1>Welcome to the site</h1>
          )}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight break-words"
          >
            Ace interviews with real coding tests
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            className="mt-4 text-base sm:text-lg md:text-xl font-light"
          >
            Practice like it's the real deal. Prepare smarter, not harder.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mt-6"
          >
            <Link
              to={"/user/contact-us"}
              className="bg-white cursor-pointer text-blue-900 hover:bg-blue-200 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0"
        >
          <img
            src={profileImage}
            alt="Avatar"
            className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </motion.div>
      </motion.div>
      <div>
        <MemberProfile />
      </div>
    </div>
  );
}

export default LandingPage;
