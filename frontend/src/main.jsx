import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login, { authenticate } from "./pages/Login/Loginpage";
import Register, { enrolment } from "./pages/Register/Register";
import Profil, { profilLoader } from "./pages/Profil/Profil";
import ProfilOption, { option } from "./pages/ProfilOption/ProfilOption";
import ProfilAdmin, {
  profilLoaderAdmin,
} from "./pages/ProfilAdmin/ProfilAdmin";
import App from "./App";
import MapPage from "./pages/MapPage/MapPage";
import RootLayout from "./Layouts/RootLayout/RootLayout";
import AddExistingArtwork from "./pages/AddExistingArtwork/AddExistingArtwork";
import AddNonExistingArtwork from "./pages/AddNonExistingArtwork/AddNonExistingArtwork";
import ArtworkMissing from "./pages/ArtworkMissing/ArtworkMissing";
import DetailsArtwork from "./pages/DetailsArtwork/DetailsArtwork";
import Rules from "./pages/Rules/Rules";
import { markerArtworkLoader } from "./components/ArtworkMarker/ArtworkMarker";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<App />} />
      <Route path="/map" element={<MapPage />} loader={markerArtworkLoader} />
      <Route path="/register" element={<Register />} action={enrolment} />
      <Route path="/login" element={<Login />} action={authenticate} />
      <Route path="/profil/:id" element={<Profil />} loader={profilLoader} />
      <Route
        path="/profil/admin/:id"
        element={<ProfilAdmin />}
        loader={profilLoaderAdmin}
      />
      <Route
        path="/profil/:id/option"
        element={<ProfilOption />}
        action={option}
      />
      <Route path="/add-existing-artwork" element={<AddExistingArtwork />} />

      <Route
        path="/add-non-existing-artwork"
        element={<AddNonExistingArtwork />}
      />
      <Route path="/artwork-missing" element={<ArtworkMissing />} />
      <Route path="/details-artwork" element={<DetailsArtwork />} />
      <Route path="/rules" element={<Rules />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
