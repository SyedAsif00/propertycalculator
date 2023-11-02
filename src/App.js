import React from "react";
import Login from "./auth/login/index";
import SignUp from "./auth/signup/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "./authContext/AuthContext";
import { ProtectedRoutes } from "./protectedRoutes/index";
import Dashboard from "./components/dashboard/index.js";
import Form from "./components/form/Form";
import UserProfile from "./components/profile/profile";
const App = () => {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/signUp", element: <SignUp /> },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoutes>
          <Dashboard />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/form",
      element: (
        <ProtectedRoutes>
          <Form />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoutes>
          <UserProfile />
        </ProtectedRoutes>
      ),
    },
  ]);
  return (
    <>
      <AuthContext>
        <RouterProvider router={router}></RouterProvider>
      </AuthContext>
    </>
  );
};

export default App;
