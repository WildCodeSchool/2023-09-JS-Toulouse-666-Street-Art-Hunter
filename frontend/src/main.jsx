import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./components/RootLayout/RootLayout";
import App from "./App";
import MapPage from "./pages/MapPage/MapPage";
import Register, { enrolment } from "./pages/Register/Register";
import Login, { authenticate } from "./pages/Login/Loginpage";
import AddExistingArtwork from "./pages/AddExistingArtwork/AddExistingArtwork";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<App />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/register" element={<Register />} action={enrolment} />
      <Route path="/login" element={<Login />} action={authenticate} />
      <Route path="/add-existing-artwork" element={<AddExistingArtwork />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
