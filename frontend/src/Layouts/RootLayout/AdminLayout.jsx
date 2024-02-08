import React from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";

function AdminLayout() {
  const admin = useLoaderData();

  return admin.is_admin && <Outlet />;
}

export default AdminLayout;

export const adminLayout = async () => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  try {
    if (user) {
      const { id } = JSON.parse(user);

      const responseAdmin = await fetch(`${apiURL}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const admin = await responseAdmin.json();
      return admin;
    }
    return redirect("/login");
  } catch (error) {
    throw new Error("Page réservé au admin");
  }
};
