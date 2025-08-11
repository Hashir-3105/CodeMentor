import React from "react";
import { motion } from "framer-motion";
import { useMemberUtils } from "@/hooks/useMemberUtils";
import { Link } from "react-router-dom";
function HeroSection() {
  const { profileImage, isSignedIn, userName } = useMemberUtils();
  return (
    <>
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="bg-gradient-to-r from-blue-50 via-white to-blue-50 border border-blue-200 rounded-2xl p-6 shadow-md mt-4"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-900 mb-2">
          Ready to Crush Your Next Tech Interview?
        </h2>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          Dive into real-world coding scenarios that mimic actual technical
          interviews. Whether you're prepping for your first job or leveling up
          for tech companies, our platform gives you the edge.
          <br />
          <span className="font-medium text-blue-800">
            Practice smart. Build confidence. Stand out from the crowd.
          </span>
        </p>
      </motion.div>
    </>
  );
}

export default HeroSection;
