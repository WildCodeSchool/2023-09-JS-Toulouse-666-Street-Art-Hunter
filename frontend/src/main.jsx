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
import PannelAdministrateur, {
  profilPannelAdmin,
} from "./pages/PannelAdministrateur/PannelAdministrateur";
import DetailsArtwork from "./pages/DetailsArtwork/DetailsArtwork";
import Rules from "./pages/Rules/Rules";
import { markerArtworkLoader } from "./components/ArtworkMarker/ArtworkMarker";
import AdminUsers, { adminUsers } from "./pages/AdminUsers/AdminUsers";
import AdminUserDetails, {
  userDetails,
} from "./pages/AdminUserDetails/AdminUserDetails";
import AdminLayout, { adminLayout } from "./Layouts/RootLayout/AdminLayout";
import Legals from "./pages/Legal/Legal";
import AdminArtworks, {
  adminArtworksLoader,
} from "./pages/AdminArtworks/AdminArtworks";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<App />} />
      <Route path="/map" element={<MapPage />} loader={markerArtworkLoader} />
      <Route path="/register" element={<Register />} action={enrolment} />
      <Route path="/login" element={<Login />} action={authenticate} />
      <Route path="/profil/:id" element={<Profil />} loader={profilLoader} />
      <Route element={<AdminLayout />} path="/admin" loader={adminLayout}>
        <Route
          path="profil/:id"
          element={<ProfilAdmin />}
          loader={profilLoaderAdmin}
        />
        <Route
          path="pannel-administrateur/:id"
          element={<PannelAdministrateur />}
          loader={profilPannelAdmin}
        />
        <Route
          path="pannel-administrateur/users"
          element={<AdminUsers />}
          loader={adminUsers}
        />
        <Route
          path="pannel-administrateur/users/:id"
          element={<AdminUserDetails />}
          loader={userDetails}
        />
        <Route
          path="admin-artworks"
          element={<AdminArtworks />}
          loader={adminArtworksLoader}
        />
      </Route>

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
      <Route path="/legals" element={<Legals />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
