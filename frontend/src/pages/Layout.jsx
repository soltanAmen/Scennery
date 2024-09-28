import { Hero, Footer } from "../components";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-background flex flex-col ">
      <Hero />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
