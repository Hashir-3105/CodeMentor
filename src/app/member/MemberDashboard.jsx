import React, { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";

function MemberDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Profile", redirect: "/user/profile" },
    { name: "Interviews", redirect: "/user/test" },
    { name: "Contact us", redirect: "/user/contact-us" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <header className="sticky top-0 z-20 bg-white border-b border-blue-100 shadow-sm">
        {" "}
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-3xl font-extrabold text-blue-700 tracking-wide transition-transform duration-300 hover:scale-105"
          >
            Code <span className="text-blue-500">Mentor</span>{" "}
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((item, index) => (
              <NavLink
                key={index}
                to={item.redirect}
                className={({ isActive }) =>
                  `relative text-base font-medium py-2 px-3 rounded-lg transition-all duration-300
                  ${
                    isActive
                      ? "text-blue-700 border-b-2 border-blue-700"
                      : "text-gray-700 hover:text-blue-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <UserButton />
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setMobileOpen(false)}
          ></div>
        )}
        <div
          className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-30 md:hidden ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMobileOpen(false)}
              className="text-gray-700 focus:outline-none"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-4 p-4">
            {navLinks.map((item, index) => (
              <NavLink
                key={index}
                to={item.redirect}
                className={({ isActive }) =>
                  `block text-lg font-medium py-2 px-4 rounded-lg transition duration-200
                  ${
                    isActive
                      ? "text-blue-700 bg-blue-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            <div className="mt-4 border-t pt-4">
              <UserButton />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default MemberDashboard;
