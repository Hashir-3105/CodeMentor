import React from "react";

function Unauthorized() {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg font-semibold">
        Unauthorized: You are not authorized to access the admin panel.{" "}
      </p>
    </div>
  );
}

export default Unauthorized;
