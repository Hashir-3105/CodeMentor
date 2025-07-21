import React from "react";
import { Link, Outlet } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

function MemberDashboard() {
  const navLinks = [
    { name: "Profile", redirect: "/user/profile" },
    { name: "Interviews", redirect: "/user/inter" },
    { name: "Editor", redirect: "/user/editor" },
    { name: "Contact us", redirect: "/user/contact-us" },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <header className="flex justify-between items-center px-6 py-4 bg-white border-b-gray-200 shadow-sm sticky top-0 z-10">
        <Link to={"/"} className="text-xl font-bold text-blue-400">
          Code Mentor
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6">
            {navLinks.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={item.redirect}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <UserButton />
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default MemberDashboard;
