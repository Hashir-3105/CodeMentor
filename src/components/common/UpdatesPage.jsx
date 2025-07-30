import React from "react";
import { ClipboardList } from "lucide-react";
function UpdatesPage({ updateHeading, updateText }) {
  return (
    <div className="col-span-full flex flex-col justify-center items-center py-16 text-gray-500 text-lg font-medium border rounded-2xl bg-white shadow-md">
      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-50">
        <ClipboardList className="w-8 h-8 text-blue-400" />
      </div>

      <p className="text-gray-600 text-xl font-semibold mb-1">
        {updateHeading}
      </p>
      <p className="text-gray-400 text-sm">{updateText}</p>
    </div>
  );
}

export default UpdatesPage;
