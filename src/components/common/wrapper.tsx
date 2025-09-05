import React, { useLayoutEffect } from "react";
import Navbar from "./navBar";
import Footer from "./footer";
import { useLocation } from "react-router-dom";
import { Toaster } from "../ui/sonner";

function Wrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="w-7xl mx-auto p-5 flex-grow mt-15">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default Wrapper;
