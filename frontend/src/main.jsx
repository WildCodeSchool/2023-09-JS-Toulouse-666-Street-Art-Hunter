import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login, { authenticate } from "./pages/Login/Loginpage";
import Register, { enrolment } from "./pages/Register/Register";

import App from "./App";
import MapPage from "./pages/MapPage/MapPage";
import AddExistingArtwork from "./pages/AddExistingArtwork/AddExistingArtwork";

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
  {
    path: "/register",
    element: <Register />,
    action: enrolment,
  },
  {
    path: "/add-existing-artwork",
    element: <AddExistingArtwork />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
