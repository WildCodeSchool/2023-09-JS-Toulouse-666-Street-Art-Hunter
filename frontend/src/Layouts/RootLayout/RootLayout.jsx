import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./RootLayout.scss";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function RootLayout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const mainRootStyles = isOpen ? { overflow: "hidden" } : {};

  if (location.pathname === "/about-us") {
    return (
      <div className="background-page" style={mainRootStyles}>
        {location.pathname !== "/" && (
          <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
        <Outlet />
        {location.pathname !== "/" && <Footer />}
      </div>
    );
  }

  return (
    <div className="main-root" style={mainRootStyles}>
      {location.pathname !== "/" && (
        <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      <Outlet />
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default RootLayout;
