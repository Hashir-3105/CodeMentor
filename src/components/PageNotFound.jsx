import React from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-r from-white to-blue-100 text-center">
      <div className="flex items-center justify-center text-[#5db3cf] text-[8rem] font-bold mb-4">
        <span>4</span>
        <Loader2 className="w-20 h-20 animate-spin mx-4 text-[#1a88a5]" />
        <span>4</span>
      </div>

      <p className="text-2xl text-gray-700 mb-8">ERROR | PAGE NOT FOUND</p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-400 text-white text-lg rounded-lg transition"
      >
        Go Back
      </Link>
    </div>
  );
};

export default PageNotFound;
