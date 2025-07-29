import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { FaCheckCircle } from "react-icons/fa";

const LoadingSuccess = ({ onClose }) => {
  const [loading, setLoading] = useState(true);
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setLoading(false);
      setShowTick(true);
    }, 1500);

    const timer2 = setTimeout(() => {
      if (onClose) onClose();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50 flex-col gap-4">
      {loading ? (
        <ClipLoader size={60} color="#3B82F6" />
      ) : (
        <FaCheckCircle className="text-green-500 text-6xl" />
      )}
      <p className="text-white font-medium text-lg">
        {loading ? "Processing..." : "Success!"}
      </p>
    </div>
  );
};

export default LoadingSuccess;
