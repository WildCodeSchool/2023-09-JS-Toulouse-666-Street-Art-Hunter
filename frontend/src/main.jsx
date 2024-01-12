import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login, { authenticate } from "./pages/login/LogIn";

import App from "./App";
import AddExistingArtwork from "./pages/AddExistingArtwork/AddExistingArtwork";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
    action: authenticate,
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
