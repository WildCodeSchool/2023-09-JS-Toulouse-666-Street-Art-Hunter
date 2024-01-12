import { Outlet } from "react-router-dom";
import "./RootLayout.scss";
import NavBar from "../../components/NavBar/NavBar";

function RootLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default RootLayout;
