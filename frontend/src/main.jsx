import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login, { authenticate } from "./pages/Login/Loginpage";
import Register, { enrolment } from "./pages/Register/Register";

import RootLayout from "./Layouts/RootLayout/RootLayout";
import App from "./App";
import MapPage from "./pages/MapPage/MapPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "/login",
        element: <Login />,
        action: authenticate,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
    action: enrolment,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
