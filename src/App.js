import React from "react";
import Login from "./auth/login/index";
import SignUp from "./auth/signup/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "./authContext/AuthContext";
import { ProtectedRoutes } from "./protectedRoutes/index";
import Dashboard from "./components/dashboard/index.js";
const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/signUp", element: <SignUp /> },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoutes>
          <Dashboard />
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
