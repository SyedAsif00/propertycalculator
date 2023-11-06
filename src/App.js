import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./auth/login/index";
import SignUp from "./auth/signup/index";
import { AuthContext } from "./authContext/AuthContext";
import Dashboard from "./components/dashboard/index.js";
import Form2 from "./components/form/Form2";
import UserProfile from "./components/profile/profile";
import { ProtectedRoutes } from "./protectedRoutes/index";
import "./firebase/firebase.config";
import "./firebase/storage";
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
          <Form2 />
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
