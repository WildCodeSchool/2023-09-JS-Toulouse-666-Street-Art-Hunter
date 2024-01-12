import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login, { authenticate } from "./pages/login/LogIn";

import App from "./App";
import MapPage from "./pages/MapPage/MapPage";

const router = createBrowserRouter([
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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
