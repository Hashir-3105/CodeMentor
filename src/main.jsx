import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./app/auth/PrivateRoute";
import SignInForm from "./app/auth/SignInForm";
import SignUpForm from "./app/auth/SignUpForm";
import MemberDashboard from "./app/member/MemberDashboard";
import MemberProfile from "./app/member/MemberProfile";
import Users from "./app/admin/Users";
import Unauthorized from "./components/Unauthorized";
import RoleRedirect from "./components/RoleRedirect";
import CodeSection from "./app/member/CodeSection";
// import InterviewSection from "./app/member/TestSection";
import LandingPage from "./app/member/LandingPage";
import Rooms from "./app/admin/RoomsSection";
import ContactUs from "./app/member/ContactUs";
import ProblemsList from "./app/admin/ProblemsList";
import AdminDashboard from "./app/admin/AdminDashboard";
import ManageRequests from "./app/admin/CandidateRequests";
import Management from "./app/admin/Management";
import CandidateRequests from "./app/admin/CandidateRequests";
import TestSection from "./app/member/TestSection";

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
            path: "dashboard",
            element: <Management />,
          },
          {
            path: "management",
            element: <CandidateRequests />,
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
            path: "test",
            element: <TestSection />,
          },
          {
            path: "editor/:testId",
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
