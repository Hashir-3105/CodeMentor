import React from "react";

const InterviewSkeleton = () => {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="p-5 bg-white rounded-xl shadow hover:shadow-md transition border animate-pulse"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          </div>

          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>

          <div className="mt-6 h-8 bg-gray-200 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default InterviewSkeleton;
