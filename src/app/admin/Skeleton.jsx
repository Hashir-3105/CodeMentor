import React from "react";

const Skeleton = () => {
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-lg transition-all duration-300 animate-pulse"
        >
          <div className="space-y-4 text-gray-700">
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            <div className="h-8 bg-gray-300 rounded-md w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
