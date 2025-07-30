import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <img
        src="/src/assets/monkey.png"
        alt="Page Not Found"
        className="w-60 h-60 mb-6"
      />

      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        This page isn’t available.
      </h1>

      <p className="text-gray-600 mb-6">
        Sorry about that. Try searching for something else or return home.
      </p>

      <Link
        to="/"
        className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Unauthorized;
