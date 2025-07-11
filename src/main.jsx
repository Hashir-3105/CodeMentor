import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";
import AdminDashboard from "./components/admin/AdminDashboard";
import MemberDashboard from "./components/member/MemberDashboard";
import MemberProfile from "./components/member/MemberProfile";
import Users from "./components/admin/Users";
import Unauthorized from "./components/Unauthorized";
import RoleRedirect from "./components/RoleRedirect";
import CodeSection from "./components/member/CodeSection";
import InterviewSection from "./components/member/InterviewSection";
import LandingPage from "./components/member/LandingPage";
import Rooms from "./components/admin/RoomsSection";
import ProblemsList from "./components/admin/ProblemsList";
import Management from "./components/admin/Management";
import ContactUs from "./components/member/ContactUs";

// just to check clerk is working or not
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <RoleRedirect />,
      },
      {
        path: "admin",
        element: (
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            path: "management",
            element: <Management />,
          },
          {
            path: "overview",
            element: <ProblemsList />,
          },
          {
            path: "rooms",
            element: <Rooms />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
      {
        path: "user",
        element: (
          <PrivateRoute allowedRoles={["member"]}>
            <MemberDashboard />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "inter",
            element: <InterviewSection />,
          },
          {
            path: "editor",
            element: <CodeSection />,
          },
          {
            path: "profile",
            element: <MemberProfile />,
          },
          {
            path: "contact-us",
            element: <ContactUs />,
          },
        ],
      },
    ],
  },
  {
    path: "/SignInForm",
    element: <SignInForm />,
  },
  {
    path: "/Sign-up",
    element: <SignUpForm />,
  },
  {
    path: "/unauthorzied",
    element: <Unauthorized />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
