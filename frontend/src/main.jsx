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
import DetailsArtwork, {
  dataArtwork,
} from "./pages/DetailsArtwork/DetailsArtwork";
import Rules from "./pages/Rules/Rules";
import { markerArtworkLoader } from "./components/ArtworkMarker/ArtworkMarker";
import AdminUsers, { adminUsers } from "./pages/AdminUsers/AdminUsers";
import AdminUserDetails, {
  userDetails,
} from "./pages/AdminUserDetails/AdminUserDetails";
import AdminLayout, { adminLayout } from "./Layouts/RootLayout/AdminLayout";
import Legals from "./pages/Legal/Legal";
import AdminUserModify, {
  adminModify,
  adminModifyUsers,
} from "./pages/AdminUserModify/AdminUserModify";
import AdminArtworks, {
  adminArtworksLoader,
} from "./pages/AdminArtworks/AdminArtworks";
import AdminDetailsArtworks from "./pages/AdminDetailsArtwork/AdminDetailsArtwork";
import Ranking from "./pages/Ranking/Ranking";
import AboutUs from "./pages/AboutUs/AboutUs";
import ValidatePhoto, {
  artworksLoader,
} from "./pages/ValidatePhoto/ValidatePhoto";
import ArtworkOption from "./pages/ArtworkOption/ArtworkOption";
import ValidateArtwork from "./pages/ValidateArtwork/ValidateArtwork";
import AdminArtworkMissing from "./pages/AdminArtworkMissing/AdminArtworkMissing";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<App />} />
      <Route path="/map" element={<MapPage />} loader={markerArtworkLoader} />
      <Route path="/register" element={<Register />} action={enrolment} />
      <Route path="/login" element={<Login />} action={authenticate} />
      <Route path="/profil/:id" element={<Profil />} loader={profilLoader} />
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
      <Route
        path="/details-artwork/:id"
        element={<DetailsArtwork />}
        loader={dataArtwork}
      />
      <Route path="/rules" element={<Rules />} />
      <Route path="/legals" element={<Legals />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/about-us" element={<AboutUs />} />

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
          path="pannel-administrateur/users/option/:id"
          element={<AdminUserModify />}
          action={adminModify}
          loader={adminModifyUsers}
        />
        <Route
          path="admin-artworks"
          element={<AdminArtworks />}
          loader={adminArtworksLoader}
        />
        <Route
          path="admin-details-artwork/:id"
          element={<AdminDetailsArtworks />}
          loader={dataArtwork}
        />
        <Route
          path="admin-details-artwork/option/:id"
          element={<ArtworkOption />}
        />
        <Route
          path="validate-photo/:id"
          element={<ValidatePhoto />}
          loader={artworksLoader}
        />
        <Route path="validate-artwork/:id" element={<ValidateArtwork />} />
        <Route
          path="admin-missing-artwork/:id"
          element={<AdminArtworkMissing />}
        />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
